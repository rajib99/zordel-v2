import { Check, Flame, ArrowRight, ShieldAlert, Sparkles, Clock, Compass, FileText, Settings } from 'lucide-react';
import { useState } from 'react';
import { SERVICE_TIERS, METHODOLOGY_STEPS } from '../data';

interface ServicesProps {
  onNavigate: (tabId: string) => void;
}

export default function ServicesView({ onNavigate }: ServicesProps) {
  const [selectedTier, setSelectedTier] = useState<string>('tier-blueprint');
  const [activeStep, setActiveStep] = useState<number>(0);

  const stepIcons = [
    <Compass className="w-5 h-5 text-indigo-600" />,
    <FileText className="w-5 h-5 text-indigo-600" />,
    <Settings className="w-5 h-5 text-indigo-600" />,
    <Sparkles className="w-5 h-5 text-indigo-600" />
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-300" id="services-view-root">
      {/* Intro Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900">
          Services, Pricing & <span className="text-indigo-600">Methodology</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-light">
          Bespoke expert consulting with clear boundaries, fixed fees, and complete transparency. No hidden support markups or bloated advisory hours—just top-tier engineering that delivers concrete, audited results.
        </p>
      </section>

      {/* Pricing Table Section */}
      <section className="space-y-8">
        <div className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Consulting Engagement Tiers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SERVICE_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <div
                key={tier.id}
                id={`tier-card-${tier.id}`}
                onClick={() => setSelectedTier(tier.id)}
                className={`flex flex-col justify-between p-6 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                  isSelected
                    ? 'border-indigo-600 bg-white ring-2 ring-indigo-50 shadow-md transform -translate-y-1'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {/* Badge Indicator */}
                {tier.badge && (
                  <span className="absolute -top-3 left-4 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-mono font-bold rounded-full uppercase tracking-wider border border-indigo-100">
                    {tier.badge}
                  </span>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-lg text-slate-900 leading-snug">{tier.name}</h4>
                    <p className="text-xs text-slate-400 font-mono font-medium">{tier.methodologyStep}</p>
                  </div>

                  <div className="flex items-baseline space-x-1 border-b border-slate-100 pb-4">
                    <span className="text-3xl font-display font-black text-slate-900">{tier.price}</span>
                    <span className="text-xs text-slate-500 font-sans">/ {tier.period}</span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {tier.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">What is included:</p>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {tier.features.slice(0, 4).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
                  <div className="bg-slate-50 rounded p-3 text-[10px] text-slate-500 italic">
                    <span className="font-bold text-slate-700 uppercase block not-italic text-[9px] font-mono tracking-wider mb-0.5">Best Suited For:</span>
                    {tier.suitability}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('contact');
                    }}
                    className={`w-full py-2.5 px-3 text-[10px] font-bold uppercase tracking-widest rounded-lg text-center transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Request Engagement
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Methodology Section (Timeline Process) */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Timeline Nav Column */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 font-bold">The Delivery Pipeline</span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mt-1">
                My Consulting Methodology
              </h3>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
              Deploying production AI models requires rigorous quality gating. I split engagements into distinct, logical phases, ensuring we de-risk the investment at every step. Click on the steps to see the exact deliverables and timelines.
            </p>

            <div className="space-y-2 pt-2">
              {METHODOLOGY_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  id={`method-step-btn-${idx}`}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all ${
                    activeStep === idx
                      ? 'bg-indigo-50 border border-indigo-100 text-indigo-700 shadow-sm'
                      : 'border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="font-mono text-sm font-black text-indigo-600/60 w-6">
                    {step.step}
                  </span>
                  <div className="flex-1">
                    <h5 className="font-display font-bold text-xs sm:text-sm leading-none">{step.title}</h5>
                    <span className="text-[10px] font-mono text-slate-400">{step.duration}</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${activeStep === idx ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Active Display Block */}
          <div className="lg:col-span-8 bg-slate-50/60 border border-slate-100 rounded-xl p-6 sm:p-8 space-y-6 min-h-[300px] flex flex-col justify-between" id="methodology-active-detail">
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300" key={activeStep}>
              <div className="flex justify-between items-start">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-slate-100 rounded-md shadow-sm">
                  {stepIcons[activeStep]}
                  <span className="font-mono text-xs font-bold text-slate-700">Phase {METHODOLOGY_STEPS[activeStep].step}</span>
                </div>
                <span className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {METHODOLOGY_STEPS[activeStep].duration}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                {METHODOLOGY_STEPS[activeStep].title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-light">
                {METHODOLOGY_STEPS[activeStep].description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Guaranteed Phase Deliverables:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {METHODOLOGY_STEPS[activeStep].deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="bg-white border border-slate-100 rounded p-3 text-xs font-mono text-slate-700 shadow-2xs flex items-start space-x-1.5">
                      <span className="text-indigo-600 mt-0.5 font-bold">✓</span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans">
              <div className="flex items-center space-x-2 text-slate-500">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Next workshop slots open next Monday.</span>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center space-x-1 font-mono font-bold text-indigo-600 hover:text-indigo-800"
              >
                <span>Schedule pre-kickoff discovery call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Compliance / Integration Trust Banner */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6" id="compliance-trust-banner">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-slate-800 font-display font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            <span>Strict Security & HIPAA Data Protocols</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            All code repositories reside strictly within your virtual private cloud (VPC) or local enterprise environments. I sign mandatory corporate Non-Disclosure Agreements (NDAs), support air-gapped system deployments, and configure zero-retention parameters for public models to ensure your data is never compiled or leaked.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-lg transition-colors flex-shrink-0"
        >
          Request Custom NDA Setup
        </button>
      </section>
    </div>
  );
}
