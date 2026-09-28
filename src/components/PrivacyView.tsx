import LegalLayout from './LegalLayout';

interface PrivacyProps {
  onNavigate: (tabId: string) => void;
}

export default function PrivacyView({ onNavigate }: PrivacyProps) {
  const link = (tabId: string, label: string) => (
    <button type="button" onClick={() => onNavigate(tabId)} className="text-indigo-600 hover:underline">
      {label}
    </button>
  );

  return (
    <LegalLayout
      title="Privacy Policy"
      intro={
        <p>
          This Privacy Policy explains how Alex Zordel AI Consulting ("I", "me", "my") collects, uses, and protects
          personal information when you visit this website or get in touch.
        </p>
      }
      sections={[
        {
          heading: 'Information I Collect',
          body: (
            <>
              <p>I only collect information you choose to provide, such as when you submit the contact or consultation form:</p>
              <ul>
                <li>Your name and email address</li>
                <li>Your phone number (optional)</li>
                <li>Company name, budget range, and project details (consultation form only)</li>
                <li>The content of your message</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'How I Use Your Information',
          body: (
            <>
              <p>Information you submit is used only to:</p>
              <ul>
                <li>Respond to your message or consultation request</li>
                <li>Discuss, scope, and deliver services you have asked about</li>
                <li>Keep a record of our correspondence</li>
              </ul>
              <p>I do not sell, rent, or trade your personal information, and I do not use it for unrelated marketing without your consent.</p>
            </>
          ),
        },
        {
          heading: 'Legal Basis and Consent',
          body: (
            <p>
              I process the details you submit on the basis of your consent, which you give by ticking the consent box on
              the contact form. You can withdraw consent at any time by emailing me, and I will stop processing your data
              for that purpose.
            </p>
          ),
        },
        {
          heading: 'Browser Storage',
          body: (
            <p>
              Some interactive tools on this website (such as the diagnostic and consultation log) store data locally in
              your browser's local storage. This data stays on your device and is not sent to me. You can clear it at any
              time through your browser settings.
            </p>
          ),
        },
        {
          heading: 'Sharing Your Information',
          body: (
            <p>
              I may share information with trusted service providers (for example, email or hosting providers) only as
              needed to operate this website and respond to you, or where required by law.
            </p>
          ),
        },
        {
          heading: 'Data Retention',
          body: (
            <p>
              I keep your information only for as long as needed to respond to your enquiry and for any related
              engagement, or as required for legal and accounting purposes.
            </p>
          ),
        },
        {
          heading: 'Your Rights',
          body: (
            <>
              <p>Depending on where you live, you may have the right to:</p>
              <ul>
                <li>Access the personal information I hold about you</li>
                <li>Ask me to correct or delete it</li>
                <li>Object to or restrict how it is used</li>
                <li>Withdraw your consent at any time</li>
              </ul>
              <p>To exercise any of these rights, email <a href="mailto:alex@zordel.com" className="text-indigo-600 hover:underline">alex@zordel.com</a>.</p>
            </>
          ),
        },
        {
          heading: 'Security',
          body: (
            <p>
              I take reasonable measures to protect your information. However, no method of transmission over the
              internet is completely secure, and I cannot guarantee absolute security.
            </p>
          ),
        },
        {
          heading: 'Changes to This Policy',
          body: (
            <p>
              I may update this Privacy Policy from time to time. Changes take effect when posted on this page. Please
              also review the {link('terms', 'Terms & Conditions')}.
            </p>
          ),
        },
        {
          heading: 'Contact',
          body: (
            <p>
              Questions about this policy? Email{' '}
              <a href="mailto:alex@zordel.com" className="text-indigo-600 hover:underline">alex@zordel.com</a> or use the{' '}
              {link('contact', 'contact form')}.
            </p>
          ),
        },
      ]}
    />
  );
}
