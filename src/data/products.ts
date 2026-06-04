export type ProductCategory = "Detox" | "Calm" | "Energize" | "Nourish";

export interface Product {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  /** Scent family shown on the card */
  scent: string;
  price: number;
  category: ProductCategory;
  /** Primary + secondary colours drive the gradient "soap" visual and the 3D bar */
  accent: string;
  accent2: string;
  rating: number;
  reviews: number;
  badge?: string;
  weight: string;
  ingredients: string[];
  benefits: string[];
  description: string;
}

export const categories: {
  key: ProductCategory;
  label: string;
  blurb: string;
  accent: string;
}[] = [
  { key: "Detox", label: "Detox", blurb: "Deep, clarifying cleanse", accent: "#2e3a30" },
  { key: "Calm", label: "Calm", blurb: "Unwind and restore", accent: "#8a7bb0" },
  { key: "Energize", label: "Energize", blurb: "A bright morning lift", accent: "#e0913f" },
  { key: "Nourish", label: "Nourish", blurb: "Soft, hydrated skin", accent: "#c98a6a" },
];

export const products: Product[] = [
  {
    id: 1,
    slug: "charcoal-detox",
    name: "Midnight Charcoal",
    tagline: "Activated charcoal deep-cleanse bar",
    scent: "Cedar · Vetiver",
    price: 449,
    category: "Detox",
    accent: "#3a3f44",
    accent2: "#14171a",
    rating: 4.9,
    reviews: 312,
    badge: "Bestseller",
    weight: "120g",
    ingredients: ["Activated charcoal", "Shea butter", "Coconut oil", "Tea tree", "Cedarwood"],
    benefits: ["Draws out impurities", "Balances oily skin", "Refines pores"],
    description:
      "Forged with fine activated charcoal and grounding cedar, Midnight Charcoal pulls the day from your skin and leaves a clean, matte finish. A daily reset for face and body.",
  },
  {
    id: 2,
    slug: "lavender-dream",
    name: "Lavender Dream",
    tagline: "Calming French lavender bar",
    scent: "Lavender · Chamomile",
    price: 379,
    category: "Calm",
    accent: "#9a86c4",
    accent2: "#6a5797",
    rating: 4.8,
    reviews: 268,
    badge: "New",
    weight: "120g",
    ingredients: ["French lavender oil", "Oat milk", "Shea butter", "Chamomile", "Olive oil"],
    benefits: ["Soothes the senses", "Softens skin", "Eases tension"],
    description:
      "A nightcap for your skin. Steam-distilled French lavender and oat milk turn a simple wash into a slow, quiet ritual that melts the day away.",
  },
  {
    id: 3,
    slug: "citrus-zest",
    name: "Citrus Zest",
    tagline: "Energising sweet-orange bar",
    scent: "Orange · Grapefruit",
    price: 299,
    category: "Energize",
    accent: "#f0a23a",
    accent2: "#e0631f",
    rating: 4.7,
    reviews: 201,
    badge: "Bestseller",
    weight: "120g",
    ingredients: ["Sweet orange oil", "Grapefruit", "Shea butter", "Poppy seed", "Coconut oil"],
    benefits: ["Wakes up the senses", "Gentle exfoliation", "Brightens dull skin"],
    description:
      "Cold-pressed citrus oils and a whisper of poppy seed make this the most refreshing minute of your morning. Lather, breathe, go.",
  },
  {
    id: 4,
    slug: "rose-petal",
    name: "Rose Petal",
    tagline: "Rosehip & geranium beauty bar",
    scent: "Rose · Geranium",
    price: 399,
    category: "Nourish",
    accent: "#e6a0a8",
    accent2: "#c76b79",
    rating: 4.9,
    reviews: 354,
    weight: "120g",
    ingredients: ["Rosehip oil", "Rose geranium", "Kaolin clay", "Shea butter", "Rose petals"],
    benefits: ["Hydrates deeply", "Evens tone", "Romantic, lingering scent"],
    description:
      "Hand-folded with real rose petals and nourishing rosehip oil, this bar leaves skin silky and lightly perfumed long after you step out.",
  },
  {
    id: 5,
    slug: "eucalyptus-mint",
    name: "Eucalyptus Mint",
    tagline: "Cooling spa shower bar",
    scent: "Eucalyptus · Peppermint",
    price: 349,
    category: "Energize",
    accent: "#69b59a",
    accent2: "#2f8d72",
    rating: 4.8,
    reviews: 189,
    weight: "120g",
    ingredients: ["Eucalyptus oil", "Peppermint", "Menthol", "Spirulina", "Coconut oil"],
    benefits: ["Clears the head", "Cooling tingle", "Great post-workout"],
    description:
      "Turn your shower into a steam room. Eucalyptus and peppermint open up the senses with a clean, cooling tingle that lingers.",
  },
  {
    id: 6,
    slug: "oatmeal-honey",
    name: "Oatmeal & Honey",
    tagline: "Gentle exfoliating comfort bar",
    scent: "Honey · Almond",
    price: 299,
    category: "Nourish",
    accent: "#e3c98a",
    accent2: "#caa15f",
    rating: 4.9,
    reviews: 297,
    badge: "Sensitive skin",
    weight: "120g",
    ingredients: ["Colloidal oatmeal", "Raw honey", "Sweet almond oil", "Goat milk", "Vanilla"],
    benefits: ["Calms sensitive skin", "Gentle scrub", "Locks in moisture"],
    description:
      "Stone-ground oats and raw honey make the kindest bar we offer — soothing for sensitive and reactive skin, comforting for everyone else.",
  },
  {
    id: 7,
    slug: "sea-salt-kelp",
    name: "Sea Salt & Kelp",
    tagline: "Mineral-rich ocean bar",
    scent: "Sea salt · Sage",
    price: 399,
    category: "Detox",
    accent: "#4f93a8",
    accent2: "#2c6678",
    rating: 4.7,
    reviews: 156,
    weight: "120g",
    ingredients: ["Atlantic sea salt", "Kelp extract", "Spirulina", "Shea butter", "Sage"],
    benefits: ["Remineralises skin", "Firming feel", "Detoxifying lather"],
    description:
      "Harvested-salt crystals and kelp deliver a brisk, mineral-rich cleanse that leaves skin feeling firm, fresh and faintly oceanic.",
  },
  {
    id: 8,
    slug: "turmeric-glow",
    name: "Turmeric Glow",
    tagline: "Brightening turmeric & saffron bar",
    scent: "Turmeric · Sandalwood",
    price: 449,
    category: "Nourish",
    accent: "#eab94a",
    accent2: "#d98a2b",
    rating: 4.8,
    reviews: 223,
    badge: "New",
    weight: "120g",
    ingredients: ["Turmeric", "Saffron", "Sandalwood", "Shea butter", "Honey"],
    benefits: ["Brightens complexion", "Evens skin tone", "Antioxidant-rich"],
    description:
      "An age-old beauty ritual in a bar. Turmeric and saffron lend a warm glow while sandalwood grounds the blend in quiet luxury.",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const featured = products.filter((p) =>
  ["charcoal-detox", "lavender-dream", "citrus-zest", "rose-petal"].includes(p.slug)
);
