import React from 'react';
import { PerfumeRecommendation } from '../types';

interface PerfumeCardProps {
  data: PerfumeRecommendation;
  type: 'outer' | 'inner';
}

export const PerfumeCard: React.FC<PerfumeCardProps> = ({ data, type }) => {
  const isOuter = type === 'outer';
  const accentColor = isOuter ? 'text-amber-800' : 'text-indigo-900';
  const bgColor = isOuter ? 'bg-amber-50/50' : 'bg-indigo-50/50';
  const borderColor = isOuter ? 'border-amber-200' : 'border-indigo-200';

  return (
    <div className={`p-6 md:p-8 rounded-2xl border ${borderColor} ${bgColor} shadow-sm backdrop-blur-sm transition-transform hover:scale-[1.01] duration-500`}>
      <div className="flex items-center justify-between mb-6">
        <div className="uppercase tracking-widest text-xs font-bold text-stone-500">
          {isOuter ? 'The Facade (外在印象)' : 'The Essence (内在真我)'}
        </div>
        <div className={`text-2xl ${accentColor}`}>
           {isOuter ? '🎭' : '✨'}
        </div>
      </div>

      <h3 className="font-serif text-3xl text-stone-900 mb-1 leading-tight">
        {data.name}
      </h3>
      <p className="text-stone-500 italic mb-4 font-serif text-lg">{data.brand}</p>
      
      <div className="inline-block px-3 py-1 rounded-full bg-white border border-stone-200 text-xs tracking-wide uppercase text-stone-600 mb-6">
        {data.family}
      </div>

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-[60px_1fr] gap-2 text-sm">
          <span className="text-stone-400 uppercase text-xs pt-1">Top</span>
          <span className="text-stone-700">{data.notes.top.join(', ')}</span>
        </div>
        <div className="grid grid-cols-[60px_1fr] gap-2 text-sm">
          <span className="text-stone-400 uppercase text-xs pt-1">Mid</span>
          <span className="text-stone-700">{data.notes.middle.join(', ')}</span>
        </div>
        <div className="grid grid-cols-[60px_1fr] gap-2 text-sm">
          <span className="text-stone-400 uppercase text-xs pt-1">Base</span>
          <span className="text-stone-700">{data.notes.base.join(', ')}</span>
        </div>
      </div>

      <div className="prose prose-stone prose-sm mb-6">
        <p className="leading-relaxed text-stone-700">
          {data.reason}
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-stone-500 border-t border-stone-200 pt-4 mt-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>Best for: {data.occasion}</span>
      </div>
    </div>
  );
};
