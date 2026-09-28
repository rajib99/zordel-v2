import LegalLayout from './LegalLayout';

interface TermsProps {
  onNavigate: (tabId: string) => void;
}

export default function TermsView({ onNavigate }: TermsProps) {
  const link = (tabId: string, label: string) => (
    <button type="button" onClick={() => onNavigate(tabId)} className="text-indigo-600 hover:underline">
      {label}
    </button>
  );

  return (
    <LegalLayout
      title="Terms & Conditions"
      intro={
        <p>
          These Terms &amp; Conditions ("Terms") govern your use of this website, operated by Alex Zordel AI Consulting
          ("I", "me", "my"). By accessing or using the website, you agree to these Terms. If you do not agree, please do
          not use the website.
        </p>
      }
      sections={[
        {
          heading: 'Use of the Website',
          body: (
            <>
              <p>You agree to use this website only for lawful purposes. You must not:</p>
              <ul>
                <li>Attempt to gain unauthorised access to the website, its servers, or any connected systems.</li>
                <li>Submit false, misleading, or malicious information through any form.</li>
                <li>Use automated tools to scrape, overload, or disrupt the website.</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Informational Content Only',
          body: (
            <p>
              The content on this website, including case studies, ROI calculators, and diagnostic tools, is provided for
              general information only. Estimates and scores are illustrative and do not constitute professional, legal,
              financial, or technical advice. Any consulting engagement is governed by a separate written agreement.
            </p>
          ),
        },
        {
          heading: 'Consulting Engagements',
          body: (
            <p>
              Submitting a contact or consultation form does not create a client relationship. Services, fees,
              deliverables, confidentiality terms, and timelines are agreed only in a signed statement of work or
              services agreement.
            </p>
          ),
        },
        {
          heading: 'Intellectual Property',
          body: (
            <p>
              All content on this website, including text, graphics, logos, and code, is owned by Alex Zordel AI
              Consulting or its licensors and is protected by intellectual property laws. You may not copy, reproduce, or
              redistribute it without prior written permission, except for personal, non-commercial viewing.
            </p>
          ),
        },
        {
          heading: 'Third-Party Links',
          body: (
            <p>
              This website may contain links to third-party websites. I am not responsible for the content, policies, or
              practices of those websites, and linking does not imply endorsement.
            </p>
          ),
        },
        {
          heading: 'Disclaimer of Warranties',
          body: (
            <p>
              The website is provided "as is" and "as available" without warranties of any kind, express or implied,
              including accuracy, fitness for a particular purpose, or uninterrupted availability.
            </p>
          ),
        },
        {
          heading: 'Limitation of Liability',
          body: (
            <p>
              To the fullest extent permitted by law, Alex Zordel AI Consulting will not be liable for any indirect,
              incidental, or consequential damages arising from your use of, or inability to use, this website or its
              content.
            </p>
          ),
        },
        {
          heading: 'Privacy',
          body: <p>Your use of the website is also governed by my {link('privacy', 'Privacy Policy')}.</p>,
        },
        {
          heading: 'Changes to These Terms',
          body: (
            <p>
              I may update these Terms from time to time. Changes take effect when posted on this page, and the "Last
              updated" date will be revised accordingly.
            </p>
          ),
        },
        {
          heading: 'Contact',
          body: (
            <p>
              Questions about these Terms? Email{' '}
              <a href="mailto:alex@zordel.com" className="text-indigo-600 hover:underline">alex@zordel.com</a> or use the{' '}
              {link('contact', 'contact form')}.
            </p>
          ),
        },
      ]}
    />
  );
}
