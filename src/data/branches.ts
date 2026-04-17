export type Branch = {
  slug: string
  city: string
  country: string
  countryCode: string
  tagline: string
  description: string
  established: string
  staff: string
  address: string
  focus: string[]
  image: string
  companies: string[]
}

export const BRANCHES: Branch[] = [
  {
    slug: 'tashkent',
    city: 'Tashkent',
    country: 'Uzbekistan',
    countryCode: 'UZ',
    tagline: 'Headquarters',
    description:
      'Our flagship office in Tashkent opened in 2014 and remains the operational heart of Big Axel Group. Home to our largest sales floor, executive team, and a multilingual support desk serving clients across Central Asia and the Middle East.',
    established: '2014',
    staff: '120+',
    address: 'Amir Temur Avenue, Tashkent, Uzbekistan',
    focus: ['Airline ticketing', 'Corporate travel', 'Tech & back office', 'Executive operations'],
    image:
      'https://en.wikipedia.org/wiki/Special:FilePath/Nest_One_Tashkent.jpg?width=1600',
    companies: ['summitstone', 'bigaxel-tech'],
  },
  {
    slug: 'namangan',
    city: 'Namangan',
    country: 'Uzbekistan',
    countryCode: 'UZ',
    tagline: 'Regional hub',
    description:
      'The Namangan office is our second Uzbek location, focused on regional sales, bilingual customer support, and training new agents. It plays a key role in reaching clients across the Fergana Valley and neighbouring markets.',
    established: '2019',
    staff: '45+',
    address: 'Namangan, Uzbekistan',
    focus: ['Regional sales', 'Customer support', 'Agent training'],
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Mulla_Qirg%CA%BBiz_madrasasi_04.jpg?width=1600',
    companies: ['summitstone'],
  },
  {
    slug: 'delhi',
    city: 'Delhi',
    country: 'India',
    countryCode: 'IN',
    tagline: 'South Asia gateway',
    description:
      'Our Delhi team is the engine behind Lumovia India, running large-scale airline ticket consolidation, night shifts for transatlantic markets, and multilingual customer care across the subcontinent.',
    established: '2020',
    staff: '80+',
    address: 'Gurgaon, Delhi NCR, India',
    focus: ['Ticket consolidation', 'Night-shift operations', '24/7 care'],
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Jama_Masjid_2011.jpg?width=1600',
    companies: ['lumovia-india'],
  },
  {
    slug: 'egypt',
    city: 'Cairo',
    country: 'Egypt',
    countryCode: 'EG',
    tagline: 'MENA operations',
    description:
      'From Cairo we service the Middle East and North Africa region. Lumovia Egypt handles Arabic-speaking markets, outbound leisure sales, and growing partnerships with regional carriers.',
    established: '2022',
    staff: '35+',
    address: 'New Cairo, Egypt',
    focus: ['MENA leisure sales', 'Arabic support', 'Carrier partnerships'],
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Cairo_From_Tower_(cropped).jpg?width=1600',
    companies: ['lumovia-egypt'],
  },
  {
    slug: 'riga',
    city: 'Riga',
    country: 'Latvia',
    countryCode: 'LV',
    tagline: 'European desk',
    description:
      'Our Riga presence connects Big Axel to the European travel corridor. The team handles EU-facing clients, Schengen ticketing, and coordinates with European airline partners across the Baltics and beyond.',
    established: '2023',
    staff: '20+',
    address: 'Riga, Latvia',
    focus: ['EU clients', 'Schengen ticketing', 'European carriers'],
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Riga_(33844464828).jpg?width=1600',
    companies: ['summitstone'],
  },
]

export function getBranch(slug: string) {
  return BRANCHES.find((b) => b.slug === slug)
}
