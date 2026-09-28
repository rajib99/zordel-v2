/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navigation, { Footer } from './components/Navigation';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import CaseStudiesView from './components/CaseStudiesView';
import InteractiveToolsView from './components/InteractiveToolsView';
import ConsultationView from './components/ConsultationView';
import ContactView from './components/ContactView';
import TermsView from './components/TermsView';
import PrivacyView from './components/PrivacyView';
import { ROUTES, tabFromPath } from './routes';

export default function App() {
  const [activeTab, setActiveTabState] = useState<string>(() => tabFromPath(window.location.pathname));

  // Keep the page in sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => setActiveTabState(tabFromPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = ROUTES[activeTab]?.title ?? ROUTES.about.title;
  }, [activeTab]);

  const setActiveTab = (tabId: string) => {
    const path = ROUTES[tabId]?.path ?? '/';
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setActiveTabState(tabId);
  };

  // State for linking diagnostic results to the consultation form
  const [linkedAudit, setLinkedAudit] = useState<{ score: number; level: string; details: string } | null>(null);

  const handleLinkAuditToContact = (data: { score: number; level: string; details: string }) => {
    setLinkedAudit(data);
    setActiveTab('consultation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearLinkedAudit = () => {
    setLinkedAudit(null);
  };

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesView onNavigate={handleNavigate} />;
      case 'case-studies':
        return <CaseStudiesView />;
      case 'tools':
        return <InteractiveToolsView onLinkToContact={handleLinkAuditToContact} />;
      case 'consultation':
        return (
          <ConsultationView
            linkedAuditData={linkedAudit}
            onClearLinkedAudit={handleClearLinkedAudit}
          />
        );
      case 'contact':
        return <ContactView onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsView onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyView onNavigate={handleNavigate} />;
      default:
        return <AboutView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between" id="app-layout-root">
      <div>
        {/* Navigation Bar */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          {renderContent()}
        </main>
      </div>

      {/* Footer Area */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
