import { ReactNode } from 'react';

export const LEGAL_LAST_UPDATED = 'September 28, 2026';

interface LegalLayoutProps {
  title: string;
  intro: ReactNode;
  sections: { heading: string; body: ReactNode }[];
}

export default function LegalLayout({ title, intro, sections }: LegalLayoutProps) {
  return (
    <article className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-300">
      <header className="space-y-3 border-b border-slate-200 pb-8">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900">{title}</h1>
        <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Last updated: {LEGAL_LAST_UPDATED}</p>
        <div className="text-sm sm:text-base text-slate-600 leading-relaxed">{intro}</div>
      </header>

      {sections.map((section, i) => (
        <section key={section.heading} className="space-y-3">
          <h2 className="text-lg sm:text-xl font-display font-bold text-slate-900">
            {i + 1}. {section.heading}
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
            {section.body}
          </div>
        </section>
      ))}
    </article>
  );
}
