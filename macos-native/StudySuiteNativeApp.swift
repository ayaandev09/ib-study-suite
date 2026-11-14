import SwiftUI
import WebKit
import AppKit
import EventKit

// MARK: - Local Scheme Handler for 100% Offline Asset Delivery
final class LocalSchemeHandler: NSObject, WKURLSchemeHandler {
    private let bundleRoot: URL

    init(bundleRoot: URL) {
        self.bundleRoot = bundleRoot
        super.init()
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url else {
            urlSchemeTask.didFailWithError(NSError(domain: "LocalSchemeHandler", code: 400, userInfo: nil))
            return
        }

        var path = url.path
        if path.isEmpty || path == "/" {
            path = "/index.html"
        }

        let relativePath = path.hasPrefix("/") ? String(path.dropFirst()) : path
        let fileURL = bundleRoot.appendingPathComponent(relativePath)

        if FileManager.default.fileExists(atPath: fileURL.path), let data = try? Data(contentsOf: fileURL) {
            let mime = mimeType(for: fileURL.pathExtension)
            let response = HTTPURLResponse(
                url: url,
                statusCode: 200,
                httpVersion: "HTTP/1.1",
                headerFields: [
                    "Content-Type": mime,
                    "Access-Control-Allow-Origin": "*",
                    "Cache-Control": "public, max-age=31536000",
                    "Content-Length": "\(data.count)"
                ]
            )!
            urlSchemeTask.didReceive(response)
            urlSchemeTask.didReceive(data)
            urlSchemeTask.didFinish()
        } else {
            let fallbackURL = bundleRoot.appendingPathComponent("index.html")
            if FileManager.default.fileExists(atPath: fallbackURL.path), let data = try? Data(contentsOf: fallbackURL) {
                let response = HTTPURLResponse(
                    url: url,
                    statusCode: 200,
                    httpVersion: "HTTP/1.1",
                    headerFields: [
                        "Content-Type": "text/html; charset=utf-8",
                        "Access-Control-Allow-Origin": "*"
                    ]
                )!
                urlSchemeTask.didReceive(response)
                urlSchemeTask.didReceive(data)
                urlSchemeTask.didFinish()
            } else {
                urlSchemeTask.didFailWithError(NSError(domain: "LocalSchemeHandler", code: 404, userInfo: [NSLocalizedDescriptionKey: "Resource not found: \(relativePath)"]))
            }
        }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {}

    private func mimeType(for ext: String) -> String {
        switch ext.lowercased() {
        case "html", "htm": return "text/html; charset=utf-8"
        case "js", "mjs": return "application/javascript; charset=utf-8"
        case "css": return "text/css; charset=utf-8"
        case "json": return "application/json; charset=utf-8"
        case "svg": return "image/svg+xml"
        case "png": return "image/png"
        case "jpg", "jpeg": return "image/jpeg"
        case "webp": return "image/webp"
        case "ico": return "image/x-icon"
        case "woff2": return "font/woff2"
        case "woff": return "font/woff"
        case "ttf": return "font/ttf"
        case "wav": return "audio/wav"
        case "mp3": return "audio/mpeg"
        case "m4a": return "audio/mp4"
        case "ogg": return "audio/ogg"
        case "txt": return "text/plain; charset=utf-8"
        default: return "application/octet-stream"
        }
    }
}

// MARK: - Apple Calendar (EventKit) Bridge
final class CalendarBridge: NSObject {
    private let eventStore = EKEventStore()
    weak var webView: WKWebView?
    private var storeObserver: NSObjectProtocol?
    private var activeObserver: NSObjectProtocol?

    override init() {
        super.init()
        storeObserver = NotificationCenter.default.addObserver(
            forName: .EKEventStoreChanged,
            object: eventStore,
            queue: .main
        ) { [weak self] _ in
            self?.pushCalendarPayload(requestIfNeeded: false)
        }
        activeObserver = NotificationCenter.default.addObserver(
            forName: NSApplication.didBecomeActiveNotification,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            self?.pushCalendarPayload(requestIfNeeded: false)
        }
    }

    deinit {
        if let storeObserver { NotificationCenter.default.removeObserver(storeObserver) }
        if let activeObserver { NotificationCenter.default.removeObserver(activeObserver) }
    }

    func handleAction(_ action: String) {
        switch action {
        case "requestAccess":
            pushCalendarPayload(requestIfNeeded: true)
        case "refresh":
            pushCalendarPayload(requestIfNeeded: false)
        case "openCalendar":
            if let url = URL(string: "ical://") {
                NSWorkspace.shared.open(url)
            }
        case "openSettings":
            if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_Calendars") {
                NSWorkspace.shared.open(url)
            }
        default:
            pushCalendarPayload(requestIfNeeded: false)
        }
    }

    func pushCalendarPayload(requestIfNeeded: Bool) {
        let authStatus = EKEventStore.authorizationStatus(for: .event)
        if authStatus == .notDetermined && requestIfNeeded {
            eventStore.requestFullAccessToEvents { [weak self] granted, _ in
                DispatchQueue.main.async {
                    self?.emitCurrentEvents(grantedOverride: granted)
                }
            }
            return
        }
        emitCurrentEvents(grantedOverride: nil)
    }

    private func emitCurrentEvents(grantedOverride: Bool?) {
        let rawStatus = EKEventStore.authorizationStatus(for: .event)
        let statusString: String
        let isAuthorized: Bool

        switch rawStatus {
        case .fullAccess:
            statusString = "authorized"
            isAuthorized = true
        case .writeOnly:
            statusString = "writeOnly"
            isAuthorized = false
        case .denied:
            statusString = "denied"
            isAuthorized = false
        case .restricted:
            statusString = "restricted"
            isAuthorized = false
        case .notDetermined:
            if grantedOverride == true {
                statusString = "authorized"
                isAuthorized = true
            } else {
                statusString = "notDetermined"
                isAuthorized = false
            }
        @unknown default:
            statusString = "unknown"
            isAuthorized = false
        }

        var eventItems: [[String: Any]] = []
        if isAuthorized {
            let now = Date()
            let end = Calendar.current.date(byAdding: .day, value: 7, to: now) ?? now.addingTimeInterval(7 * 86400)
            let predicate = eventStore.predicateForEvents(withStart: now, end: end, calendars: nil)
            let formatter = ISO8601DateFormatter()
            formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]

            let events = eventStore.events(matching: predicate)
                .filter { $0.status != .canceled }
                .sorted { $0.startDate < $1.startDate }
                .prefix(10)

            for ev in events {
                eventItems.append([
                    "id": ev.eventIdentifier ?? UUID().uuidString,
                    "title": (ev.title?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false) ? ev.title! : "Untitled Event",
                    "startIso": formatter.string(from: ev.startDate),
                    "endIso": formatter.string(from: ev.endDate),
                    "isAllDay": ev.isAllDay,
                    "calendarTitle": ev.calendar?.title ?? "Calendar",
                    "calendarColor": hexColor(from: ev.calendar?.cgColor),
                    "location": ev.location ?? ""
                ])
            }
        }

        let payload: [String: Any] = [
            "status": statusString,
            "events": eventItems,
            "syncedAt": ISO8601DateFormatter().string(from: Date())
        ]

        guard let jsonData = try? JSONSerialization.data(withJSONObject: payload, options: []),
              let jsonString = String(data: jsonData, encoding: .utf8) else {
            return
        }

        DispatchQueue.main.async { [weak self] in
            let script = "window.__updateAppleCalendar && window.__updateAppleCalendar(\(jsonString));"
            self?.webView?.evaluateJavaScript(script, completionHandler: nil)
        }
    }

    private func hexColor(from cgColor: CGColor?) -> String {
        guard let cgColor,
              let nsColor = NSColor(cgColor: cgColor)?.usingColorSpace(.sRGB) else {
            return "#38bdf8"
        }
        let r = Int(round(nsColor.redComponent * 255))
        let g = Int(round(nsColor.greenComponent * 255))
        let b = Int(round(nsColor.blueComponent * 255))
        return String(format: "#%02x%02x%02x", r, g, b)
    }
}

// MARK: - WebView Coordinator
final class SuiteWebViewCoordinator: NSObject, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler {
    let calendarBridge = CalendarBridge()

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        calendarBridge.webView = webView
        calendarBridge.pushCalendarPayload(requestIfNeeded: true)
    }

    func webView(
        _ webView: WKWebView,
        decidePolicyFor navigationAction: WKNavigationAction,
        decisionHandler: @escaping (WKNavigationActionPolicy) -> Void
    ) {
        if let url = navigationAction.request.url,
           let scheme = url.scheme?.lowercased(),
           scheme == "http" || scheme == "https" || scheme == "mailto" {
            NSWorkspace.shared.open(url)
            decisionHandler(.cancel)
            return
        }
        decisionHandler(.allow)
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "appleCalendar" else { return }
        if let dict = message.body as? [String: Any],
           let action = dict["action"] as? String {
            calendarBridge.handleAction(action)
        } else if let action = message.body as? String {
            calendarBridge.handleAction(action)
        } else {
            calendarBridge.handleAction("refresh")
        }
    }
}

// MARK: - SwiftUI WKWebView Wrapper
struct NativeWebView: NSViewRepresentable {
    let bundleFolderName: String

    func makeCoordinator() -> SuiteWebViewCoordinator {
        SuiteWebViewCoordinator()
    }

    func makeNSView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.mediaTypesRequiringUserActionForPlayback = []
        config.preferences.setValue(true, forKey: "developerExtrasEnabled")

        let controller = WKUserContentController()
        controller.add(context.coordinator, name: "appleCalendar")
        config.userContentController = controller

        let bundleURL = Bundle.main.url(forResource: bundleFolderName, withExtension: "bundle")
            ?? Bundle.main.resourceURL?.appendingPathComponent(bundleFolderName)
            ?? Bundle.main.bundleURL

        let schemeHandler = LocalSchemeHandler(bundleRoot: bundleURL)
        config.setURLSchemeHandler(schemeHandler, forURLScheme: "app")

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        webView.uiDelegate = context.coordinator
        webView.setValue(false, forKey: "drawsBackground")

        context.coordinator.calendarBridge.webView = webView

        if let initialURL = URL(string: "app://localhost/index.html") {
            webView.load(URLRequest(url: initialURL))
        }
        return webView
    }

    func updateNSView(_ nsView: WKWebView, context: Context) {}
}

// MARK: - Auto Full-Screen Helper
final class FullScreenAnchorView: NSView {
    private var didRequestFullScreen = false

    override func viewDidMoveToWindow() {
        super.viewDidMoveToWindow()
        guard let window, !didRequestFullScreen else { return }
        didRequestFullScreen = true
        window.collectionBehavior.insert(.fullScreenPrimary)
        if !window.styleMask.contains(.fullScreen) {
            DispatchQueue.main.async {
                if !window.styleMask.contains(.fullScreen) {
                    window.toggleFullScreen(nil)
                }
            }
        }
    }
}

struct AutoFullScreenAccessor: NSViewRepresentable {
    func makeNSView(context: Context) -> FullScreenAnchorView {
        FullScreenAnchorView(frame: .zero)
    }

    func updateNSView(_ nsView: FullScreenAnchorView, context: Context) {}
}

// MARK: - App Entry Point
struct ContentView: View {
    var body: some View {
        ZStack {
            Color(red: 3/255, green: 7/255, blue: 18/255)
                .ignoresSafeArea()

            NativeWebView(bundleFolderName: "WebBundle")
                .ignoresSafeArea()

            AutoFullScreenAccessor()
                .frame(width: 0, height: 0)
        }
        .frame(minWidth: 980, minHeight: 640)
    }
}

@main
struct IBStudySuiteApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .windowStyle(.hiddenTitleBar)
        .defaultSize(width: 1280, height: 800)
    }
}
