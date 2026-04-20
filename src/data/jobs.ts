export const JOB_TEAMS = [
  'Sales',
  'IT',
  'HR',
  'Finance',
  'Marketing',
  'Customer support',
  'Design',
  'Operations',
] as const
export type JobTeam = (typeof JOB_TEAMS)[number]

export const JOB_TYPES = ['Full-time', 'Contract', 'Part-time', 'Internship'] as const
export type JobType = (typeof JOB_TYPES)[number]

export const JOB_DIVISIONS = ['TREVOLUTION', 'ECOFINANCE', 'TECHNOLOGIES', 'MULTIPASS'] as const
export type JobDivision = (typeof JOB_DIVISIONS)[number]

export type Job = {
  slug: string
  title: string
  team: JobTeam
  type: JobType
  /** City / free-text location displayed on the card (e.g. "Tashkent", "Chisinau", "Remote") */
  location: string
  /** Optional — when the job is at one of our branch offices, set Branch.slug */
  branch?: string
  /** Optional company slug (data/companies.ts) */
  company?: string
  /** Business unit the role reports into */
  division?: JobDivision
  /** One-line summary shown on cards */
  summary: string
  description: string[]
  requirements: string[]
  benefits?: string[]
  /** YYYY-MM-DD, absolute date */
  postedAt: string
}

// Reusable copy by team — keeps the data file compact.
const DESC: Record<JobTeam, { responsibilities: string[]; requirements: string[]; benefits: string[] }> = {
  Sales: {
    responsibilities: [
      'Own a book of airline-ticket clients and grow it month over month.',
      'Quote, issue, reissue and refund tickets with care and speed.',
      'Partner with operations and finance on delivery and escalations.',
    ],
    requirements: [
      'Customer-first attitude and attention to detail.',
      'Comfort with CRM / ticketing tools and a desk-based workflow.',
      'Language fluency appropriate for the market.',
    ],
    benefits: [
      'Base + uncapped commission',
      'Mentorship from senior agents in week one',
      'Clear career path to account manager or team lead',
    ],
  },
  IT: {
    responsibilities: [
      'Design and ship services that power the sales floor and partner portals.',
      'Own features end-to-end — schema, API, deployment, monitoring.',
      'Review code and mentor junior engineers.',
    ],
    requirements: [
      'Experience with modern web, cloud and observability tooling.',
      'Clear written and verbal communication in English.',
      'Portfolio, public repo or measurable impact at prior roles.',
    ],
    benefits: [
      'Hybrid schedule, flexible hours',
      'Hardware of your choice',
      'Paid conferences and training budget',
    ],
  },
  HR: {
    responsibilities: [
      'Run recruiting pipelines for revenue and technology roles.',
      'Own onboarding, growth conversations and retention rituals.',
      'Shape culture across the office floor.',
    ],
    requirements: [
      'Hands-on recruiting background in a fast-growing team.',
      'Strong people instincts, calm under pressure.',
      'English + at least one local language.',
    ],
    benefits: [
      'Full remote flexibility once onboarded',
      'Learning budget and conference travel',
      'High ownership from day one',
    ],
  },
  Finance: {
    responsibilities: [
      'Own monthly close, reporting and commissions calculation.',
      'Deliver variance commentary and revenue / margin analysis.',
      'Automate recurring work with SQL, spreadsheets and BI tooling.',
    ],
    requirements: [
      'Comfortable in SQL and spreadsheets; BI tools a plus.',
      'Exposure to multi-entity or multi-currency environments.',
      'Accuracy mindset, tight communication with ops.',
    ],
    benefits: [
      'Structured growth path to senior analyst / finance lead',
      'Quarterly bonus tied to close speed and quality',
      'Exposure to executive decisions from day one',
    ],
  },
  Marketing: {
    responsibilities: [
      'Plan and execute campaigns across Meta, Google, TikTok and owned channels.',
      'Work with creative on region-first assets and landing pages.',
      'Report on ROAS and test new audiences weekly.',
    ],
    requirements: [
      'Performance or brand marketing experience in a travel or fintech team.',
      'Fluent English plus the market language where relevant.',
      'Data-driven, comfortable in a dashboard.',
    ],
    benefits: [
      'Real budget to test ideas',
      'Design, data and ops partners on tap',
      'Travel budget for market visits',
    ],
  },
  'Customer support': {
    responsibilities: [
      'First line of support for travellers and partner agents.',
      'Resolve booking issues in partnership with sales.',
      'Escalate edge cases and feed learnings back to training.',
    ],
    requirements: [
      'Patience, calm under pressure, polite written English.',
      'Comfort with shift work including evenings and weekends.',
    ],
    benefits: [
      'Shift differentials for nights / weekends',
      'Clear promotion path to team lead',
    ],
  },
  Design: {
    responsibilities: [
      'Ship brand, product and sales-enablement design.',
      'Maintain the Big Axel design system.',
      'Partner with marketing, product and engineering daily.',
    ],
    requirements: [
      'Strong portfolio in brand or product design.',
      'Figma mastery; typography and motion sense.',
    ],
    benefits: [
      'Hardware of your choice + software licences',
      'Hybrid schedule and flexible hours',
    ],
  },
  Operations: {
    responsibilities: [
      'Keep the floor running — shift planning, QA and escalations.',
      'Coach team leads and new joiners.',
      'Partner with engineering on tooling that removes friction.',
    ],
    requirements: [
      'Operations experience in a ticketing or BPO environment.',
      'Detail-oriented, strong written communication.',
    ],
    benefits: [
      'Quarterly bonus tied to floor metrics',
      'Leadership development budget',
    ],
  },
}

// Helper to produce a Job with templated copy per team.
function make(
  partial: Omit<Job, 'description' | 'requirements' | 'benefits'> & {
    description?: string[]
    requirements?: string[]
    benefits?: string[]
  }
): Job {
  const base = DESC[partial.team]
  return {
    description: partial.description ?? base.responsibilities,
    requirements: partial.requirements ?? base.requirements,
    benefits: partial.benefits ?? base.benefits,
    ...partial,
  }
}

export const JOBS: Job[] = [
  // ——— CAIRO (our office: egypt) ————————————————————————————————
  make({
    slug: 'travel-sales-consultant-egypt',
    title: 'Travel sales consultant (Egypt) — fluent English speakers',
    team: 'Sales',
    type: 'Full-time',
    location: 'Cairo',
    branch: 'egypt',
    company: 'lumovia-egypt',
    division: 'TREVOLUTION',
    summary: 'Outbound airline ticket sales to English-speaking markets from Cairo.',
    postedAt: '2026-04-08',
  }),
  make({
    slug: 'learning-development-manager-cairo',
    title: 'Learning and development manager',
    team: 'HR',
    type: 'Full-time',
    location: 'Cairo',
    branch: 'egypt',
    division: 'TREVOLUTION',
    summary: 'Design onboarding and continuous growth programmes for Cairo.',
    postedAt: '2026-03-30',
  }),
  make({
    slug: 'accountant-cairo',
    title: 'Accountant',
    team: 'Finance',
    type: 'Full-time',
    location: 'Cairo',
    branch: 'egypt',
    division: 'TREVOLUTION',
    summary: 'Monthly close, reconciliations and reporting for the MENA entity.',
    postedAt: '2026-04-02',
  }),
  make({
    slug: 'hr-operations-manager-cairo',
    title: 'HR operations manager — personnel manager',
    team: 'HR',
    type: 'Full-time',
    location: 'Cairo',
    branch: 'egypt',
    division: 'TREVOLUTION',
    summary: 'Own HR operations, contracts and compliance for the Cairo office.',
    postedAt: '2026-03-18',
  }),

  // ——— RIGA (our office: riga) ——————————————————————————————————
  make({
    slug: 'data-analyst-riga',
    title: 'Data analyst',
    team: 'IT',
    type: 'Full-time',
    location: 'Riga',
    branch: 'riga',
    company: 'bigaxel-tech',
    division: 'TREVOLUTION',
    summary: 'Turn raw data into dashboards that drive revenue decisions.',
    postedAt: '2026-04-09',
  }),
  make({
    slug: 'senior-php-developer-migration-riga',
    title: 'Senior PHP developer — system migration',
    team: 'IT',
    type: 'Full-time',
    location: 'Riga',
    branch: 'riga',
    company: 'bigaxel-tech',
    division: 'TREVOLUTION',
    summary: 'Lead the migration of our legacy ticketing system to the new stack.',
    postedAt: '2026-04-05',
  }),
  make({
    slug: 'senior-graphic-designer-riga',
    title: 'Senior graphic designer',
    team: 'Design',
    type: 'Full-time',
    location: 'Riga',
    branch: 'riga',
    division: 'TREVOLUTION',
    summary: 'Brand and product design for the European desk and wider group.',
    postedAt: '2026-04-10',
  }),
  make({
    slug: 'marketing-manager-meta-ads-riga',
    title: 'Marketing manager (Meta Ads)',
    team: 'Marketing',
    type: 'Full-time',
    location: 'Riga',
    branch: 'riga',
    division: 'TREVOLUTION',
    summary: 'Own Meta paid channels across EU markets and iterate weekly.',
    postedAt: '2026-03-24',
  }),
  make({
    slug: 'financial-controller-riga',
    title: 'Financial controller',
    team: 'Finance',
    type: 'Full-time',
    location: 'Riga',
    branch: 'riga',
    company: 'bigaxel-tech',
    division: 'TECHNOLOGIES',
    summary: 'Controller for the Technologies division — EU reporting and compliance.',
    postedAt: '2026-04-01',
  }),
  make({
    slug: 'compensation-benefits-lead-riga',
    title: 'Compensation and benefits lead',
    team: 'HR',
    type: 'Full-time',
    location: 'Riga',
    branch: 'riga',
    company: 'bigaxel-tech',
    division: 'TECHNOLOGIES',
    summary: 'Design and run compensation frameworks across group entities.',
    postedAt: '2026-03-15',
  }),
  make({
    slug: 'senior-android-developer-riga',
    title: 'Senior Android developer',
    team: 'IT',
    type: 'Full-time',
    location: 'Riga',
    branch: 'riga',
    company: 'bigaxel-tech',
    division: 'TREVOLUTION',
    summary: 'Ship native Android features on our consumer travel apps.',
    postedAt: '2026-04-11',
  }),
  make({
    slug: 'user-support-specialist-riga',
    title: 'User support specialist',
    team: 'IT',
    type: 'Full-time',
    location: 'Riga',
    branch: 'riga',
    company: 'bigaxel-tech',
    division: 'TECHNOLOGIES',
    summary: 'Technical support for internal agents and engineering teams.',
    postedAt: '2026-03-22',
  }),
  make({
    slug: 'application-security-engineer-riga',
    title: 'Application security engineer',
    team: 'IT',
    type: 'Full-time',
    location: 'Riga',
    branch: 'riga',
    company: 'bigaxel-tech',
    division: 'TREVOLUTION',
    summary: 'Own app-layer security — reviews, scans, incident response.',
    postedAt: '2026-04-06',
  }),
  make({
    slug: 'senior-frontend-developer-riga',
    title: 'Senior frontend developer',
    team: 'IT',
    type: 'Full-time',
    location: 'Riga',
    branch: 'riga',
    company: 'bigaxel-tech',
    division: 'TREVOLUTION',
    summary: 'React + TypeScript lead role on the booking platform front end.',
    postedAt: '2026-04-07',
  }),
  make({
    slug: 'senior-php-developer-cms-riga',
    title: 'Senior PHP developer — CMS',
    team: 'IT',
    type: 'Full-time',
    location: 'Riga',
    branch: 'riga',
    company: 'bigaxel-tech',
    division: 'TREVOLUTION',
    summary: 'Lead engineer on the group CMS that powers partner-facing content.',
    postedAt: '2026-03-28',
  }),

  // ——— GURUGRAM / DELHI (our office: delhi) ————————————————————
  make({
    slug: 'travel-sales-consultant-gurugram',
    title: 'Travel sales consultant',
    team: 'Sales',
    type: 'Full-time',
    location: 'Gurugram',
    branch: 'delhi',
    company: 'lumovia-india',
    division: 'TREVOLUTION',
    summary: 'Ticket consolidation and corporate sales from the Delhi NCR floor.',
    postedAt: '2026-04-04',
  }),

  // ——— TASHKENT (our office: tashkent) ————————————————————————
  make({
    slug: 'sales-agent-business-class-tashkent',
    title: 'Sales agent for business class',
    team: 'Sales',
    type: 'Contract',
    location: 'Tashkent',
    branch: 'tashkent',
    company: 'summitstone',
    division: 'TREVOLUTION',
    summary: 'Premium-cabin ticket sales to English-speaking markets.',
    postedAt: '2026-04-12',
  }),

  // ——— CHISINAU, Moldova ————————————————————————————————————————
  make({
    slug: 'travel-agent-chisinau',
    title: 'Travel agent (Moldova)',
    team: 'Sales',
    type: 'Full-time',
    location: 'Chisinau',
    division: 'TREVOLUTION',
    summary: 'Inbound travel sales from Chișinău, full training included.',
    postedAt: '2026-04-03',
  }),
  make({
    slug: 'operator-english-chisinau',
    title: 'Operator în Limba Engleză',
    team: 'Sales',
    type: 'Full-time',
    location: 'Chisinau',
    division: 'TREVOLUTION',
    summary: 'English-language ticketing operator — outbound to global markets.',
    postedAt: '2026-03-27',
  }),
  make({
    slug: 'travel-agent-2-chisinau',
    title: 'Travel agent',
    team: 'Sales',
    type: 'Full-time',
    location: 'Chisinau',
    division: 'TREVOLUTION',
    summary: 'Ticket sales with structured coaching and career path.',
    postedAt: '2026-04-01',
  }),
  make({
    slug: 'operator-call-centru-chisinau',
    title: 'Operator call-centru',
    team: 'Sales',
    type: 'Full-time',
    location: 'Chisinau',
    division: 'ECOFINANCE',
    summary: 'Call-centre operator for the finance division, Romanian + Russian.',
    postedAt: '2026-03-20',
  }),
  make({
    slug: 'sales-manager-chisinau',
    title: 'Sales manager',
    team: 'Sales',
    type: 'Full-time',
    location: 'Chisinau',
    division: 'MULTIPASS',
    summary: 'Lead a sales pod on the Multipass product line.',
    postedAt: '2026-04-06',
  }),
  make({
    slug: 'marketing-specialist-chisinau',
    title: 'Marketing specialist',
    team: 'Marketing',
    type: 'Full-time',
    location: 'Chisinau',
    division: 'MULTIPASS',
    summary: 'Multipass campaigns across Romanian and Russian-speaking markets.',
    postedAt: '2026-03-30',
  }),
  make({
    slug: 'skylux-travel-consultant-chisinau',
    title: 'SkyLux travel consultant — Moldova',
    team: 'Sales',
    type: 'Full-time',
    location: 'Chisinau',
    division: 'TREVOLUTION',
    summary: 'SkyLux premium-cabin consultant serving international clients.',
    postedAt: '2026-04-02',
  }),
  make({
    slug: 'sage-people-support-analyst-chisinau',
    title: 'Sage People support analyst',
    team: 'HR',
    type: 'Full-time',
    location: 'Chisinau',
    division: 'TREVOLUTION',
    summary: 'Support and configure Sage People for global HR operations.',
    postedAt: '2026-03-26',
  }),
  make({
    slug: 'senior-graphic-designer-chisinau',
    title: 'Senior graphic designer',
    team: 'Design',
    type: 'Full-time',
    location: 'Chisinau',
    division: 'TREVOLUTION',
    summary: 'Brand and campaign design based in Chișinău.',
    postedAt: '2026-04-08',
  }),
  make({
    slug: 'senior-reporting-specialist-chisinau',
    title: 'Senior reporting specialist / accountant',
    team: 'Finance',
    type: 'Full-time',
    location: 'Chisinau',
    division: 'TREVOLUTION',
    summary: 'Financial reporting, multi-entity, IFRS exposure.',
    postedAt: '2026-03-16',
  }),

  // ——— BOGOTA, Colombia —————————————————————————————————————————
  make({
    slug: 'agente-viajes-espanol-bogota',
    title: 'Agente de viajes en español',
    team: 'Sales',
    type: 'Full-time',
    location: 'Bogota',
    division: 'TREVOLUTION',
    summary: 'Spanish-language travel sales for LATAM markets.',
    postedAt: '2026-04-05',
  }),
  make({
    slug: 'agente-viajes-espanol-2-bogota',
    title: 'Agente de viajes — Español',
    team: 'Sales',
    type: 'Full-time',
    location: 'Bogota',
    division: 'TREVOLUTION',
    summary: 'Spanish-language ticket consolidation and corporate sales.',
    postedAt: '2026-03-29',
  }),
  make({
    slug: 'freelance-travel-manager-bogota',
    title: 'Freelance travel manager',
    team: 'Sales',
    type: 'Contract',
    location: 'Bogota',
    division: 'TREVOLUTION',
    summary: 'Remote Spanish-speaking travel manager, flexible schedule.',
    postedAt: '2026-04-11',
  }),
  make({
    slug: 'agente-viajes-freelance-remoto-bogota',
    title: 'Agente de Viajes Freelance (Remoto)',
    team: 'Sales',
    type: 'Contract',
    location: 'Bogota',
    division: 'TREVOLUTION',
    summary: 'Remote freelance travel agent — LATAM clients.',
    postedAt: '2026-03-22',
  }),

  // ——— MANILA / CEBU, Philippines ——————————————————————————————
  make({
    slug: 'travel-sales-agent-cebu',
    title: 'Travel sales agent / call center / BPO in Cebu City',
    team: 'Sales',
    type: 'Full-time',
    location: 'Cebu',
    division: 'TREVOLUTION',
    summary: 'BPO-style travel ticketing sales, English-speaking markets.',
    postedAt: '2026-04-03',
  }),
  make({
    slug: 'travel-sales-agent-manila',
    title: 'Travel sales agent / call center / BPO in Manila',
    team: 'Sales',
    type: 'Full-time',
    location: 'Manila',
    division: 'TREVOLUTION',
    summary: 'BPO-style travel ticketing sales from Manila.',
    postedAt: '2026-04-04',
  }),
  make({
    slug: 'talent-acquisition-specialist-manila',
    title: 'Talent acquisition specialist (5 months fixed term)',
    team: 'HR',
    type: 'Contract',
    location: 'Manila',
    division: 'TREVOLUTION',
    summary: 'Fixed-term recruiter hiring agents across APAC.',
    postedAt: '2026-03-19',
  }),

  // ——— DUBAI ————————————————————————————————————————————————————
  make({
    slug: 'business-development-manager-dubai',
    title: 'Business development manager',
    team: 'Sales',
    type: 'Full-time',
    location: 'Dubai',
    division: 'MULTIPASS',
    summary: 'Own BD for the Multipass product across the GCC.',
    postedAt: '2026-04-09',
  }),

  // ——— Remote / Contract (GLOBAL + regional) ——————————————————
  make({
    slug: 'freelance-travel-agent-remote-global',
    title: 'Freelance travel agent (Remote)',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote',
    division: 'TREVOLUTION',
    summary: 'Work from anywhere — ticket consolidation, your schedule.',
    postedAt: '2026-04-02',
  }),
  make({
    slug: 'independent-travel-manager-remote',
    title: 'Independent travel manager (Remote)',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote',
    division: 'TREVOLUTION',
    summary: 'Remote travel manager running a book of international accounts.',
    postedAt: '2026-03-31',
  }),
  make({
    slug: 'remote-travel-agent-freelance',
    title: 'Remote travel agent freelance',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote',
    division: 'TREVOLUTION',
    summary: 'Freelance remote ticketing, global pool of clients.',
    postedAt: '2026-04-07',
  }),
  make({
    slug: 'independent-travel-agent-latvia-remote',
    title: 'Independent travel agent (Remote) — Latvia',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote — Latvia',
    division: 'TREVOLUTION',
    summary: 'Latvia-based remote travel agent, Latvian / Russian / English.',
    postedAt: '2026-03-25',
  }),
  make({
    slug: 'independent-travel-agent-kenya',
    title: 'Independent travel agent — Kenya',
    team: 'Sales',
    type: 'Contract',
    location: 'Nairobi',
    division: 'TREVOLUTION',
    summary: 'Nairobi-based remote travel agent — English and Swahili.',
    postedAt: '2026-04-01',
  }),
  make({
    slug: 'travel-agent-freelance-south-africa',
    title: 'Travel agent — Freelance Remote (South Africa)',
    team: 'Sales',
    type: 'Contract',
    location: 'Johannesburg',
    division: 'TREVOLUTION',
    summary: 'South Africa–based freelance travel agent.',
    postedAt: '2026-03-28',
  }),
  make({
    slug: 'travel-manager-nigeria',
    title: 'Travel manager — Nigeria',
    team: 'Sales',
    type: 'Contract',
    location: 'Lagos',
    division: 'TREVOLUTION',
    summary: 'Lagos-based travel manager serving West African markets.',
    postedAt: '2026-04-06',
  }),
  make({
    slug: 'freelance-travel-agent-dreamport',
    title: 'Freelance travel agent (Dreamport)',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote',
    division: 'TREVOLUTION',
    summary: 'Join the Dreamport freelance travel agent network.',
    postedAt: '2026-03-21',
  }),
  make({
    slug: 'freelance-travel-manager-bangladesh',
    title: 'Freelance travel manager — Bangladesh',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote — Bangladesh',
    division: 'TREVOLUTION',
    summary: 'Remote Bangladesh-based travel manager.',
    postedAt: '2026-04-05',
  }),
  make({
    slug: 'remote-travel-agent-pakistan',
    title: 'Remote travel agent — Pakistan',
    team: 'Sales',
    type: 'Contract',
    location: 'Lahore',
    division: 'TREVOLUTION',
    summary: 'Pakistan-based remote travel agent.',
    postedAt: '2026-03-23',
  }),
  make({
    slug: 'freelance-travel-manager-sri-lanka',
    title: 'Freelance travel manager (Remote — Sri Lanka)',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote — Sri Lanka',
    division: 'TREVOLUTION',
    summary: 'Sri Lanka–based remote travel manager.',
    postedAt: '2026-04-08',
  }),
  make({
    slug: 'remote-travel-agent-indonesia',
    title: 'Remote travel agent — Indonesia',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote — Indonesia',
    division: 'TREVOLUTION',
    summary: 'Indonesia-based remote travel agent.',
    postedAt: '2026-03-18',
  }),
  make({
    slug: 'freelance-travel-manager-ethiopia',
    title: 'Freelance travel manager — Ethiopia',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote — Ethiopia',
    division: 'TREVOLUTION',
    summary: 'Ethiopia-based remote freelance travel manager.',
    postedAt: '2026-04-10',
  }),
  make({
    slug: 'remote-travel-agent-armenia',
    title: 'Remote travel agent — Armenia (English-speaking)',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote — Armenia',
    division: 'TREVOLUTION',
    summary: 'Armenia-based English-speaking remote travel agent.',
    postedAt: '2026-03-30',
  }),
  make({
    slug: 'remote-travel-agent-serbia',
    title: 'Remote travel agent — Serbia',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote — Serbia',
    division: 'TREVOLUTION',
    summary: 'Serbia-based remote travel agent.',
    postedAt: '2026-04-04',
  }),
  make({
    slug: 'agente-viajes-freelance-remoto-global',
    title: 'Agente de viajes freelance (Remoto)',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote — LATAM',
    division: 'TREVOLUTION',
    summary: 'Remote Spanish-speaking freelance travel agent.',
    postedAt: '2026-03-24',
  }),
  make({
    slug: 'freelance-travel-consultant-zimbabwe',
    title: 'Freelance travel consultant (Zimbabwe)',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote — Zimbabwe',
    division: 'TREVOLUTION',
    summary: 'Zimbabwe-based freelance consultant.',
    postedAt: '2026-04-02',
  }),
  make({
    slug: 'freelance-travel-agent-uganda',
    title: 'Freelance travel agent (Remote — Uganda)',
    team: 'Sales',
    type: 'Contract',
    location: 'Kampala',
    division: 'TREVOLUTION',
    summary: 'Kampala-based freelance travel agent.',
    postedAt: '2026-03-27',
  }),
  make({
    slug: 'freelance-travel-manager-remote',
    title: 'Freelance travel manager (Remote)',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote',
    division: 'TREVOLUTION',
    summary: 'Remote freelance travel manager, anywhere welcome.',
    postedAt: '2026-04-01',
  }),
  make({
    slug: 'travel-consultant-freelance',
    title: 'Travel consultant — Freelance',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote',
    division: 'TREVOLUTION',
    summary: 'Remote freelance travel consultant.',
    postedAt: '2026-03-20',
  }),
  make({
    slug: 'remote-travel-consultant',
    title: 'Remote-based travel consultant',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote',
    division: 'TREVOLUTION',
    summary: 'Fully remote travel consultant role.',
    postedAt: '2026-04-03',
  }),
  make({
    slug: 'remote-call-center-agent-dreamport',
    title: 'Remote call center agent (English) — travel consultant — Dreamport',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote',
    division: 'TREVOLUTION',
    summary: 'Remote call-centre agent on Dreamport — English-speaking markets.',
    postedAt: '2026-03-26',
  }),
  make({
    slug: 'freelance-travel-consultant-remote-global',
    title: 'Freelance travel consultant remote',
    team: 'Sales',
    type: 'Contract',
    location: 'Remote',
    division: 'TREVOLUTION',
    summary: 'Global remote pool — freelance travel consultant.',
    postedAt: '2026-03-15',
  }),
]

export function getJob(slug: string): Job | undefined {
  return JOBS.find((j) => j.slug === slug)
}

export function getJobsByBranch(branchSlug: string): Job[] {
  return JOBS.filter((j) => j.branch === branchSlug)
}

/** All unique locations used across JOBS, sorted alphabetically. */
export function getJobLocations(): string[] {
  return Array.from(new Set(JOBS.map((j) => j.location))).sort((a, b) =>
    a.localeCompare(b)
  )
}
