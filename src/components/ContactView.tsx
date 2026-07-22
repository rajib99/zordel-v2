import { Send, Calendar, Clock, Star, Users, MessageSquare, ClipboardList, CheckCircle2, Trash2 } from 'lucide-react';
import { useState, useEffect, FormEvent } from 'react';
import { ContactSubmission } from '../types';

interface ContactProps {
  linkedAuditData: { score: number; level: string; details: string } | null;
  onClearLinkedAudit: () => void;
}

export default function ContactView({ linkedAuditData, onClearLinkedAudit }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budgetRange, setBudgetRange] = useState('$12,500 - $25,000 (Implementation Pilot)');
  const [maturityLevel, setMaturityLevel] = useState('Not Evaluated');
  const [message, setMessage] = useState('');

  const [inquiries, setInquiries] = useState<ContactSubmission[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [recentReply, setRecentReply] = useState<string | null>(null);

  // Load inquiries from Local Storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('alex_zordel_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync maturity level with linked audit data
  useEffect(() => {
    if (linkedAuditData) {
      setMaturityLevel(linkedAuditData.level);
      // Auto populate message if it's blank or generic
      if (!message) {
        setMessage(`Linked Diagnostic Findings:\n${linkedAuditData.details}\n\nWe are looking to discuss our AI alignment and schedule an initial feasibility scoping session.`);
      }
    }
  }, [linkedAuditData]);

  const handleSubmitInquiry = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !company || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Heuristics for the simulated AI assistant reply text
    let reply = `Hello ${name},\n\nThank you for reaching out to Zordel AI Consulting. This is Alex's Virtual Engagement Assistant.\n\nI have logged your request. Based on your inputs, here is our preliminary assessment:\n\n`;
    
    if (budgetRange.includes('$2,500')) {
      reply += `• Tier Alignment: You align perfectly with our "AI Discovery Workshop & Strategic Audit" flat-fee tier. This is a highly cost-efficient 1-week engagement.\n`;
    } else if (budgetRange.includes('$12,500')) {
      reply += `• Tier Alignment: Your budget matches our "AI Feasibility & Technical Prototype" tier. We can construct a high-fidelity interactive mock model within 4 weeks to prove actual ROI.\n`;
    } else {
      reply += `• Tier Alignment: You align with our "Bespoke Implementation Retainer". Alex can personally lead developer engineering, setup your vector index databases, and deploy the full pipeline.\n`;
    }

    if (maturityLevel !== 'Not Evaluated') {
      reply += `• AI Maturity Audit: We noticed you completed the 5-Min Diagnostic (Level: ${maturityLevel}). We will pre-review your diagnostic responses prior to our call to save meeting discovery hours.\n`;
    }

    reply += `\nNext Steps: Alex has open slots for a complimentary 15-minute alignment call. Please select an available slot from the active calendar below to sync.`;

    const newSubmission: ContactSubmission = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      company,
      budgetRange,
      maturityLevel,
      message,
      timestamp: new Date().toLocaleString(),
      replied: true,
      replyText: reply
    };

    const updatedInquiries = [newSubmission, ...inquiries];
    setInquiries(updatedInquiries);
    localStorage.setItem('alex_zordel_inquiries', JSON.stringify(updatedInquiries));
    
    setRecentReply(reply);
    setSubmitted(true);

    // Reset input fields
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    onClearLinkedAudit();
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    localStorage.setItem('alex_zordel_inquiries', JSON.stringify(updated));
  };

  const handleClearForm = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setMaturityLevel('Not Evaluated');
    onClearLinkedAudit();
    setSubmitted(false);
    setRecentReply(null);
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-300" id="contact-view-root">
      
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900">
          Let’s Build Your <span className="text-indigo-600">AI Advantage</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-light">
          Ready to de-risk your enterprise AI investment? Submit your project details below, and my virtual scheduling assistant will instantly review your requirements, suggest the ideal consultation tier, and display live meeting links.
        </p>
      </section>

      {/* Main Grid: Form vs. Previous submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Form Panel */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          {submitted && recentReply ? (
            /* SUCCESS & AI AUTO SCHEDULER VIEW */
            <div className="space-y-6 animate-in fade-in duration-300" id="contact-success-panel">
              <div className="flex flex-col items-center text-center space-y-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-slate-900 text-lg sm:text-xl">
                  Inquiry Logged Successfully
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Your details have been saved to local persistence.
                </p>
              </div>

              {/* Simulated Assistant Response */}
              <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-xl p-5 space-y-4 shadow-inner relative">
                <span className="absolute top-3 right-4 text-[9px] font-mono font-bold bg-indigo-600 text-white px-2 py-0.5 rounded uppercase tracking-wider">
                  AI Assistant
                </span>
                <div className="flex items-center space-x-2 text-white font-display font-bold text-sm">
                  <Star className="w-4.5 h-4.5 text-indigo-400 fill-indigo-400" />
                  <span>Immediate Alignment Feedback</span>
                </div>
                <p className="text-xs font-mono whitespace-pre-line leading-relaxed text-slate-300">
                  {recentReply}
                </p>
              </div>

              {/* Booking Calendar Widget */}
              <div className="border border-slate-200 rounded-xl p-5 space-y-4 bg-slate-50">
                <div className="flex justify-between items-center">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>Select Complimentary 15-Min Slot</span>
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-100">
                    Active Slots Available
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Mon 10:00 AM', 'Mon 2:30 PM', 'Tue 11:15 AM', 'Wed 4:00 PM'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => alert(`Simulated booking confirmed for: ${slot}. Alex will join via Google Meet. A confirmation has been logged!`)}
                      className="p-3 bg-white border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/20 text-[11px] font-mono font-bold text-slate-800 hover:text-indigo-700 rounded transition-all text-center outline-none"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleClearForm}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 rounded"
                  id="reset-form-btn"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            /* THE INPUT FORM */
            <form onSubmit={handleSubmitInquiry} className="space-y-5" id="consultation-form">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-display font-bold text-slate-900 text-lg leading-tight">
                  Consultation Request Intake
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Alex responds to all aligned inquiries personally within 24 hours.
                </p>
              </div>

              {/* Linked Diagnostic Badge Alert */}
              {linkedAuditData && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 flex items-center justify-between text-xs text-indigo-800" id="linked-audit-alert">
                  <div className="flex items-center space-x-2">
                    <ClipboardList className="w-4.5 h-4.5 text-indigo-600" />
                    <span>
                      Linked Diagnostic Level: <strong>{linkedAuditData.level}</strong> ({linkedAuditData.score} / 25)
                    </span>
                  </div>
                  <button 
                    type="button" 
                    onClick={onClearLinkedAudit}
                    className="text-[10px] font-mono text-indigo-600 hover:underline hover:text-indigo-800"
                  >
                    Unlink
                  </button>
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="client-name" className="text-xs font-semibold text-slate-700 block">Your Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="client-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Jenkins"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="client-email" className="text-xs font-semibold text-slate-700 block">Work Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    id="client-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@company.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="space-y-1.5">
                <label htmlFor="client-company" className="text-xs font-semibold text-slate-700 block">Company Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="client-company"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Apex Global Capital"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 bg-slate-50/50"
                />
              </div>

              {/* Budget Range & Diagnostic Level Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="client-budget" className="text-xs font-semibold text-slate-700 block">Expected Consulting Budget</label>
                  <select
                    id="client-budget"
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded outline-none focus:border-indigo-600 bg-white"
                  >
                    <option>$2,500 (Discovery Session Workshop)</option>
                    <option>$12,500 - $25,000 (Implementation Pilot)</option>
                    <option>$25,000+ (Full-Scale Custom Systems)</option>
                    <option>Undecided / Request Advisory Hourly</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="client-maturity" className="text-xs font-semibold text-slate-700 block">AI Maturity Stage</label>
                  <input
                    type="text"
                    id="client-maturity"
                    disabled
                    value={maturityLevel}
                    placeholder="Not Evaluated"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded outline-none bg-slate-100 text-slate-500 font-mono font-bold"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="client-message" className="text-xs font-semibold text-slate-700 block">Project Brief & Requirements <span className="text-red-500">*</span></label>
                <textarea
                  id="client-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe the core workflows you wish to automate, current data formats/sources, and your target timelines..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 bg-slate-50/50 font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm text-xs"
                id="submit-inquiry-btn"
              >
                <span>Submit Intake & Generate Alignment Analysis</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

        {/* Right Side: Sidebar Info & Saved Local Persisted Inquiries */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick FAQ / Contacts card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-4">
            <h4 className="font-display font-bold text-slate-900 text-sm flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Response SLA Commitments</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start space-x-2 leading-snug">
                <span className="text-indigo-600 font-bold">•</span>
                <span><strong>24-Hour SLA:</strong> All complete briefs receive a custom engineering response from Alex within 24 business hours.</span>
              </li>
              <li className="flex items-start space-x-2 leading-snug">
                <span className="text-indigo-600 font-bold">•</span>
                <span><strong>Direct Handoff:</strong> I do not pass accounts to junior account managers. You negotiate directly with the primary architect.</span>
              </li>
              <li className="flex items-start space-x-2 leading-snug">
                <span className="text-indigo-600 font-bold">•</span>
                <span><strong>Signed NDAs:</strong> Happy to review, adjust, and sign standard corporate confidentiality documents before the kickoff call.</span>
              </li>
            </ul>
          </div>

          {/* Local storage list of inquiries */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4" id="persisted-inquiries-widget">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="font-display font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <ClipboardList className="w-4.5 h-4.5 text-indigo-600" />
                <span>Saved Consultation Logs ({inquiries.length})</span>
              </h4>
              <span className="text-[10px] font-mono text-slate-400">Offline DB</span>
            </div>

            {inquiries.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">
                No local submissions found in this browser session. Fill out the form to persist a record!
              </p>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1" id="inquiries-rendered-list">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="border border-slate-100 rounded-lg p-3 bg-slate-50 space-y-2 text-xs relative">
                    <button
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="absolute top-2.5 right-2.5 text-slate-400 hover:text-red-500 transition-colors p-1"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="pr-6">
                      <span className="font-bold text-slate-900">{inq.name}</span>
                      <span className="text-slate-400 block text-[10px]">{inq.company} • {inq.timestamp}</span>
                    </div>

                    <div className="text-[10px] space-y-0.5 border-t border-b border-slate-200/50 py-1.5 text-slate-500 font-mono">
                      <div><span className="text-slate-700">Budget:</span> {inq.budgetRange}</div>
                      <div><span className="text-slate-700">Maturity:</span> {inq.maturityLevel}</div>
                    </div>

                    <p className="text-slate-600 line-clamp-2 text-[11px] font-sans">
                      {inq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
