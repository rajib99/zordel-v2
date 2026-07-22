/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navigation, { Footer } from './components/Navigation';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import CaseStudiesView from './components/CaseStudiesView';
import InteractiveToolsView from './components/InteractiveToolsView';
import ContactView from './components/ContactView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('about');
  
  // State for linking diagnostic results to the contact form
  const [linkedAudit, setLinkedAudit] = useState<{ score: number; level: string; details: string } | null>(null);

  const handleLinkAuditToContact = (data: { score: number; level: string; details: string }) => {
    setLinkedAudit(data);
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearLinkedAudit = () => {
    setLinkedAudit(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutView onNavigate={(tabId) => {
          setActiveTab(tabId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />;
      case 'services':
        return <ServicesView onNavigate={(tabId) => {
          setActiveTab(tabId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />;
      case 'case-studies':
        return <CaseStudiesView />;
      case 'tools':
        return <InteractiveToolsView onLinkToContact={handleLinkAuditToContact} />;
      case 'contact':
        return (
          <ContactView 
            linkedAuditData={linkedAudit} 
            onClearLinkedAudit={handleClearLinkedAudit} 
          />
        );
      default:
        return <AboutView onNavigate={setActiveTab} />;
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

