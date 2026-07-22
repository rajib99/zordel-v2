import { Layers, HelpCircle, Activity, Play, CheckCircle2, ChevronRight, Eye, ArrowUpRight, Cpu } from 'lucide-react';
import { useState } from 'react';
import { CASE_STUDIES } from '../data';
import { CaseStudy } from '../types';

export default function CaseStudiesView() {
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string>('enterprise-rag-finance');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('5');
  const [industryFilter, setIndustryFilter] = useState<string>('All');

  const activeCaseStudy = CASE_STUDIES.find(cs => cs.id === activeCaseStudyId) || CASE_STUDIES[0];
  const activeNode = activeCaseStudy.architecture.nodes.find(n => n.id === selectedNodeId) || activeCaseStudy.architecture.nodes[4];

  const industries = ['All', 'Finance', 'Manufacturing', 'Healthcare', 'Retail'];

  const filteredCaseStudies = industryFilter === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(cs => cs.industry === industryFilter);

  const handleCaseStudyChange = (id: string) => {
    setActiveCaseStudyId(id);
    // Auto-select a process or AI node when switching
    const study = CASE_STUDIES.find(cs => cs.id === id);
    if (study) {
      // Find the first 'ai' type node or fall back to the first node
      const aiNode = study.architecture.nodes.find(n => n.type === 'ai') || study.architecture.nodes[0];
      setSelectedNodeId(aiNode.id);
    }
  };

  const getNodeColor = (type: string, isSelected: boolean) => {
    if (isSelected) return 'bg-indigo-600 text-white border-indigo-700 ring-4 ring-indigo-100 shadow-md';
    switch (type) {
      case 'input': return 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200';
      case 'process': return 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100';
      case 'ai': return 'bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100';
      case 'output': return 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const getNodeTypeBadge = (type: string) => {
    switch (type) {
      case 'input': return 'Data Source / Ingestion';
      case 'process': return 'ETL Processing Layer';
      case 'ai': return 'Model/AI Decision Node';
      case 'output': return 'System Output / Integration';
      default: return 'Middleware';
    }
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-300" id="case-studies-view-root">
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900">
          AI Deployment <span className="text-indigo-600">Case Studies</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-light">
          Deep-dives into real-world architectures I’ve engineered and shipped into production. Click on any case study, and interact with the blueprint mapping to explore the inner technical pipelines.
        </p>
      </section>

      {/* Industry Filter Controls */}
      <section className="flex flex-wrap items-center justify-center gap-2" id="industry-filter-container">
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => setIndustryFilter(ind)}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full border transition-all duration-150 ${
              industryFilter === ind
                ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {ind}
          </button>
        ))}
      </section>

      {/* Main Grid: Selection and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Case Study List */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Select a Deployment Case Study ({filteredCaseStudies.length})
          </span>
          
          <div className="space-y-3" id="case-studies-selector-list">
            {filteredCaseStudies.length === 0 ? (
              <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-sm text-slate-500">
                No case studies found for this industry filter.
              </div>
            ) : (
              filteredCaseStudies.map((cs) => {
                const isActive = cs.id === activeCaseStudyId;
                return (
                  <button
                    key={cs.id}
                    id={`case-study-btn-${cs.id}`}
                    onClick={() => handleCaseStudyChange(cs.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-50/60'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50 shadow-xs'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {cs.industry}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-medium">2025 Deployment</span>
                    </div>

                    <h4 className="font-display font-bold text-base text-slate-900 leading-tight mt-2.5">
                      {cs.title}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 font-sans">
                      {cs.tagline}
                    </p>

                    <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-4 text-xs font-semibold text-indigo-600">
                      <span>Explore Technical Blueprint</span>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'translate-x-1' : ''}`} />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Active Case Study Detail and Interactive Blueprint */}
        <div className="lg:col-span-8 space-y-8" id="case-study-detail-container">
          
          {/* Top Overview Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                  {activeCaseStudy.industry} Case Study
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Client: {activeCaseStudy.clientName}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 leading-tight">
                {activeCaseStudy.title}
              </h2>
              <p className="text-sm text-slate-500 italic font-medium">
                "{activeCaseStudy.tagline}"
              </p>
            </div>

            {/* Impact Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-100">
              {activeCaseStudy.impactMetrics.map((met, idx) => (
                <div key={idx} className="space-y-1 text-center sm:text-left">
                  <div className="font-display font-black text-xl sm:text-2xl text-emerald-600 leading-none flex items-center justify-center sm:justify-start space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{met.value}</span>
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-800 font-bold">
                    {met.label}
                  </div>
                  <p className="text-[11px] text-slate-500 font-sans leading-tight">
                    {met.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Narrative: Challenge and Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600 font-sans font-light">
              <div className="space-y-2 border-l-2 border-amber-500 pl-4 bg-amber-50/10 p-3 rounded-r-lg">
                <h5 className="font-display font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">The Challenge</h5>
                <p>{activeCaseStudy.challenge}</p>
              </div>
              <div className="space-y-2 border-l-2 border-indigo-500 pl-4 bg-indigo-50/10 p-3 rounded-r-lg">
                <h5 className="font-display font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">The Engineering Solution</h5>
                <p>{activeCaseStudy.solution}</p>
              </div>
            </div>
          </div>

          {/* SECTION: Interactive System Architecture Blueprint Explorer */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Interactive Deployment Blueprint
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mt-1">
                Data Pipeline & Model Orchestration Map
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Each node below represents a physical container, cloud-triggered pipeline, or model-inference checkpoint. Click on any node to view input schemas, model hyperparameters, and automated exception safeguards.
              </p>
            </div>

            {/* Blueprint Grid Canvas */}
            <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-4 sm:p-6 overflow-x-auto" id="blueprint-canvas-wrapper">
              <div className="min-w-[640px] space-y-8 py-2 relative">
                
                {/* Node Row Map */}
                <div className="grid grid-cols-6 gap-3 relative z-10">
                  {activeCaseStudy.architecture.nodes.map((node) => {
                    const isSelected = node.id === selectedNodeId;
                    return (
                      <button
                        key={node.id}
                        id={`blueprint-node-${node.id}`}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`p-3 rounded-lg border text-left flex flex-col justify-between aspect-square transition-all duration-200 outline-none text-xs ${getNodeColor(node.type, isSelected)}`}
                      >
                        <div className="flex justify-between items-start w-full">
                          <span className="font-mono text-[9px] font-bold opacity-60">
                            0{node.id}
                          </span>
                          <span className="font-mono text-[8px] uppercase font-bold tracking-wider opacity-80 scale-95 origin-right">
                            {node.type}
                          </span>
                        </div>

                        <span className="font-display font-bold leading-tight block text-[10px] sm:text-xs mt-2 line-clamp-3">
                          {node.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Simulated visual routing vectors (connecting lines) */}
                <div className="absolute top-[52px] left-0 right-0 h-0.5 border-t border-dashed border-slate-300 pointer-events-none z-0" />
              </div>
            </div>

            {/* Dynamic Node Detail Card */}
            <div className="border border-slate-150 rounded-xl p-5 bg-slate-50/50 space-y-4" id="node-parameter-display">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-3 gap-2">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-mono font-bold flex items-center justify-center">
                    0{activeNode.id}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900 leading-none">{activeNode.label}</h4>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block font-medium">
                      {getNodeTypeBadge(activeNode.type)}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono font-medium text-slate-600">
                  <Activity className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                  <span>State: Active</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs font-mono text-slate-700">
                {/* Objective Description */}
                <div className="md:col-span-4 space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Node Capability</span>
                  <p className="font-sans font-light leading-relaxed text-slate-600 text-xs">
                    {activeNode.description}
                  </p>
                </div>

                {/* Input Schema / Hardware Parameters */}
                <div className="md:col-span-4 space-y-2 bg-white p-3 rounded border border-slate-100 shadow-3xs">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Runtime Specifications</span>
                  {activeNode.type === 'ai' ? (
                    <ul className="space-y-1 text-[10px]">
                      <li><span className="text-indigo-600">Model:</span> Gemini-2.5-Flash</li>
                      <li><span className="text-indigo-600">Temperature:</span> 0.0 (Strict deterministic)</li>
                      <li><span className="text-indigo-600">Max Tokens:</span> 2,048</li>
                      <li><span className="text-indigo-600">Format:</span> JSON Schema Enforced</li>
                    </ul>
                  ) : activeNode.type === 'input' ? (
                    <ul className="space-y-1 text-[10px]">
                      <li><span className="text-slate-600">Source:</span> TLS-encrypted Webhook / DB</li>
                      <li><span className="text-slate-600">Schema:</span> Avro / JSON binary</li>
                      <li><span className="text-slate-600">Frequency:</span> Dynamic Batch</li>
                    </ul>
                  ) : activeNode.type === 'process' ? (
                    <ul className="space-y-1 text-[10px]">
                      <li><span className="text-amber-600">Runtime:</span> Node.js / Python AWS Lambda</li>
                      <li><span className="text-amber-600">Memory limit:</span> 1024 MB</li>
                      <li><span className="text-amber-600">Average duration:</span> 240 ms</li>
                    </ul>
                  ) : (
                    <ul className="space-y-1 text-[10px]">
                      <li><span className="text-emerald-600">Integration:</span> PostgreSQL DB / Webhooks</li>
                      <li><span className="text-emerald-600">Auth:</span> OAuth Bearer Session</li>
                      <li><span className="text-emerald-600">Audit Status:</span> Compliant</li>
                    </ul>
                  )}
                </div>

                {/* Error Safeguards */}
                <div className="md:col-span-4 space-y-2 bg-white p-3 rounded border border-slate-100 shadow-3xs">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Exception Safeguards</span>
                  {activeNode.type === 'ai' ? (
                    <div className="text-[10px] space-y-1">
                      <p className="text-slate-600"><span className="text-red-500 font-bold">Guard:</span> Hallucination parsing guard filter.</p>
                      <p className="text-slate-600"><span className="text-red-500 font-bold">Fallback:</span> Direct retry on json formatting error.</p>
                    </div>
                  ) : (
                    <div className="text-[10px] space-y-1">
                      <p className="text-slate-600"><span className="text-red-500 font-bold">Retry policy:</span> Exponential backoff 3x.</p>
                      <p className="text-slate-600"><span className="text-red-500 font-bold">Alert:</span> PagerDuty warning if queues exceed 15s.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
