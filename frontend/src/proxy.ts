import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const HOME_MARKDOWN = `# Shri Shyam (Shri Shyam Associate / Shree Shyam Associates)

> Premier Real Estate Consultancy & Property Advisors in Dwarka, New Delhi. 100% verified luxury builder floors, DDA flats, CGHS society apartments, and commercial retail shops.

## Quick Contact
- **Phone / WhatsApp**: +91 9911956274
- **Email**: shrishyamproperties001@gmail.com
- **Office Location**: Dwarka Sector 7, Ramphal Chowk Area, New Delhi 110075, India
- **Coordinates**: 28.5823° N, 77.0700° E
- **Website**: https://shrishyamassociate.com

---

## Verified Real Estate Portfolios in Dwarka & Delhi NCR
1. **Luxury Builder Floors**: High-end 2 BHK, 3 BHK, 4 BHK, 5 BHK with dedicated lift, stilt parking, modular Italian kitchen, and branded fittings.
2. **Society & DDA Apartments**: Ready-to-move, freehold, gated society flats across Sectors 6, 7, 8, 10, 11, 12, 19, 21, 22, 23.
3. **Penthouses & Duplexes**: Exclusive luxury rooftop penthouses with private terrace gardens.
4. **Dwarka Expressway High-Rise Projects**: Sector 102 (Joyville Shapoorji Pallonji), luxury high-rise gated communities.
5. **Commercial Shops & Office Spaces**: High footfall retail shops in Sector 7 Ramphal Chowk and surrounding markets.

## Price Matrix
- **2 BHK Flats / Builder Floors**: ₹50 Lakhs – ₹95 Lakhs
- **3 BHK Luxury Builder Floors**: ₹1.25 Crore – ₹2.60 Crore
- **4 BHK Luxury Floors**: ₹2.20 Crore – ₹4.50 Crore
- **5 BHK Duplex Penthouses**: ₹3.80 Crore – ₹8.50 Crore
- **Commercial Retail / Shops**: ₹25 Lakhs – ₹3.50 Crore

## Navigation Links
- [All Properties](https://shrishyamassociate.com/properties)
- [About Us](https://shrishyamassociate.com/about)
- [Contact Office & Book Site Visit](https://shrishyamassociate.com/contact)
- [HTML Sitemap Directory](https://shrishyamassociate.com/sitemap)
- [XML Sitemap](https://shrishyamassociate.com/sitemap.xml)
- [API Catalog](https://shrishyamassociate.com/.well-known/api-catalog)
`;

const ABOUT_MARKDOWN = `# About Shri Shyam Associate (Shree Shyam Associates)

> Trusted real estate consultants in Dwarka, New Delhi for over a decade.

## About the Agency
Shri Shyam Associate (also known as Shree Shyam Associates / Shri Shyam Properties) is a top-rated real estate advisory firm headquartered in Dwarka Sector 7, Ramphal Chowk, New Delhi. We specialize in verified freehold builder floors, DDA flats, CGHS society apartments, and commercial properties.

## Core Guarantees
- **100% Legal Title Verification**: All properties are free from encumbrance and litigation.
- **Home Loan Approved**: Pre-approved for bank loans from SBI, HDFC, ICICI, and Axis Bank.
- **Transparent Closures**: End-to-end support for registry, mutation, and documentation.
- **Interactive 3D Virtual Tours**: Explore layouts and architectural models online.

## Office Contact
- **Address**: Dwarka Sector 7, Ramphal Chowk Area, New Delhi 110075
- **Phone**: +91 9911956274
- **Email**: shrishyamproperties001@gmail.com
- **Hours**: Monday to Sunday, 09:30 AM – 08:30 PM IST
`;

const CONTACT_MARKDOWN = `# Contact Shri Shyam Associate

> Book an in-person guided site visit or speak directly with our Dwarka real estate advisors.

## Contact Channels
- **Direct Phone**: [+91 9911956274](tel:9911956274)
- **WhatsApp**: [Chat on WhatsApp](https://wa.me/919911956274?text=Hi%20Shri%20Shyam%20Associate,%20I%20am%20interested%20in%20visiting%20properties)
- **Email**: [shrishyamproperties001@gmail.com](mailto:shrishyamproperties001@gmail.com)
- **Office Location**: Dwarka Sector 7, Ramphal Chowk Area, New Delhi 110075
- **Google Maps**: [Location Map](https://maps.google.com/?q=28.5823,77.0700)

## Service Areas
Dwarka Sectors 1 through 24, Ramphal Chowk, Mahavir Enclave, Palam, and Dwarka Expressway (Gurugram).
`;

const PROPERTIES_MARKDOWN = `# Verified Property Listings — Shri Shyam Associate

> Real estate listings directory for Dwarka, New Delhi and Dwarka Expressway.

## Available Property Categories
- **2 BHK Luxury Builder Floors**: Starting from ₹55 Lakhs
- **3 BHK Luxury Builder Floors**: ₹1.25 Cr – ₹2.60 Cr (Sector 6, 7, 8, 10, 11, 19, 23)
- **4 BHK & 5 BHK Floors / Penthouses**: ₹2.20 Cr – ₹8.50 Cr
- **CGHS Society & DDA Flats**: Ready to move, freehold gated communities
- **Commercial Retail Shops**: High ROI commercial properties

## How to Inquire
- Call / WhatsApp: **+91 9911956274**
- Browse online with 3D tours: https://shrishyamassociate.com/properties
`;

function getMarkdownForPath(pathname: string): string {
  if (pathname === '/' || pathname === '') return HOME_MARKDOWN;
  if (pathname === '/about' || pathname.startsWith('/about')) return ABOUT_MARKDOWN;
  if (pathname === '/contact' || pathname.startsWith('/contact')) return CONTACT_MARKDOWN;
  if (pathname === '/properties' || pathname.startsWith('/properties')) return PROPERTIES_MARKDOWN;
  return HOME_MARKDOWN;
}

export function proxy(request: NextRequest) {
  const acceptHeader = request.headers.get('accept') || '';
  const pathname = request.nextUrl.pathname;

  // Markdown content negotiation for AI agents (per isitagentready & RFC specifications)
  const isMarkdownRequested =
    acceptHeader.includes('text/markdown') ||
    acceptHeader.includes('text/x-markdown');

  if (
    isMarkdownRequested &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.includes('.')
  ) {
    const mdContent = getMarkdownForPath(pathname);
    // Approximate token count heuristic: ~4 characters per token
    const tokenCount = Math.max(1, Math.ceil(mdContent.length / 4));

    return new NextResponse(mdContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': String(tokenCount),
        'Vary': 'Accept',
        'Link': '</.well-known/api-catalog>; rel="api-catalog", </llms.txt>; rel="describedby", </sitemap.xml>; rel="sitemap", </openapi.json>; rel="service-desc"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)'],
};
