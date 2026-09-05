export interface LocationDetail {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  connectivity: string[];
  landmarks: string[];
  propertyTypes: string[];
  avgPriceBhk: { bhk: string; price: string; area: string }[];
  faqs: { question: string; answer: string }[];
}

export const LOCATION_DETAILS: Record<string, LocationDetail> = {
  'dwarka': {
    slug: 'dwarka',
    name: 'Dwarka, New Delhi',
    metaTitle: 'Property in Dwarka New Delhi | Real Estate Agent & Builder Floors | Shri Shyam Associate',
    metaDescription: 'Explore verified residential property, luxury builder floors, DDA flats and commercial spaces in Dwarka, New Delhi. Comprehensive sector guide, price trends & 100% legal verification.',
    heading: 'Real Estate in Dwarka, New Delhi — Complete City Hub',
    intro: 'Dwarka, located in South West Delhi, is one of Asia’s largest master-planned residential sub-cities. Boasting wide 60-meter and 45-meter sector roads, dedicated green belts, DDA sports complexes in every quadrant, and exceptional tri-line metro connectivity (Blue Line, Magenta Line, and Airport Express Line), Dwarka is the premier destination for homebuyers and commercial investors alike.',
    connectivity: [
      'Delhi Metro Blue Line (Dwarka Sector 8 to Sector 21)',
      'Airport Express Line (Direct 5-min link to IGI Airport Terminal 3)',
      'Dwarka Expressway (NH-248BB) connecting directly to Gurugram',
      'Urban Extension Road II (UER-II) connecting North & West Delhi',
      'Dedicated 100-ft Sector Arterial Roads'
    ],
    landmarks: [
      'Yashobhoomi (IICC Convention Centre, Sector 25)',
      'Delhi Golf Course (Sector 24)',
      'Vardhaman City Mall (Sector 7, Vaishali)',
      'Manipal Hospital & Venkateshwar Hospital',
      'DDA Mega Sports Complex (Sector 11 & Sector 17)'
    ],
    propertyTypes: [
      'Luxury Builder Floors (2, 3, 4, 5 BHK)',
      'Cooperative Group Housing Society (CGHS) Apartments',
      'DDA SFS, MIG & HIG Flats',
      'Commercial Retail Shops & Office Suites',
      'Freehold Residential Plots'
    ],
    avgPriceBhk: [
      { bhk: '2 BHK Builder Floor', price: '₹55 L – ₹95 L', area: '750 – 950 sq.ft' },
      { bhk: '3 BHK Luxury Floor', price: '₹1.25 Cr – ₹2.60 Cr', area: '1200 – 1650 sq.ft' },
      { bhk: '4 BHK Luxury Floor', price: '₹2.20 Cr – ₹4.50 Cr', area: '1800 – 2600 sq.ft' },
      { bhk: '5 BHK Penthouse', price: '₹3.80 Cr – ₹6.50 Cr', area: '3000 – 4500 sq.ft' }
    ],
    faqs: [
      {
        question: 'Who is the leading property dealer and home builder in Dwarka?',
        answer: 'Shri Shyam Associate (Shop No. 247, 2nd Floor, Vardhaman City Mall, Sector 7, Dwarka) is a premier property consultancy and turnkey home builder specializing in 100% verified freehold properties with 3D virtual tours. Call +91 9911956274.'
      },
      {
        question: 'Are properties in Dwarka eligible for bank home loans?',
        answer: 'Yes, 100% of freehold builder floors, society apartments, and DDA flats with clear conveyance deeds are eligible for home loans up to 80%–90% from SBI, HDFC, ICICI, and all leading financial institutions.'
      },
      {
        question: 'What are the top residential sectors in Dwarka?',
        answer: 'Dwarka Sector 6, Sector 7, Sector 8, Sector 10, Sector 11, Sector 21, and Sector 23 are the most popular sectors for buying residential builder floors and society apartments.'
      }
    ]
  },
  'dwarka-sector-6': {
    slug: 'dwarka-sector-6',
    name: 'Dwarka Sector 6',
    metaTitle: 'Property in Dwarka Sector 6 | 3 & 4 BHK Builder Floors for Sale | Shri Shyam Associate',
    metaDescription: 'Find verified 2, 3, and 4 BHK luxury builder floors and DDA flats in Dwarka Sector 6. Prime residential location near Central Market, top schools & metro.',
    heading: 'Property in Dwarka Sector 6 — Residential & Family Preferred Hub',
    intro: 'Dwarka Sector 6 is celebrated for its peaceful residential neighborhoods, proximity to Sector 6 Central Market, top-rated schools, and expansive community parks. It is one of the most mature sectors in Dwarka, offering premium 3 BHK and 4 BHK luxury builder floors with dedicated stilt parking and private lifts.',
    connectivity: [
      'Walking distance to Sector 9 & Sector 10 Metro Stations (Blue Line)',
      'Direct link to Main Central Road and Dwarka Sector 10 District Centre',
      '15 minutes drive to IGI Airport via Outer Ring Road',
      'Wide internal sector lanes with ample visitor parking'
    ],
    landmarks: [
      'Dwarka Sector 6 Central Market',
      'Manipal Hospital (Sector 6 / 10 link)',
      'DAV Public School & Mount Carmel School vicinity',
      'DDA Sector 6 District Park & Jogging Tracks'
    ],
    propertyTypes: [
      '3 BHK Luxury Builder Floors with Lift & Parking',
      '4 BHK Duplex Builder Floors',
      'DDA SFS Pocket 1 & Pocket 2 Apartments',
      'Commercial Local Shopping Centres (LSC)'
    ],
    avgPriceBhk: [
      { bhk: '2 BHK Builder Floor', price: '₹60 L – ₹95 L', area: '800 – 950 sq.ft' },
      { bhk: '3 BHK Luxury Floor', price: '₹1.35 Cr – ₹2.40 Cr', area: '1250 – 1600 sq.ft' },
      { bhk: '4 BHK Luxury Floor', price: '₹2.40 Cr – ₹3.90 Cr', area: '1900 – 2500 sq.ft' }
    ],
    faqs: [
      {
        question: 'Why is Sector 6 highly preferred by homebuyers in Dwarka?',
        answer: 'Sector 6 offers an ideal balance of peaceful residential tree-lined streets, reputed schools within walking distance, immediate access to Manipal Hospital, and the vibrant Sector 6 market.'
      },
      {
        question: 'What is the starting price for 3 BHK builder floors in Dwarka Sector 6?',
        answer: 'In Sector 6, 3 BHK luxury builder floors with dedicated stilt parking and automatic lift generally range from ₹1.35 Crore to ₹2.40 Crore based on carpet area and finish quality.'
      }
    ]
  },
  'dwarka-sector-7': {
    slug: 'dwarka-sector-7',
    name: 'Dwarka Sector 7',
    metaTitle: 'Property in Dwarka Sector 7 | Ramphal Chowk Builder Floors & Shops | Shri Shyam Associate',
    metaDescription: 'Verified builder floors, flats and commercial retail shops for sale in Dwarka Sector 7 (Ramphal Chowk & Vardhaman City Mall). Headquarters of Shri Shyam Associate.',
    heading: 'Property in Dwarka Sector 7 — The Commercial & Luxury Living Core',
    intro: 'Dwarka Sector 7 is the commercial and lifestyle epicenter of Dwarka, anchored by the iconic Ramphal Chowk market and Vardhaman City Mall. Headquartered here at Shop No. 247, 2nd Floor, Vardhaman City Mall, Shri Shyam Associate provides verified luxury builder floors, DDA flats, and retail commercial shops with the highest footfall in Dwarka.',
    connectivity: [
      'Direct link to Palam Flyover & Outer Ring Road',
      'Rapid access to Dwarka Sector 9 & Dashrathpuri Metro Stations',
      'Central bus connectivity and 24/7 e-rickshaw availability',
      'Direct 10-minute route to Aerocity and IGI Airport'
    ],
    landmarks: [
      'Ramphal Chowk High Street Market',
      'Vardhaman City Mall (Vaishali, Sector 7)',
      'Maxfort School & Shiksha Bharati College',
      'Ayushman Hospital & Sector 7 Healthcare Hub'
    ],
    propertyTypes: [
      'Ultra Luxury 3 & 4 BHK Builder Floors',
      'High-Footfall Commercial Retail Shops & Showrooms',
      'DDA Pocket 1, 2, 3 Residential Flats',
      'Office Spaces in Commercial Malls'
    ],
    avgPriceBhk: [
      { bhk: '2 BHK Builder Floor', price: '₹65 L – ₹1.05 Cr', area: '800 – 1000 sq.ft' },
      { bhk: '3 BHK Luxury Floor', price: '₹1.40 Cr – ₹2.65 Cr', area: '1300 – 1700 sq.ft' },
      { bhk: '4 BHK Luxury Floor', price: '₹2.50 Cr – ₹4.20 Cr', area: '2000 – 2700 sq.ft' },
      { bhk: 'Commercial Retail Shop', price: '₹35 L – ₹2.50 Cr', area: '100 – 600 sq.ft' }
    ],
    faqs: [
      {
        question: 'Where is the Shri Shyam Associate office located in Dwarka Sector 7?',
        answer: 'Our main office is located at Shop No. 247, 2nd Floor, Vardhaman City Mall, Vaishali, Sector 7, Dwarka, Delhi 110077. We are open 24 Hours for site visits and consultations. Call: +91 9911956274.'
      },
      {
        question: 'Why are commercial shops in Sector 7 Ramphal Chowk considered high yield?',
        answer: 'Ramphal Chowk is Dwarka’s busiest commercial high street with tens of thousands of daily footfalls, leading to minimal vacancy rates and steady rental yields of 7%–9% annually.'
      }
    ]
  },
  'dwarka-sector-21': {
    slug: 'dwarka-sector-21',
    name: 'Dwarka Sector 21',
    metaTitle: 'Property in Dwarka Sector 21 | Flats near Metro Interchange | Shri Shyam Associate',
    metaDescription: 'Find verified properties in Dwarka Sector 21 near Metro Interchange & Pacific D21 Mall. Luxury apartments, builder floors & penthouses with express airport link.',
    heading: 'Property in Dwarka Sector 21 — Metro Interchange & Express Hub',
    intro: 'Dwarka Sector 21 is Dwarka’s primary transportation and lifestyle gateway. Home to the massive Delhi Metro Blue Line and Airport Express Line interchange, Pacific D21 Mall, and adjacent to the world-class Delhi Golf Course in Sector 24, Sector 21 offers unmatched connectivity for frequent flyers, embassy staff, and corporate executives.',
    connectivity: [
      'Dwarka Sector 21 Mega Metro Interchange (Blue Line + Airport Express)',
      '5 minutes direct ride to IGI Airport Terminal 3',
      '20 minutes direct ride to New Delhi Railway Station & Connaught Place',
      'Immediate access to Dwarka Expressway (NH-248BB)'
    ],
    landmarks: [
      'Pacific D21 Mall & Multiplex',
      'Sector 21 Metro Interchange Complex',
      '18-Hole Championship Delhi Golf Course (Sector 24)',
      'Upcoming Diplomatic Enclave (Sector 24)'
    ],
    propertyTypes: [
      'Gated Society CGHS Apartments',
      'Luxury Builder Floors & Penthouses',
      'Commercial Retail & Food Court Outlets',
      'High-Rise Executive Suites'
    ],
    avgPriceBhk: [
      { bhk: '3 BHK Society Flat', price: '₹1.60 Cr – ₹2.75 Cr', area: '1400 – 1800 sq.ft' },
      { bhk: '4 BHK Luxury Apartment', price: '₹2.60 Cr – ₹4.50 Cr', area: '2100 – 3000 sq.ft' },
      { bhk: '5 BHK Duplex Penthouse', price: '₹4.20 Cr – ₹7.00 Cr', area: '3200 – 4800 sq.ft' }
    ],
    faqs: [
      {
        question: 'How fast can I reach IGI Airport from Dwarka Sector 21?',
        answer: 'From the Dwarka Sector 21 Metro Station, the Airport Express Line takes only 5 minutes to reach Terminal 3 and 10 minutes to reach Aerocity.'
      },
      {
        question: 'Are there high-end luxury society apartments in Sector 21?',
        answer: 'Yes, Sector 21 and neighboring Sector 22 & 23 host some of the finest CGHS multi-storey societies with clubhouses, swimming pools, tennis courts, and 3-tier security.'
      }
    ]
  },
  'dwarka-sector-23': {
    slug: 'dwarka-sector-23',
    name: 'Dwarka Sector 23',
    metaTitle: 'Property in Dwarka Sector 23 | Luxury Builder Floors & Villas | Shri Shyam Associate',
    metaDescription: 'Verified luxury builder floors, society apartments and plots in Dwarka Sector 23 near Yashobhoomi (IICC). Freehold registry & 3D virtual property tours.',
    heading: 'Property in Dwarka Sector 23 — Elite Luxury & Yashobhoomi Corridor',
    intro: 'Dwarka Sector 23 is one of the most prestigious and rapidly appreciating sectors in Delhi NCR. Bordered by the Yashobhoomi (India International Convention and Expo Centre), Sector 21 Metro Station, and the Diplomatic Enclave, Sector 23 is renowned for its wide green avenues, high-end society apartments, and elite luxury builder floors.',
    connectivity: [
      'Direct link to Yashobhoomi Metro Station & Sector 21 Metro Station',
      '2 minutes to Dwarka Expressway (NH-248BB)',
      '10 minutes to Aerocity and IGI Airport Terminal 3',
      'Rapid corridor to Cyber City Gurugram via Expressway'
    ],
    landmarks: [
      'Yashobhoomi (IICC Convention Centre)',
      'DDA Mega Sports Complex Sector 23',
      'Vardhaman Grand Market Sector 23',
      'Basava International School & Mount Carmel vicinity'
    ],
    propertyTypes: [
      'Ultra Luxury 3, 4, 5 BHK Builder Floors',
      'Duplex Penthouses with Private Terrace',
      'CGHS High-Rise Gated Societies',
      'Independent Freehold Villas'
    ],
    avgPriceBhk: [
      { bhk: '3 BHK Luxury Floor', price: '₹1.50 Cr – ₹2.80 Cr', area: '1350 – 1750 sq.ft' },
      { bhk: '4 BHK Luxury Floor', price: '₹2.60 Cr – ₹4.80 Cr', area: '2100 – 2900 sq.ft' },
      { bhk: '5 BHK Luxury Villa/Penthouse', price: '₹4.50 Cr – ₹8.50 Cr', area: '3500 – 5500 sq.ft' }
    ],
    faqs: [
      {
        question: 'What makes Dwarka Sector 23 a prime real estate investment in 2026?',
        answer: 'The operational Yashobhoomi convention hub, expansion of the Diplomatic Enclave, and direct signal-free access to Gurugram via Dwarka Expressway make Sector 23 one of Delhi’s highest capital appreciation micro-markets.'
      },
      {
        question: 'Can I find 4 BHK and 5 BHK builder floors in Sector 23?',
        answer: 'Yes, Sector 23 is famous for large-plot builder floors offering 4 BHK and 5 BHK layouts with 2 dedicated car parking slots, Italian marble, and terrace garden access.'
      }
    ]
  }
};

export function getLocationBySlug(slug: string): LocationDetail | undefined {
  return LOCATION_DETAILS[slug];
}
