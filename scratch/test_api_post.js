const { Client } = require('ssh2');

const SSH_CONFIG = {
  host: '187.127.134.114',
  port: 22,
  username: 'root',
  password: 'Shrishyam@2026#'
};

const testPayload = JSON.stringify({
  title: "Test 3 BHK Luxury Builder Floor",
  slug: "test-3-bhk-luxury-builder-floor-sector-7-" + Date.now(),
  purpose: "Buy",
  propertyType: "3 BHK",
  priceDisplay: "₹ 1.50 Cr",
  priceValue: 15000000,
  location: "Sector 7, Dwarka, New Delhi",
  sector: "Dwarka Sector 7",
  bhk: 3,
  bathrooms: 3,
  areaSqFt: 1500,
  carpetAreaSqFt: 1300,
  floor: "1st Floor",
  totalFloors: 4,
  parking: "Reserved Stilt Parking",
  furnishing: "Semi-Furnished",
  facing: "North-East",
  propertyAge: "Brand New",
  availability: "Ready to Move",
  featured: true,
  published: true,
  heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"],
  description: "Test description",
  contactNumber: "+91 9911956274"
});

const conn = new Client();
conn.on('ready', () => {
  conn.exec(`
    echo "=== TEST 1: DIRECT BACKEND POST ==="
    curl -i -X POST http://localhost:8080/api/properties \
      -H "Content-Type: application/json" \
      -d '${testPayload.replace(/'/g, "'\\''")}'
    echo ""
    echo "=== TEST 2: NGINX /api/ POST ==="
    curl -i -X POST http://localhost/api/properties \
      -H "Content-Type: application/json" \
      -d '${testPayload.replace(/'/g, "'\\''")}'
    echo ""
    echo "=== TEST 3: NGINX GET /api/properties ==="
    curl -i http://localhost/api/properties
  `, (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.on('close', () => conn.end());
  });
}).connect(SSH_CONFIG);
