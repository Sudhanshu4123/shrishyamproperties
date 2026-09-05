export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedDate: string;
  author: string;
  readTime: string;
  excerpt: string;
  category: string;
  image: string;
  contentHtml: string;
  faqs: { question: string; answer: string }[];
  tags: string[];
}

export const BLOG_STORAGE_KEY = 'ssp_blogs_v1';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'best-sectors-to-buy-property-in-dwarka',
    title: 'Best Sectors to Buy Property in Dwarka: Comprehensive 2026 Guide',
    metaTitle: 'Best Sectors to Buy Property in Dwarka (2026) | Shri Shyam Associate',
    metaDescription: 'Discover the top sectors to buy residential builder floors, DDA flats, and society apartments in Dwarka, New Delhi. Connectivity, price trends & amenities explained.',
    publishedDate: '2026-01-15',
    author: 'Shri Shyam Editorial Team',
    readTime: '6 min read',
    excerpt: 'An in-depth analysis of Dwarka’s most sought-after residential sectors including Sector 6, Sector 7, Sector 10, Sector 21, and Sector 23 based on infrastructure, metro connectivity, and investment appreciation.',
    category: 'Buying Guide',
    image: '/images/luxury_builder_floor_dwarka_1786010981126.png',
    tags: ['Dwarka Real Estate', 'Builder Floors', 'Property in Dwarka', 'Sector 6', 'Sector 7', 'Sector 23'],
    faqs: [
      {
        question: 'Which sector is best for families buying a home in Dwarka?',
        answer: 'Dwarka Sector 6 and Sector 7 are widely considered the best for families due to proximity to reputed schools, established markets like Ramphal Chowk, healthcare facilities (such as Manipal Hospital nearby), and quiet residential pockets.'
      },
      {
        question: 'What is the price range for builder floors in prime Dwarka sectors?',
        answer: 'In sectors like 6, 7, 8, and 23, 2 BHK builder floors range between ₹55 Lakhs to ₹95 Lakhs, 3 BHK luxury builder floors range between ₹1.25 Crore to ₹2.60 Crore, and spacious 4 BHK luxury floors range between ₹2.20 Crore to ₹4.50 Crore depending on floor, lift, and parking.'
      },
      {
        question: 'How is connectivity from Dwarka Sector 21 and Sector 23?',
        answer: 'Sector 21 hosts the mega Delhi Metro interchange (Blue Line and Airport Express Line), offering direct connectivity to IGI Airport in 5 minutes and Connaught Place in 20 minutes. Sector 23 is adjacent to Yashobhoomi (IICC) and the upcoming Diplomatic Enclave.'
      }
    ],
    contentHtml: `
      <h2>Introduction to Dwarka Real Estate</h2>
      <p>Dwarka, New Delhi (also known as the "Sub-City"), is one of Asia’s largest planned residential areas. Designed with wide master roads, dedicated sector green belts, DDA sports complexes, and extensive metro connectivity across the Blue Line, Magenta Line, and Airport Express Line, Dwarka is a primary choice for homebuyers in Delhi NCR.</p>
      
      <h2>1. Dwarka Sector 6 & Sector 7: The Lifestyle & Convenience Hub</h2>
      <p><strong>Key Highlights:</strong> Central location, Ramphal Chowk commercial market, top-tier schools, and rapid access to Sector 9 & Sector 10 metro stations.</p>
      <p>Sector 6 and Sector 7 represent the residential heartbeat of Dwarka. If you are looking for luxury 3 BHK and 4 BHK builder floors with dedicated stilt parking, private lifts, and branded fittings, these sectors are among the top choices. The bustling Ramphal Chowk market provides everything from organic groceries to healthcare and fine dining.</p>

      <h2>2. Dwarka Sector 21 & Sector 23: High Growth & Global Connectivity</h2>
      <p><strong>Key Highlights:</strong> Dwarka Sector 21 Metro Interchange, Yashobhoomi Convention Centre, Delhi Golf Course, and direct proximity to Dwarka Expressway.</p>
      <p>For investors and buyers prioritizing long-term appreciation, Sectors 21, 22, and 23 offer unprecedented growth potential. The completion of Yashobhoomi (India International Convention and Expo Centre) and the international Diplomatic Enclave in Sector 24 have positioned these sectors as prime luxury zones.</p>

      <h2>3. Dwarka Sector 10, 11 & 12: Well-Organized Society Living</h2>
      <p><strong>Key Highlights:</strong> CGHS societies, DDA SFS flats, City Centre Mall, and walking distance to Blue Line metro stations.</p>
      <p>Sectors 10 through 12 are renowned for their peaceful Cooperative Group Housing Societies (CGHS). These sectors feature multi-storey gated communities with 24/7 security, lush internal parks, and dedicated community halls.</p>

      <h2>Price Trends & Investment Outlook (2026)</h2>
      <p>With infrastructure milestones like the Urban Extension Road II (UER-II) and Dwarka Expressway fully operational, property values in Dwarka have shown steady capital appreciation of 12%–18% year-over-year. Ready-to-move builder floors with clear freehold titles remain the fastest-selling asset class.</p>

      <h2>Summary: Which Sector Should You Choose?</h2>
      <ul>
        <li><strong>For Immediate Family Living:</strong> Sector 6, Sector 7, Sector 8</li>
        <li><strong>For Airport & Metro Commuters:</strong> Sector 21, Sector 22, Sector 8</li>
        <li><strong>For Luxury & High Appreciation:</strong> Sector 23, Sector 19, Sector 11</li>
      </ul>
    `
  },
  {
    slug: 'documents-required-for-buying-property-in-delhi',
    title: 'Essential Documents Required for Buying Property in Delhi: Complete Checklist',
    metaTitle: 'Documents Required for Buying Property in Delhi | Shri Shyam Associate',
    metaDescription: 'Complete legal checklist of documents required for buying a flat, builder floor, or plot in Delhi. Title deed, mutation, RERA, encumbrance certificate, and NOCs explained.',
    publishedDate: '2026-01-28',
    author: 'Legal Advisory Desk',
    readTime: '7 min read',
    excerpt: 'Avoid legal pitfalls when buying real estate in Delhi. Here is the definitive list of ownership deeds, municipal approvals, conversion certificates, and banking clearances you must verify.',
    category: 'Legal & Advice',
    image: '/images/dwarka_society_flat_1786010993235.png',
    tags: ['Property Legal', 'Freehold Title', 'Delhi Property Registration', 'DDA Conveyance Deed', 'Sub-Registrar Delhi'],
    faqs: [
      {
        question: 'What is the most critical document to verify before buying a flat in Delhi?',
        answer: 'The chain of Title Deeds (Sale Deed / Conveyance Deed from DDA or previous owners) traced back 30 years is the most critical document to ensure clear ownership and avoid disputed titles.'
      },
      {
        question: 'Are builder floors in Dwarka freehold or leasehold?',
        answer: 'Most residential plots and builder floors in Dwarka are freehold properties. If a property was originally allotted by DDA on a leasehold basis, verify that a registered DDA Freehold Conveyance Deed exists.'
      },
      {
        question: 'How do I check if a property has an existing bank loan or encumbrance?',
        answer: 'You can obtain an Encumbrance Certificate (EC) from the Sub-Registrar office or request a Non-Encumbrance Certificate from a legal advocate. If mortgaged, the original title deeds will be held by the lending bank.'
      }
    ],
    contentHtml: `
      <h2>Why Title Due Diligence is Critical in Delhi</h2>
      <p>Purchasing a home is one of the most substantial financial decisions of your life. In Delhi, real estate transactions require thorough legal scrutiny to verify that the seller has an undisputed, marketable freehold title free from litigation, unauthorized construction notices, or pending municipal dues.</p>

      <h2>1. Mother Title Deed / Chain of Title</h2>
      <p>The chain of title traces the history of property ownership from the original allotment (such as DDA or MCD) to the current seller. In Delhi, a 30-year title search by an experienced legal advisor is recommended to ensure no gaps in previous Sale Deeds, Gift Deeds, or Relinquishment Deeds.</p>

      <h2>2. DDA Conveyance Deed (Freehold Conversion)</h2>
      <p>For DDA flats and society apartments originally allotted on a 99-year leasehold, check the registered Conveyance Deed issued by the Delhi Development Authority. Freehold status gives the buyer absolute ownership rights and enables seamless bank home loan approvals.</p>

      <h2>3. Sanctioned Building Plan & Completion Certificate</h2>
      <p>For independent builder floors, verify that the architectural building plan was sanctioned by MCD/DDA and that construction complies with prescribed FAR (Floor Area Ratio) and height regulations.</p>

      <h2>4. Mutation Certificate & Property Tax Receipts</h2>
      <p>Ensure that the property is duly mutated in the municipal records (MCD) under the seller’s name and that all property tax payments (UPIC) are updated up to the current financial year.</p>

      <h2>5. No Objection Certificates (NOCs) & Utility Clearances</h2>
      <ul>
        <li><strong>Electricity Board (BSES Rajdhani):</strong> Zero-dues bill clearance and meter transfer NOC.</li>
        <li><strong>Delhi Jal Board (DJB):</strong> Water connection dues clearance.</li>
        <li><strong>RWA / Society NOC:</strong> Clearance certificate from the management committee for society flats.</li>
      </ul>
    `
  },
  {
    slug: 'builder-floors-vs-dda-flats-in-dwarka',
    title: 'Builder Floors vs DDA Flats in Dwarka: Which Should You Buy?',
    metaTitle: 'Builder Floors vs DDA Flats in Dwarka: Detailed Comparison | Shri Shyam Associate',
    metaDescription: 'Compare Builder Floors vs DDA Flats in Dwarka, Delhi. Evaluate space, privacy, parking, construction quality, maintenance costs, and resale value to make the right choice.',
    publishedDate: '2026-02-05',
    author: 'Dwarka Property Experts',
    readTime: '5 min read',
    excerpt: 'Detailed comparison between independent builder floors and DDA apartments in Dwarka covering pricing, carpet area, stilt parking, lift access, maintenance, and long-term appreciation.',
    category: 'Property Comparison',
    image: '/images/luxury_penthouse_interior_1786011006488.png',
    tags: ['Builder Floors', 'DDA Flats', 'Dwarka Comparison', 'Property Investment', 'Luxury Living'],
    faqs: [
      {
        question: 'Why are builder floors becoming more popular than DDA flats in Dwarka?',
        answer: 'Builder floors offer significantly larger carpet area, modern Italian marble flooring, modular kitchens with chimneys, dedicated stilt parking, and private automatic lifts compared to older DDA construction.'
      },
      {
        question: 'Which has lower maintenance: DDA flats or builder floors?',
        answer: 'DDA flats generally have minimal monthly maintenance fees, while builder floors share lift and common electricity maintenance among only 4 to 5 families, making monthly costs very predictable and manageable.'
      }
    ],
    contentHtml: `
      <h2>The Real Estate Landscape in Dwarka</h2>
      <p>When searching for a residential home in Dwarka, buyers invariably compare two prominent property formats: <strong>Independent Luxury Builder Floors</strong> and <strong>DDA (Delhi Development Authority) Flats</strong>. Each format has distinct advantages depending on your lifestyle preferences, family size, and budget.</p>

      <h2>Key Comparison Matrix</h2>
      <table class="w-full border-collapse text-left my-4 text-xs sm:text-sm">
        <thead>
          <tr class="bg-teal-50 border-b border-teal-200 text-teal-900 font-bold">
            <th class="p-3">Feature</th>
            <th class="p-3">Luxury Builder Floor</th>
            <th class="p-3">DDA Flat (MIG / HIG)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr>
            <td class="p-3 font-semibold">Carpet Area</td>
            <td class="p-3 text-emerald-700 font-medium">Larger (e.g. 3 BHK: 1200–1600 sq.ft)</td>
            <td class="p-3 text-slate-600">Standard (e.g. 3 BHK: 850–1100 sq.ft)</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold">Floor Finishes & Interior</td>
            <td class="p-3 text-emerald-700 font-medium">Premium Italian marble, modular kitchen, false ceiling</td>
            <td class="p-3 text-slate-600">Basic finishes (requires renovation)</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold">Parking</td>
            <td class="p-3 text-emerald-700 font-medium">Dedicated stilt parking slots with EV provision</td>
            <td class="p-3 text-slate-600">Open community parking (subject to availability)</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold">Lift Access</td>
            <td class="p-3 text-emerald-700 font-medium">High-speed automatic OTIS/Kone lift with ARD</td>
            <td class="p-3 text-slate-600">Present only in multi-storey DDA towers</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold">Price Range (3 BHK)</td>
            <td class="p-3 font-bold text-slate-800">₹1.35 Cr – ₹2.50 Cr</td>
            <td class="p-3 font-bold text-slate-800">₹1.10 Cr – ₹1.80 Cr</td>
          </tr>
        </tbody>
      </table>

      <h2>Conclusion: What Fits Your Needs?</h2>
      <p>If you prioritize modern luxury, spacious rooms, private elevator access, and designated parking in prime residential sectors (Sector 6, 7, 8, 23), a <strong>luxury builder floor</strong> is the superior choice. If you prefer low-density open green grounds and entry-level pricing, a <strong>DDA flat</strong> is worth exploring.</p>
    `
  },
  {
    slug: '2-bhk-vs-3-bhk-in-dwarka',
    title: '2 BHK vs 3 BHK in Dwarka: Budget, Space & ROI Comparison',
    metaTitle: '2 BHK vs 3 BHK in Dwarka: Price, Space & ROI Analysis | Shri Shyam Associate',
    metaDescription: 'Deciding between a 2 BHK and 3 BHK in Dwarka? Compare floor areas, price brackets, rental yields, family comfort, and long-term resale returns in New Delhi.',
    publishedDate: '2026-02-12',
    author: 'Market Research Team',
    readTime: '6 min read',
    excerpt: 'Detailed financial and lifestyle analysis comparing 2 BHK and 3 BHK properties in Dwarka, including rental yield calculations, EMI comparisons, and future liquidity.',
    category: 'Market Trends',
    image: '/images/hero_luxury_villa_3d.png',
    tags: ['2 BHK in Dwarka', '3 BHK in Dwarka', 'Rental Yield', 'Home Loan EMI', 'Dwarka Real Estate'],
    faqs: [
      {
        question: 'What is the average monthly rent for 2 BHK vs 3 BHK in Dwarka?',
        answer: 'A 2 BHK in Dwarka commands a monthly rent of ₹18,000 to ₹28,000 depending on furnishing and sector. A 3 BHK builder floor or society apartment typically rents for ₹30,000 to ₹55,000 per month.'
      },
      {
        question: 'Which configuration offers better resale liquidity in Dwarka?',
        answer: '3 BHK builder floors in Dwarka currently have the highest demand and fastest resale liquidity, as most nuclear and growing families prioritize having a third bedroom for children or a dedicated home office.'
      }
    ],
    contentHtml: `
      <h2>The Dwarka Housing Decision</h2>
      <p>One of the most frequent dilemmas faced by homebuyers in Delhi is choosing between a compact, budget-friendly <strong>2 BHK flat</strong> and a spacious, future-proof <strong>3 BHK builder floor</strong>. Let us break down the financials and practical considerations.</p>

      <h2>1. Space Utilization & Family Growth</h2>
      <p>A standard 2 BHK in Dwarka offers between 750 to 950 sq.ft. of super area, which is well-suited for young couples or retirees. However, as families grow or when accommodating visiting parents and work-from-home setups, a 3 BHK (1200 to 1600 sq.ft.) provides the essential flexibility that prevents the need to relocate a few years later.</p>

      <h2>2. Financials & Price Spread</h2>
      <ul>
        <li><strong>2 BHK Builder Floors / Flats:</strong> ₹55 Lakhs to ₹95 Lakhs</li>
        <li><strong>3 BHK Builder Floors:</strong> ₹1.25 Crore to ₹2.60 Crore</li>
      </ul>
      <p>While the absolute price is higher for a 3 BHK, the per-square-foot rate is often more cost-effective due to economies of scale in construction and land valuation.</p>

      <h2>3. Rental Yield & Appreciation</h2>
      <p>Both 2 BHK and 3 BHK configurations enjoy virtually 0% vacancy rates in Dwarka due to high rental demand from professionals working in Cyber City Gurugram, Aerocity, and Central Delhi. 3 BHK properties have consistently demonstrated higher capital appreciation over 5-year holding periods.</p>
    `
  },
  {
    slug: 'things-to-check-before-buying-property-in-dwarka',
    title: '10 Things to Check Before Buying a Property in Dwarka',
    metaTitle: '10 Things to Check Before Buying Property in Dwarka | Shri Shyam Associate',
    metaDescription: 'Essential 10-point inspection guide before buying any property in Dwarka, Delhi. Water supply, parking, lift, structural quality, registry, and title verification tips.',
    publishedDate: '2026-02-20',
    author: 'Quality & Inspection Desk',
    readTime: '6 min read',
    excerpt: 'A practical, on-ground inspection guide covering water availability, parking allocation, sub-registrar verification, construction materials, and RERA compliance in Dwarka.',
    category: 'Buyer Guide',
    image: '/images/luxury_builder_floor_dwarka_1786010981126.png',
    tags: ['Site Inspection', 'Dwarka Buying Tips', 'Freehold Title', 'Water Supply Dwarka', 'Property Checklist'],
    faqs: [
      {
        question: 'How is the drinking water supply in Dwarka?',
        answer: 'Dwarka receives water from the Delhi Jal Board (DJB) through the Dwarka Water Treatment Plant. Most modern builder floors and societies are equipped with dual water systems: DJB municipal supply and backup boring/underground reservoirs.'
      },
      {
        question: 'Can I get a home loan on builder floors in Dwarka?',
        answer: 'Yes, all builder floors constructed on sanctioned freehold plots with registered conveyance deeds are eligible for home loans up to 80%–90% from nationalized and private banks like SBI, HDFC, ICICI, and Axis Bank.'
      }
    ],
    contentHtml: `
      <h2>Your Practical Checklist Before Signing an Agreement</h2>
      <p>To ensure total peace of mind and protect your hard-earned investment, use this 10-point checklist before making a token advance payment on any Dwarka property.</p>

      <h2>1. Freehold vs Leasehold Status</h2>
      <p>Always verify whether the property has an executed DDA Conveyance Deed. Freehold properties have clear title transferability at the Sub-Registrar office (Kapashere / Dwarka Sector 10).</p>

      <h2>2. Dedicated Stilt Parking Allotment</h2>
      <p>Check the physical ground floor stilt parking layout. Ensure your floor comes with demarcated, unblocked car parking slots specified in the sale agreement.</p>

      <h2>3. Independent Water & Electricity Meters</h2>
      <p>Confirm that the floor has separate BSES Rajdhani electricity meters with adequate sanctioned load (typically 5KW–8KW for 3/4 BHK) and an independent DJB water connection.</p>

      <h2>4. Elevator Specifications & ARD (Automatic Rescue Device)</h2>
      <p>Inspect the elevator installation. Verified builder floors built by quality contractors include branded automatic lifts with battery-powered ARD safety features in case of power cuts.</p>

      <h2>5. Roof Rights & Terrace Access</h2>
      <p>Clarify roof rights in the agreement. Typically, the top floor builder floor holds terrace ownership or shared rights for water tanks and solar panels.</p>

      <h2>6. Structural Quality & Waterproofing</h2>
      <p>Inspect bathroom plumbing, sunken slab waterproofing, and exterior anti-fungal paint to ensure zero seepage issues.</p>
    `
  }
];

export async function fetchBlogPostsApi(): Promise<BlogPost[]> {
  try {
    const res = await fetch('/api/blogs', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(data));
          window.dispatchEvent(new Event('storage'));
        }
        return data;
      }
    }
  } catch (error) {
    console.warn('Could not fetch blogs from /api/blogs, falling back to local storage:', error);
  }
  return getAllBlogPosts();
}

export async function createBlogPostApi(post: BlogPost): Promise<BlogPost[]> {
  try {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (res.ok) {
      const result = await res.json();
      if (result.blogs) {
        saveBlogPosts(result.blogs);
        return result.blogs;
      }
    }
  } catch (error) {
    console.error('Error in createBlogPostApi:', error);
  }
  const current = getAllBlogPosts();
  const updated = [post, ...current.filter(b => b.slug !== post.slug)];
  saveBlogPosts(updated);
  return updated;
}

export async function updateBlogPostApi(post: BlogPost): Promise<BlogPost[]> {
  try {
    const res = await fetch('/api/blogs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (res.ok) {
      const result = await res.json();
      if (result.blogs) {
        saveBlogPosts(result.blogs);
        return result.blogs;
      }
    }
  } catch (error) {
    console.error('Error in updateBlogPostApi:', error);
  }
  const current = getAllBlogPosts();
  const updated = current.map(b => (b.slug === post.slug ? post : b));
  saveBlogPosts(updated);
  return updated;
}

export async function deleteBlogPostApi(slug: string): Promise<BlogPost[]> {
  try {
    const res = await fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const result = await res.json();
      if (result.blogs) {
        saveBlogPosts(result.blogs);
        return result.blogs;
      }
    }
  } catch (error) {
    console.error('Error in deleteBlogPostApi:', error);
  }
  const current = getAllBlogPosts();
  const updated = current.filter(b => b.slug !== slug);
  saveBlogPosts(updated);
  return updated;
}

export function getAllBlogPosts(): BlogPost[] {
  if (typeof window === 'undefined') {
    try {
      // Server-side dynamic check for persistent blogs.json
      const fs = require('fs');
      const path = require('path');
      const blogsPath = path.join(process.cwd(), 'data', 'blogs.json');
      if (fs.existsSync(blogsPath)) {
        const raw = fs.readFileSync(blogsPath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback to static constant
    }
    return BLOG_POSTS;
  }

  try {
    const stored = localStorage.getItem(BLOG_STORAGE_KEY);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } else {
      // First time initialization in browser
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(BLOG_POSTS));
    }
  } catch (e) {
    console.warn('Error reading blog posts from storage:', e);
  }
  return BLOG_POSTS;
}

export function saveBlogPosts(posts: BlogPost[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new Event('storage'));
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find(p => p.slug === slug);
}

