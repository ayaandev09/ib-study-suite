export interface WorldCity {
  id: string;
  city: string;
  country: string;
  timezone: string;
  continent: string;
}

export const POPULAR_WORLD_CITIES: WorldCity[] = [
  // Europe
  { id: "london", city: "London", country: "United Kingdom", timezone: "Europe/London", continent: "Europe" },
  { id: "paris", city: "Paris", country: "France", timezone: "Europe/Paris", continent: "Europe" },
  { id: "berlin", city: "Berlin", country: "Germany", timezone: "Europe/Berlin", continent: "Europe" },
  { id: "munich", city: "Munich", country: "Germany", timezone: "Europe/Berlin", continent: "Europe" },
  { id: "frankfurt", city: "Frankfurt", country: "Germany", timezone: "Europe/Berlin", continent: "Europe" },
  { id: "zurich", city: "Zurich", country: "Switzerland", timezone: "Europe/Zurich", continent: "Europe" },
  { id: "geneva", city: "Geneva", country: "Switzerland", timezone: "Europe/Zurich", continent: "Europe" },
  { id: "vienna", city: "Vienna", country: "Austria", timezone: "Europe/Vienna", continent: "Europe" },
  { id: "amsterdam", city: "Amsterdam", country: "Netherlands", timezone: "Europe/Amsterdam", continent: "Europe" },
  { id: "brussels", city: "Brussels", country: "Belgium", timezone: "Europe/Brussels", continent: "Europe" },
  { id: "madrid", city: "Madrid", country: "Spain", timezone: "Europe/Madrid", continent: "Europe" },
  { id: "barcelona", city: "Barcelona", country: "Spain", timezone: "Europe/Madrid", continent: "Europe" },
  { id: "rome", city: "Rome", country: "Italy", timezone: "Europe/Rome", continent: "Europe" },
  { id: "milan", city: "Milan", country: "Italy", timezone: "Europe/Rome", continent: "Europe" },
  { id: "dublin", city: "Dublin", country: "Ireland", timezone: "Europe/Dublin", continent: "Europe" },
  { id: "lisbon", city: "Lisbon", country: "Portugal", timezone: "Europe/Lisbon", continent: "Europe" },
  { id: "stockholm", city: "Stockholm", country: "Sweden", timezone: "Europe/Stockholm", continent: "Europe" },
  { id: "oslo", city: "Oslo", country: "Norway", timezone: "Europe/Oslo", continent: "Europe" },
  { id: "copenhagen", city: "Copenhagen", country: "Denmark", timezone: "Europe/Copenhagen", continent: "Europe" },
  { id: "helsinki", city: "Helsinki", country: "Finland", timezone: "Europe/Helsinki", continent: "Europe" },
  { id: "warsaw", city: "Warsaw", country: "Poland", timezone: "Europe/Warsaw", continent: "Europe" },
  { id: "prague", city: "Prague", country: "Czech Republic", timezone: "Europe/Prague", continent: "Europe" },
  { id: "budapest", city: "Budapest", country: "Hungary", timezone: "Europe/Budapest", continent: "Europe" },
  { id: "athens", city: "Athens", country: "Greece", timezone: "Europe/Athens", continent: "Europe" },
  { id: "istanbul", city: "Istanbul", country: "Turkey", timezone: "Europe/Istanbul", continent: "Europe" },
  { id: "moscow", city: "Moscow", country: "Russia", timezone: "Europe/Moscow", continent: "Europe" },

  // North America
  { id: "new-york", city: "New York", country: "United States", timezone: "America/New_York", continent: "North America" },
  { id: "boston", city: "Boston", country: "United States", timezone: "America/New_York", continent: "North America" },
  { id: "washington", city: "Washington D.C.", country: "United States", timezone: "America/New_York", continent: "North America" },
  { id: "miami", city: "Miami", country: "United States", timezone: "America/New_York", continent: "North America" },
  { id: "chicago", city: "Chicago", country: "United States", timezone: "America/Chicago", continent: "North America" },
  { id: "houston", city: "Houston", country: "United States", timezone: "America/Chicago", continent: "North America" },
  { id: "dallas", city: "Dallas", country: "United States", timezone: "America/Chicago", continent: "North America" },
  { id: "denver", city: "Denver", country: "United States", timezone: "America/Denver", continent: "North America" },
  { id: "phoenix", city: "Phoenix", country: "United States", timezone: "America/Phoenix", continent: "North America" },
  { id: "los-angeles", city: "Los Angeles", country: "United States", timezone: "America/Los_Angeles", continent: "North America" },
  { id: "san-francisco", city: "San Francisco", country: "United States", timezone: "America/Los_Angeles", continent: "North America" },
  { id: "seattle", city: "Seattle", country: "United States", timezone: "America/Los_Angeles", continent: "North America" },
  { id: "toronto", city: "Toronto", country: "Canada", timezone: "America/Toronto", continent: "North America" },
  { id: "montreal", city: "Montreal", country: "Canada", timezone: "America/Toronto", continent: "North America" },
  { id: "vancouver", city: "Vancouver", country: "Canada", timezone: "America/Vancouver", continent: "North America" },
  { id: "calgary", city: "Calgary", country: "Canada", timezone: "America/Edmonton", continent: "North America" },
  { id: "mexico-city", city: "Mexico City", country: "Mexico", timezone: "America/Mexico_City", continent: "North America" },

  // Middle East & Central Asia
  { id: "dubai", city: "Dubai", country: "United Arab Emirates", timezone: "Asia/Dubai", continent: "Middle East" },
  { id: "abu-dhabi", city: "Abu Dhabi", country: "United Arab Emirates", timezone: "Asia/Dubai", continent: "Middle East" },
  { id: "doha", city: "Doha", country: "Qatar", timezone: "Asia/Qatar", continent: "Middle East" },
  { id: "riyadh", city: "Riyadh", country: "Saudi Arabia", timezone: "Asia/Riyadh", continent: "Middle East" },
  { id: "jeddah", city: "Jeddah", country: "Saudi Arabia", timezone: "Asia/Riyadh", continent: "Middle East" },
  { id: "kuwait-city", city: "Kuwait City", country: "Kuwait", timezone: "Asia/Kuwait", continent: "Middle East" },
  { id: "manama", city: "Manama", country: "Bahrain", timezone: "Asia/Bahrain", continent: "Middle East" },
  { id: "muscat", city: "Muscat", country: "Oman", timezone: "Asia/Muscat", continent: "Middle East" },
  { id: "tel-aviv", city: "Tel Aviv", country: "Israel", timezone: "Asia/Jerusalem", continent: "Middle East" },
  { id: "jerusalem", city: "Jerusalem", country: "Israel", timezone: "Asia/Jerusalem", continent: "Middle East" },
  { id: "beirut", city: "Beirut", country: "Lebanon", timezone: "Asia/Beirut", continent: "Middle East" },
  { id: "amman", city: "Amman", country: "Jordan", timezone: "Asia/Amman", continent: "Middle East" },
  { id: "tehran", city: "Tehran", country: "Iran", timezone: "Asia/Tehran", continent: "Middle East" },
  { id: "cairo", city: "Cairo", country: "Egypt", timezone: "Africa/Cairo", continent: "Middle East" },

  // South Asia
  { id: "islamabad", city: "Islamabad", country: "Pakistan", timezone: "Asia/Karachi", continent: "South Asia" },
  { id: "karachi", city: "Karachi", country: "Pakistan", timezone: "Asia/Karachi", continent: "South Asia" },
  { id: "lahore", city: "Lahore", country: "Pakistan", timezone: "Asia/Karachi", continent: "South Asia" },
  { id: "peshawar", city: "Peshawar", country: "Pakistan", timezone: "Asia/Karachi", continent: "South Asia" },
  { id: "new-delhi", city: "New Delhi", country: "India", timezone: "Asia/Kolkata", continent: "South Asia" },
  { id: "mumbai", city: "Mumbai", country: "India", timezone: "Asia/Kolkata", continent: "South Asia" },
  { id: "bengaluru", city: "Bengaluru", country: "India", timezone: "Asia/Kolkata", continent: "South Asia" },
  { id: "hyderabad", city: "Hyderabad", country: "India", timezone: "Asia/Kolkata", continent: "South Asia" },
  { id: "chennai", city: "Chennai", country: "India", timezone: "Asia/Kolkata", continent: "South Asia" },
  { id: "kolkata", city: "Kolkata", country: "India", timezone: "Asia/Kolkata", continent: "South Asia" },
  { id: "dhaka", city: "Dhaka", country: "Bangladesh", timezone: "Asia/Dhaka", continent: "South Asia" },
  { id: "colombo", city: "Colombo", country: "Sri Lanka", timezone: "Asia/Colombo", continent: "South Asia" },
  { id: "kathmandu", city: "Kathmandu", country: "Nepal", timezone: "Asia/Kathmandu", continent: "South Asia" },

  // East & Southeast Asia
  { id: "singapore", city: "Singapore", country: "Singapore", timezone: "Asia/Singapore", continent: "Asia" },
  { id: "hong-kong", city: "Hong Kong", country: "Hong Kong", timezone: "Asia/Hong_Kong", continent: "Asia" },
  { id: "tokyo", city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", continent: "Asia" },
  { id: "osaka", city: "Osaka", country: "Japan", timezone: "Asia/Tokyo", continent: "Asia" },
  { id: "seoul", city: "Seoul", country: "South Korea", timezone: "Asia/Seoul", continent: "Asia" },
  { id: "beijing", city: "Beijing", country: "China", timezone: "Asia/Shanghai", continent: "Asia" },
  { id: "shanghai", city: "Shanghai", country: "China", timezone: "Asia/Shanghai", continent: "Asia" },
  { id: "shenzhen", city: "Shenzhen", country: "China", timezone: "Asia/Shanghai", continent: "Asia" },
  { id: "taipei", city: "Taipei", country: "Taiwan", timezone: "Asia/Taipei", continent: "Asia" },
  { id: "kuala-lumpur", city: "Kuala Lumpur", country: "Malaysia", timezone: "Asia/Kuala_Lumpur", continent: "Asia" },
  { id: "bangkok", city: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok", continent: "Asia" },
  { id: "jakarta", city: "Jakarta", country: "Indonesia", timezone: "Asia/Jakarta", continent: "Asia" },
  { id: "manila", city: "Manila", country: "Philippines", timezone: "Asia/Manila", continent: "Asia" },
  { id: "hanoi", city: "Hanoi", country: "Vietnam", timezone: "Asia/Ho_Chi_Minh", continent: "Asia" },
  { id: "ho-chi-minh", city: "Ho Chi Minh City", country: "Vietnam", timezone: "Asia/Ho_Chi_Minh", continent: "Asia" },

  // Oceania
  { id: "sydney", city: "Sydney", country: "Australia", timezone: "Australia/Sydney", continent: "Oceania" },
  { id: "melbourne", city: "Melbourne", country: "Australia", timezone: "Australia/Melbourne", continent: "Oceania" },
  { id: "brisbane", city: "Brisbane", country: "Australia", timezone: "Australia/Brisbane", continent: "Oceania" },
  { id: "perth", city: "Perth", country: "Australia", timezone: "Australia/Perth", continent: "Oceania" },
  { id: "auckland", city: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland", continent: "Oceania" },
  { id: "wellington", city: "Wellington", country: "New Zealand", timezone: "Pacific/Auckland", continent: "Oceania" },

  // South America
  { id: "sao-paulo", city: "São Paulo", country: "Brazil", timezone: "America/Sao_Paulo", continent: "South America" },
  { id: "rio-de-janeiro", city: "Rio de Janeiro", country: "Brazil", timezone: "America/Sao_Paulo", continent: "South America" },
  { id: "buenos-aires", city: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires", continent: "South America" },
  { id: "santiago", city: "Santiago", country: "Chile", timezone: "America/Santiago", continent: "South America" },
  { id: "bogota", city: "Bogota", country: "Colombia", timezone: "America/Bogota", continent: "South America" },
  { id: "lima", city: "Lima", country: "Peru", timezone: "America/Lima", continent: "South America" },

  // Africa
  { id: "johannesburg", city: "Johannesburg", country: "South Africa", timezone: "Africa/Johannesburg", continent: "Africa" },
  { id: "cape-town", city: "Cape Town", country: "South Africa", timezone: "Africa/Johannesburg", continent: "Africa" },
  { id: "nairobi", city: "Nairobi", country: "Kenya", timezone: "Africa/Nairobi", continent: "Africa" },
  { id: "lagos", city: "Lagos", country: "Nigeria", timezone: "Africa/Lagos", continent: "Africa" },
  { id: "accra", city: "Accra", country: "Ghana", timezone: "Africa/Accra", continent: "Africa" },
  { id: "casablanca", city: "Casablanca", country: "Morocco", timezone: "Africa/Casablanca", continent: "Africa" },
];

export function searchCities(query: string): WorldCity[] {
  const q = query.trim().toLowerCase();
  if (!q) return POPULAR_WORLD_CITIES.slice(0, 30);
  return POPULAR_WORLD_CITIES.filter(
    (c) =>
      c.city.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.timezone.toLowerCase().includes(q) ||
      c.continent.toLowerCase().includes(q)
  );
}
