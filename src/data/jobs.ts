export const JOB_TEAMS = [
  'Sales',
  'Customer support',
  'HR',
  'Finance',
  'IT',
  'Marketing',
  'Design',
  'Operations',
] as const
export type JobTeam = (typeof JOB_TEAMS)[number]

export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'] as const
export type JobType = (typeof JOB_TYPES)[number]

export type Job = {
  slug: string
  title: string
  team: JobTeam
  type: JobType
  /** Matches Branch.slug in data/branches.ts */
  branch: string
  /** Optional company slug (data/companies.ts) */
  company?: string
  /** One-line summary shown on cards */
  summary: string
  description: string[]
  requirements: string[]
  benefits?: string[]
  /** YYYY-MM-DD, absolute date */
  postedAt: string
}

export const JOBS: Job[] = [
  // Tashkent — HQ, largest office, most openings
  {
    slug: 'sales-agent-tashkent',
    title: 'Sales agent',
    team: 'Sales',
    type: 'Full-time',
    branch: 'tashkent',
    company: 'summitstone',
    summary: 'Airline ticket sales to travel agencies across Central Asia.',
    description: [
      'Quote and issue airline tickets for partner agencies.',
      'Build relationships with corporate and agency clients.',
      'Handle changes, refunds and rebookings with speed.',
      'Meet monthly targets with full team and manager support.',
    ],
    requirements: [
      'Conversational English; Russian or Uzbek fluency.',
      'Comfort with CRM tools and a desk-based workflow.',
      'Customer-first attitude, attention to detail.',
      'Travel or sales experience is a plus, not a must.',
    ],
    benefits: [
      'Base + uncapped commission',
      'Mentorship from senior agents in week one',
      'Career track toward account manager or team lead',
    ],
    postedAt: '2026-03-28',
  },
  {
    slug: 'senior-account-manager-tashkent',
    title: 'Senior account manager',
    team: 'Sales',
    type: 'Full-time',
    branch: 'tashkent',
    company: 'summitstone',
    summary: 'Own a book of top-tier agency and corporate accounts.',
    description: [
      'Grow revenue on a portfolio of 20–40 strategic accounts.',
      'Lead QBRs, pricing negotiations and carrier alignment.',
      'Partner with operations and finance on delivery.',
      'Mentor one or two junior agents.',
    ],
    requirements: [
      '3+ years in travel sales, B2B account management or similar.',
      'English at business level; Russian strongly preferred.',
      'Ownership mindset, strong commercial judgement.',
    ],
    postedAt: '2026-04-02',
  },
  {
    slug: 'backend-engineer-tashkent',
    title: 'Backend engineer',
    team: 'IT',
    type: 'Full-time',
    branch: 'tashkent',
    company: 'bigaxel-tech',
    summary: 'Build the platform that powers our sales floor.',
    description: [
      'Design and ship services in Node.js or Python.',
      'Work with the product team on internal CRM, quoting and reporting tools.',
      'Own a feature end-to-end — schema, API, deployment, monitoring.',
      'Code review and mentor junior engineers.',
    ],
    requirements: [
      '3+ years of backend experience.',
      'Solid SQL, REST/GraphQL APIs, and at least one cloud.',
      'Familiarity with observability and CI/CD.',
    ],
    benefits: [
      'Hybrid schedule, flexible hours',
      'Hardware of your choice',
      'Paid conferences and courses',
    ],
    postedAt: '2026-04-05',
  },
  {
    slug: 'frontend-engineer-tashkent',
    title: 'Frontend engineer',
    team: 'IT',
    type: 'Full-time',
    branch: 'tashkent',
    company: 'bigaxel-tech',
    summary: 'React + TypeScript for internal tools and the public brand.',
    description: [
      'Ship React/TypeScript features on our internal apps and marketing site.',
      'Collaborate daily with design on motion and typography.',
      'Care about performance and accessibility.',
    ],
    requirements: [
      '2+ years with modern React and TypeScript.',
      'CSS fluency, comfort with Tailwind or similar.',
      'A portfolio or public repo is a plus.',
    ],
    postedAt: '2026-04-10',
  },
  {
    slug: 'hr-partner-tashkent',
    title: 'HR business partner',
    team: 'HR',
    type: 'Full-time',
    branch: 'tashkent',
    summary: 'Partner with department leads on hiring, growth and culture.',
    description: [
      'Own recruiting pipelines for sales and tech roles.',
      'Run onboarding, performance review and growth conversations.',
      'Shape our culture rituals across the Tashkent floor.',
    ],
    requirements: [
      '3+ years in HR with a hands-on recruiting background.',
      'English + Russian; strong people instincts.',
    ],
    postedAt: '2026-03-20',
  },
  {
    slug: 'finance-analyst-tashkent',
    title: 'Finance analyst',
    team: 'Finance',
    type: 'Full-time',
    branch: 'tashkent',
    summary: 'Build the numbers behind every decision on the sales floor.',
    description: [
      'Monthly close, commissions calc, variance commentary.',
      'Revenue and margin reporting for country managers.',
      'Automate recurring workflows with SQL and sheets.',
    ],
    requirements: [
      '2+ years finance/analyst experience.',
      'Comfortable in SQL and spreadsheets; BI tools a plus.',
    ],
    postedAt: '2026-03-15',
  },
  {
    slug: 'brand-designer-tashkent',
    title: 'Brand & product designer',
    team: 'Design',
    type: 'Full-time',
    branch: 'tashkent',
    summary: 'Visual identity across brand, product and sales materials.',
    description: [
      'Design flagship pages, case studies, sales decks and internal tools.',
      'Collaborate with marketing on launches and campaigns.',
      'Maintain the Big Axel design system.',
    ],
    requirements: [
      '3+ years in brand or product design.',
      'Figma mastery; strong typographic sense.',
      'Portfolio required.',
    ],
    postedAt: '2026-04-12',
  },

  // Namangan — regional
  {
    slug: 'sales-agent-namangan',
    title: 'Sales agent',
    team: 'Sales',
    type: 'Full-time',
    branch: 'namangan',
    company: 'summitstone',
    summary: 'Start your travel sales career from the Fergana Valley.',
    description: [
      'Quote and issue airline tickets for regional agencies.',
      'Support clients in Uzbek, Russian and English.',
      'Structured training path from junior to senior agent.',
    ],
    requirements: [
      'Conversational English and Russian.',
      'No prior travel experience required.',
      'Willingness to work shifts.',
    ],
    benefits: [
      'Full training from day one',
      'Base + commission + quarterly bonus',
    ],
    postedAt: '2026-04-08',
  },
  {
    slug: 'training-lead-namangan',
    title: 'Training lead',
    team: 'Operations',
    type: 'Full-time',
    branch: 'namangan',
    summary: 'Onboard and coach every new agent hire in the region.',
    description: [
      'Run a structured 4-week bootcamp for new agents.',
      'Coach team leads on in-house training.',
      'Build materials, track progress, report outcomes.',
    ],
    requirements: [
      '2+ years in sales training, teaching or coaching.',
      'Uzbek/Russian fluency; English at working level.',
    ],
    postedAt: '2026-03-30',
  },
  {
    slug: 'customer-support-namangan',
    title: 'Customer support specialist',
    team: 'Customer support',
    type: 'Full-time',
    branch: 'namangan',
    summary: 'First line of support for agents and travellers.',
    description: [
      'Answer questions across chat, phone and email.',
      'Resolve booking issues in partnership with sales.',
      'Escalate edge cases and feed learnings back to training.',
    ],
    requirements: [
      'Uzbek, Russian and polite English.',
      'Patient, calm under pressure.',
    ],
    postedAt: '2026-04-01',
  },

  // Delhi — night shift operations
  {
    slug: 'night-shift-agent-delhi',
    title: 'Ticketing agent (night shift)',
    team: 'Sales',
    type: 'Full-time',
    branch: 'delhi',
    company: 'lumovia-india',
    summary: 'Issue transatlantic tickets while the US is online.',
    description: [
      'Work the 9 PM – 6 AM IST shift on US-facing accounts.',
      'Issue, reissue and refund airline tickets at volume.',
      'Collaborate with US-based account managers via Slack.',
    ],
    requirements: [
      'Strong spoken and written English.',
      'GDS (Amadeus, Sabre or Galileo) experience is a plus.',
      'Comfort working overnight schedules.',
    ],
    benefits: [
      'Night-shift differential',
      'Cab service to and from office',
      'Team meals every shift',
    ],
    postedAt: '2026-03-25',
  },
  {
    slug: 'team-lead-delhi',
    title: 'Team lead — ticketing',
    team: 'Operations',
    type: 'Full-time',
    branch: 'delhi',
    company: 'lumovia-india',
    summary: 'Lead a ticketing pod of 8–12 agents.',
    description: [
      'Own daily metrics, coaching and shift handover.',
      'Partner with account managers on escalations.',
      'Help new agents ramp in their first 60 days.',
    ],
    requirements: [
      '4+ years in ticketing, 1+ year leading a team.',
      'GDS expertise, quality-first mindset.',
    ],
    postedAt: '2026-04-03',
  },
  {
    slug: 'quality-analyst-delhi',
    title: 'Quality analyst',
    team: 'Operations',
    type: 'Full-time',
    branch: 'delhi',
    company: 'lumovia-india',
    summary: 'Keep accuracy high across millions of tickets.',
    description: [
      'Audit a sample of issued tickets each week.',
      'Surface patterns to training and team leads.',
      'Partner with engineering on tooling that reduces errors.',
    ],
    requirements: [
      '2+ years in ticketing or fare auditing.',
      'Eye for detail, calm feedback style.',
    ],
    postedAt: '2026-03-18',
  },

  // Cairo — MENA
  {
    slug: 'sales-agent-arabic-cairo',
    title: 'Sales agent (Arabic speaking)',
    team: 'Sales',
    type: 'Full-time',
    branch: 'egypt',
    company: 'lumovia-egypt',
    summary: 'Leisure and outbound sales across MENA markets.',
    description: [
      'Quote and book leisure holidays for Arabic-speaking clients.',
      'Partner with MENA carriers on exclusive fares.',
      'Grow repeat business via excellent after-sale.',
    ],
    requirements: [
      'Arabic fluency, English at working level.',
      '1+ year in travel, hospitality or service sales.',
    ],
    postedAt: '2026-04-07',
  },
  {
    slug: 'marketing-specialist-cairo',
    title: 'Marketing specialist — MENA',
    team: 'Marketing',
    type: 'Full-time',
    branch: 'egypt',
    company: 'lumovia-egypt',
    summary: 'Run campaigns that reach Arabic-speaking travellers.',
    description: [
      'Plan and execute social + paid campaigns on Meta, TikTok and Google.',
      'Work with creative on Arabic-first assets.',
      'Report on ROAS and test new audiences weekly.',
    ],
    requirements: [
      '2+ years in performance marketing.',
      'Arabic + English; MENA market familiarity.',
    ],
    postedAt: '2026-03-22',
  },

  // Riga — European desk
  {
    slug: 'account-manager-riga',
    title: 'Account manager — EU',
    team: 'Sales',
    type: 'Full-time',
    branch: 'riga',
    company: 'summitstone',
    summary: 'Grow relationships with European agency partners.',
    description: [
      'Manage a book of agency clients across the Baltics, Poland and beyond.',
      'Negotiate fare deals with European carriers.',
      'Lead quarterly business reviews.',
    ],
    requirements: [
      'English and one other European language.',
      '2+ years in travel or B2B account management.',
    ],
    postedAt: '2026-04-09',
  },
  {
    slug: 'compliance-officer-riga',
    title: 'Compliance officer',
    team: 'Finance',
    type: 'Full-time',
    branch: 'riga',
    summary: 'Keep us aligned with EU travel and financial regulation.',
    description: [
      'Monitor changes in IATA, EU consumer protection and AML rules.',
      'Own audit preparation and external reporting.',
      'Partner with finance, legal and operations teams.',
    ],
    requirements: [
      'Compliance, audit or regulatory background.',
      'Working English; Latvian or Russian is a plus.',
    ],
    postedAt: '2026-03-12',
  },
  {
    slug: 'intern-eu-sales-riga',
    title: 'EU sales intern (6 months)',
    team: 'Sales',
    type: 'Internship',
    branch: 'riga',
    summary: 'Learn the travel ticketing business from the inside.',
    description: [
      'Shadow senior agents on real accounts.',
      'Own small tasks end-to-end within weeks.',
      'Full-time offer possible at the end of the internship.',
    ],
    requirements: [
      'Current or recent graduate in business, languages or tourism.',
      'Curiosity and willingness to learn.',
    ],
    postedAt: '2026-04-11',
  },
]

export function getJob(slug: string): Job | undefined {
  return JOBS.find((j) => j.slug === slug)
}

export function getJobsByBranch(branchSlug: string): Job[] {
  return JOBS.filter((j) => j.branch === branchSlug)
}
