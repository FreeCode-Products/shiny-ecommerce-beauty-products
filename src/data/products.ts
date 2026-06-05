export type ProductCategory = "Detox" | "Calm" | "Energize" | "Nourish";

export interface KeyIngredient {
  name: string;
  description: string;
}

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
  /** Net weight ("110g") for bars or net volume ("30ml") for washes */
  weight: string;
  ingredients: string[];
  benefits: string[];
  description: string;
  /** Rich content sourced from the product description sheet. */
  shortDescription?: string;
  longDescription?: string[];
  productType?: string;
  skinType?: string;
  fragranceProfile?: string;
  usage?: string;
  keyIngredients?: KeyIngredient[];
  howToUse?: string[];
  storage?: string[];
  care?: string[];
  whyYouLoveIt?: string;
  /** Admin-managed (present on DB-backed products). */
  featured?: boolean;
  sortOrder?: number;
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

// Shared usage / storage / care copy (identical across the handcrafted bars).
const soapHowToUse = [
  "Wet your skin and the soap bar with water.",
  "Work the soap into a rich, creamy lather.",
  "Gently massage onto the skin using circular motions.",
  "Rinse thoroughly with clean water.",
  "Allow the soap to dry between uses.",
];
const soapStorage = [
  "Store in a cool, dry place.",
  "Keep on a well-drained soap dish after use.",
  "Avoid leaving the soap in standing water.",
  "Keep away from direct sunlight and excessive heat.",
  "Allow the soap to dry completely between uses to extend its lifespan.",
];
const soapCare = [
  "For external use only.",
  "Avoid contact with eyes.",
  "Discontinue use if irritation occurs.",
  "Keep out of reach of children.",
  "Perform a patch test before first use if you have sensitive skin.",
];

const washHowToUse = [
  "Wet your face with water.",
  "Take a small amount of face wash onto your palm.",
  "Gently massage onto the face using circular motions.",
  "Rinse thoroughly with water.",
  "Pat dry and follow with your skincare routine.",
];
const washStorage = [
  "Store in a cool, dry place.",
  "Keep the container tightly closed after use.",
  "Avoid direct sunlight and excessive heat.",
  "Keep away from moisture and water contamination.",
];
const washCare = [
  "For external use only.",
  "Avoid direct contact with eyes.",
  "Discontinue use if irritation occurs.",
  "Keep out of reach of children.",
];

export const products: Product[] = [
  {
    id: 1,
    slug: "midnight-detox",
    name: "Midnight Detox",
    tagline: "Charcoal & tea tree shea butter bar",
    scent: "Tea tree · Charcoal",
    price: 249,
    category: "Detox",
    accent: "#3a3f44",
    accent2: "#14171a",
    rating: 4.9,
    reviews: 312,
    badge: "Bestseller",
    weight: "110g",
    ingredients: [
      "Shea butter",
      "Activated charcoal powder",
      "Kaolin clay",
      "Tea tree essential oil",
      "Vitamin E oil",
    ],
    benefits: [
      "Helps remove daily dirt and impurities",
      "Leaves skin feeling fresh and clean",
      "Enriched with nourishing shea butter",
      "Contains kaolin clay for a smooth cleansing experience",
      "Rich and creamy lather",
      "Refreshing tea tree aroma",
      "Suitable for everyday use",
    ],
    shortDescription:
      "A handcrafted cleansing bar enriched with activated charcoal, kaolin clay, and tea tree essential oil. Designed to leave your skin feeling fresh, clean, and comfortably nourished after every wash.",
    description:
      "Experience a refreshing cleanse with Midnight Detox, our handcrafted Charcoal & Tea Tree Shea Butter Soap. Carefully crafted with activated charcoal and kaolin clay, this luxurious cleansing bar helps lift away daily impurities and excess surface oil while maintaining a soft, comfortable feel on the skin.",
    longDescription: [
      "Enriched with nourishing shea butter and vitamin E, it creates a rich, creamy lather that cleanses gently while helping your skin feel smooth and refreshed. The crisp herbal aroma of tea tree essential oil elevates your daily bathing routine, delivering a clean and invigorating cleansing experience.",
      "Perfect for those who enjoy a fresh, deeply cleansed feel with every wash.",
    ],
    productType: "Handcrafted Bath Soap",
    skinType: "Suitable for most skin types",
    fragranceProfile: "Fresh, Herbal & Clean",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Activated Charcoal",
        description:
          "Known for its deep-cleansing properties, helping to remove dirt and impurities from the skin's surface.",
      },
      {
        name: "Shea Butter",
        description:
          "Rich in natural emollients that help leave the skin feeling soft and moisturized.",
      },
      {
        name: "Kaolin Clay",
        description:
          "A gentle clay that contributes to a smooth and luxurious cleansing experience.",
      },
      {
        name: "Tea Tree Essential Oil",
        description: "Provides a fresh, herbal aroma for a refreshing bathing experience.",
      },
      {
        name: "Vitamin E Oil",
        description:
          "Helps support skin conditioning and enhances the overall care experience.",
      },
    ],
    howToUse: soapHowToUse,
    storage: soapStorage,
    care: soapCare,
    whyYouLoveIt:
      "Midnight Detox combines the purifying power of activated charcoal with the nourishing touch of shea butter, creating a balanced cleansing experience that leaves your skin feeling refreshed, smooth, and ready for the day ahead. Every bar is carefully handcrafted to bring together quality ingredients and everyday luxury in a single soap.",
    sortOrder: 1,
  },
  {
    id: 2,
    slug: "coco-creme",
    name: "Coco Crème",
    tagline: "Coconut milk shea butter bar",
    scent: "Coconut · Tropical",
    price: 249,
    category: "Nourish",
    accent: "#e6cf9f",
    accent2: "#c2a062",
    rating: 4.8,
    reviews: 176,
    weight: "110g",
    ingredients: [
      "Shea butter",
      "Coconut milk powder",
      "Coconut milk extract",
      "Kaolin clay",
      "Coconut fragrance oil",
      "Vitamin E oil",
    ],
    benefits: [
      "Gently cleanses without leaving the skin feeling dry",
      "Leaves skin feeling soft and smooth",
      "Enriched with nourishing shea butter",
      "Contains coconut milk for a luxurious bathing experience",
      "Rich and creamy lather",
      "Delightful tropical coconut aroma",
      "Suitable for everyday use",
    ],
    shortDescription:
      "A handcrafted shea butter soap enriched with coconut milk, kaolin clay, and vitamin E to leave your skin feeling soft, refreshed, and beautifully nourished with every wash.",
    description:
      "Indulge in the creamy goodness of Coco Crème, a luxurious handcrafted soap enriched with coconut milk and nourishing shea butter. Carefully crafted to deliver a rich, velvety lather, this soap gently cleanses while leaving the skin feeling soft, smooth, and refreshed.",
    longDescription: [
      "The combination of coconut milk powder and coconut milk extract creates a pampering bathing experience, while kaolin clay contributes to a silky, luxurious cleanse. Finished with a delightful coconut fragrance, every wash feels like a refreshing tropical escape.",
      "Designed for everyday use, Coco Crème brings together gentle cleansing and skin-loving ingredients in one beautifully crafted bar.",
    ],
    productType: "Handcrafted Bath Soap",
    skinType: "Suitable for most skin types",
    fragranceProfile: "Sweet, Creamy & Tropical",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Coconut Milk",
        description:
          "Known for its creamy texture and luxurious feel, helping create a gentle and indulgent cleansing experience.",
      },
      {
        name: "Shea Butter",
        description:
          "Rich in natural emollients that help leave the skin feeling soft and nourished.",
      },
      {
        name: "Kaolin Clay",
        description:
          "Contributes to a smooth, silky cleansing experience and enhances the luxurious feel of the soap.",
      },
      {
        name: "Vitamin E Oil",
        description: "Helps support skin conditioning and overall skin care.",
      },
      {
        name: "Coconut Fragrance Oil",
        description:
          "Provides a warm, comforting tropical aroma that transforms every bath into a refreshing escape.",
      },
    ],
    howToUse: soapHowToUse,
    storage: soapStorage,
    care: soapCare,
    whyYouLoveIt:
      "Coco Crème combines the comforting richness of coconut milk with the nourishing touch of shea butter to create a luxurious everyday cleansing experience. Its creamy lather, silky feel, and tropical aroma make every bath a moment of relaxation and indulgence.",
    sortOrder: 2,
  },
  {
    id: 3,
    slug: "golden-radiance",
    name: "Golden Radiance",
    tagline: "Carrot shea butter bar",
    scent: "Sweet orange · Carrot",
    price: 249,
    category: "Energize",
    accent: "#f3a83f",
    accent2: "#db6f1c",
    rating: 4.8,
    reviews: 142,
    weight: "110g",
    ingredients: [
      "Shea butter",
      "Carrot powder",
      "Carrot extract",
      "Carrot seed essential oil",
      "Sweet orange essential oil",
    ],
    benefits: [
      "Gently cleanses while maintaining skin comfort",
      "Enriched with nourishing shea butter",
      "Contains carrot powder and carrot extract",
      "Leaves skin feeling soft and refreshed",
      "Rich and creamy lather",
      "Fresh citrus and botanical aroma",
      "Suitable for everyday use",
    ],
    shortDescription:
      "A handcrafted shea butter soap enriched with carrot powder, carrot extract, and pure botanical oils to leave your skin feeling refreshed, nourished, and beautifully radiant.",
    description:
      "Bring a touch of natural radiance to your daily skincare ritual with Golden Radiance. Crafted with the goodness of carrot powder, carrot extract, and nourishing shea butter, this luxurious soap delivers a rich, creamy lather that gently cleanses while helping your skin feel soft, smooth, and refreshed.",
    longDescription: [
      "Infused with carrot seed essential oil and sweet orange essential oil, every wash offers a bright, uplifting experience with a fresh citrus aroma. Carefully handcrafted to combine gentle cleansing with botanical nourishment, Golden Radiance transforms your everyday bath into a refreshing self-care moment.",
      "Designed for everyday use, this beautifully crafted soap leaves your skin feeling clean, revitalized, and naturally refreshed.",
    ],
    productType: "Handcrafted Bath Soap",
    skinType: "Suitable for most skin types",
    fragranceProfile: "Fresh, Citrus & Botanical",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Carrot Powder",
        description:
          "A botanical ingredient valued for its naturally rich composition and skin-loving properties.",
      },
      {
        name: "Carrot Extract",
        description:
          "Enhances the luxurious feel of the soap while contributing to a refreshing cleansing experience.",
      },
      {
        name: "Shea Butter",
        description:
          "Rich in natural emollients that help leave the skin feeling soft, smooth, and nourished.",
      },
      {
        name: "Carrot Seed Essential Oil",
        description:
          "A premium botanical oil that complements the soap's refreshing and revitalizing character.",
      },
      {
        name: "Sweet Orange Essential Oil",
        description:
          "Provides a bright, uplifting citrus aroma that enhances every bathing experience.",
      },
    ],
    howToUse: soapHowToUse,
    storage: soapStorage,
    care: soapCare,
    whyYouLoveIt:
      "Golden Radiance blends the goodness of carrot-infused botanicals with the nourishing touch of shea butter to create a refreshing cleansing experience. Its creamy lather, uplifting citrus aroma, and carefully selected ingredients make every bath feel like a moment of pure indulgence.",
    sortOrder: 3,
  },
  {
    id: 4,
    slug: "solar-bloom",
    name: "Solar Bloom",
    tagline: "Brightening botanical detan bar",
    scent: "Lemongrass · Lemon",
    price: 249,
    category: "Energize",
    accent: "#ecc94b",
    accent2: "#c99a2b",
    rating: 4.7,
    reviews: 98,
    badge: "New",
    weight: "110g",
    ingredients: [
      "Shea butter",
      "Orange peel powder",
      "Licorice root powder",
      "Multani mitti",
      "Cucumber extract",
      "Lemongrass essential oil",
      "Lemon essential oil",
    ],
    benefits: [
      "Gently cleanses while maintaining skin comfort",
      "Enriched with nourishing shea butter",
      "Contains orange peel powder and licorice root powder",
      "Infused with refreshing cucumber extract",
      "Rich and creamy lather",
      "Fresh citrus and herbal aroma",
      "Suitable for everyday use",
    ],
    shortDescription:
      "A handcrafted botanical soap enriched with orange peel powder, liquorice root, cucumber extract, and refreshing citrus essential oils to leave your skin feeling fresh, revitalized, and beautifully refreshed.",
    description:
      "Awaken your senses with Solar Bloom, a handcrafted botanical soap thoughtfully created to deliver a refreshing and uplifting cleansing experience. Enriched with orange peel powder, licorice root powder, and cucumber extract, this luxurious bar combines nature-inspired ingredients with nourishing shea butter for a rich and creamy lather.",
    longDescription: [
      "Infused with the invigorating aroma of lemongrass and lemon essential oils, Solar Bloom transforms your daily bath into a refreshing self-care ritual. The addition of multani mitti enhances the cleansing experience, leaving your skin feeling clean, smooth, and refreshed after every wash.",
      "Perfect for everyday use, Solar Bloom is crafted for those who love bright, fresh, and botanical skincare experiences.",
    ],
    productType: "Handcrafted Bath Soap",
    skinType: "Suitable for most skin types",
    fragranceProfile: "Fresh, Citrus & Herbal",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Orange Peel Powder",
        description:
          "A botanical ingredient valued for its refreshing and revitalizing properties, helping create a naturally uplifting cleansing experience.",
      },
      {
        name: "Licorice Root Powder",
        description:
          "A traditional botanical ingredient widely appreciated in skincare formulations for its premium and luxurious appeal.",
      },
      {
        name: "Cucumber Extract",
        description:
          "Known for its refreshing nature and ability to enhance the overall cleansing experience.",
      },
      {
        name: "Multani Mitti",
        description:
          "A natural clay that contributes to a smooth, refreshing, and luxurious cleanse.",
      },
      {
        name: "Shea Butter",
        description:
          "Rich in natural emollients that help leave the skin feeling soft, smooth, and nourished.",
      },
      {
        name: "Lemongrass Essential Oil",
        description: "Provides a crisp, fresh aroma that creates a spa-like bathing experience.",
      },
      {
        name: "Lemon Essential Oil",
        description: "Adds bright citrus notes that uplift and refresh the senses.",
      },
    ],
    howToUse: soapHowToUse,
    storage: soapStorage,
    care: soapCare,
    whyYouLoveIt:
      "Solar Bloom combines carefully selected botanical ingredients with the nourishing touch of shea butter to create a refreshing cleansing experience. Its bright citrus aroma, creamy lather, and nature-inspired formulation make every bath feel uplifting, revitalizing, and wonderfully refreshing.",
    sortOrder: 4,
  },
  {
    id: 5,
    slug: "crimson-root",
    name: "Crimson Root",
    tagline: "Manjistha shea butter bar",
    scent: "Patchouli · Manjistha",
    price: 249,
    category: "Calm",
    accent: "#b35566",
    accent2: "#7d2f3e",
    rating: 4.8,
    reviews: 121,
    weight: "110g",
    ingredients: [
      "Shea butter",
      "Manjistha powder",
      "Red sandal powder",
      "Patchouli essential oil",
    ],
    benefits: [
      "Gently cleanses while maintaining skin comfort",
      "Enriched with nourishing shea butter",
      "Contains manjistha powder and red sandal powder",
      "Leaves skin feeling soft, smooth, and refreshed",
      "Rich and creamy lather",
      "Deep, earthy botanical aroma",
      "Suitable for everyday use",
    ],
    shortDescription:
      "A handcrafted shea butter soap enriched with manjistha powder, red sandal powder, and patchouli essential oil for a rich, botanical cleansing experience that leaves your skin feeling refreshed, smooth, and beautifully cared for.",
    description:
      "Inspired by the richness of traditional botanicals, Crimson Root is a handcrafted soap thoughtfully formulated with manjistha powder, red sandal powder, and nourishing shea butter. This luxurious cleansing bar creates a rich, creamy lather that gently cleanses while leaving the skin feeling soft, refreshed, and comfortable.",
    longDescription: [
      "Infused with the deep, earthy aroma of patchouli essential oil, Crimson Root delivers a grounding and indulgent bathing experience that transforms your daily routine into a moment of mindful self-care. The carefully selected botanical ingredients bring together heritage-inspired craftsmanship and modern everyday luxury.",
      "Crafted for those who appreciate nature-inspired skincare, Crimson Root offers a distinctive cleansing experience with every use.",
    ],
    productType: "Handcrafted Bath Soap",
    skinType: "Suitable for most skin types",
    fragranceProfile: "Earthy, Rich & Botanical",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Manjistha Powder",
        description:
          "A treasured botanical ingredient traditionally valued in herbal skincare and appreciated for its rich botanical character.",
      },
      {
        name: "Red Sandal Powder",
        description:
          "A premium traditional ingredient known for its luxurious appeal and long-standing use in botanical skincare rituals.",
      },
      {
        name: "Shea Butter",
        description:
          "Rich in natural emollients that help leave the skin feeling soft, smooth, and nourished.",
      },
      {
        name: "Patchouli Essential Oil",
        description:
          "Provides a deep, earthy aroma that creates a grounding and sophisticated bathing experience.",
      },
    ],
    howToUse: soapHowToUse,
    storage: soapStorage,
    care: soapCare,
    whyYouLoveIt:
      "Crimson Root combines the richness of traditional botanicals with the nourishing touch of shea butter to create a distinctive cleansing experience. Its creamy lather, grounding aroma, and carefully selected ingredients bring together heritage-inspired care and everyday luxury in one beautifully crafted bar.",
    sortOrder: 5,
  },
  {
    id: 6,
    slug: "cafe-noir",
    name: "Café Noir",
    tagline: "Coffee shea butter bar",
    scent: "Coffee · Vanilla",
    price: 249,
    category: "Nourish",
    accent: "#8a5a3c",
    accent2: "#4a2c1b",
    rating: 4.9,
    reviews: 204,
    badge: "New",
    weight: "110g",
    ingredients: [
      "Shea butter",
      "Coffee powder",
      "Coffee extract",
      "Coffee fragrance oil",
      "Vanilla fragrance oil",
    ],
    benefits: [
      "Gently cleanses while maintaining skin comfort",
      "Enriched with nourishing shea butter",
      "Contains coffee powder and coffee extract",
      "Leaves skin feeling soft and refreshed",
      "Rich and creamy lather",
      "Warm and comforting aroma",
      "Suitable for everyday use",
    ],
    shortDescription:
      "A handcrafted shea butter soap enriched with coffee powder, coffee extract, and warm vanilla notes for a rich, comforting cleansing experience that leaves your skin feeling refreshed and revitalized.",
    description:
      "Inspired by the comforting aroma of a freshly brewed cup of coffee, Café Noir is a handcrafted soap designed to elevate your everyday bathing ritual. Enriched with coffee powder, coffee extract, and nourishing shea butter, this luxurious bar creates a rich, creamy lather that gently cleanses while leaving the skin feeling soft, smooth, and refreshed.",
    longDescription: [
      "The bold aroma of coffee is beautifully balanced with warm vanilla notes, creating a sophisticated fragrance that feels both comforting and indulgent. Carefully crafted to combine botanical ingredients with everyday luxury, Café Noir transforms an ordinary bath into a café-inspired self-care experience.",
      "Perfect for coffee lovers and those who appreciate rich, comforting fragrances, Café Noir brings warmth and indulgence to every wash.",
    ],
    productType: "Handcrafted Bath Soap",
    skinType: "Suitable for most skin types",
    fragranceProfile: "Rich, Warm & Comforting",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Coffee Powder",
        description:
          "A naturally aromatic ingredient that contributes to the soap's distinctive coffee-inspired character and luxurious appeal.",
      },
      {
        name: "Coffee Extract",
        description:
          "Enhances the richness of the formulation and complements the overall cleansing experience.",
      },
      {
        name: "Shea Butter",
        description:
          "Rich in natural emollients that help leave the skin feeling soft, smooth, and nourished.",
      },
      {
        name: "Coffee Fragrance Oil",
        description: "Provides the bold and inviting aroma of freshly brewed coffee.",
      },
      {
        name: "Vanilla Fragrance Oil",
        description:
          "Adds soft, warm notes that create a comforting and well-balanced fragrance profile.",
      },
    ],
    howToUse: soapHowToUse,
    storage: soapStorage,
    care: soapCare,
    whyYouLoveIt:
      "Café Noir combines the richness of coffee with the nourishing touch of shea butter to create a luxurious cleansing experience. Its creamy lather, café-inspired aroma, and thoughtfully selected ingredients bring warmth, comfort, and everyday indulgence to every bath.",
    sortOrder: 6,
  },
  {
    id: 7,
    slug: "sacred-leaf",
    name: "Sacred Leaf",
    tagline: "Kuppaimeni shea butter bar",
    scent: "Eucalyptus · Tulsi",
    price: 249,
    category: "Energize",
    accent: "#6cae6c",
    accent2: "#347a44",
    rating: 4.7,
    reviews: 86,
    weight: "110g",
    ingredients: [
      "Shea butter",
      "Kuppaimeni powder",
      "Tulsi powder",
      "Green clay",
      "Eucalyptus essential oil",
    ],
    benefits: [
      "Gently cleanses while maintaining skin comfort",
      "Enriched with nourishing shea butter",
      "Contains kuppaimeni powder and tulsi powder",
      "Leaves skin feeling refreshed and revitalized",
      "Rich and creamy lather",
      "Fresh herbal aroma",
      "Suitable for everyday use",
    ],
    shortDescription:
      "A handcrafted shea butter soap enriched with kuppaimeni powder, tulsi powder, and green clay for a refreshing herbal cleansing experience that leaves your skin feeling clean, smooth, and revitalized.",
    description:
      "Inspired by the richness of traditional herbal care, Sacred Leaf is a handcrafted soap thoughtfully formulated with kuppaimeni powder, tulsi powder, and nourishing shea butter. This botanical cleansing bar creates a rich, creamy lather that gently cleanses while leaving the skin feeling refreshed, comfortable, and beautifully cared for.",
    longDescription: [
      "Enhanced with green clay and infused with the invigorating aroma of eucalyptus essential oil, Sacred Leaf delivers a refreshing bathing experience inspired by nature. Its carefully selected herbal ingredients work together to create a distinctive cleansing ritual that feels both revitalizing and grounding.",
      "Crafted for those who appreciate nature-inspired skincare and traditional botanical ingredients, Sacred Leaf brings freshness and simplicity to your daily routine.",
    ],
    productType: "Handcrafted Bath Soap",
    skinType: "Suitable for most skin types",
    fragranceProfile: "Fresh, Green & Herbal",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Kuppaimeni Powder",
        description:
          "A traditional botanical ingredient valued for its long-standing use in herbal skincare practices.",
      },
      {
        name: "Tulsi Powder",
        description:
          "A revered herbal ingredient appreciated for its refreshing and botanical character.",
      },
      {
        name: "Green Clay",
        description:
          "A mineral-rich clay that contributes to a smooth and refreshing cleansing experience.",
      },
      {
        name: "Shea Butter",
        description:
          "Rich in natural emollients that help leave the skin feeling soft, smooth, and nourished.",
      },
      {
        name: "Eucalyptus Essential Oil",
        description:
          "Provides a crisp, invigorating aroma that enhances the overall bathing experience.",
      },
    ],
    howToUse: soapHowToUse,
    storage: soapStorage,
    care: soapCare,
    whyYouLoveIt:
      "Sacred Leaf combines traditional botanical ingredients with the nourishing touch of shea butter to create a refreshing cleansing experience inspired by nature. Its creamy lather, invigorating herbal aroma, and carefully selected ingredients make every bath feel revitalizing, grounding, and wonderfully refreshing.",
    sortOrder: 7,
  },
  {
    id: 8,
    slug: "santal-luxe",
    name: "Santal Luxe",
    tagline: "Sandalwood shea butter bar",
    scent: "Sandalwood · Benzoin",
    price: 249,
    category: "Calm",
    accent: "#c8945e",
    accent2: "#97653a",
    rating: 4.9,
    reviews: 268,
    badge: "Bestseller",
    weight: "110g",
    ingredients: [
      "Shea butter",
      "Sandalwood powder",
      "Sandalwood essential oil",
      "Benzoin essential oil",
    ],
    benefits: [
      "Gently cleanses while maintaining skin comfort",
      "Enriched with nourishing shea butter",
      "Contains sandalwood powder",
      "Leaves skin feeling soft, smooth, and refreshed",
      "Rich and creamy lather",
      "Warm and sophisticated woody aroma",
      "Suitable for everyday use",
    ],
    shortDescription:
      "A handcrafted shea butter soap enriched with sandalwood powder and luxurious essential oils for a warm, woody, and sophisticated cleansing experience.",
    description:
      "Experience timeless elegance with Santal Luxe, a handcrafted sandalwood soap inspired by the richness of traditional botanical ingredients. Formulated with sandalwood powder and nourishing shea butter, this luxurious cleansing bar creates a rich, creamy lather that gently cleanses while leaving the skin feeling soft, smooth, and refreshed.",
    longDescription: [
      "Infused with sandalwood essential oil and benzoin essential oil, Santal Luxe delivers a warm, woody aroma with subtle resinous notes that transform every bath into a moment of pure indulgence. Carefully crafted to combine heritage-inspired ingredients with modern luxury, this soap offers a refined cleansing experience designed for everyday use.",
      "Perfect for those who appreciate classic woody fragrances and sophisticated self-care rituals, Santal Luxe brings understated luxury to your daily routine.",
    ],
    productType: "Handcrafted Bath Soap",
    skinType: "Suitable for most skin types",
    fragranceProfile: "Warm, Woody & Sophisticated",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Sandalwood Powder",
        description:
          "A treasured botanical ingredient admired for its rich heritage and luxurious appeal in traditional skincare rituals.",
      },
      {
        name: "Shea Butter",
        description:
          "Rich in natural emollients that help leave the skin feeling soft, smooth, and nourished.",
      },
      {
        name: "Sandalwood Essential Oil",
        description:
          "Provides a warm, woody fragrance that creates a calming and refined bathing experience.",
      },
      {
        name: "Benzoin Essential Oil",
        description:
          "Adds soft, resinous warmth that enhances the depth and sophistication of the fragrance profile.",
      },
    ],
    howToUse: soapHowToUse,
    storage: soapStorage,
    care: soapCare,
    whyYouLoveIt:
      "Santal Luxe combines the timeless beauty of sandalwood with the nourishing touch of shea butter to create a refined cleansing experience. Its creamy lather, rich woody aroma, and carefully selected ingredients bring warmth, comfort, and understated luxury to every bath.",
    sortOrder: 8,
  },
  {
    id: 9,
    slug: "earth-veil",
    name: "Earth Veil",
    tagline: "Vetiver shea butter bar",
    scent: "Vetiver · Neem",
    price: 249,
    category: "Calm",
    accent: "#84905c",
    accent2: "#4d5733",
    rating: 4.7,
    reviews: 109,
    weight: "110g",
    ingredients: ["Shea butter", "Vetiver powder", "Neem powder", "Vetiver essential oil"],
    benefits: [
      "Gently cleanses while maintaining skin comfort",
      "Enriched with nourishing shea butter",
      "Contains vetiver powder and neem powder",
      "Leaves skin feeling refreshed and revitalized",
      "Rich and creamy lather",
      "Earthy and grounding aroma",
      "Suitable for everyday use",
    ],
    shortDescription:
      "A handcrafted shea butter soap enriched with vetiver powder, neem powder, and vetiver essential oil for a refreshing, earthy cleansing experience that leaves your skin feeling clean, balanced, and revitalized.",
    description:
      "Inspired by the grounding essence of nature, Earth Veil is a handcrafted soap thoughtfully formulated with vetiver powder, neem powder, and nourishing shea butter. This botanical cleansing bar creates a rich, creamy lather that gently cleanses while leaving the skin feeling refreshed, smooth, and comfortable.",
    longDescription: [
      "Infused with the distinctive aroma of vetiver essential oil, Earth Veil delivers a calming and earthy bathing experience inspired by traditional botanical care. Its carefully selected ingredients come together to create a soap that feels refreshing, grounding, and naturally luxurious.",
      "Crafted for those who appreciate nature-inspired skincare and timeless herbal ingredients, Earth Veil transforms everyday cleansing into a refreshing self-care ritual.",
    ],
    productType: "Handcrafted Bath Soap",
    skinType: "Suitable for most skin types",
    fragranceProfile: "Earthy, Fresh & Grounding",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Vetiver Powder",
        description:
          "A traditional botanical ingredient valued for its earthy character and long-standing use in herbal skincare practices.",
      },
      {
        name: "Neem Powder",
        description:
          "A respected herbal ingredient appreciated for its botanical richness and traditional skincare heritage.",
      },
      {
        name: "Shea Butter",
        description:
          "Rich in natural emollients that help leave the skin feeling soft, smooth, and nourished.",
      },
      {
        name: "Vetiver Essential Oil",
        description:
          "Provides a fresh, earthy aroma that creates a calming and grounding bathing experience.",
      },
    ],
    howToUse: soapHowToUse,
    storage: soapStorage,
    care: soapCare,
    whyYouLoveIt:
      "Earth Veil combines the richness of traditional botanicals with the nourishing touch of shea butter to create a refreshing cleansing experience inspired by nature. Its creamy lather, earthy aroma, and carefully selected ingredients bring together comfort, simplicity, and botanical luxury in every bath.",
    sortOrder: 9,
  },
  {
    id: 10,
    slug: "rose-reverie",
    name: "Rose Reverie",
    tagline: "Rose & pink clay shea butter bar",
    scent: "Rose · Geranium",
    price: 249,
    category: "Nourish",
    accent: "#e6a0a8",
    accent2: "#c76b79",
    rating: 4.9,
    reviews: 331,
    badge: "Bestseller",
    weight: "110g",
    ingredients: [
      "Shea butter",
      "Pink clay",
      "Rose petal powder",
      "Rose essential oil",
      "Geranium essential oil",
    ],
    benefits: [
      "Gently cleanses while maintaining skin comfort",
      "Enriched with nourishing shea butter",
      "Contains pink clay and rose petal powder",
      "Leaves skin feeling soft and refreshed",
      "Rich and creamy lather",
      "Elegant floral aroma",
      "Suitable for everyday use",
    ],
    shortDescription:
      "A handcrafted shea butter soap enriched with pink clay, rose petal powder, and floral essential oils for a soft, elegant cleansing experience that leaves your skin feeling refreshed, smooth, and beautifully pampered.",
    description:
      "Immerse yourself in the timeless beauty of Rose Reverie, a handcrafted soap inspired by the elegance of blooming roses. Thoughtfully formulated with pink clay, rose petal powder, and nourishing shea butter, this luxurious cleansing bar creates a rich, creamy lather that gently cleanses while leaving the skin feeling soft, smooth, and refreshed.",
    longDescription: [
      "Infused with the delicate aroma of rose essential oil and geranium essential oil, Rose Reverie transforms every bath into a soothing self-care ritual. Its carefully selected botanical ingredients and sophisticated floral fragrance create a beautifully indulgent cleansing experience designed for everyday luxury.",
      "Crafted for those who appreciate graceful floral aromas and nature-inspired skincare, Rose Reverie brings a touch of elegance to your daily routine.",
    ],
    productType: "Handcrafted Bath Soap",
    skinType: "Suitable for most skin types",
    fragranceProfile: "Soft, Floral & Elegant",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Pink Clay",
        description:
          "A gentle clay admired for its luxurious feel and beautiful natural appearance in handcrafted skincare products.",
      },
      {
        name: "Rose Petal Powder",
        description:
          "A botanical ingredient that adds a touch of floral elegance and enhances the soap's luxurious appeal.",
      },
      {
        name: "Shea Butter",
        description:
          "Rich in natural emollients that help leave the skin feeling soft, smooth, and nourished.",
      },
      {
        name: "Rose Essential Oil",
        description:
          "Provides a delicate floral fragrance that creates a calming and indulgent bathing experience.",
      },
      {
        name: "Geranium Essential Oil",
        description:
          "Complements the rose notes with a refined floral aroma, adding depth and sophistication to the fragrance profile.",
      },
    ],
    howToUse: soapHowToUse,
    storage: soapStorage,
    care: soapCare,
    whyYouLoveIt:
      "Rose Reverie combines delicate floral botanicals with the nourishing touch of shea butter to create a luxurious cleansing experience. Its creamy lather, elegant fragrance, and carefully selected ingredients transform every bath into a moment of comfort, beauty, and indulgence.",
    sortOrder: 10,
  },
  {
    id: 11,
    slug: "dew-ritual",
    name: "Dew Ritual",
    tagline: "Sensitive skin face wash",
    scent: "Lavender · Coconut",
    price: 199,
    category: "Calm",
    accent: "#b6a4d6",
    accent2: "#8975b3",
    rating: 4.8,
    reviews: 154,
    badge: "Sensitive skin",
    weight: "30ml",
    ingredients: ["Jojoba", "Coconut milk", "Lavender essential oil", "Hyaluronic acid"],
    benefits: [
      "Gently cleanses without stripping moisture",
      "Helps maintain skin hydration",
      "Leaves skin feeling soft and refreshed",
      "Enriched with jojoba and coconut milk",
      "Lightweight and comfortable for daily use",
      "Suitable for sensitive skin",
    ],
    shortDescription:
      "A gentle daily face wash enriched with jojoba, coconut milk, lavender essential oil, and hyaluronic acid to cleanse, hydrate, and soothe sensitive skin without leaving it feeling dry.",
    description:
      "Discover the comfort of gentle cleansing with Dew Ritual, a thoughtfully crafted face wash designed for sensitive skin. Enriched with jojoba, coconut milk, lavender essential oil, and hyaluronic acid, this refreshing cleanser effectively removes daily impurities while helping maintain the skin's natural moisture balance.",
    longDescription: [
      "Its lightweight formula creates a soft cleansing experience that leaves the skin feeling clean, hydrated, and refreshed after every wash. The calming aroma of lavender essential oil enhances your skincare routine, transforming cleansing into a soothing self-care ritual.",
      "Perfect for everyday use, Dew Ritual is designed to deliver comfort, hydration, and gentle care for delicate skin.",
    ],
    productType: "Face Wash",
    skinType: "Sensitive Skin",
    fragranceProfile: "Soft Floral & Calming",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Jojoba",
        description:
          "A skin-friendly botanical ingredient known for its lightweight and nourishing properties.",
      },
      {
        name: "Coconut Milk",
        description:
          "Adds a creamy, comforting touch to the cleansing experience while helping the skin feel soft and refreshed.",
      },
      {
        name: "Hyaluronic Acid",
        description:
          "Helps support hydration and leaves the skin feeling smooth and comfortable.",
      },
      {
        name: "Lavender Essential Oil",
        description: "Provides a calming aroma that enhances the overall cleansing experience.",
      },
    ],
    howToUse: washHowToUse,
    storage: washStorage,
    care: washCare,
    whyYouLoveIt:
      "Dew Ritual combines gentle cleansing with comforting hydration to create a soothing skincare experience. Its carefully selected ingredients and calming lavender aroma leave your skin feeling clean, soft, and beautifully refreshed after every wash.",
    sortOrder: 11,
  },
  {
    id: 12,
    slug: "acne-defense-ritual",
    name: "Acne Defense Ritual",
    tagline: "Herbal purifying face wash",
    scent: "Tea tree · Peppermint",
    price: 199,
    category: "Detox",
    accent: "#5cab97",
    accent2: "#2e8a70",
    rating: 4.7,
    reviews: 132,
    badge: "New",
    weight: "30ml",
    ingredients: [
      "Neem",
      "Tulsi",
      "Kuppaimeni",
      "Salicylic acid",
      "Tea tree oil",
      "Peppermint oil",
    ],
    benefits: [
      "Effectively removes dirt and excess oil",
      "Helps keep pores feeling clean and refreshed",
      "Enriched with traditional herbal ingredients",
      "Leaves skin feeling balanced and comfortable",
      "Cooling and refreshing cleansing experience",
      "Suitable for oily and blemish-prone skin",
    ],
    shortDescription:
      "A refreshing herbal face wash enriched with neem, tulsi, kuppaimeni, salicylic acid, tea tree oil, and peppermint oil to deeply cleanse and leave the skin feeling fresh, balanced, and revitalized.",
    description:
      "Take control of your daily skincare routine with Acne Defense Ritual, a herbal purifying face wash thoughtfully crafted for oily and blemish-prone skin. Enriched with neem, tulsi, kuppaimeni, and salicylic acid, this refreshing cleanser effectively removes excess oil, dirt, and daily impurities while helping maintain a clean and balanced complexion.",
    longDescription: [
      "Infused with tea tree oil and peppermint oil, it delivers a cooling and invigorating cleansing experience that leaves the skin feeling refreshed and comfortable after every wash. Its lightweight formula creates a rich cleansing experience without leaving the skin feeling heavy or greasy.",
      "Designed for everyday use, Acne Defense Ritual helps keep your skin feeling fresh, clean, and confidently cared for.",
    ],
    productType: "Face Wash",
    skinType: "Oily & Blemish-Prone Skin",
    fragranceProfile: "Fresh, Herbal & Cooling",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Neem",
        description: "A traditional botanical ingredient widely appreciated in herbal skincare.",
      },
      {
        name: "Tulsi",
        description:
          "Known for its refreshing herbal character and long-standing use in skincare rituals.",
      },
      {
        name: "Kuppaimeni",
        description:
          "A valued botanical ingredient traditionally used in herbal skincare formulations.",
      },
      {
        name: "Salicylic Acid",
        description: "Helps support effective cleansing and promotes a refreshed skin feel.",
      },
      {
        name: "Tea Tree Oil",
        description: "Provides a fresh, clean aroma and enhances the cleansing experience.",
      },
      {
        name: "Peppermint Oil",
        description: "Delivers a cooling sensation that leaves the skin feeling revitalized.",
      },
    ],
    howToUse: washHowToUse,
    storage: washStorage,
    care: washCare,
    whyYouLoveIt:
      "Acne Defense Ritual combines traditional herbal ingredients with modern skincare actives to create a refreshing cleansing experience. Its cooling herbal aroma and carefully selected ingredients help leave your skin feeling clean, balanced, and confidently refreshed after every wash.",
    sortOrder: 12,
  },
  {
    id: 13,
    slug: "detox-ritual",
    name: "Detox Ritual",
    tagline: "Charcoal face wash",
    scent: "Charcoal · Tea tree",
    price: 199,
    category: "Detox",
    accent: "#4a5057",
    accent2: "#1d2126",
    rating: 4.8,
    reviews: 167,
    weight: "30ml",
    ingredients: ["Activated charcoal", "French clay", "Tea tree oil"],
    benefits: [
      "Effectively removes dirt and daily impurities",
      "Helps reduce excess surface oil",
      "Leaves skin feeling fresh and clean",
      "Enriched with activated charcoal and French clay",
      "Refreshing herbal cleansing experience",
      "Suitable for everyday use",
    ],
    shortDescription:
      "A deep-cleansing face wash enriched with activated charcoal, tea tree oil, and French clay to remove daily impurities and leave your skin feeling fresh, clean, and revitalized.",
    description:
      "Refresh your skincare routine with Detox Ritual, a purifying face wash crafted to deliver a deep and refreshing cleanse. Enriched with activated charcoal, French clay, and tea tree oil, this cleansing formula effectively removes dirt, excess oil, and daily impurities while helping your skin feel clean and refreshed.",
    longDescription: [
      "Its lightweight cleansing action leaves the skin feeling balanced without a heavy residue, while the crisp herbal aroma creates an invigorating cleansing experience. Carefully formulated for everyday use, Detox Ritual helps maintain a fresh, comfortable complexion throughout the day.",
      "Perfect for those who enjoy a deeply refreshed and purified feeling after every wash.",
    ],
    productType: "Face Wash",
    skinType: "Oily & Combination Skin",
    fragranceProfile: "Fresh, Clean & Herbal",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Activated Charcoal",
        description:
          "Known for its deep-cleansing properties and ability to help lift away surface impurities.",
      },
      {
        name: "French Clay",
        description:
          "A mineral-rich clay that contributes to a smooth and refreshing cleansing experience.",
      },
      {
        name: "Tea Tree Oil",
        description: "Provides a fresh herbal aroma and enhances the overall cleansing experience.",
      },
    ],
    howToUse: washHowToUse,
    storage: washStorage,
    care: washCare,
    whyYouLoveIt:
      "Detox Ritual combines the purifying power of activated charcoal with the refreshing touch of tea tree oil and French clay to create a deeply satisfying cleansing experience. Its clean, invigorating feel leaves your skin refreshed, balanced, and ready to take on the day.",
    sortOrder: 13,
  },
  {
    id: 14,
    slug: "glow-ritual",
    name: "Glow Ritual",
    tagline: "Vitamin C & niacinamide face wash",
    scent: "Orange · Vitamin C",
    price: 199,
    category: "Energize",
    accent: "#f6b24a",
    accent2: "#e0791d",
    rating: 4.8,
    reviews: 145,
    badge: "New",
    weight: "30ml",
    ingredients: ["Vitamin C", "Niacinamide", "Orange essential oil"],
    benefits: [
      "Gently removes dirt and daily impurities",
      "Leaves skin feeling fresh and revitalized",
      "Enriched with Vitamin C and Niacinamide",
      "Helps promote a brighter-looking complexion",
      "Lightweight and comfortable for daily use",
      "Refreshing citrus aroma",
    ],
    shortDescription:
      "A brightening face wash enriched with Vitamin C, Niacinamide, and orange essential oil to leave your skin feeling refreshed, radiant, and beautifully revitalized.",
    description:
      "Reveal your natural glow with Glow Ritual, a refreshing face wash thoughtfully crafted to brighten and energize your daily skincare routine. Enriched with Vitamin C and Niacinamide, this revitalizing cleanser gently removes daily impurities while helping your skin feel fresh, smooth, and radiant.",
    longDescription: [
      "Infused with the uplifting aroma of orange essential oil, Glow Ritual transforms every cleanse into a refreshing self-care experience. Its lightweight formula leaves the skin feeling clean, comfortable, and beautifully refreshed without feeling heavy or greasy.",
      "Designed for everyday use, Glow Ritual helps bring a fresh, luminous feel to your skincare routine, making it the perfect companion for healthy-looking, radiant skin.",
    ],
    productType: "Face Wash",
    skinType: "Suitable for most skin types",
    fragranceProfile: "Fresh, Bright & Citrusy",
    usage: "Daily Cleansing",
    keyIngredients: [
      {
        name: "Vitamin C",
        description:
          "A popular skincare ingredient appreciated for its brightening and revitalizing properties.",
      },
      {
        name: "Niacinamide",
        description:
          "Helps support a smooth and balanced skin appearance while enhancing the overall skincare experience.",
      },
      {
        name: "Orange Essential Oil",
        description:
          "Provides a fresh citrus aroma that leaves the skin feeling refreshed and energized.",
      },
    ],
    howToUse: washHowToUse,
    storage: washStorage,
    care: washCare,
    whyYouLoveIt:
      "Glow Ritual combines the refreshing power of Vitamin C with the balancing benefits of Niacinamide to create a bright and uplifting cleansing experience. Its invigorating citrus aroma and carefully selected ingredients leave your skin feeling refreshed, radiant, and ready to glow every day.",
    sortOrder: 14,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const featuredSlugs = [
  "midnight-detox",
  "santal-luxe",
  "golden-radiance",
  "rose-reverie",
];

export const featured = products.filter((p) => featuredSlugs.includes(p.slug));
