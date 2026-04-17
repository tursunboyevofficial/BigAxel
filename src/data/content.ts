export type Airline = {
  name: string
  src: string
  code: string
  hub: string
  alliance?: 'Star Alliance' | 'SkyTeam' | 'Oneworld' | 'Independent'
  website: string
  fleet: string
}

export const AIRLINES: Airline[] = [
  { name: 'Air Canada', src: 'https://wework.uz/assets/imgs/airways-images/Air-Canada.jpg', code: 'AC', hub: 'Toronto Pearson (YYZ)', alliance: 'Star Alliance', website: 'https://www.aircanada.com', fleet: '190+ aircraft' },
  { name: 'Air France', src: 'https://wework.uz/assets/imgs/airways-images/airfrance.jpg', code: 'AF', hub: 'Paris Charles de Gaulle (CDG)', alliance: 'SkyTeam', website: 'https://www.airfrance.com', fleet: '220+ aircraft' },
  { name: 'All Nippon Airways', src: 'https://wework.uz/assets/imgs/airways-images/All%20Nippon-airways.jpg', code: 'NH', hub: 'Tokyo Haneda (HND)', alliance: 'Star Alliance', website: 'https://www.ana.co.jp', fleet: '220+ aircraft' },
  { name: 'American Airlines', src: 'https://wework.uz/assets/imgs/airways-images/American-airlines.jpg', code: 'AA', hub: 'Dallas/Fort Worth (DFW)', alliance: 'Oneworld', website: 'https://www.aa.com', fleet: '950+ aircraft' },
  { name: 'British Airways', src: 'https://wework.uz/assets/imgs/airways-images/British-airways.jpg', code: 'BA', hub: 'London Heathrow (LHR)', alliance: 'Oneworld', website: 'https://www.britishairways.com', fleet: '280+ aircraft' },
  { name: 'Cathay Pacific', src: 'https://wework.uz/assets/imgs/airways-images/Cathay-pacific.jpg', code: 'CX', hub: 'Hong Kong (HKG)', alliance: 'Oneworld', website: 'https://www.cathaypacific.com', fleet: '180+ aircraft' },
  { name: 'Emirates', src: 'https://wework.uz/assets/imgs/airways-images/emirates.jpg', code: 'EK', hub: 'Dubai (DXB)', alliance: 'Independent', website: 'https://www.emirates.com', fleet: '260+ aircraft' },
  { name: 'Etihad Airways', src: 'https://wework.uz/assets/imgs/airways-images/Etihad-airways.jpg', code: 'EY', hub: 'Abu Dhabi (AUH)', alliance: 'Independent', website: 'https://www.etihad.com', fleet: '90+ aircraft' },
  { name: 'KLM', src: 'https://wework.uz/assets/imgs/airways-images/KLM-airways.jpg', code: 'KL', hub: 'Amsterdam Schiphol (AMS)', alliance: 'SkyTeam', website: 'https://www.klm.com', fleet: '110+ aircraft' },
  { name: 'Korean Air', src: 'https://wework.uz/assets/imgs/airways-images/Korean-air.jpg', code: 'KE', hub: 'Seoul Incheon (ICN)', alliance: 'SkyTeam', website: 'https://www.koreanair.com', fleet: '160+ aircraft' },
  { name: 'Lufthansa', src: 'https://wework.uz/assets/imgs/airways-images/Lufthansa.jpg', code: 'LH', hub: 'Frankfurt (FRA)', alliance: 'Star Alliance', website: 'https://www.lufthansa.com', fleet: '280+ aircraft' },
  { name: 'Qantas Airways', src: 'https://wework.uz/assets/imgs/airways-images/Qantas-airways.jpg', code: 'QF', hub: 'Sydney (SYD)', alliance: 'Oneworld', website: 'https://www.qantas.com', fleet: '120+ aircraft' },
  { name: 'Singapore Airlines', src: 'https://wework.uz/assets/imgs/airways-images/Singapore-airlines.jpg', code: 'SQ', hub: 'Singapore Changi (SIN)', alliance: 'Star Alliance', website: 'https://www.singaporeair.com', fleet: '140+ aircraft' },
  { name: 'Turkish Airlines', src: 'https://wework.uz/assets/imgs/airways-images/Turkish-airlines.jpg', code: 'TK', hub: 'Istanbul (IST)', alliance: 'Star Alliance', website: 'https://www.turkishairlines.com', fleet: '440+ aircraft' },
  { name: 'United Airlines', src: 'https://wework.uz/assets/imgs/airways-images/United-airlines.jpg', code: 'UA', hub: 'Chicago O\u2019Hare (ORD)', alliance: 'Star Alliance', website: 'https://www.united.com', fleet: '1,000+ aircraft' },
  { name: 'Virgin Atlantic', src: 'https://wework.uz/assets/imgs/airways-images/Virgin-atlantic.jpg', code: 'VS', hub: 'London Heathrow (LHR)', alliance: 'SkyTeam', website: 'https://www.virginatlantic.com', fleet: '40+ aircraft' },
]

export const TEAM = [
  {
    name: 'Sardor Sharofaddinov',
    role: 'Senior Supervisor',
    quote:
      'Big Axel goes beyond being a group of companies in the travel, finance, entertainment, and technology sectors in 50 countries. For us, Big Axel is our daily partner, offering invaluable support during difficult times and sharing in our triumphs.',
  },
  {
    name: 'Abbos Tadjiyev',
    role: 'Director',
    quote:
      "Big Axel is more than just a typical business partner. It's a group of companies offering products and services across the travel, finance, entertainment, and technology sectors in 50 countries.",
  },
  {
    name: 'Behruz Sharofaddinov',
    role: 'Supervisor',
    quote:
      'Big Axel stands out as a network of companies serving the travel, finance, entertainment, and technology sectors in 50 countries. It is a steadfast collaborator, offering support when challenges appear and joining us in success.',
  },
]

export const BENEFITS = [
  { value: '30%', title: 'Female employees', text: 'We do support female team members.' },
  { value: '95%', title: 'Beginners', text: 'Most of our team members start their career here.' },
  { value: '100%', title: 'Competitive salary', text: 'Best income opportunities.' },
]

export const STATS = [
  { value: '5', label: 'Office locations' },
  { value: '200', label: 'Total employees' },
  { value: '10', label: 'Years experience' },
  { value: '10', label: 'Awards achievements' },
]

export const FAQ = [
  {
    q: 'What makes Big Axel Group unique in the airline ticket industry?',
    a: 'Innovative technology, a customer-first approach, and a commitment to sustainable travel. The booking platform is positioned as seamless for both users and employees.',
  },
  {
    q: 'How does Big Axel Group support professional development?',
    a: 'Through a growth-oriented culture, team support, and an environment that gives new people a place to learn, progress, and build confidence.',
  },
  {
    q: 'What is the company culture like at Big Axel Group?',
    a: 'The visible tone is collaborative, supportive, and people-centered, with a strong focus on partnership and career growth.',
  },
  {
    q: 'What benefits and perks does Big Axel Group offer?',
    a: 'High-paid jobs, balanced work conditions, and a career path that is welcoming to beginners.',
  },
]

export const BLOG = [
  {
    meta: 'Event . 25 December 2023',
    title: 'Capturing the vibes at the Big Axel Group corporate event',
    text: 'Event coverage with a stronger premium layout and clearer typographic hierarchy.',
  },
  {
    meta: 'Instagram post . 18 February 2023',
    title: 'Are you ready to be informed about us?',
    text: 'Short-form company update card with the same editorial energy as the original.',
  },
  {
    meta: 'Instagram post . 5 April 2023',
    title: 'Success is in harmony',
    text: "Used as a content tile to keep the source site's social-post storytelling feel.",
  },
]
