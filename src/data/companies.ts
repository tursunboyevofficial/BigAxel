export type Company = {
  slug: string
  name: string
  tagline: string
  sector: string
  description: string
  services: { title: string; text: string }[]
  stats: { value: string; label: string }[]
  color: string
  gradient: string
  image: string
  branches: string[]
  website?: string
}

export const COMPANIES: Company[] = [
  {
    slug: 'summitstone',
    name: 'SummitStone',
    tagline: 'Airline ticket consolidation',
    sector: 'Travel · Ticketing',
    description:
      'SummitStone is the group flagship — a full-service airline ticket consolidation business serving agencies, tour operators and corporate clients across Central Asia, Europe and the Middle East. We combine long-standing carrier relationships with a modern, people-first sales floor.',
    services: [
      { title: 'Ticket consolidation', text: 'Competitive net fares on 60+ carriers with real-time quoting.' },
      { title: 'Corporate travel', text: 'Dedicated account managers, 24/7 reissue support and reporting.' },
      { title: 'Group & charter', text: 'Large-group bookings, block space and charter programmes.' },
      { title: 'Agent portal', text: 'Self-service booking platform for partner agencies.' },
    ],
    stats: [
      { value: '60+', label: 'Airlines' },
      { value: '24/7', label: 'Agent support' },
      { value: '10+', label: 'Years operating' },
    ],
    color: '#E53D2E',
    gradient: 'from-[#E53D2E]/15 via-white to-[#E53D2E]/5',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1600&q=80',
    branches: ['tashkent', 'namangan', 'riga'],
  },
  {
    slug: 'lumovia-india',
    name: 'Lumovia India',
    tagline: 'South Asia travel operations',
    sector: 'Travel · Back office',
    description:
      'Lumovia India runs night-shift and subcontinent-facing operations from Delhi NCR: ticket issuance, queue management, schedule changes and multilingual customer care. It pairs South Asian talent with European operating hours to deliver round-the-clock service.',
    services: [
      { title: 'Night-shift operations', text: 'Coverage for European and Americas clients during off-hours.' },
      { title: 'Ticket issuance', text: 'GDS-certified ticketers issuing across Amadeus, Sabre and Galileo.' },
      { title: 'Queue handling', text: 'Schedule changes, reissues and refunds handled inside SLAs.' },
      { title: 'Customer care', text: 'English and Hindi-speaking agents, voice and chat.' },
    ],
    stats: [
      { value: '80+', label: 'Agents' },
      { value: '3', label: 'Global GDS' },
      { value: '24/7', label: 'Coverage' },
    ],
    color: '#70991F',
    gradient: 'from-[#70991F]/15 via-white to-[#70991F]/5',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    branches: ['delhi'],
  },
  {
    slug: 'lumovia-egypt',
    name: 'Lumovia Egypt',
    tagline: 'MENA sales & support',
    sector: 'Travel · MENA',
    description:
      'Lumovia Egypt is our gateway to Arabic-speaking markets. From New Cairo, the team drives outbound leisure sales, services regional tour operators, and builds partnerships with Middle Eastern and North African carriers.',
    services: [
      { title: 'MENA leisure sales', text: 'Outbound holiday packages and city breaks for Arabic markets.' },
      { title: 'Arabic-first support', text: 'Native Arabic agents for pre- and post-sale customer care.' },
      { title: 'Regional partnerships', text: 'Direct relationships with MENA-based airlines and DMCs.' },
    ],
    stats: [
      { value: '35+', label: 'Team members' },
      { value: 'AR/EN', label: 'Languages' },
      { value: '2022', label: 'Founded' },
    ],
    color: '#009A66',
    gradient: 'from-[#009A66]/15 via-white to-[#009A66]/5',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1600&q=80',
    branches: ['egypt'],
  },
  {
    slug: 'bigaxel-tech',
    name: 'Bigaxel Tech',
    tagline: 'Product & engineering',
    sector: 'Technology',
    description:
      'Bigaxel Tech is the in-house product and engineering team powering the rest of the group. We build the internal booking platform, agent tools, data pipelines and customer-facing web experiences — so the people side of the business can move faster.',
    services: [
      { title: 'Booking platform', text: 'Core system used daily by every agent in the group.' },
      { title: 'Agent tooling', text: 'Internal CRM, reporting dashboards and ticket-desk automations.' },
      { title: 'Data & analytics', text: 'Pipelines, BI and revenue analytics for executive decisions.' },
      { title: 'Web presence', text: 'Corporate and partner-facing web products, including this site.' },
    ],
    stats: [
      { value: '15+', label: 'Engineers' },
      { value: '4', label: 'Products' },
      { value: '100%', label: 'In-house' },
    ],
    color: '#E22A26',
    gradient: 'from-[#E22A26]/15 via-white to-[#E22A26]/5',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80',
    branches: ['tashkent'],
  },
]

export function getCompany(slug: string) {
  return COMPANIES.find((c) => c.slug === slug)
}
