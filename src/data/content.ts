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

export type BlogPost = {
  slug: string
  meta: string
  title: string
  text: string
  image: string
  author: string
  readTime: string
  content: string[]
}

export const BLOG: BlogPost[] = [
  {
    slug: 'corporate-event-vibes-2023',
    meta: 'Event · 25 December 2023',
    title: 'Capturing the vibes at the Big Axel Group corporate event',
    text: 'A night with the whole Tashkent floor — recap of the 2023 corporate gathering and what we took away from it.',
    image:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fm=webp&fit=crop&w=1600&q=80',
    author: 'Big Axel Editorial',
    readTime: '3 min read',
    content: [
      'Once a year, we pause the sales floor, lift the dress code, and bring everyone — Tashkent agents, Delhi night-shift team, Riga engineers, Cairo support, Namangan trainers — into one room. The 2023 corporate event was no different. If anything, it felt larger: more offices represented, more languages colliding at the snack table, more quiet agents with surprising karaoke ranges.',
      'The rhythm of the evening is always the same. Awards first — Agent of the Year, Rookie of the Year, a handful of behind-the-scenes honours for the ops team that keeps the whole machine running. Then dinner. Then the floor opens up and the reserved polite version of the company melts into a real one.',
      'What struck us most was how fast the group is growing up. Two years ago we did this in a single medium-sized room. In 2023 we outgrew the venue twice over. Departments that used to barely know each other traded contacts. New starters from Gurugram met the Tashkent lead they had only spoken to through Slack.',
      'A few things we took away: the culture is travelling across offices well; mentorship is happening between cities, not just within them; and the next generation of team leads is already in the room. 2024 calendar is being planned — expect something bigger, with a stronger creative direction and a few surprises we cannot spoil here.',
      'Thanks to everyone who showed up, to the ops crew who made it happen, and to the year we just closed. Onward to the next one.',
    ],
  },
  {
    slug: 'ready-to-know-us',
    meta: 'Instagram post · 18 February 2023',
    title: 'Are you ready to be informed about us?',
    text: 'A short primer on who we are, who we hire, and what we actually do across travel, finance and tech.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fm=webp&fit=crop&w=1600&q=80',
    author: 'Big Axel Editorial',
    readTime: '2 min read',
    content: [
      'Big Axel Group is a family of companies across travel, finance, entertainment and technology — built from a single sales floor in Tashkent that opened in 2014 and quietly grew into five offices serving clients in fifty countries.',
      'The core of the business is airline-ticket consolidation. SummitStone, Lumovia India, Lumovia Egypt and Bigaxel Tech together handle the sales, the operations, the late-night ticketing for transatlantic markets, and the software that ties it all together. Around that core we run customer support, marketing, finance and product teams that keep the whole thing scaling.',
      'People matter more than process here. Most of the team started with us — as new agents, as interns, as first-role engineers — and grew into senior roles. Mentorship is not a policy, it is a daily habit. If you walk the Tashkent floor at 10 AM, you will find a team lead on a call with someone who joined three weeks ago.',
      'If any of that sounds like a place you would like to work, the /jobs page lists every opening we are actively hiring for — across sales, engineering, HR, finance, marketing and design.',
    ],
  },
  {
    slug: 'success-in-harmony',
    meta: 'Instagram post · 5 April 2023',
    title: 'Success is in harmony',
    text: 'How we think about teamwork across five offices, three companies and roughly a dozen time zones.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fm=webp&fit=crop&w=1600&q=80',
    author: 'Big Axel Editorial',
    readTime: '4 min read',
    content: [
      'Travel is an asynchronous business. A booking made in Tashkent is ticketed in Delhi, supported by Cairo overnight, and reported by Riga the next morning. That is a lot of hand-offs, and a lot of opportunities for something to break. What keeps it all in harmony is not the tools — although we love our tools — it is a set of quiet agreements between people.',
      'The first agreement is about ownership. A ticket that goes wrong has exactly one person responsible for making it right, and that person is the one who touched it last. Nobody throws it over a wall. We have never made this a formal policy; it is simply how everyone started and nobody changed it.',
      'The second agreement is about speed. We would rather a rough answer in an hour than a polished answer in a day. On the sales floor that is obvious — the client is waiting — but it holds internally too. Decisions are pushed down to the person closest to the problem.',
      'The third agreement is about patience. New joiners have a six-month ramp. Team leads know it. We do not judge performance in a way that tells someone they are behind in week three of a six-month arc. That single habit has kept turnover low and the bench deep.',
      'None of this is a framework we invented. It is the culture that emerged from growing slowly and keeping the same people around long enough for habits to stick. If you are reading this and thinking about joining, that is the place you are joining.',
    ],
  },
]
