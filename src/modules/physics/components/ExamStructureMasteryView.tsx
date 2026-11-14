"use client";

import React from "react";
import { EXAM_PAPERS, COMMAND_TERMS, UNCERTAINTY_RULES } from "@/modules/physics/data";
import {
  FileText,
  Award,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Calculator,
  BookOpen,
} from "lucide-react";
import { MathFormula } from "./MathFormula";
import { MathText } from "./MathText";

export const ExamStructureMasteryView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          <Award className="w-4 h-4" />
          <span>Official Assessment Specification (First Exams 2025)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
          IB Physics SL / HL Exam Structure Mastery
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Comprehensive blueprint for Paper 1A, Paper 1B, Paper 2, and the Scientific Investigation (Internal Assessment). Master mark scheme command terms, error propagation, and strategic timing allocations to secure a Grade 7.
        </p>
      </div>

      {/* Papers Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXAM_PAPERS.map((paper, idx) => (
          <div
            key={idx}
            className="liquid-glass-card rounded-3xl p-6 sm:p-7 bg-slate-900/70 border border-white/10 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-lg font-bold text-slate-100">{paper.paper}</h3>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {paper.weightingSL}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-slate-500 block text-[10px]">DURATION</span>
                <strong className="text-slate-200">{paper.duration}</strong>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-slate-500 block text-[10px]">TOTAL MARKS</span>
                <strong className="text-slate-200">{paper.marks} Marks</strong>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-slate-500 block text-[10px]">CALCULATOR</span>
                <strong className="text-slate-200">{paper.calculator}</strong>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-slate-500 block text-[10px]">DATA BOOKLET</span>
                <strong className="text-slate-200">{paper.dataBooklet}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {paper.format}
            </p>

            <div className="space-y-1.5 pt-1">
              <strong className="text-xs uppercase font-mono tracking-wider text-cyan-400 block">
                Top Examiner Tactics:
              </strong>
              <ul className="space-y-1 text-xs text-slate-300">
                {paper.tactics.map((tactic, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{tactic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Uncertainty Propagation Rules Table */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-300">
          <Calculator className="w-4 h-4 text-cyan-400" />
          <span>Experimental Uncertainty Propagation Rules (Paper 1B & IA)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UNCERTAINTY_RULES.map((rule, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2"
            >
              <div className="text-sm font-bold text-slate-100">{rule.type}</div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs font-mono text-cyan-300 overflow-x-auto">
                <MathFormula math={rule.rule} block />
              </div>
              <p className="text-xs text-slate-300">
                <span className="text-slate-500">Example: </span>
                <MathText text={rule.example} />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Command Terms Glossary */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-200">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Official IB Physics Command Terms & Marking Criteria</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {COMMAND_TERMS.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1"
            >
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {item.term}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamStructureMasteryView;
