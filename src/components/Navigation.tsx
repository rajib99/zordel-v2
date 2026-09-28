import { Menu, X, ArrowUpRight, Cpu, Sparkles } from 'lucide-react';
import { useState, MouseEvent } from 'react';
import { ROUTES } from '../routes';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'About & Expert' },
    { id: 'services', label: 'Services & Method' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'tools', label: 'ROI & Diagnostic' },
    { id: 'consultation', label: 'Consultation Form' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleTabChange('about')}
              id="nav-logo"
            >
              <div className="text-xl font-black tracking-tighter uppercase text-slate-900">
                ALEX ZORDEL<span className="text-indigo-600">.</span>
              </div>
              <div className="hidden sm:block text-[9px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Senior AI Consultant
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 lg:space-x-6" id="nav-desktop">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`tab-btn-${item.id}`}
                  onClick={() => handleTabChange(item.id)}
                  className={`px-1 py-1 text-xs font-bold uppercase tracking-widest transition-all duration-150 ${
                    activeTab === item.id
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {item.label.split(' & ')[0]} {/* simplified label for minimal design */}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => handleTabChange('consultation')}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-slate-900 hover:bg-indigo-600 rounded-lg transition-all duration-200"
                id="cta-header-book"
              >
                <span>Book Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-expanded="false"
                id="mobile-menu-toggle"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-inner animate-in fade-in slide-in-from-top-4 duration-200" id="nav-mobile-drawer">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  activeTab === item.id
                    ? 'text-indigo-600 bg-indigo-50/50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-100 px-4">
              <button
                onClick={() => handleTabChange('consultation')}
                className="w-full inline-flex items-center justify-center space-x-1.5 px-4 py-3 text-base font-medium text-white bg-slate-900 hover:bg-indigo-600 rounded-md transition-all"
                id="cta-mobile-book"
              >
                <span>Book Strategy Session</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Banner Accent Line */}
      <div className="h-0.5 bg-indigo-600/10 w-full" />
    </>
  );
}

export function Footer({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const currentYear = new Date().getFullYear();

  const handleFooterLink = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Real anchor links so pages can be opened in new tabs, but navigated in-app on normal click
  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, tabId: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    handleFooterLink(tabId);
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <div className="text-xl font-black tracking-tighter uppercase text-white">
                ALEX ZORDEL<span className="text-indigo-500">.</span>
              </div>
            </div>
            <p className="text-sm max-w-sm text-slate-400">
              Senior AI Consultant specializing in enterprise model deployments, computer vision pipelines, secure multi-modal RAG systems, and business intelligence automation.
            </p>
            <div className="text-xs font-mono text-slate-500">
              Available for contract roles and fixed-scope blueprints globally.
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Core Focus Areas</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleFooterLink('services')}>Enterprise RAG</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleFooterLink('services')}>Computer Vision Edge</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleFooterLink('services')}>Agentic Workflows</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleFooterLink('services')}>MLOps & Cost Optimization</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Navigations</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleFooterLink('about')}>Bio & Credentials</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleFooterLink('services')}>Consulting Services</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleFooterLink('case-studies')}>Deployment Case Studies</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleFooterLink('tools')}>Interactive ROI Calculator</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleFooterLink('consultation')}>Consultation Request</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs">
          <div>
            &copy; {currentYear} Alex Zordel AI Consulting. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {[
              { id: 'contact', label: 'Contact' },
              { id: 'terms', label: 'Terms & Conditions' },
              { id: 'privacy', label: 'Privacy Policy' },
            ].map((link) => (
              <a
                key={link.id}
                href={ROUTES[link.id].path}
                onClick={(e) => handleAnchorClick(e, link.id)}
                className="hover:text-white transition-colors"
                id={`footer-link-${link.id}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
