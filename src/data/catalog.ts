export type ProductCategory = 'Protein' | 'Hydration' | 'Recovery' | 'Daily Greens';

export interface ProductVariant {
  id: string;
  name: string;
  notes: string;
  servingLabel: string;
}

export interface NutrientRow {
  label: string;
  amount: string;
  dailyValue: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  servings: number;
  image: string;
  rating: number;
  reviewCount: number;
  batchCode: string;
  featuredTag?: string;
  macroHighlights: string[];
  attributes: string[];
  description: string;
  clinicalSummary: string;
  sourcingNote: string;
  preparationSteps: string[];
  variants: ProductVariant[];
  nutritionManifest: {
    servingSize: string;
    calories: number;
    rows: NutrientRow[];
  };
}

export interface VerifiedReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  quote: string;
  productId: string;
  productName: string;
  variantUsed: string;
  date: string;
}

export interface ActiveIngredient {
  id: string;
  name: string;
  botanicalSource: string;
  clinicalDose: string;
  origin: string;
  mechanism: string;
  bioavailabilityScore: string;
  usedInIds: string[];
}

export interface BatchCOA {
  batchCode: string;
  productName: string;
  testedDate: string;
  labPartner: string;
  status: 'Passed';
  metrics: {
    test: string;
    result: string;
    limit: string;
    verdict: 'Clear' | 'Verified';
  }[];
}

export const HERO_IMAGE = '/src/assets/images/hero_veloce_botanical_1795330133342.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'kinetic-plant-protein',
    slug: 'kinetic-plant-protein',
    name: 'Kinetic Plant Protein',
    subtitle: 'Cold-extracted pea, pumpkin seed & hemp isolate',
    category: 'Protein',
    price: 58,
    servings: 25,
    image: '/src/assets/images/product_kinetic_protein_1795330133006.jpg',
    rating: 4.9,
    reviewCount: 418,
    batchCode: 'VL-2026-084',
    featuredTag: 'Flagship Formula',
    macroHighlights: ['30G PROTEIN', '0G ADDED SUGAR', '5.8G BCAAS'],
    attributes: ['30g Protein', '0g Added Sugar', 'NSF Certified', 'Non-GMO'],
    description:
      'Engineered for rapid myofibrillar recovery without digestive heaviness. Our triple-source botanical isolate delivers a complete leucine-rich amino acid spectrum with zero gums, fillers, or artificial sweeteners.',
    clinicalSummary:
      'In an 8-week randomized trial (n = 128 endurance athletes), daily post-session supplementation improved 48-hour recovery readiness by 24% compared to standard single-source plant blends.',
    sourcingNote:
      'Yellow field peas harvested in Saskatchewan, cold-pressed Austrian pumpkin seed protein, and whole Madagascar vanilla pods milled at 12°C to preserve delicate phytonutrients.',
    preparationSteps: [
      'Add one level scoop (38g) to 300ml chilled water or unsweetened oat milk.',
      'Shake vigorously for 15 seconds until velvety and completely suspended.',
      'Consume within 45 minutes post-training or as a morning metabolic anchor.',
    ],
    variants: [
      {
        id: 'vanilla-bean',
        name: 'Madagascar Vanilla Bean',
        notes: 'Warm bourbon vanilla pod, subtle oat cream finish',
        servingLabel: '950g Canister · 25 Servings',
      },
      {
        id: 'raw-cacao',
        name: 'Peruvian Cacao & Sea Salt',
        notes: 'Single-origin dark cacao nib with flaky Pacific salt',
        servingLabel: '950g Canister · 25 Servings',
      },
      {
        id: 'unflavored',
        name: 'Pure Unflavored Isolate',
        notes: 'Neutral clean botanical base for smoothies and bowls',
        servingLabel: '900g Canister · 25 Servings',
      },
    ],
    nutritionManifest: {
      servingSize: '1 Level Scoop (38g)',
      calories: 145,
      rows: [
        { label: 'Complete Plant Protein', amount: '30g', dailyValue: '60%' },
        { label: 'L-Leucine (Natural)', amount: '3.1g', dailyValue: '—' },
        { label: 'Dietary Fiber (Prebiotic)', amount: '4g', dailyValue: '14%' },
        { label: 'Added Sugars', amount: '0g', dailyValue: '0%' },
        { label: 'Total Fat (Cold-Pressed)', amount: '2.5g', dailyValue: '3%' },
        { label: 'Iron (Bioavailable)', amount: '5.4mg', dailyValue: '30%' },
        { label: 'Digestive Enzyme Complex', amount: '120mg', dailyValue: '—' },
      ],
    },
  },
  {
    id: 'cellular-electrolyte-matrix',
    slug: 'cellular-electrolyte-matrix',
    name: 'Cellular Electrolyte Matrix',
    subtitle: 'Precision sodium-potassium hydration sachets',
    category: 'Hydration',
    price: 42,
    servings: 30,
    image: '/src/assets/images/product_electrolyte_matrix_1795330133266.jpg',
    rating: 4.9,
    reviewCount: 312,
    batchCode: 'VL-2026-091',
    featuredTag: 'Daily Essential',
    macroHighlights: ['1000MG SODIUM', '0G SUGAR', '200MG POTASSIUM'],
    attributes: ['1000mg Sodium', '0g Sugar', 'Chelated Magnesium', 'Vegan'],
    description:
      'Formulated to mirror sweat mineral ratios during high-output sessions and long flights. Clean citrus peel oils and trace ocean minerals restore plasma volume rapidly without syrupy sweetness.',
    clinicalSummary:
      'Maintains intracellular fluid balance and reduces late-session cramping incidence across high-heat endurance intervals exceeding 60 minutes.',
    sourcingNote:
      'Solar-evaporated ancient sea salt paired with cold-extracted Kochi yuzu rind and fully chelated magnesium malate for gentle gastric absorption.',
    preparationSteps: [
      'Tear one single-serve sachet into 500–750ml cold filtered water.',
      'Stir or shake briefly; adjust water volume to match preferred salinity.',
      'Sip 20 minutes prior to training or throughout sustained aerobic blocks.',
    ],
    variants: [
      {
        id: 'yuzu-sea-salt',
        name: 'Yuzu & Sea Salt',
        notes: 'Bright Japanese citrus zest with crisp mineral finish',
        servingLabel: '30 Travel Sachets',
      },
      {
        id: 'blood-orange-ginger',
        name: 'Blood Orange & Ginger',
        notes: 'Tart Sicilian citrus with warming botanical root',
        servingLabel: '30 Travel Sachets',
      },
      {
        id: 'crisp-cucumber-mint',
        name: 'Cucumber & Garden Mint',
        notes: 'Cool herbaceous hydration with clean saline clarity',
        servingLabel: '30 Travel Sachets',
      },
    ],
    nutritionManifest: {
      servingSize: '1 Sachet (6.2g)',
      calories: 10,
      rows: [
        { label: 'Sodium (Ancient Sea Salt)', amount: '1000mg', dailyValue: '43%' },
        { label: 'Potassium (Citrate)', amount: '200mg', dailyValue: '4%' },
        { label: 'Magnesium (Malate)', amount: '65mg', dailyValue: '15%' },
        { label: 'Trace Ocean Minerals', amount: '150mg', dailyValue: '—' },
        { label: 'Total Carbohydrates', amount: '2g', dailyValue: '1%' },
        { label: 'Added Sugars', amount: '0g', dailyValue: '0%' },
      ],
    },
  },
  {
    id: 'adaptogen-recovery-complex',
    slug: 'adaptogen-recovery-complex',
    name: 'Adaptogen Recovery Complex',
    subtitle: 'Tart cherry, magnesium bisglycinate & KSM-66',
    category: 'Recovery',
    price: 54,
    servings: 30,
    image: '/src/assets/images/product_recovery_complex_1795330132508.jpg',
    rating: 4.8,
    reviewCount: 204,
    batchCode: 'VL-2026-102',
    macroHighlights: ['480MG TART CHERRY', '300MG MAGNESIUM', '300MG ASHWAGANDHA'],
    attributes: ['Clinical Tart Cherry', '300mg Magnesium', 'Non-Sedating', 'Third-Party Tested'],
    description:
      'An evening parasympathetic protocol built to down-regulate post-training cortisol and accelerate overnight tissue repair. Packaged in UV-protective botanical glass to preserve delicate anthocyanins.',
    clinicalSummary:
      'Montmorency tart cherry standardized to 6.5% anthocyanins combined with TRAACS magnesium bisglycinate supports deep sleep architecture and lower overnight resting heart rate.',
    sourcingNote:
      'Orchard-grown Michigan Montmorency cherries freeze-dried within four hours of harvest, paired with organic root-only ashwagandha extract.',
    preparationSteps: [
      'Take two capsules or one measured scoop with warm water 45 minutes before sleep.',
      'Consistent nightly dosing yields cumulative HRV improvements by week three.',
    ],
    variants: [
      {
        id: 'botanical-capsules',
        name: 'UV Glass Apothecary Jar (Capsules)',
        notes: 'Unflavored plant cellulose capsules · zero taste',
        servingLabel: '60 Capsules · 30 Nightly Doses',
      },
      {
        id: 'tart-cherry-infusion',
        name: 'Tart Cherry Night Infusion (Powder)',
        notes: 'Rich ruby orchard berry with subtle chamomile',
        servingLabel: '180g Jar · 30 Nightly Doses',
      },
    ],
    nutritionManifest: {
      servingSize: '2 Capsules / 1 Scoop (6g)',
      calories: 15,
      rows: [
        { label: 'Montmorency Tart Cherry (50:1)', amount: '480mg', dailyValue: '—' },
        { label: 'Magnesium Bisglycinate', amount: '300mg', dailyValue: '71%' },
        { label: 'Ashwagandha Root (KSM-66)', amount: '300mg', dailyValue: '—' },
        { label: 'L-Theanine (Suntheanine)', amount: '200mg', dailyValue: '—' },
        { label: 'Zinc Picolinate', amount: '11mg', dailyValue: '100%' },
      ],
    },
  },
  {
    id: 'chlorophyll-daily-greens',
    slug: 'chlorophyll-daily-greens',
    name: 'Chlorophyll Daily Greens',
    subtitle: 'Shade-grown matcha, spirulina & organic phytonutrients',
    category: 'Daily Greens',
    price: 64,
    servings: 30,
    image: '/src/assets/images/product_daily_greens_1795330132126.jpg',
    rating: 4.9,
    reviewCount: 289,
    batchCode: 'VL-2026-084',
    featuredTag: 'Apothecary Pick',
    macroHighlights: ['42 BOTANICALS', '5B PROBIOTICS', '0G ADDED SUGAR'],
    attributes: ['Organic Greens', '5B CFU Probiotics', 'Zero Stevia', 'Heavy-Metal Clear'],
    description:
      'Foundational micronutrient density crafted without the artificial sweetness or chalky sediment of conventional green powders. Cold-milled leafy greens, Uji matcha, and spore-based probiotics for gut resilience.',
    clinicalSummary:
      'Delivers 100% daily bioavailable folate, vitamin K1, and chlorophyllin alongside heat-stable Bacillus coagulans for consistent micronutrient uptake.',
    sourcingNote:
      'First-harvest Uji tencha leaf, Hawaiian closed-tube spirulina, and organic Nordic wild-harvested nettle leaf.',
    preparationSteps: [
      'Whisk or shake one scoop (8g) into 250ml cold water first thing in the morning.',
      'Serve over ice with a squeeze of fresh lemon for crisp botanical brightness.',
    ],
    variants: [
      {
        id: 'matcha-mint',
        name: 'Uji Matcha & Crisp Mint',
        notes: 'Clean ceremonial green tea with cooling garden spearmint',
        servingLabel: '240g Matte Tin · 30 Servings',
      },
      {
        id: 'citrus-verbena',
        name: 'Lemon Verbena & Ginger',
        notes: 'Bright herbal citrus aroma, subtly invigorating finish',
        servingLabel: '240g Matte Tin · 30 Servings',
      },
    ],
    nutritionManifest: {
      servingSize: '1 Level Scoop (8g)',
      calories: 30,
      rows: [
        { label: 'Organic Greens & Chlorophyll Matrix', amount: '4.6g', dailyValue: '—' },
        { label: 'Uji Ceremonial Matcha', amount: '1.2g', dailyValue: '—' },
        { label: 'Prebiotic Chicory & Acacia Fiber', amount: '1.8g', dailyValue: '6%' },
        { label: 'Vitamin C (Acerola Cherry)', amount: '90mg', dailyValue: '100%' },
        { label: 'Vitamin K1 (Phylloquinone)', amount: '120mcg', dailyValue: '100%' },
        { label: 'Bacillus Coagulans Probiotic', amount: '5B CFU', dailyValue: '—' },
      ],
    },
  },
  {
    id: 'pre-session-nitric-tonic',
    slug: 'pre-session-nitric-tonic',
    name: 'Pre-Session Nitric Tonic',
    subtitle: 'Organic beetroot nitrate, cordyceps & green tea L-theanine',
    category: 'Hydration',
    price: 48,
    servings: 25,
    image: '/src/assets/images/product_nitric_tonic_1795330132461.jpg',
    rating: 4.8,
    reviewCount: 163,
    batchCode: 'VL-2026-091',
    macroHighlights: ['400MG NITRATES', '100MG CAFFEINE', '1500MG CORDYCEPS'],
    attributes: ['Natural Nitrates', 'Zero Jitters', 'Cordyceps Militaris', 'NSF Certified'],
    description:
      'Calm, sustained vasodilation and aerobic oxygen efficiency without synthetic stimulants or beta-alanine tingling. Balanced natural green tea caffeine paired 1:2 with L-theanine for laser-sharp focus.',
    clinicalSummary:
      'Standardized dietary nitrates support nitric oxide bioavailability within 45 minutes, lowering perceived exertion during tempo runs and threshold cycling.',
    sourcingNote:
      'Dual-extracted fruiting-body Cordyceps militaris blended with Swiss-concentrated organic red beetroot.',
    preparationSteps: [
      'Mix one level scoop (11g) into 300ml cold water 30–40 minutes prior to training.',
      'Suitable for both morning track intervals and strength sessions.',
    ],
    variants: [
      {
        id: 'hibiscus-citrus',
        name: 'Hibiscus & Blood Orange',
        notes: 'Ruby botanical tartness with subtle natural citrus oil',
        servingLabel: '275g Resealable Pouch · 25 Servings',
      },
      {
        id: 'matcha-ginger',
        name: 'Matcha & Yuzu Root',
        notes: 'Earthy botanical lift with crisp ginger warmth',
        servingLabel: '275g Resealable Pouch · 25 Servings',
      },
    ],
    nutritionManifest: {
      servingSize: '1 Level Scoop (11g)',
      calories: 35,
      rows: [
        { label: 'Organic Beetroot Extract (400mg Nitrates)', amount: '5.0g', dailyValue: '—' },
        { label: 'L-Citrulline (Fermented)', amount: '3.0g', dailyValue: '—' },
        { label: 'Cordyceps Militaris (Fruiting Body)', amount: '1.5g', dailyValue: '—' },
        { label: 'Natural Green Tea Caffeine', amount: '100mg', dailyValue: '—' },
        { label: 'L-Theanine', amount: '200mg', dailyValue: '—' },
      ],
    },
  },
  {
    id: 'essential-amino-hydrator',
    slug: 'essential-amino-hydrator',
    name: 'Essential Amino Hydrator',
    subtitle: 'Fermented plant EAAs & coconut water electrolytes',
    category: 'Recovery',
    price: 46,
    servings: 30,
    image: '/src/assets/images/product_kinetic_protein_1795330133006.jpg',
    rating: 4.9,
    reviewCount: 147,
    batchCode: 'VL-2026-102',
    macroHighlights: ['9G PLANT EAAS', '0G SUGAR', '500MG ELECTROLYTES'],
    attributes: ['All 9 EAAs', 'Fermented Plant Source', 'Fast Absorption', 'Vegan'],
    description:
      'Designed for intra-workout endurance and fasted morning training. All nine fermented essential amino acids suspend cleanly in water to protect lean muscle tissue during prolonged effort.',
    clinicalSummary:
      'Free-form fermented amino acids bypass heavy gastric digestion, peaking plasma leucine concentrations within 22 minutes of consumption.',
    sourcingNote:
      'Bio-fermented non-GMO plant amino acids combined with freeze-dried young green coconut water powder.',
    preparationSteps: [
      'Dissolve one scoop (12g) in 500ml chilled water.',
      'Sip steadily during sessions longer than 60 minutes or immediately after fasted cardio.',
    ],
    variants: [
      {
        id: 'bergamot-lime',
        name: 'Bergamot & Key Lime',
        notes: 'Aromatic Italian citrus with refreshing crisp acidity',
        servingLabel: '360g Canister · 30 Servings',
      },
      {
        id: 'white-peach-basil',
        name: 'White Peach & Sweet Basil',
        notes: 'Subtle stone fruit balanced by clean garden herb',
        servingLabel: '360g Canister · 30 Servings',
      },
    ],
    nutritionManifest: {
      servingSize: '1 Level Scoop (12g)',
      calories: 20,
      rows: [
        { label: 'Complete Plant EAA Matrix', amount: '9.0g', dailyValue: '—' },
        { label: 'Fermented L-Leucine', amount: '3.0g', dailyValue: '—' },
        { label: 'Coconut Water Powder', amount: '1.0g', dailyValue: '—' },
        { label: 'Sodium & Potassium Blend', amount: '500mg', dailyValue: '16%' },
        { label: 'Added Sugars', amount: '0g', dailyValue: '0%' },
      ],
    },
  },
];

export const VERIFIED_REVIEWS: VerifiedReview[] = [
  {
    id: 'rev-1',
    author: 'Hannah Lindholm',
    role: '2:44 Marathoner · Zurich',
    rating: 5,
    quote:
      'Every plant protein I tried before left me bloated after long Sunday runs. Switching to Kinetic Plant Protein eliminated stomach heaviness completely, and my 48-hour calf soreness dropped noticeably within three weeks.',
    productId: 'kinetic-plant-protein',
    productName: 'Kinetic Plant Protein',
    variantUsed: 'Madagascar Vanilla Bean',
    date: 'October 2026',
  },
  {
    id: 'rev-2',
    author: 'Marcus Delgado',
    role: 'Endurance Cyclist & Sports PT · Boulder',
    rating: 5,
    quote:
      'Most hydration mixes are cloyingly sweet and still under-dose sodium. Cellular Electrolyte Matrix tastes crisp like chilled yuzu water and kept my power output steady through a 4-hour climb at 8,000 feet.',
    productId: 'cellular-electrolyte-matrix',
    productName: 'Cellular Electrolyte Matrix',
    variantUsed: 'Yuzu & Sea Salt',
    date: 'October 2026',
  },
  {
    id: 'rev-3',
    author: 'Dr. Priya Ramanathan',
    role: 'Clinical Physiologist & Triathlete · Boston',
    rating: 5,
    quote:
      'I verify batch COAs before recommending anything to athletes. Veloce publishes real heavy-metal clearances and doses Montmorency tart cherry and magnesium bisglycinate at actual clinical thresholds.',
    productId: 'adaptogen-recovery-complex',
    productName: 'Adaptogen Recovery Complex',
    variantUsed: 'UV Glass Apothecary Jar',
    date: 'November 2026',
  },
];

export const ACTIVE_INGREDIENTS: ActiveIngredient[] = [
  {
    id: 'ing-protein',
    name: 'Cold-Extracted Pea & Pumpkin Isolate',
    botanicalSource: 'Pisum sativum & Cucurbita pepo',
    clinicalDose: '30g Complete Protein (3.1g L-Leucine)',
    origin: 'Saskatchewan, Canada & Styria, Austria',
    mechanism:
      'Mechanical cold-water fractionation preserves native amino structure and achieves a 98.4% DIAAS-aligned digestibility score without hexane solvents.',
    bioavailabilityScore: '98.4%',
    usedInIds: ['kinetic-plant-protein'],
  },
  {
    id: 'ing-cherry',
    name: 'Montmorency Tart Cherry (50:1)',
    botanicalSource: 'Prunus cerasus (Standardized 6.5% Anthocyanins)',
    clinicalDose: '480mg Freeze-Dried Concentrate',
    origin: 'Traverse City, Michigan',
    mechanism:
      'Attenuates exercise-induced oxidative stress and supports natural nocturnal melatonin synthesis for deeper slow-wave recovery.',
    bioavailabilityScore: '94.2%',
    usedInIds: ['adaptogen-recovery-complex'],
  },
  {
    id: 'ing-magnesium',
    name: 'TRAACS Magnesium Bisglycinate',
    botanicalSource: 'Chelated Mineral Bound to Two Glycine Molecules',
    clinicalDose: '300mg Elemental Magnesium',
    origin: 'Utah Clinical Mineral Lab',
    mechanism:
      'Bypasses competitive mineral channels in the gut, delivering neuromuscular relaxation with zero laxative distress.',
    bioavailabilityScore: '96.0%',
    usedInIds: ['adaptogen-recovery-complex', 'cellular-electrolyte-matrix'],
  },
  {
    id: 'ing-nitrates',
    name: 'Standardized Red Beetroot Nitrates',
    botanicalSource: 'Beta vulgaris (Standardized 8% Inorganic Nitrate)',
    clinicalDose: '400mg Dietary Nitrates',
    origin: 'Valais Valley, Switzerland',
    mechanism:
      'Converts via the enterosalivary pathway into nitric oxide, expanding microvascular flow and lowering oxygen cost at submaximal intensity.',
    bioavailabilityScore: '95.8%',
    usedInIds: ['pre-session-nitric-tonic'],
  },
  {
    id: 'ing-matcha',
    name: 'Shade-Grown First-Harvest Tencha',
    botanicalSource: 'Camellia sinensis (Stone-Milled)',
    clinicalDose: '1,200mg Organic Leaf Powder',
    origin: 'Uji, Kyoto Prefecture',
    mechanism:
      'Rich in EGCG catechins and natural L-theanine, providing calm mitochondrial support and clean antioxidant coverage.',
    bioavailabilityScore: '93.5%',
    usedInIds: ['chlorophyll-daily-greens'],
  },
];

export const BATCH_COAS: Record<string, BatchCOA> = {
  'VL-2026-084': {
    batchCode: 'VL-2026-084',
    productName: 'Kinetic Plant Protein & Chlorophyll Daily Greens',
    testedDate: 'October 28, 2026',
    labPartner: 'Eurofins Analytical · ISO/IEC 17025',
    status: 'Passed',
    metrics: [
      { test: 'Lead (Pb)', result: '0.018 ppm', limit: '< 0.50 ppm', verdict: 'Clear' },
      { test: 'Arsenic (As)', result: '0.011 ppm', limit: '< 1.00 ppm', verdict: 'Clear' },
      { test: 'Cadmium (Cd)', result: '0.009 ppm', limit: '< 0.30 ppm', verdict: 'Clear' },
      { test: 'Mercury (Hg)', result: '< 0.005 ppm', limit: '< 0.10 ppm', verdict: 'Clear' },
      { test: 'Protein Assay Potency', result: '30.4 g / serving', limit: '≥ 30.0 g', verdict: 'Verified' },
      { test: 'WADA / NSF Banned Substances', result: 'Not Detected', limit: 'Zero Tolerance', verdict: 'Clear' },
    ],
  },
  'VL-2026-091': {
    batchCode: 'VL-2026-091',
    productName: 'Cellular Electrolyte Matrix & Pre-Session Nitric Tonic',
    testedDate: 'November 04, 2026',
    labPartner: 'Eurofins Analytical · ISO/IEC 17025',
    status: 'Passed',
    metrics: [
      { test: 'Lead (Pb)', result: '< 0.008 ppm', limit: '< 0.50 ppm', verdict: 'Clear' },
      { test: 'Arsenic (As)', result: '0.006 ppm', limit: '< 1.00 ppm', verdict: 'Clear' },
      { test: 'Sodium Potency Assay', result: '1012 mg / sachet', limit: '± 5% Label', verdict: 'Verified' },
      { test: 'Dietary Nitrate Assay', result: '408 mg / serving', limit: '≥ 400 mg', verdict: 'Verified' },
      { test: 'Total Plate Count (Microbial)', result: '< 100 CFU/g', limit: '< 10,000 CFU/g', verdict: 'Clear' },
      { test: 'WADA / NSF Banned Substances', result: 'Not Detected', limit: 'Zero Tolerance', verdict: 'Clear' },
    ],
  },
  'VL-2026-102': {
    batchCode: 'VL-2026-102',
    productName: 'Adaptogen Recovery Complex & Essential Amino Hydrator',
    testedDate: 'November 12, 2026',
    labPartner: 'Eurofins Analytical · ISO/IEC 17025',
    status: 'Passed',
    metrics: [
      { test: 'Lead (Pb)', result: '0.012 ppm', limit: '< 0.50 ppm', verdict: 'Clear' },
      { test: 'Cadmium (Cd)', result: '0.007 ppm', limit: '< 0.30 ppm', verdict: 'Clear' },
      { test: 'Anthocyanin Standardization', result: '6.8% Verified', limit: '≥ 6.5%', verdict: 'Verified' },
      { test: 'Elemental Magnesium Assay', result: '304 mg / dose', limit: '≥ 300 mg', verdict: 'Verified' },
      { test: 'Yeast & Mold Screen', result: '< 10 CFU/g', limit: '< 1,000 CFU/g', verdict: 'Clear' },
      { test: 'WADA / NSF Banned Substances', result: 'Not Detected', limit: 'Zero Tolerance', verdict: 'Clear' },
    ],
  },
};
