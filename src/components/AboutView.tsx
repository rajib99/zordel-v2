import { Award, ShieldCheck, Zap, Briefcase, ChevronLeft, ChevronRight, Star, GraduationCap, Building } from 'lucide-react';
import { useState } from 'react';
import { TESTIMONIALS } from '../data';

interface AboutProps {
  onNavigate: (tabId: string) => void;
}

export default function AboutView({ onNavigate }: AboutProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stats = [
    { value: '10+', label: 'Years in Applied ML', desc: 'Transitioning models from academic code to server clusters.' },
    { value: '45+', label: 'Custom Deployments', desc: 'Active production pipelines in finance, logistics, and medical setups.' },
    { value: '$8M+', label: 'Client Costs Saved', desc: 'Direct, audited operating expense and headcount savings.' },
    { value: '99.9%', label: 'API Uptime Target', desc: 'Rigorous engineering with automated error fallback loops.' }
  ];

  const technologies = {
    'Generative AI & Orches.': ['Gemini 2.5/1.5 Suite', 'LangChain', 'LlamaIndex', 'Structured JSON Output schemas', 'Autogen Agents'],
    'Vector & Search DBs': ['PGVector', 'Pinecone', 'Qdrant', 'Milvus', 'BM25 Hybrid Retrieval', 'Re-ranker Models'],
    'Vision & Edge Deployment': ['PyTorch / TensorFlow', 'YOLO Edge Detection', 'NVIDIA Jetson Modules', 'OpenCV SDK', 'DeepStream'],
    'Cloud MLOps & Infra': ['AWS (GovCloud, SageMaker)', 'Google Cloud Platform (Vertex AI)', 'Docker Containers', 'FastAPI & Express Middleware', 'Sentry Error Logging']
  };

  const experienceList = [
    {
      year: '2025 - Present',
      role: 'Principal AI Consultant & Advisor',
      company: 'Zordel Consulting',
      desc: 'Architecting bespoke AI systems for growth-stage and Fortune 500 enterprises. Specializing in secure private RAG frameworks, high-speed computer vision systems on edge hardware, and strategic C-suite alignment.'
    },
    {
      year: '2022 - 2025',
      role: 'Lead ML Integration Architect',
      company: 'NeuraFlow Enterprise Solutions',
      desc: 'Directed a team of 8 backend and ML engineers. Designed core RAG intelligence layers and customer triage neural-classification engines that processed 500k queries daily, slashing average manual handle times by 65%.'
    },
    {
      year: '2016 - 2020',
      role: 'Senior Applied AI Researcher & Engineer',
      company: 'AeroSystems Autonomous Labs',
      desc: 'Developed edge-based object localization algorithms for hardware-constrained sensor rigs. Deployed visual inspect modules across aerospace supply chains.'
    }
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-300" id="about-view-root">
      {/* Hero Narrative Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-xs font-mono font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>Senior AI System Integration Expert</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1]" id="hero-title">
            Bridging High-Fidelity <span className="text-indigo-600">AI Architecture</span> with Direct Business Value.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 font-sans font-light leading-relaxed max-w-2xl">
            I help modern enterprises audit existing capabilities, design secure multi-modal prototypes, and deploy production-grade machine learning models that automate complex manual workflows and drive million-dollar operational savings.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('tools')}
              className="px-6 py-3 font-medium text-white bg-slate-900 hover:bg-indigo-600 rounded-lg transition-all duration-150 text-sm font-bold uppercase tracking-widest"
              id="hero-cta-diagnostic"
            >
              Test Your AI Readiness
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="px-6 py-3 font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-all duration-150 text-sm font-bold uppercase tracking-widest"
              id="hero-cta-services"
            >
              Explore Services
            </button>
          </div>
        </div>

        {/* Minimalist Profile Graphics Block */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[340px] aspect-square rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between shadow-sm overflow-hidden group">
            {/* Simulated Senior Profile Badge Card */}
            <div className="relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-display font-bold text-lg">
                AZ
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900 text-xl leading-snug">Alex Zordel</h3>
                <p className="text-xs font-mono text-indigo-600 font-bold">Principal AI Consultant</p>
              </div>
            </div>

            <div className="relative z-10 bg-white border border-slate-150 rounded-xl p-4 space-y-3.5 shadow-sm">
              <div className="flex items-center space-x-2 text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Credentials</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Stanford CS Master’s (Computer Science)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Ex-Lead ML Architect, NeuraFlow</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>HIPAA & SOC-2 compliance specialist</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="border-t border-b border-slate-200/80 py-10 bg-slate-50/50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 text-center sm:text-left" id={`stat-${idx}`}>
              <div className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-indigo-600 tracking-tight">
                {stat.value}
              </div>
              <div className="font-display font-bold text-xs sm:text-sm text-slate-800 tracking-wide uppercase">
                {stat.label}
              </div>
              <p className="text-xs text-slate-500 max-w-[240px] mx-auto sm:mx-0 font-sans font-light">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy & Experience Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Core Principles */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
            Consulting Philosophy
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            AI should never be implemented as a luxury toy or a buzzword initiative. True engineering excellence means selecting models purely based on practical constraints—such as system latency, parameter size, and licensing fees—and tying outputs back to quantifiable operational gains.
          </p>

          <div className="space-y-4">
            <div className="flex space-x-3 p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900">Cost-First Model Selection</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Why use a heavy, costly model when a lightweight fine-tuned edge classifier or a prompt-optimized model handles the job at a fraction of the cost? I prioritize cost-efficiency.
                </p>
              </div>
            </div>

            <div className="flex space-x-3 p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900">Zero Leakage Privacy Guard</h4>
                <p className="text-xs text-slate-500 mt-1">
                  In health and financial sectors, protecting intellectual property is paramount. I construct private, air-gapped data extraction boundaries and zero-data-retention pipeline proxies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
            Professional Experience
          </h2>
          <div className="relative border-l border-slate-200 pl-6 ml-2 space-y-8" id="experience-timeline">
            {experienceList.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-indigo-600 bg-white group-hover:bg-indigo-600 transition-colors duration-150" />
                <span className="text-xs font-mono text-indigo-600 font-medium">{exp.year}</span>
                <h4 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-snug mt-1">
                  {exp.role} <span className="font-normal text-slate-400">@</span> {exp.company}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-sans mt-2 leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Tech Matrix */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight text-center">
          Verified Technology Stack
        </h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center">
          I maintain rigorous, direct code level proficiency across the following technical layers. No third-party middleware proxies; pure native integrations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {Object.entries(technologies).map(([category, items], colIdx) => (
            <div key={category} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4 hover:border-slate-300 transition-colors" id={`tech-category-${colIdx}`}>
              <h4 className="font-display font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                <span>{category}</span>
                <span className="text-[10px] font-mono text-slate-400">0{colIdx + 1}</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {items.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-slate-50 text-slate-700 rounded text-[11px] font-mono border border-slate-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Block */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden" id="testimonial-section">
        {/* Abstract vector asset */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="flex justify-center space-x-1">
            {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <p className="text-lg sm:text-xl font-display italic font-light leading-relaxed text-slate-200">
            "{TESTIMONIALS[activeTestimonial].content}"
          </p>

          <div>
            <h4 className="font-display font-bold text-base text-white leading-none">
              {TESTIMONIALS[activeTestimonial].name}
            </h4>
            <p className="text-xs text-slate-400 mt-1.5">
              {TESTIMONIALS[activeTestimonial].role} <span className="text-indigo-400">@</span> {TESTIMONIALS[activeTestimonial].company}
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4 pt-4">
            <button
              onClick={handlePrevTestimonial}
              className="p-1.5 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-white transition-colors"
              id="testimonial-prev-btn"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-500">
              {activeTestimonial + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={handleNextTestimonial}
              className="p-1.5 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-white transition-colors"
              id="testimonial-next-btn"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Client Accents */}
      <section className="space-y-4 text-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          Selected Organizations I’ve Consulted & Designed For
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 grayscale hover:opacity-80 transition-opacity duration-300">
          <div className="flex items-center space-x-1.5 font-display font-bold text-slate-700 text-sm tracking-tight">
            <Building className="w-4 h-4" />
            <span>Apex Global Capital</span>
          </div>
          <div className="flex items-center space-x-1.5 font-display font-bold text-slate-700 text-sm tracking-tight">
            <ShieldCheck className="w-4 h-4" />
            <span>MedAlign Health Networks</span>
          </div>
          <div className="flex items-center space-x-1.5 font-display font-bold text-slate-700 text-sm tracking-tight">
            <Zap className="w-4 h-4" />
            <span>PrecisionAuto Systems</span>
          </div>
          <div className="flex items-center space-x-1.5 font-display font-bold text-slate-700 text-sm tracking-tight">
            <GraduationCap className="w-4 h-4" />
            <span>TrendFront Logistics</span>
          </div>
        </div>
      </section>
    </div>
  );
}
