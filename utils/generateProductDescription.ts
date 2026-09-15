import descriptions from "@/data/productDescriptions.json";

type DescriptionCategory = keyof typeof descriptions;

const categoryKeywords: Partial<
  Record<Exclude<DescriptionCategory, "default">, string[]>
> = {
  fashion: [
    "dress",
    "gown",
    "jeans",
    "trouser",
    "pants",
    "shorts",
    "skirt",
    "jacket",
    "hoodie",
    "sweater",
    "clothing",
    "clothes",
    "wear",
    "fashion",
  ],

  shoes: [
    "shoe",
    "shoes",
    "sneaker",
    "sneakers",
    "trainer",
    "trainers",
    "boot",
    "boots",
    "slipper",
    "slippers",
    "sandals",
    "sandal",
    "heels",
    "heel",
    "crocs",
  ],

  bags: [
    "bag",
    "bags",
    "backpack",
    "purse",
    "handbag",
    "wallet",
    "tote",
    "crossbody",
    "clutch",
    "school bag",
  ],

  watches: ["watch", "watches", "smartwatch", "wristwatch", "timepiece"],

  eyewear: ["glasses", "eyeglasses", "sunglasses", "spectacles", "eyewear"],

  jewelry: [
    "jewelry",
    "jewellery",
    "necklace",
    "bracelet",
    "earring",
    "earrings",
    "ring",
    "rings",
    "chain",
    "chains",
    "anklet",
    "pendant",
  ],

  beauty: [
    "beauty",
    "makeup",
    "cosmetic",
    "cosmetics",
    "lipstick",
    "foundation",
    "concealer",
    "mascara",
    "eyeliner",
  ],

  skincare: [
    "skincare",
    "skin care",
    "face cream",
    "moisturizer",
    "moisturiser",
    "serum",
    "cleanser",
    "toner",
    "sunscreen",
    "face wash",
  ],

  hair: [
    "hair",
    "shampoo",
    "conditioner",
    "hair oil",
    "hair cream",
    "hair gel",
    "wig",
    "wigs",
    "braids",
    "extension",
    "extensions",
  ],

  makeup: [
    "makeup",
    "foundation",
    "concealer",
    "powder",
    "blush",
    "lipstick",
    "lip gloss",
    "mascara",
    "eyeshadow",
    "eyeliner",
  ],

  nail_care: [
    "nail",
    "nails",
    "nail polish",
    "gel polish",
    "manicure",
    "pedicure",
  ],

  fragrance_body_care: [
    "perfume",
    "fragrance",
    "cologne",
    "parfum",
    "body spray",
    "body mist",
    "deodorant",
    "body wash",
  ],

  phones: [
    "phone",
    "iphone",
    "samsung",
    "tecno",
    "infinix",
    "xiaomi",
    "pixel",
    "oneplus",
    "android",
  ],

  phones_tablets: [
    "tablet",
    "ipad",
    "galaxy tab",
    "tab",
    "ipad pro",
    "ipad air",
  ],

  electronics: [
    "electronics",
    "electronic",
    "gadget",
    "device",
    "charger",
    "power bank",
    "adapter",
    "cable",
  ],

  computers: [
    "laptop",
    "computer",
    "desktop",
    "macbook",
    "imac",
    "chromebook",
    "notebook",
  ],

  computer_accessories: [
    "keyboard",
    "mouse",
    "webcam",
    "monitor",
    "mouse pad",
    "laptop stand",
    "usb hub",
    "docking station",
  ],

  audio: [
    "headphone",
    "headphones",
    "earbuds",
    "earphone",
    "earphones",
    "speaker",
    "speakers",
    "airpods",
    "soundbar",
    "microphone",
  ],

  cameras: [
    "camera",
    "cameras",
    "dslr",
    "mirrorless",
    "gopro",
    "action camera",
    "lens",
    "tripod",
  ],

  networking: [
    "router",
    "wifi",
    "wi-fi",
    "modem",
    "network",
    "ethernet",
    "switch",
    "access point",
  ],

  smart_home: [
    "smart home",
    "smart bulb",
    "smart light",
    "smart plug",
    "smart switch",
    "smart lock",
    "smart device",
  ],

  lighting: [
    "lamp",
    "lamps",
    "light",
    "lights",
    "bulb",
    "bulbs",
    "chandelier",
    "led",
    "lantern",
  ],

  home: [
    "home",
    "house",
    "organizer",
    "storage",
    "rack",
    "basket",
    "curtain",
    "mat",
  ],

  kitchen: [
    "kitchen",
    "blender",
    "kettle",
    "pot",
    "pan",
    "plate",
    "cup",
    "mug",
    "cutlery",
    "utensil",
    "air fryer",
    "microwave",
  ],

  furniture: [
    "furniture",
    "chair",
    "table",
    "sofa",
    "couch",
    "bed",
    "wardrobe",
    "cabinet",
    "shelf",
    "bookshelf",
  ],

  office_furniture: [
    "office chair",
    "office desk",
    "desk",
    "workstation",
    "office table",
    "filing cabinet",
  ],

  bedding: [
    "bedsheet",
    "bed sheet",
    "duvet",
    "blanket",
    "pillow",
    "pillowcase",
    "comforter",
    "mattress",
  ],

  bathroom: ["bathroom", "shower", "towel", "toilet", "bath mat", "soap dish"],

  cleaning: [
    "cleaner",
    "cleaning",
    "detergent",
    "disinfectant",
    "mop",
    "broom",
    "brush",
    "vacuum",
  ],

  laundry: [
    "laundry",
    "washing",
    "washing powder",
    "fabric softener",
    "iron",
    "ironing",
    "laundry basket",
  ],

  food: [
    "cake",
    "bread",
    "cookie",
    "cookies",
    "food",
    "snack",
    "rice",
    "meat",
    "chicken",
    "fish",
    "pizza",
    "burger",
    "pastry",
    "pie",
  ],

  drinks: [
    "drink",
    "drinks",
    "juice",
    "water",
    "soda",
    "soft drink",
    "wine",
    "cocktail",
    "coffee",
    "tea",
    "smoothie",
  ],

  sports: [
    "football",
    "soccer",
    "basketball",
    "tennis",
    "fitness",
    "gym",
    "sports",
    "training",
    "jersey",
  ],

  fitness_equipment: [
    "dumbbell",
    "dumbbells",
    "treadmill",
    "bench press",
    "resistance band",
    "yoga mat",
    "kettlebell",
    "exercise bike",
  ],

  gaming: [
    "playstation",
    "xbox",
    "nintendo",
    "gaming",
    "gamepad",
    "controller",
    "console",
    "gaming chair",
  ],

  books: ["book", "books", "novel", "textbook", "journal", "magazine"],

  stationery: [
    "pen",
    "pencil",
    "notebook",
    "stapler",
    "marker",
    "paper",
    "stationery",
  ],

  school_supplies: [
    "school",
    "school bag",
    "school supplies",
    "exercise book",
    "calculator",
    "ruler",
    "eraser",
  ],

  toys_games: [
    "toy",
    "toys",
    "puzzle",
    "board game",
    "doll",
    "lego",
    "blocks",
    "remote control car",
  ],

  kids: ["kids", "kid", "child", "children", "children's", "boy", "girl"],

  baby: [
    "baby",
    "babies",
    "newborn",
    "infant",
    "diaper",
    "nappy",
    "feeding bottle",
  ],

  maternity: ["maternity", "pregnancy", "pregnant", "nursing", "breastfeeding"],

  automotive: [
    "car",
    "vehicle",
    "auto",
    "automotive",
    "car part",
    "brake",
    "engine",
    "tyre",
    "tire",
    "battery",
  ],

  automotive_care: [
    "car wash",
    "car wax",
    "car polish",
    "dashboard cleaner",
    "car shampoo",
    "car care",
  ],

  motorcycle: ["motorcycle", "motorbike", "bike", "scooter", "helmet"],

  pets: ["pet", "dog", "cat", "puppy", "kitten", "bird", "rabbit"],

  pet_food: [
    "dog food",
    "cat food",
    "pet food",
    "puppy food",
    "kitten food",
    "bird food",
  ],

  pet_accessories: [
    "dog collar",
    "cat collar",
    "leash",
    "pet bed",
    "pet toy",
    "pet bowl",
  ],

  garden: [
    "garden",
    "gardening",
    "plant",
    "flower",
    "seed",
    "fertilizer",
    "watering can",
    "planter",
  ],

  outdoor: [
    "camping",
    "tent",
    "hiking",
    "outdoor",
    "sleeping bag",
    "camping chair",
    "cooler",
  ],

  travel: [
    "travel",
    "luggage",
    "suitcase",
    "travel bag",
    "passport holder",
    "travel pillow",
  ],

  tools: [
    "tool",
    "tools",
    "hammer",
    "screwdriver",
    "wrench",
    "drill",
    "pliers",
    "saw",
  ],

  tools_hardware: [
    "hardware",
    "power tool",
    "hand tool",
    "screw",
    "bolt",
    "nail",
    "drill bit",
  ],

  building_materials: [
    "cement",
    "concrete",
    "tile",
    "tiles",
    "roofing",
    "brick",
    "block",
    "wood",
    "lumber",
    "building material",
  ],

  industrial: [
    "industrial",
    "machine",
    "machinery",
    "equipment",
    "generator",
    "compressor",
    "pump",
  ],

  restaurant_supplies: [
    "restaurant",
    "commercial kitchen",
    "food warmer",
    "serving tray",
    "restaurant equipment",
  ],

  musical_instruments: [
    "guitar",
    "piano",
    "keyboard",
    "drum",
    "violin",
    "trumpet",
    "ukulele",
    "instrument",
  ],

  art_crafts: [
    "paint",
    "painting",
    "canvas",
    "craft",
    "crafts",
    "drawing",
    "art",
    "brush",
    "watercolor",
  ],

  gifts: ["gift", "gifts", "present", "birthday gift", "gift box", "gift set"],

  party_supplies: [
    "party",
    "balloon",
    "balloons",
    "decoration",
    "birthday",
    "wedding",
    "confetti",
  ],

  security: [
    "security",
    "cctv",
    "camera security",
    "alarm",
    "padlock",
    "door lock",
    "safe",
  ],

  solar_energy: [
    "solar",
    "solar panel",
    "inverter",
    "battery",
    "solar light",
    "solar system",
  ],
};

export function generateProductDescription(productName: string): string {
  const name = productName.trim();

  if (!name) return "";

  const lowerName = name.toLowerCase();

  let category: DescriptionCategory = "default";

  for (const [key, keywords] of Object.entries(categoryKeywords)) {
    if (
      keywords?.some((keyword) => lowerName.includes(keyword.toLowerCase()))
    ) {
      category = key as DescriptionCategory;
      break;
    }
  }

  const suggestions = descriptions[category];

  if (!suggestions || suggestions.length === 0) {
    return "";
  }

  const randomIndex = Math.floor(Math.random() * suggestions.length);

  return suggestions[randomIndex].replaceAll("{name}", name);
}
