import { Product, ProductCategory } from '../types';

// Individual dedicated images for each distinct item
import heroLivingRoomImg from '../assets/images/hero_dastoor_living_room_1792587450721.jpg';
import multaniVasesImg from '../assets/images/category_vases_ceramics_1792587451999.jpg';
import halaIndigoUrnImg from '../assets/images/product_hala_indigo_urn_1792588799417.jpg';
import brassTableLampImg from '../assets/images/category_brass_lighting_1792587451889.jpg';
import silkCushionsImg from '../assets/images/category_textiles_cushions_1792587452661.jpg';
import marbleTierStandImg from '../assets/images/category_tabletop_dining_1792587452988.jpg';
import brassUrliBowlImg from '../assets/images/product_brass_urli_bowl_1792588800828.jpg';
import brassArchMirrorImg from '../assets/images/product_brass_arch_mirror_1792588801014.jpg';
import wasliCalligraphyImg from '../assets/images/decor_wall_art_calligraphy_1792588327298.jpg';
import moonjBasketImg from '../assets/images/decor_storage_basket_1792588326957.jpg';
import sheeshamBoardImg from '../assets/images/product_sheesham_wood_board_1792588802103.jpg';
import bedroomTextileImg from '../assets/images/decor_bedroom_textile_1792588327672.jpg';
import travertineBathImg from '../assets/images/decor_bathroom_travertine_1792588328080.jpg';
import amberCandleImg from '../assets/images/product_amber_candle_oud_1792588802167.jpg';
import preservedBotanicalsImg from '../assets/images/product_preserved_botanicals_1792588835266.jpg';
import eidGiftHamperImg from '../assets/images/product_eid_gift_hamper_1792588835544.jpg';

export const CATEGORIES_DATA: {
  name: ProductCategory;
  description: string;
  image: string;
  itemCount: number;
}[] = [
  {
    name: 'Vases & Decorative Pots',
    description: 'Hand-thrown Multani terracotta, Hala glazed urns, and sculptural stoneware vessels',
    image: multaniVasesImg,
    itemCount: 2,
  },
  {
    name: 'Lamps & Lighting',
    description: 'Solid brushed brass lamps, pleated linen shades, and ambient accent lighting',
    image: brassTableLampImg,
    itemCount: 1,
  },
  {
    name: 'Wall Art & Mirrors',
    description: 'Qila arch brass mirrors and museum-grade wasli paper Arabic calligraphy',
    image: wasliCalligraphyImg,
    itemCount: 2,
  },
  {
    name: 'Cushions & Throws',
    description: 'Hand block-printed raw silk, washed linen, and heritage woven textiles',
    image: silkCushionsImg,
    itemCount: 1,
  },
  {
    name: 'Table Décor & Centerpieces',
    description: 'Carved Banswara marble tiered stands and hand-hammered antique brass urli bowls',
    image: marbleTierStandImg,
    itemCount: 2,
  },
  {
    name: 'Home Décor',
    description: 'Hand-carved Swat pine wood knots and artisanal mantelpiece sculptural objects',
    image: heroLivingRoomImg,
    itemCount: 1,
  },
  {
    name: 'Storage & Baskets',
    description: 'South Punjab wild riverbed moonj and date palm handwoven storage baskets',
    image: moonjBasketImg,
    itemCount: 1,
  },
  {
    name: 'Kitchen & Dining',
    description: 'Chinioti seasoned sheesham rosewood chopping and charcuterie serving boards',
    image: sheeshamBoardImg,
    itemCount: 1,
  },
  {
    name: 'Bedroom Accessories',
    description: 'Indus valley washed pure waffle weave throws and relaxed linen bedding',
    image: bedroomTextileImg,
    itemCount: 1,
  },
  {
    name: 'Bathroom Essentials',
    description: 'Solid natural Balochistan travertine stone soap dispensers and vanity trays',
    image: travertineBathImg,
    itemCount: 1,
  },
  {
    name: 'Trays & Candles',
    description: 'Hand-poured amber soy candles infused with Kashmiri saffron and wild oud',
    image: amberCandleImg,
    itemCount: 1,
  },
  {
    name: 'Artificial Flowers & Plants',
    description: 'Naturally preserved fluffy pampas plumes and silvery eucalyptus stems',
    image: preservedBotanicalsImg,
    itemCount: 1,
  },
  {
    name: 'Gifts & Seasonal',
    description: 'Curated brass-latched keepsake chests with lanterns, candles, and natural honey',
    image: eidGiftHamperImg,
    itemCount: 1,
  },
];

export const PRODUCTS: Product[] = [
  // 1. Multani Terracotta Artisan Vessel Trio (Vases & Pots)
  {
    id: 'dh-001',
    sku: 'VASE-MLT-01',
    name: 'Multani Terracotta Artisan Vessel Trio',
    category: 'Vases & Decorative Pots',
    price: 3450,
    originalPrice: 4200,
    rating: 4.9,
    reviewCount: 38,
    image: multaniVasesImg,
    gallery: [multaniVasesImg, heroLivingRoomImg],
    description:
      'A set of three distinct tactile stoneware and terracotta vessels, hand-thrown by master potters in Multan. Featuring an earthy unglazed texture alongside warm ochre slip glaze, perfect for dried botanicals or as sculptural mantle focal points.',
    inStock: true,
    stockCount: 14,
    dimensions: 'Tall: 28cm H x 14cm W · Round: 16cm H x 16cm W · Jug: 20cm H x 15cm W',
    material: 'Natural Multani Red Clay & Matte Mineral Glaze',
    origin: 'Multan, Punjab, Pakistan',
    care: 'Wipe clean with a dry microfiber cloth. Intended for dried stems or decorative display.',
    colors: ['Warm Terracotta', 'Sand Ochre', 'Raw Clay'],
    sizes: ['Set of 3 (Assorted)'],
    isBestSeller: true,
    isFeatured: true,
  },

  // 2. Hala Heritage Indigo & Cobalt Glazed Urn (Vases & Pots)
  {
    id: 'dh-017',
    sku: 'VASE-HAL-17',
    name: 'Hala Heritage Indigo & Cobalt Glazed Urn',
    category: 'Vases & Decorative Pots',
    price: 4200,
    originalPrice: 4900,
    rating: 4.8,
    reviewCount: 22,
    image: halaIndigoUrnImg,
    gallery: [halaIndigoUrnImg, multaniVasesImg],
    description:
      'Inspired by the historic blue pottery tradition of Hala, Sindh. Hand-painted with cobalt blue flora and finished with an authentic crackle mineral glaze that reflects the vibrant architectural tilework of ancient shrines.',
    inStock: true,
    stockCount: 9,
    dimensions: '32cm H x 18cm Diameter',
    material: 'Indus River Clay with Cobalt Blue and Copper Oxide Glaze',
    origin: 'Hala, Sindh, Pakistan',
    care: 'Wipe with a soft damp cloth. Gentle hand rinse only.',
    colors: ['Cobalt & Turquoise', 'Indigo & White'],
    sizes: ['Large (32cm)'],
    isNewArrival: true,
    isFeatured: true,
  },

  // 3. Dastoor Sculptural Brushed Brass Table Lamp (Lamps & Lighting)
  {
    id: 'dh-002',
    sku: 'LMP-BRS-02',
    name: 'Dastoor Sculptural Brushed Brass Table Lamp',
    category: 'Lamps & Lighting',
    price: 9800,
    originalPrice: 11500,
    rating: 5.0,
    reviewCount: 24,
    image: brassTableLampImg,
    gallery: [brassTableLampImg, heroLivingRoomImg],
    description:
      'Cast in solid brass with an antique brushed patina and paired with a bespoke hand-pleated oatmeal linen shade. Its organic negative-space silhouette casts an inviting, ambient golden radiance across living rooms, consoles, and bedside tables.',
    inStock: true,
    stockCount: 8,
    dimensions: 'Overall: 52cm H x 32cm W · Base: 30cm H x 18cm W',
    material: 'Solid Brass Casting, Hand-pleated Natural Linen, Braided Cloth Cord',
    origin: 'Handcrafted in Gujranwala & Lahore, Pakistan',
    care: 'Dust shade gently with a soft brush. Use warm LED bulb (E27 base, included).',
    colors: ['Antique Brushed Brass', 'Matte Raw Brass'],
    sizes: ['Standard (52cm)'],
    isBestSeller: true,
    isFeatured: true,
  },

  // 4. Qila Arch Hand-Finished Brass Wall Mirror (Wall Art & Mirrors)
  {
    id: 'dh-006',
    sku: 'MIR-ARC-06',
    name: 'Qila Arch Hand-Finished Brass Wall Mirror',
    category: 'Wall Art & Mirrors',
    price: 8400,
    originalPrice: 9900,
    rating: 4.8,
    reviewCount: 16,
    image: brassArchMirrorImg,
    gallery: [brassArchMirrorImg, heroLivingRoomImg],
    description:
      'Inspired by the grand arched jharokas of Lahore Fort. Precision cut distortion-free high-definition mirror encased in a seamless brass-finished iron frame with integrated heavy-duty wall anchors.',
    inStock: true,
    stockCount: 6,
    dimensions: '80cm H x 50cm W x 3cm D',
    material: 'Anti-tarnish Brass Coated Iron & Premium Silver Backed Glass',
    origin: 'Lahore, Pakistan',
    care: 'Clean glass with vinegar water mist and dry with lint-free cotton.',
    colors: ['Muted Brushed Brass', 'Matte Black Oxide'],
    sizes: ['Large (80x50 cm)', 'X-Large (100x65 cm)'],
    isNewArrival: true,
    isFeatured: true,
  },

  // 5. Surah Al-Ikhlas Calligraphy on Handmade Wasli Paper (Wall Art & Mirrors)
  {
    id: 'dh-019',
    sku: 'ART-CAL-19',
    name: 'Surah Al-Ikhlas Calligraphy on Handmade Wasli Paper',
    category: 'Wall Art & Mirrors',
    price: 7500,
    originalPrice: 8800,
    rating: 5.0,
    reviewCount: 34,
    image: wasliCalligraphyImg,
    gallery: [wasliCalligraphyImg, heroLivingRoomImg],
    description:
      'Hand-scripted Thuluth Arabic script rendered in mineral lampblack ink with subtle gold leaf illumination on traditional multi-layered wasli paper. Encased in a custom dark walnut frame with anti-glare museum glass.',
    inStock: true,
    stockCount: 8,
    dimensions: '60cm H x 45cm W x 2.5cm D',
    material: 'Traditional Handmade Wasli Paper, 24k Gold Leaf, Dark Oak Frame',
    origin: 'Lahore Old City Calligraphers, Pakistan',
    care: 'Dust frame gently. Keep out of direct harsh sunlight.',
    colors: ['Natural Parchment & Walnut', 'Charcoal Wasli & Brass Frame'],
    sizes: ['60cm x 45cm Framed'],
    isBestSeller: true,
    isFeatured: true,
  },

  // 6. Chundri Block-Printed Raw Silk Cushion Cover (Cushions & Throws)
  {
    id: 'dh-003',
    sku: 'CSH-BLK-03',
    name: 'Chundri Block-Printed Raw Silk Cushion Cover',
    category: 'Cushions & Throws',
    price: 1850,
    originalPrice: 2200,
    rating: 4.8,
    reviewCount: 52,
    image: silkCushionsImg,
    gallery: [silkCushionsImg, heroLivingRoomImg],
    description:
      'Hand-carved wooden blocks stamped using vegetable dyes onto textured raw slub silk and backed with heavyweight linen. Finished with subtle tonal stitching and a concealed zipper closure.',
    inStock: true,
    stockCount: 25,
    dimensions: '45cm x 45cm (18" x 18")',
    material: '100% Raw Desi Silk & Pure Cotton Linen Backing',
    origin: 'Sindh / Lahore Artisans',
    care: 'Dry clean recommended. Gentle hand wash in cold water with mild silk detergent.',
    colors: ['Sage Leaf & Ochre', 'Terracotta Rust', 'Pistachio Green', 'Warm Oatmeal'],
    sizes: ['18" x 18" (45x45 cm)', '20" x 20" (50x50 cm)'],
    isBestSeller: true,
    isFeatured: true,
  },

  // 7. Banswara Marble & Brass Tiered Centerpiece Stand (Table Décor & Centerpieces)
  {
    id: 'dh-004',
    sku: 'TBL-MRB-04',
    name: 'Banswara Marble & Brass Tiered Centerpiece Stand',
    category: 'Table Décor & Centerpieces',
    price: 5900,
    originalPrice: 6800,
    rating: 4.9,
    reviewCount: 19,
    image: marbleTierStandImg,
    gallery: [marbleTierStandImg, brassUrliBowlImg],
    description:
      'Turned from natural white-veined marble with hand-forged antique brass spindle and finial handle. An elegant centerpiece for festive gatherings, seasonal sweetmeats, afternoon tea, or perfume display.',
    inStock: true,
    stockCount: 11,
    dimensions: 'Bottom Tier: 28cm Dia · Top Tier: 20cm Dia · Height: 36cm',
    material: 'Solid Natural Marble & Hand-Forged Brass',
    origin: 'Peshawar / Rawalpindi Stonecraft',
    care: 'Wipe with damp cloth. Do not use acidic cleansers on natural marble.',
    colors: ['White Cloud Marble', 'Muted Grey Marble'],
    sizes: ['2-Tier Standard'],
    isBestSeller: true,
    isFeatured: true,
  },

  // 8. Hand-Hammered Antique Brass Urli Floating Bowl (Table Décor & Centerpieces)
  {
    id: 'dh-021',
    sku: 'TBL-URL-21',
    name: 'Hand-Hammered Antique Brass Urli Floating Bowl',
    category: 'Table Décor & Centerpieces',
    price: 3950,
    originalPrice: 4600,
    rating: 4.9,
    reviewCount: 36,
    image: brassUrliBowlImg,
    gallery: [brassUrliBowlImg, marbleTierStandImg],
    description:
      'A traditional wide brass urli bowl crafted with hand-beaten dimple textures and flared lip. Ideal for floating fresh jasmine motia petals and glowing wax candle tealights during celebratory evenings.',
    inStock: true,
    stockCount: 16,
    dimensions: '30cm Diameter x 9cm Height',
    material: 'Pure Solid Brass with Protective Food-Safe Clear Coating',
    origin: 'Gujranwala Metal Artisans, Pakistan',
    care: 'Rinse with mild soap and dry immediately with a clean cotton towel.',
    colors: ['Antique Burnished Brass', 'Bright Warm Brass'],
    sizes: ['30cm Diameter', '38cm Large'],
    isBestSeller: true,
    isNewArrival: true,
  },

  // 9. Chinioti Solid Sheesham End-Grain Chopping & Serving Board (Kitchen & Dining)
  {
    id: 'dh-009',
    sku: 'KTN-BRD-09',
    name: 'Chinioti Solid Sheesham End-Grain Chopping & Serving Board',
    category: 'Kitchen & Dining',
    price: 3600,
    originalPrice: 4400,
    rating: 5.0,
    reviewCount: 31,
    image: sheeshamBoardImg,
    gallery: [sheeshamBoardImg, marbleTierStandImg],
    description:
      'Fashioned from seasoned Pakistani rosewood (Sheesham) with rich dark amber grain and brass inset hanging eyelet. Reversible surface with deep juice groove on one side and flat charcuterie presentation on the other.',
    inStock: true,
    stockCount: 12,
    dimensions: '42cm L x 28cm W x 3.5cm Thick',
    material: 'Seasoned Pakistani Sheesham (Dalbergia sissoo) & Natural Beeswax Finish',
    origin: 'Chiniot, Punjab, Pakistan',
    care: 'Hand wash with mild soap. Re-oil periodically with food-grade walnut or mineral oil.',
    colors: ['Deep Walnut Rosewood'],
    sizes: ['Medium (42x28 cm)', 'Large (50x32 cm)'],
    isBestSeller: true,
    isFeatured: false,
  },

  // 10. Dera Ghazi Khan Handwoven Moonj Reed Storage Basket (Storage & Baskets)
  {
    id: 'dh-008',
    sku: 'STR-BSK-08',
    name: 'Dera Ghazi Khan Handwoven Moonj Reed Storage Basket',
    category: 'Storage & Baskets',
    price: 2800,
    originalPrice: 3200,
    rating: 4.8,
    reviewCount: 19,
    image: moonjBasketImg,
    gallery: [moonjBasketImg, silkCushionsImg],
    description:
      'Crafted by female artisan cooperatives in South Punjab using wild riverbed moonj and date palm fibers. Exceptionally sturdy with genuine raw cowhide handles, ideal for throws, toys, or magazines.',
    inStock: true,
    stockCount: 17,
    dimensions: '38cm Dia x 35cm H',
    material: 'Indigenous Moonj Grass, Date Palm Fiber, Veg-tanned Leather handles',
    origin: 'Dera Ghazi Khan, Punjab, Pakistan',
    care: 'Wipe clean with a lightly damp sponge and dry immediately in shade.',
    colors: ['Natural Straw & Tan Leather'],
    sizes: ['Medium (38cm Dia)', 'Large (45cm Dia)'],
    isNewArrival: false,
    isFeatured: true,
  },

  // 11. Washed Waffle Weave Pure Cotton Bed Throw & Linen (Bedroom Accessories)
  {
    id: 'dh-010',
    sku: 'BED-TRW-10',
    name: 'Washed Waffle Weave Pure Cotton Bed Throw',
    category: 'Bedroom Accessories',
    price: 4500,
    originalPrice: 5200,
    rating: 4.8,
    reviewCount: 28,
    image: bedroomTextileImg,
    gallery: [bedroomTextileImg, silkCushionsImg],
    description:
      'Woven in Faisalabad from 100% long-staple Indus valley combed cotton. Pre-washed for cloud-like softness, breathable warmth, and a relaxed rumpled texture with hand-knotted fringe hem.',
    inStock: true,
    stockCount: 18,
    dimensions: '220cm x 240cm (Fits Queen & King Beds)',
    material: '100% Combed Pakistani Cotton (350 GSM)',
    origin: 'Faisalabad, Pakistan',
    care: 'Machine wash gentle cycle cold. Tumble dry low.',
    colors: ['Linen Oat', 'Warm Sand', 'Olive Sage'],
    sizes: ['Queen / King (220x240 cm)'],
    isNewArrival: true,
    isFeatured: true,
  },

  // 12. Balochistan Travertine Bath Accessory Set (3-Piece) (Bathroom Essentials)
  {
    id: 'dh-011',
    sku: 'BTH-TRV-11',
    name: 'Balochistan Travertine Bath Accessory Set (3-Piece)',
    category: 'Bathroom Essentials',
    price: 4900,
    originalPrice: 5800,
    rating: 4.9,
    reviewCount: 21,
    image: travertineBathImg,
    gallery: [travertineBathImg, multaniVasesImg],
    description:
      'Carved from solid natural porous travertine quarried in Balochistan. Includes liquid soap dispenser with brushed bronze pump, matching tumbler cup, and grooved self-draining soap dish.',
    inStock: true,
    stockCount: 9,
    dimensions: 'Dispenser: 18cm H x 7cm Dia · Tumbler: 10cm H · Dish: 13cm L',
    material: 'Solid Natural Cream Travertine & Brushed Antique Bronze Pump',
    origin: 'Quetta / Karachi Stonemasons',
    care: 'Clean with damp cloth and gentle pH-neutral soap. Avoid abrasive pads.',
    colors: ['Cream Travertine Stone'],
    sizes: ['3-Piece Set'],
    isNewArrival: true,
    isFeatured: false,
  },

  // 13. Amber Glass Soy Candle - Kashmiri Saffron & Wild Oud (Trays & Candles)
  {
    id: 'dh-005',
    sku: 'DEC-CND-05',
    name: 'Amber Glass Soy Candle - Kashmiri Saffron & Wild Oud',
    category: 'Trays & Candles',
    price: 1450,
    originalPrice: 1800,
    rating: 4.9,
    reviewCount: 67,
    image: amberCandleImg,
    gallery: [amberCandleImg, brassTableLampImg],
    description:
      'Hand-poured 100% natural soy wax candle infused with pure essential oils of Kashmiri saffron, warm amber, and aged wild oud. Provides 55+ hours of clean, soot-free burn time with crackling natural wood wick.',
    inStock: true,
    stockCount: 30,
    dimensions: '9cm H x 8cm Dia · 280g / 9.8 oz',
    material: '100% Natural Soy Wax, Cotton/Wood Wick, Recycled Amber Glass',
    origin: 'Lahore Scent Studio, Pakistan',
    care: 'Trim wick to 5mm before every lighting. Burn for 2-3 hours on first burn.',
    colors: ['Amber Jar', 'Frosted Smoke Jar'],
    sizes: ['280g (55h Burn)'],
    isBestSeller: true,
    isNewArrival: true,
  },

  // 14. Preserved Silver Dollar Eucalyptus & Pampas Bundle (Artificial Flowers & Plants)
  {
    id: 'dh-007',
    sku: 'PLN-EUC-07',
    name: 'Preserved Silver Dollar Eucalyptus & Pampas Bundle',
    category: 'Artificial Flowers & Plants',
    price: 2100,
    originalPrice: 2600,
    rating: 4.7,
    reviewCount: 42,
    image: preservedBotanicalsImg,
    gallery: [preservedBotanicalsImg, multaniVasesImg],
    description:
      'Naturally preserved botanicals featuring fluffy natural pampas grass plumes and silvery eucalyptus branches. No watering or maintenance needed; retains softness and shape for years.',
    inStock: true,
    stockCount: 22,
    dimensions: 'Stem length: 65cm to 75cm · Bundle of 12 stems',
    material: '100% Naturally Preserved Plant Foliage & Pampas Plumes',
    origin: 'Northern Pakistan & Potohar Harvest',
    care: 'Keep away from direct sunlight and high humidity. Shake gently outdoors on arrival.',
    colors: ['Natural Oatmeal & Silver Green'],
    sizes: ['12-Stem Tall Bunch'],
    isNewArrival: false,
    isBestSeller: true,
  },

  // 15. Dastoor Mehman Luxury Hospitality Gift Box (Gifts & Seasonal)
  {
    id: 'dh-012',
    sku: 'GFT-EID-12',
    name: 'Dastoor Mehman Luxury Hospitality Gift Box',
    category: 'Gifts & Seasonal',
    price: 6800,
    originalPrice: 7900,
    rating: 5.0,
    reviewCount: 15,
    image: eidGiftHamperImg,
    gallery: [eidGiftHamperImg, brassTableLampImg],
    description:
      'A curated celebratory keepsake box presented in a brass-latched pine wood chest. Contains: 1 Kashmiri Saffron soy candle, 2 hand-cast brass candle coasters, 1 jar of cold-pressed wild acacia honey with wooden dipper, and 1 block-printed linen runner.',
    inStock: true,
    stockCount: 7,
    dimensions: 'Chest: 32cm L x 22cm W x 12cm H',
    material: 'Pinewood Box, Solid Brass, Natural Soy Wax, Pure Linen',
    origin: 'Curated by Dastoor Home, Lahore',
    care: 'Keepsake box can be reused for jewellery or heirloom storage.',
    colors: ['Artisan Wood & Brass'],
    sizes: ['Deluxe Curated Chest'],
    isNewArrival: true,
    isFeatured: true,
  },

  // 16. Hand-Carved Swat Pine Wood Knot Sculptural Object (Home Décor)
  {
    id: 'dh-013',
    sku: 'DEC-KNT-13',
    name: 'Hand-Carved Swat Pine Wood Knot Sculptural Object',
    category: 'Home Décor',
    price: 2650,
    originalPrice: 3200,
    rating: 4.9,
    reviewCount: 27,
    image: heroLivingRoomImg,
    gallery: [heroLivingRoomImg, multaniVasesImg],
    description:
      'Continuous three-link chain carved from a single piece of fragrant mountain pine harvested from Swat valley. Makes an organic tactile statement on coffee table books, sideboards, or console trays.',
    inStock: true,
    stockCount: 15,
    dimensions: '32cm L x 12cm W',
    material: 'Sustainably Harvested Swat Valley Deodar Pine',
    origin: 'Swat Valley, Khyber Pakhtunkhwa, Pakistan',
    care: 'Dust with soft dry brush. Keep away from humid areas.',
    colors: ['Natural Bleached Pine', 'Smoked Walnut Finish'],
    sizes: ['3-Link Standard (32cm)'],
    isBestSeller: false,
    isFeatured: true,
  },
];

export const DEMO_REVIEWS = [
  {
    id: 'rev-01',
    author: 'Ayesha Siddiqui',
    city: 'Gulberg III, Lahore',
    rating: 5,
    date: 'Verified Buyer · October 2026',
    comment:
      'The Multani terracotta vases and the brass lamp exceeded all expectations! The packaging was so safe and thick with bubble wrap, not a single scratch. Ordering on WhatsApp was seamless.',
    productName: 'Multani Terracotta Artisan Vessel Trio',
  },
  {
    id: 'rev-02',
    author: 'Bilal Farooq',
    city: 'DHA Phase 6, Karachi',
    rating: 5,
    date: 'Verified Buyer · September 2026',
    comment:
      'Finding true artisanal Pakistani home accents with this level of finishing is rare. The Sheesham chopping board and marble stand are heavy, solid, and timeless. Delivery took 3 days via TCS COD.',
    productName: 'Banswara Marble Stand & Sheesham Board',
  },
  {
    id: 'rev-03',
    author: 'Zainab Qureshi',
    city: 'F-7/2, Islamabad',
    rating: 5,
    date: 'Verified Buyer · September 2026',
    comment:
      'The raw silk block-printed cushions in Sage Leaf brought our drawing room to life. The colors are exactly as shown in photographs. Truly exceptional craftsmanship.',
    productName: 'Chundri Block-Printed Raw Silk Cushion Cover',
  },
  {
    id: 'rev-04',
    author: 'Dr. Harris Masood',
    city: 'Canal View, Faisalabad',
    rating: 5,
    date: 'Verified Buyer · October 2026',
    comment:
      'Ordered the Surah Al-Ikhlas framed calligraphy and the travertine bath set. The wasli paper texture and the gold illumination are museum grade. Arrived in Faisalabad within 48 hours.',
    productName: 'Surah Al-Ikhlas Calligraphy on Wasli Paper',
  },
];

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Sukkur',
  'Gujrat',
  'Mardan',
  'Sahiwal',
  'Wah Cantt',
  'Mirpur (AJK)',
  'Other City',
];

export const WHATSAPP_NUMBER = '03126687237';
export const WHATSAPP_INT_NUMBER = '923126687237';
export const FREE_SHIPPING_THRESHOLD = 4999;
export const STANDARD_SHIPPING_FEE = 250;
