import { CaseStudy, ServiceTier, Project, Testimonial, DiagnosticQuestion } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'enterprise-rag-finance',
    title: 'Enterprise Knowledge Synthesis Engine',
    clientName: 'Apex Global Capital',
    industry: 'Finance',
    tagline: 'Transitioning 10,000 Analysts from Manual Document Audits to 1-Click Synthesized Intelligence',
    overview: 'Designed and deployed an enterprise-grade Retrieval-Augmented Generation (RAG) platform to securely ingest, parse, and semantically search across 2 million multi-format analyst reports, SEC filings, and investment prospectus sheets.',
    challenge: 'Apex Global Capital’s analysts spent an average of 14 hours per week manually searching for critical compliance clauses, balance sheet metrics, and management commentary in dense 200+ page PDFs. Their requirements included zero external data leakage, strict source-citation mapping, and high-fidelity extraction of complex nested tables.',
    solution: 'Engineered a highly resilient multi-stage RAG pipeline. Utilized advanced PDF parsing layout-analyzers to extract complex text and tabular data cleanly. Implemented a hybrid retrieval engine (dense embeddings + BM25 keyword matching) backed by a Cross-Encoder Re-ranker. Deployed Gemini model reasoning via structured JSON schemas, forcing the model to explicitly cite precise page ranges and section headers for every claim.',
    impactMetrics: [
      { label: 'Research Efficiency', value: '85%', description: 'Reduction in manual compliance auditing time.' },
      { label: 'Accuracy Rating', value: '99.4%', description: 'Factual retrieval score with verifiable source citation.' },
      { label: 'Annualized Value', value: '$1.4M', description: 'Labor hour savings and compliance penalty mitigation.' }
    ],
    architecture: {
      nodes: [
        { id: '1', label: 'PDF Documents / SEC Filings', type: 'input', description: 'Ingestion of 2M+ unstructured multi-page documents.' },
        { id: '2', label: 'Unstructured Table Parser', type: 'process', description: 'Advanced OCR & structural layout analyzer separating text from nested tables.' },
        { id: '3', label: 'Dense Vector & Keyword Ingestion', type: 'process', description: 'Slices text chunks into 512-token overlap intervals, indexed in PGVector.' },
        { id: '4', label: 'Cross-Encoder Re-ranker', type: 'ai', description: 'Sorts top 30 retrieved chunks down to top 5 based on true semantic matching.' },
        { id: '5', label: 'Gemini Contextual Synthesizer', type: 'ai', description: 'Synthesizes answer with strict schema enforcement, generating JSON with text and list of citations.' },
        { id: '6', label: 'Secured Analyst Hub', type: 'output', description: 'Clean user frontend displaying answer alongside PDF viewer locked to cited page.' }
      ],
      edges: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4', label: 'Retrieval query' },
        { from: '4', to: '5', label: 'Top 5 Context chunks' },
        { from: '5', to: '6', label: 'JSON response with citation' }
      ]
    }
  },
  {
    id: 'edge-defect-manufacturing',
    title: 'AI Edge Computer Vision Inspector',
    clientName: 'PrecisionAuto Systems',
    industry: 'Manufacturing',
    tagline: 'Automating Micro-Crack Defect Isolation at 3 Units per Second on Active Assembly Lines',
    overview: 'Implemented an elite hybrid edge-and-cloud multi-modal computer vision inspection system across three automotive cast parts manufacturing lines, preventing defective structural items from entering assembly.',
    challenge: 'Human inspectors missed up to 6% of micro-cracks (less than 0.2mm) due to visual fatigue. Hardware vibration, changing ambient factory illumination, and part speed (3 units/sec) meant conventional threshold-based vision systems failed, producing over 15% false positive rejection rates.',
    solution: 'Designed an edge-computing solution utilizing NVIDIA Jetson AGX Orin modules stationed directly on the line. Trained custom high-speed convolutional neural networks (YOLO-based) for real-time localization of surface anomalies. Developed a cloud-based backup verification loop: anomalous edge images are instantly proxied to a server-side Gemini multi-modal model to classify Border Cases, keeping the edge pipeline operational without halting production.',
    impactMetrics: [
      { label: 'Escaped Defect Rate', value: '0.12%', description: 'Down from 6% with manual inspections.' },
      { label: 'False Positives', value: '-91%', description: 'Reduction in false-positive line stoppages.' },
      { label: 'Scrap Savings', value: '$820k', description: 'Annual savings from salvaged parts and less downtime.' }
    ],
    architecture: {
      nodes: [
        { id: '1', label: '4K High-Speed Industrial Camera', type: 'input', description: 'Captures high-contrast imagery under synchronized strobe lighting.' },
        { id: '2', label: 'Jetson Edge Inferencing', type: 'process', description: 'Runs custom localized YOLO-CNN under 45ms latency.' },
        { id: '3', label: 'Conveyor Sorting Gate', type: 'output', description: 'Pneumatic actuator instantly diverts 100% confirmed defects.' },
        { id: '4', label: 'Cloud Broker & Queue', type: 'process', description: 'Streams marginal or low-confidence images to verification queue.' },
        { id: '5', label: 'Gemini Vision Analyzer', type: 'ai', description: 'Processes high-fidelity crop to classify structural risk and refine edge weights.' },
        { id: '6', label: 'Central Quality Dashboard', type: 'output', description: 'Displays defect metrics, heatmaps, and active performance charts.' }
      ],
      edges: [
        { from: '1', to: '2' },
        { from: '2', to: '3', label: 'Direct Reject' },
        { from: '2', to: '4', label: 'Low confidence' },
        { from: '4', to: '5' },
        { from: '5', to: '6', label: 'Label update' }
      ]
    }
  },
  {
    id: 'clinical-intake-healthcare',
    title: 'HIPAA-Compliant Patient Intake Engine',
    clientName: 'MedAlign Health Networks',
    industry: 'Healthcare',
    tagline: 'Reducing Doctor Documentation Burden by Automatically Compiling Consultation Transcripts into EHR SOAP Notes',
    overview: 'Developed a stateful clinical transcription and translation pipeline that captures pre-visit conversations, extracts medical terminology, and automatically populates electronic health records.',
    challenge: 'Physicians spent an average of 3.2 hours per day compiling clinical SOAP (Subjective, Objective, Assessment, Plan) notes. This heavy administrative burden led to doctor burnout and reduced patient engagement during visits. The solution required absolute compliance with HIPAA data governance.',
    solution: 'Deployed a serverless transcription pipeline using an advanced medical-tuned speech-to-text transcriber with speaker-diarization. Built a custom pipeline running on AWS GovCloud. Used Gemini models with strict JSON system schemas to identify clinical complaints, review of systems, historical medication records, and proposed treatment plans, matching them automatically to official ICD-10 medical diagnostic codes.',
    impactMetrics: [
      { label: 'Time Saved per Visit', value: '12 Mins', description: 'Recovered for direct patient interaction.' },
      { label: 'EHR Intake Accrual', value: '94%', description: 'Note completion within 1 hour of patient departure.' },
      { label: 'Provider Satisfaction', value: '92%', description: 'Doctors reporting lower charting stress levels.' }
    ],
    architecture: {
      nodes: [
        { id: '1', label: 'Tablet Voice Capture', type: 'input', description: 'Dual-mic system record of consultation room conversation.' },
        { id: '2', label: 'GovCloud Transcription', type: 'process', description: 'Transcribes audio to text with native speaker separation.' },
        { id: '3', label: 'Entity Extractor API', type: 'process', description: 'Scans text for clinical terms, doses, and symptoms.' },
        { id: '4', label: 'Gemini SOAP Structurer', type: 'ai', description: 'Arranges disjointed dialogue into standardized professional SOAP note format.' },
        { id: '5', label: 'ICD-10 Code Classifier', type: 'ai', description: 'Maps clinical diagnoses automatically to compliant billing codes.' },
        { id: '6', label: 'Epic / Cerner EHR Writeback', type: 'output', description: 'Direct API injection into patient chart for doctor signature.' }
      ],
      edges: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
        { from: '4', to: '5' },
        { from: '5', to: '6' }
      ]
    }
  },
  {
    id: 'logistics-forecaster-retail',
    title: 'Dynamic Demand & Routing Optimizer',
    clientName: 'TrendFront Logistics',
    industry: 'Retail',
    tagline: 'Replacing Legacy Spreadsheet Forecasting with Dynamic Forecasting and Automated Warehousing Routes',
    overview: 'Re-engineered the inventory replenishment system for a 420-location retail chain, using weather, market trends, and historic sales to optimize delivery schedules.',
    challenge: 'TrendFront lost $3.1M annually in stockouts on trendy items and wasted $1.8M in holding costs on slow inventory. Their spreadsheet-based demand forecasting was highly manual, reactive, and struggled to account for sudden localized anomalies like weather changes or digital fashion viral trends.',
    solution: 'Designed and deployed a Temporal Fusion Transformer forecasting model. Integrated external real-time variables, including county-level weather forecasts, Google Trends index data, and local marketing event calendars. Tied the prediction outputs to an automated routing optimizer that calculated daily ideal warehouse-to-store delivery routes, shifting inventory before demand spikes occurred.',
    impactMetrics: [
      { label: 'Stockout Incidents', value: '-31%', description: 'Ensuring top items are always in-store.' },
      { label: 'Inventory Holding', value: '-18%', description: 'Reduction in average warehouse duration.' },
      { label: 'Net Annual Profit', value: '+$2.1M', description: 'Increase in top-line revenue and fuel optimization.' }
    ],
    architecture: {
      nodes: [
        { id: '1', label: 'ERP Stock & POS Logs', type: 'input', description: 'Hourly inventory levels and sales data from 420 stores.' },
        { id: '2', label: 'External Trend Aggregator', type: 'input', description: 'Gathers local weather metrics, localized events, and social indexes.' },
        { id: '3', label: 'Temporal Transformer Engine', type: 'ai', description: 'Predicts demand for 10k SKU items across next 14 days.' },
        { id: '4', label: 'Safety-Stock Estimator', type: 'process', description: 'Calculates dynamic warehouse buffer thresholds.' },
        { id: '5', label: 'Fleet Route Optimizer', type: 'process', description: 'Drafts optimal daily delivery routes using genetic path-finding.' },
        { id: '6', label: 'Dispatch Manifest', type: 'output', description: 'Hands driver-ready route instructions to regional logistics hubs.' }
      ],
      edges: [
        { from: '1', to: '3' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
        { from: '4', to: '5' },
        { from: '5', to: '6' }
      ]
    }
  }
];

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: 'tier-discovery',
    name: 'AI Discovery Workshop & Roadmap',
    price: '$2,500',
    period: 'Flat fee',
    badge: 'Strategic Alignment',
    description: 'An intensive, structured consulting engagement designed to identify high-impact AI opportunities, audit your data readiness, and establish a clear implementation blueprint.',
    features: [
      '4-Hour intensive collaborative workshop with leadership',
      'Exhaustive audit of current data lakes, schemas, and pipelines',
      '3 complete use-case blueprints matching business value to technical feasibility',
      'Realistic development timeline and projected multi-year ROI model',
      'Clear evaluation criteria for choosing custom build vs. SaaS API integrations'
    ],
    suitability: 'Ideal for executives and product leaders looking to transition from generalized AI hype to practical, high-value implementations with defined business cases.',
    methodologyStep: 'Phase 1: Discovery & Audit'
  },
  {
    id: 'tier-blueprint',
    name: 'AI Feasibility & Technical Prototype',
    price: '$12,500',
    period: 'Per project (3-4 weeks)',
    badge: 'Most Popular',
    description: 'A deep-dive technical blueprint. We conduct data schema tests, build an interactive working mock/proof-of-concept (PoC), and draft the production architecture specifications.',
    features: [
      'Interactive custom prototype utilizing Gemini API with your sample dataset',
      'Rigorous data extraction and embedding pipeline verification test',
      'Custom LLM parameter tuning and prompt engineering optimization study',
      'Comprehensive security, privacy, and compliance review (SOC2 / HIPAA / GDPR)',
      'Detailed API interface schemas and complete production deployment blueprint'
    ],
    suitability: 'Perfect for organizations ready to commit capital to a specific AI solution and requiring a functional prototype and clear specification before full-scale build.',
    methodologyStep: 'Phase 2: Feasibility & Prototyping'
  },
  {
    id: 'tier-implementation',
    name: 'Besoke AI Implementation & Launch',
    price: '$22,000',
    period: 'Monthly Retainer (3-6 mo. typical)',
    badge: 'Full-Scale Engineering',
    description: 'Full-scale developer engineering led by Alex. We build, integrate, and deploy custom production-grade AI applications, RAG pipelines, or vision engines into your environment.',
    features: [
      'Direct technical leadership and engineering of all AI middleware APIs',
      'Setup of robust database vector indexing (PGVector, Pinecone, Qdrant)',
      'Integration of model logging, audit trails, and data safety guardrails',
      'Complete React/Vite/Express user dashboard and core system integration',
      'Comprehensive developer handoff, team training, and 30-day post-launch support'
    ],
    suitability: 'For organizations with complex requirements demanding premium senior expertise to build and deploy highly secure custom AI systems into production.',
    methodologyStep: 'Phase 3: Production Build & Pilot'
  },
  {
    id: 'tier-advisory',
    name: 'Fractional Chief AI Officer (CAIO)',
    price: '$7,500',
    period: 'Monthly Retainer (Ongoing)',
    badge: 'Continuous Advantage',
    description: 'Strategic advisory, continuous model performance optimization, API cost management audits, and high-level representation at board and stakeholder meetings.',
    features: [
      '12 hours of dedicated high-level strategic/technical advisory per month',
      'Bi-weekly codebase performance reviews, cost audit, and model prompt refactoring',
      'Strategic advisory on emerging open-source and proprietary foundation models',
      'Board-level AI capability reports and competitive marketplace intelligence',
      'Priority emergency SLA for critical production system incidents'
    ],
    suitability: 'Perfect for companies with active development teams who need senior expert oversight to direct strategy, review code, and prevent costly design errors.',
    methodologyStep: 'Phase 4: Optimization & Governance'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Multi-Modal Inventory Estimator',
    client: 'LogisTech Warehousing',
    year: '2025',
    tags: ['Vision-Language Models', 'Edge Devices', 'Supply Chain'],
    description: 'Deployed multi-modal vision-language agents in high-volume shipping corridors to autonomously verify item counts and match volumetric shipping dimensions directly against digital manifest logs, bypassing manual physical measuring tapes.',
    outcomeMetric: '99.1% Scan Accuracy',
    outcomeDetail: 'Replaced manual logistics auditing, resulting in a 34-minute reduction in truck dock turnaround times.'
  },
  {
    id: 'project-2',
    title: 'Structured Contract Compliance Bot',
    client: 'LegalShield Trust',
    year: '2025',
    tags: ['Gemini API', 'Structured Outputs', 'LegalTech'],
    description: 'Created a high-throughput legal parser using structured JSON output mechanisms. Automatically maps indemnification, renewal dates, and liability caps across multi-jurisdictional supply contracts into centralized ERP databases.',
    outcomeMetric: '6x Faster Review',
    outcomeDetail: 'Secured critical contract reviews in under 9 minutes, scaling corporate processing throughput without expanding junior paralegal staffing.'
  },
  {
    id: 'project-3',
    title: 'Customer Intent Routing Engine',
    client: 'SaaSFlow Solutions',
    year: '2024',
    tags: ['Text Classification', 'Active Routing', 'Customer Support'],
    description: 'Engineered an intent classifier that analyzes incoming complex enterprise tickets, extracts underlying system issues, and routes them to engineering lines with pre-generated contextual summaries, preventing tickets from languishing in queues.',
    outcomeMetric: '-42% Ticket Resolution Time',
    outcomeDetail: 'Increased first-contact resolution metrics and dramatically increased renewal rates among enterprise accounts.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'VP of Product Development',
    company: 'Apex Global Capital',
    content: 'Alex completely transformed how our analytical team conducts research. He didn’t just hand us a generic chatbot; he built a highly secure, table-aware synthesis engine that has become our core competitive advantage. His focus on strict grounding and citation made our compliance team immediate advocates.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Marcus Thorne',
    role: 'Director of Operations',
    company: 'PrecisionAuto Systems',
    content: 'Our transition to AI-assisted inspection was stalled for months until Alex joined. His edge computing design solved our latency issues, and the cloud-based verification loop cut our scrap waste by almost a million dollars in under a year. He is a master of real-world physical system deployments.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Dr. Evelyn Martinez',
    role: 'Chief Medical Information Officer',
    company: 'MedAlign Health Networks',
    content: 'Alex delivered what three legacy software vendors claimed was impossible: an accurate, EHR-integrated, fully HIPAA-compliant clinical SOAP parser. Our physicians have recovered hours of their day, and more importantly, can focus on looking at patients instead of computer screens during exams.',
    rating: 5
  }
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    category: 'Data Quality',
    question: 'Where and how is your primary business or customer transaction data currently stored?',
    options: [
      {
        text: 'Fragmented across offline Excel sheets, local CSVs, or scattered emails.',
        score: 1,
        explanation: 'Data is highly siloed and non-standardized. Your immediate priority is database consolidation and setting up basic structured extraction pipelines before embarking on AI modeling.'
      },
      {
        text: 'Stored in centralized SQL/NoSQL databases or CRM backups with general schemas.',
        score: 3,
        explanation: 'Good structural baseline. Your data is unified but lacks semantic indexing. Highly suitable for starting with batch data extractors or connecting to standard client retrieval models.'
      },
      {
        text: 'Unified in a modern cloud data warehouse (BigQuery, Snowflake, or Redshift).',
        score: 4.5,
        explanation: 'Excellent data readiness. You are perfectly positioned to establish vector databases, connect semantic embeddings, and deploy advanced real-time Retrieval-Augmented Generation (RAG).'
      },
      {
        text: 'Maintained in active data lakes with real-time vector indexing and event brokers.',
        score: 5,
        explanation: 'Elite-tier data readiness. You possess the architecture required for high-frequency agentic loops, live contextual inference, and automated, real-time reinforcement models.'
      }
    ]
  },
  {
    id: 2,
    category: 'Skills & Team',
    question: 'What is your engineering team’s level of familiarity with cloud architecture, APIs, and ML workflows?',
    options: [
      {
        text: 'We do not have internal developers; we rely on external agencies or low-code SaaS tools.',
        score: 1,
        explanation: 'Without internal engineering, you should focus on fully-managed, out-of-the-box AI solutions, or hire a dedicated integration consultant (like Alex) to construct and manage the pipeline.'
      },
      {
        text: 'We have web/backend engineers experienced in standard REST APIs, but no ML or Python background.',
        score: 3,
        explanation: 'Your team is highly capable of consuming mature cloud-hosted AI APIs (like Gemini). They will need training on prompt hygiene, model routing, and vector storage, but can adapt rapidly.'
      },
      {
        text: 'We have skilled Python developers and data scientists, but they have not deployed production LLMs.',
        score: 4,
        explanation: 'Very strong foundation. Your team can quickly implement RAG, agentic frameworks, and fine-tuning with expert architectural guidance on orchestration, guardrails, and evaluation frameworks.'
      },
      {
        text: 'We have dedicated ML/MLOps engineers who actively train, tune, and deploy custom neural networks.',
        score: 5,
        explanation: 'Highest technical readiness. Your organization is primed for highly customized open-source model optimization, bespoke fine-tuning, private on-premise deployments, and deep custom evaluations.'
      }
    ]
  },
  {
    id: 3,
    category: 'Strategy',
    question: 'How clearly defined are your target AI business use cases and target ROI metrics?',
    options: [
      {
        text: 'We know we need to integrate AI to keep up with competitors, but don’t have specific workflows identified.',
        score: 1,
        explanation: 'Highly vulnerable to wasted budget. You must perform structured Discovery Workshops to trace AI capabilities directly to business line bottlenecks before writing any code.'
      },
      {
        text: 'We have general targets (e.g., "improve customer chat"), but haven’t mapped the exact APIs or financial inputs.',
        score: 2.5,
        explanation: 'A common baseline. You need a structured Feasibility audit to map out human-in-the-loop workflows, model cost forecasts, and concrete pilot success metrics.'
      },
      {
        text: 'We have 1-2 highly specific manual bottlenecks mapped, with exact historic human-hour costs documented.',
        score: 4.5,
        explanation: 'Excellent strategic readiness. We can skip deep discovery and move straight into prototyping a working Proof of Concept (PoC) with realistic, pre-mapped ROI targets.'
      },
      {
        text: 'We have detailed PRDs, mapped API schemas, concrete accuracy thresholds, and a dedicated AI steering committee.',
        score: 5,
        explanation: 'Superb project definition. Ready for immediate production engineering, model orchestration setups, and security hardening.'
      }
    ]
  },
  {
    id: 4,
    category: 'Security & Compliance',
    question: 'What are the security, compliance, and regulatory constraints surrounding your primary business data?',
    options: [
      {
        text: 'Minimal. Our data is public, and we operate in a standard non-regulated marketplace.',
        score: 5,
        explanation: 'Extremely fast path-to-market. You can leverage cloud-hosted SaaS models directly, optimizing purely for latency and capabilities without heavy governance overhead.'
      },
      {
        text: 'Standard corporate data privacy. Corporate data must never be used to train public foundation models.',
        score: 4,
        explanation: 'Standard requirement. Requires using enterprise-level API agreements (e.g., zero-data-retention contracts) and establishing rigid internal proxy middleware.'
      },
      {
        text: 'Strict compliance environments (such as HIPAA, GDPR, SOC2, or high-level financial auditing).',
        score: 2.5,
        explanation: 'High compliance burden. Requires private VPC hosting, strict encryption-at-rest pipelines, and custom filtering middleware to redact Personally Identifiable Information (PII) prior to API ingestion.'
      },
      {
        text: 'Air-gapped security. No data can leave our physical network or highly secure sovereign cloud under any condition.',
        score: 1.5,
        explanation: 'Maximum security environment. You must avoid external third-party APIs entirely. Your solution requires hosting open-source models (like Llama-3 or Mistral) on self-managed, high-powered GPU instances.'
      }
    ]
  },
  {
    id: 5,
    category: 'Infrastructure',
    question: 'What is your organization’s level of funding and leadership commitment to AI integration?',
    options: [
      {
        text: 'Very cautious. We need to see substantial, near-zero-cost ROI before any formal budget is allocated.',
        score: 1,
        explanation: 'Highly restricted environment. Recommend commencing with low-overhead prompt templates or out-of-the-box automation templates to validate immediate time savings with minimal friction.'
      },
      {
        text: 'Moderately supportive. We have a modest, non-recurring experimentation budget allocated for exploratory prototyping.',
        score: 3,
        explanation: 'Good for a targeted feasibility study. Recommend building a high-fidelity interactive mock or small pilot to secure long-term capital support from stakeholders.'
      },
      {
        text: 'High commitment. We have a dedicated, multi-quarter budget explicitly carved out for custom AI engineering.',
        score: 4.5,
        explanation: 'Strong operational posture. Perfect runway for a standard 3-phase delivery model: Discovery workshop, Feasibility prototype, and 3-month production-grade pilot integration.'
      },
      {
        text: 'AI-First mandate. Executive leadership and the board are fully aligned on AI as the key competitive driver.',
        score: 5,
        explanation: 'Elite priority level. Ideal environment for Fractional CAIO oversight paired with end-to-end custom application development to aggressively carve out market share.'
      }
    ]
  }
];

export const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Discovery & Strategic Audit',
    duration: 'Week 1',
    description: 'We align your business objectives with real AI capabilities. By auditing your data sources, ingestion speeds, schemas, and infrastructure constraints, we identify low-hanging fruit and outline the highest ROI use-cases.',
    deliverables: ['Use-Case Feasibility Matrix', 'Data Maturity Audit Report', 'Estimated Cost/ROI Model']
  },
  {
    step: '02',
    title: 'Technical Blueprint & PoC',
    duration: 'Weeks 2-4',
    description: 'We construct a fully functional, cloud-hosted interactive prototype using your sample dataset. We run embedding vector tests, evaluate initial model outputs, and design the absolute ideal system architecture specification.',
    deliverables: ['Working Interactive Prototype', 'Production System Architecture Blueprint', 'PII & Security Compliance Plan']
  },
  {
    step: '03',
    title: ' Bespoke Production Build',
    duration: 'Months 2-3',
    description: 'We write clean, modular production code. This includes deploying vector indexing schemas, constructing secure middleware APIs, setting up prompt-logging, managing hallucinations, and integrating the client dashboard UI.',
    deliverables: ['Fully Integrated AI Pipeline', 'Cloud-Deployed API Service & UI Dashboard', 'Automated Evaluation Suite']
  },
  {
    step: '04',
    title: 'Optimization & Handoff',
    duration: 'Ongoing',
    description: 'We launch to real users, monitor system performance metrics, and optimize prompt strategies to slash monthly API costs. We conduct extensive training sessions with your internal engineers to complete a seamless handoff.',
    deliverables: ['API Cost Optimization Report', 'System Runbooks & Training Sessions', 'Optional Fractional Advisory Retainer']
  }
];
