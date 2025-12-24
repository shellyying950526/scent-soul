import React from 'react';
import { AnalysisResult } from '../types';
import { PerfumeCard } from './PerfumeCard';

interface AnalysisViewProps {
  result: AnalysisResult;
  previewUrl: string;
  onReset: () => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ result, previewUrl, onReset }) => {
  return (
    <div className="animate-fade-in space-y-12 pb-20">
      
      {/* Header Section */}
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 relative group">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <img src={previewUrl} alt="Analyzed face" className="w-full h-full object-cover" />
          </div>
          <button 
            onClick={onReset}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-6 py-2 rounded-full text-sm hover:bg-stone-800 transition-colors shadow-lg"
          >
            Analyze Another
          </button>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="font-serif text-2xl text-stone-800 mb-4 border-b border-stone-200 pb-2">
              📸 The Gaze (面相观察)
            </h3>
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">
              {result.observation}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white/60 p-6 rounded-2xl border border-stone-100">
               <h4 className="font-serif text-lg text-amber-900 mb-3">🎭 Outer Persona</h4>
               <p className="text-stone-600 text-sm leading-relaxed">{result.outerPersona}</p>
             </div>
             <div className="bg-white/60 p-6 rounded-2xl border border-stone-100">
               <h4 className="font-serif text-lg text-indigo-900 mb-3">✨ Inner Self</h4>
               <p className="text-stone-600 text-sm leading-relaxed">{result.innerSelf}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-center font-serif text-3xl md:text-4xl text-stone-800 mb-12">
          <span className="block text-sm font-sans tracking-[0.2em] text-stone-500 uppercase mb-3">Your Scent Signature</span>
          The Selection
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <PerfumeCard data={result.perfumeOuter} type="outer" />
          <PerfumeCard data={result.perfumeInner} type="inner" />
        </div>
      </div>

      {/* Closing */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="w-16 h-[1px] bg-stone-300 mx-auto"></div>
        <p className="font-serif text-xl md:text-2xl text-stone-600 italic leading-relaxed px-4">
          "{result.closingMessage}"
        </p>
        <div className="w-16 h-[1px] bg-stone-300 mx-auto"></div>
        <p className="text-xs text-stone-400 uppercase tracking-widest pt-4">
          Scent & Soul Analysis
        </p>
      </div>

    </div>
  );
};
