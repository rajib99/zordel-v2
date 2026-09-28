// Each page has its own URL path
export const ROUTES: Record<string, { path: string; title: string }> = {
  'about': { path: '/', title: 'Alex Zordel | Senior AI Consultant Portfolio' },
  'services': { path: '/services', title: 'Services | Alex Zordel' },
  'case-studies': { path: '/case-studies', title: 'Case Studies | Alex Zordel' },
  'tools': { path: '/tools', title: 'ROI & Diagnostic | Alex Zordel' },
  'consultation': { path: '/consultation', title: 'Consultation Request | Alex Zordel' },
  'contact': { path: '/contact', title: 'Contact | Alex Zordel' },
  'terms': { path: '/terms', title: 'Terms & Conditions | Alex Zordel' },
  'privacy': { path: '/privacy', title: 'Privacy Policy | Alex Zordel' },
};

export const tabFromPath = (pathname: string): string => {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const match = Object.entries(ROUTES).find(([, route]) => route.path === normalized);
  return match ? match[0] : 'about';
};
