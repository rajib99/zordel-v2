import { Send, CheckCircle2, Mail } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface ContactProps {
  onNavigate: (tabId: string) => void;
}

const inputClass =
  'w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 bg-slate-50/50';

export default function ContactView({ onNavigate }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Not wired to a backend yet — just confirm to the visitor
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setConsent(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in duration-300" id="contact-page-root">
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900">
          Get in <span className="text-indigo-600">Touch</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-light">
          Have a question or want to say hello? Send me a message and I'll get back to you.
        </p>
      </section>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {submitted ? (
          <div className="flex flex-col items-center text-center space-y-4 py-6" id="contact-sent-panel" role="status">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-display font-black text-slate-900 text-lg sm:text-xl">Message is sent</h3>
            <p className="text-sm text-slate-600 max-w-md">
              If you have any urgent request, email me at{' '}
              <a href="mailto:alex@zordel.com" className="text-indigo-600 font-semibold hover:underline">
                alex@zordel.com
              </a>
              .
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 rounded"
              id="contact-send-another-btn"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700 block">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sarah Jenkins"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700 block">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@company.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-phone" className="text-xs font-semibold text-slate-700 block">
                Phone Number
              </label>
              <input
                type="tel"
                id="contact-phone"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 123 4567"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 block">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can I help?"
                className={`${inputClass} font-sans`}
              />
            </div>

            <label htmlFor="contact-consent" className="flex items-start space-x-2.5 text-xs text-slate-600 leading-snug cursor-pointer">
              <input
                type="checkbox"
                id="contact-consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-indigo-600 shrink-0"
              />
              <span>
                I consent to Alex Zordel AI Consulting storing and using the details I've provided to respond to my message, as described in the{' '}
                <button type="button" onClick={() => onNavigate('privacy')} className="text-indigo-600 hover:underline">
                  Privacy Policy
                </button>
                . <span className="text-red-500">*</span>
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm text-xs"
              id="contact-submit-btn"
            >
              <span>Submit</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      <p className="text-center text-xs text-slate-500 flex items-center justify-center space-x-1.5">
        <Mail className="w-3.5 h-3.5" />
        <span>
          Prefer email?{' '}
          <a href="mailto:alex@zordel.com" className="text-indigo-600 hover:underline">alex@zordel.com</a>
        </span>
      </p>
    </div>
  );
}
