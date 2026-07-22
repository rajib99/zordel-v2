export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  industry: 'Finance' | 'Manufacturing' | 'Healthcare' | 'Retail';
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  impactMetrics: {
    label: string;
    value: string;
    description: string;
  }[];
  architecture: {
    nodes: { id: string; label: string; type: 'input' | 'process' | 'ai' | 'output'; description: string }[];
    edges: { from: string; to: string; label?: string }[];
  };
}

export interface ServiceTier {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  description: string;
  features: string[];
  suitability: string;
  methodologyStep: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  description: string;
  outcomeMetric: string;
  outcomeDetail: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface DiagnosticOption {
  text: string;
  score: number;
  explanation: string;
}

export interface DiagnosticQuestion {
  id: number;
  category: 'Strategy' | 'Data Quality' | 'Infrastructure' | 'Skills & Team' | 'Security & Compliance';
  question: string;
  options: DiagnosticOption[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  budgetRange: string;
  maturityLevel: string;
  message: string;
  timestamp: string;
  replied: boolean;
  replyText?: string;
}
