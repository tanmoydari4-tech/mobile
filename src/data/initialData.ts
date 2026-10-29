import { Product, Coupon, DeliveryArea, SiteSettings, User, Review, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-samsung-s24-ultra',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra 5G',
    title: 'Samsung Galaxy S24 Ultra 5G (AI Powered Flagship)',
    category: 'flagship',
    shortSpecs: 'Snapdragon 8 Gen 3 | 200MP Quad Camera | 5000mAh | S-Pen Included',
    description: 'The pinnacle of smartphone innovation. Features Galaxy AI, a stunning 6.8-inch Dynamic AMOLED 2X flat display with titanium frame, Corning Gorilla Armor for scratch resistance and reduced reflections, and 200MP quad telephoto camera with up to 100x Space Zoom.',
    basePrice: 129999,
    originalPrice: 134999,
    discountPercent: 4,
    mainImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-s24u-12-256-black',
        ram: '12GB',
        storage: '256GB',
        color: 'Titanium Black',
        colorHex: '#1e2022',
        price: 129999,
        originalPrice: 134999,
        stock: 5,
        sku: 'SAM-S24U-12-256-TB'
      },
      {
        id: 'var-s24u-12-512-grey',
        ram: '12GB',
        storage: '512GB',
        color: 'Titanium Gray',
        colorHex: '#717578',
        price: 139999,
        originalPrice: 144999,
        stock: 4,
        sku: 'SAM-S24U-12-512-TG'
      },
      {
        id: 'var-s24u-12-1tb-violet',
        ram: '12GB',
        storage: '1TB',
        color: 'Titanium Violet',
        colorHex: '#483c5c',
        price: 159999,
        originalPrice: 164999,
        stock: 2,
        sku: 'SAM-S24U-12-1T-TV'
      }
    ],
    specifications: {
      processor: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)',
      displaySize: '6.8 inch Quad HD+ Dynamic AMOLED 2X',
      displayType: 'LTPO 1Hz-120Hz, 2600 nits peak brightness, Gorilla Armor',
      refreshRate: '120Hz Adaptive',
      rearCamera: '200MP (OIS) Main + 50MP 5x Periscope + 10MP 3x Telephoto + 12MP Ultra-wide',
      frontCamera: '12MP Dual Pixel AF (4K 60fps)',
      battery: '5000 mAh Li-Ion',
      chargingSpeed: '45W Fast Wired Charging, 15W Wireless, Reverse Wireless Charging',
      network5G: 'Dual SIM 5G (SA/NSA) with 17 Global 5G Bands',
      os: 'One UI 6.1 based on Android 14 (7 Years OS & Security Updates)',
      simType: 'Dual Nano-SIM + eSIM support',
      connectivity: 'Wi-Fi 7, Bluetooth 5.3, NFC, USB Type-C 3.2 Gen 2, UWB',
      inBoxContents: 'Handset, USB Type-C to Type-C Cable, SIM Eject Tool, S-Pen, Quick Guide',
      warranty: '1 Year Comprehensive Manufacturer Warranty on Handset and 6 Months on Accessories'
    },
    rating: 4.8,
    reviewCount: 38,
    isFeatured: true,
    isBestSeller: true,
    isTodayDeal: true,
    enabled: true,
    createdAt: '2026-01-10T10:00:00.000Z'
  },
  {
    id: 'prod-apple-iphone-16-pro',
    brand: 'Apple',
    model: 'iPhone 16 Pro',
    title: 'Apple iPhone 16 Pro (Desert Titanium)',
    category: 'flagship',
    shortSpecs: 'Apple A18 Pro Chip | 48MP Fusion Triple Cam | Super Retina XDR 120Hz',
    description: 'Forged in Grade 5 Titanium with thinner borders. Powered by the groundbreaking A18 Pro chip designed for Apple Intelligence. Features an all-new Camera Control button, 4K 120 fps Dolby Vision video recording, and a huge leap in battery life.',
    basePrice: 119900,
    originalPrice: 129900,
    discountPercent: 8,
    mainImage: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-ip16p-128-desert',
        ram: '8GB',
        storage: '128GB',
        color: 'Desert Titanium',
        colorHex: '#cbb69d',
        price: 119900,
        originalPrice: 129900,
        stock: 6,
        sku: 'APL-IP16P-128-DT'
      },
      {
        id: 'var-ip16p-256-natural',
        ram: '8GB',
        storage: '256GB',
        color: 'Natural Titanium',
        colorHex: '#9e9992',
        price: 129900,
        originalPrice: 139900,
        stock: 4,
        sku: 'APL-IP16P-256-NT'
      },
      {
        id: 'var-ip16p-512-black',
        ram: '8GB',
        storage: '512GB',
        color: 'Black Titanium',
        colorHex: '#252627',
        price: 149900,
        originalPrice: 159900,
        stock: 3,
        sku: 'APL-IP16P-512-BT'
      }
    ],
    specifications: {
      processor: 'Apple A18 Pro Bionic chip with 6-core GPU & 16-core Neural Engine',
      displaySize: '6.3 inch Super Retina XDR OLED display',
      displayType: 'ProMotion technology with adaptive refresh rates up to 120Hz, 2000 nits peak',
      refreshRate: '120Hz ProMotion',
      rearCamera: '48MP Fusion (OIS) + 48MP Ultra-Wide with Macro + 12MP 5x Telephoto',
      frontCamera: '12MP TrueDepth front camera with Photonic Engine and Autofocus',
      battery: '3582 mAh with up to 27 hours video playback',
      chargingSpeed: 'MagSafe wireless charging up to 25W, 50% charge in 30 mins with 20W adapter',
      network5G: '5G (sub-6 GHz and mmWave) with 4x4 MIMO',
      os: 'iOS 18 with Apple Intelligence',
      simType: 'Dual SIM (nano-SIM and eSIM)',
      connectivity: 'Wi-Fi 7, Bluetooth 5.3, Ultra Wideband chip Gen 2, USB-C (USB 3 up to 10Gb/s)',
      inBoxContents: 'iPhone 16 Pro, USB-C Charge Cable (1m braided), Documentation',
      warranty: '1 Year Apple Official Limited Warranty with AppleCare+ option'
    },
    rating: 4.9,
    reviewCount: 42,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    enabled: true,
    createdAt: '2026-01-15T10:00:00.000Z'
  },
  {
    id: 'prod-oneplus-12',
    brand: 'OnePlus',
    model: 'OnePlus 12 5G',
    title: 'OnePlus 12 5G (Hasselblad Camera for Mobile)',
    category: 'flagship',
    shortSpecs: 'Snapdragon 8 Gen 3 | 50MP Hasselblad Cam | 5400mAh 100W SUPERVOOC',
    description: 'Peak performance redifined. Equipped with 4th Gen Hasselblad Camera system, 2K 120Hz ProXDR display with revolutionary Aqua Touch technology, Dual Cryo-velocity VC cooling, and incredible 100W wired & 50W AIRVOOC wireless fast charging.',
    basePrice: 64999,
    originalPrice: 69999,
    discountPercent: 7,
    mainImage: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-op12-12-256-green',
        ram: '12GB',
        storage: '256GB',
        color: 'Flowy Emerald',
        colorHex: '#2d5a4c',
        price: 64999,
        originalPrice: 69999,
        stock: 8,
        sku: '1PL-12-12-256-FE'
      },
      {
        id: 'var-op12-16-512-black',
        ram: '16GB',
        storage: '512GB',
        color: 'Silky Black',
        colorHex: '#1a1a1a',
        price: 69999,
        originalPrice: 74999,
        stock: 5,
        sku: '1PL-12-16-512-SB'
      }
    ],
    specifications: {
      processor: 'Qualcomm Snapdragon 8 Gen 3 (4nm)',
      displaySize: '6.82 inch 2K 3168x1440 ProXDR AMOLED',
      displayType: 'LTPO 3.0 120Hz, 4500 nits peak brightness, Dolby Vision',
      refreshRate: '120Hz Adaptive',
      rearCamera: '50MP Sony LYT-808 (OIS) + 64MP 3x Periscope (OIS) + 48MP Ultra-wide',
      frontCamera: '32MP Sony IMX615 with 4K recording',
      battery: '5400 mAh Dual-cell battery',
      chargingSpeed: '100W SUPERVOOC Fast Charging (100% in 26 mins) + 50W AIRVOOC Wireless',
      network5G: 'Dual SIM 5G NSA/SA with 16 Bands',
      os: 'OxygenOS 14 based on Android 14',
      simType: 'Dual Nano-SIM',
      connectivity: 'Wi-Fi 7, Bluetooth 5.4, NFC, Infrared blaster, USB 3.2 Gen 1',
      inBoxContents: 'OnePlus 12, 100W Power Adapter, Type-A to Type-C Cable, Screen Protector, SIM Eject Tool',
      warranty: '1 Year Manufacturer Warranty for Phone and 6 Months for in-box Accessories'
    },
    rating: 4.7,
    reviewCount: 29,
    isFeatured: true,
    isTodayDeal: true,
    enabled: true,
    createdAt: '2026-01-20T10:00:00.000Z'
  },
  {
    id: 'prod-redmi-note-13-pro-plus',
    brand: 'Xiaomi',
    model: 'Redmi Note 13 Pro+ 5G',
    title: 'Redmi Note 13 Pro+ 5G (200MP OIS | 120W HyperCharge)',
    category: 'mid-range',
    shortSpecs: 'MediaTek Dimensity 7200-Ultra | 200MP OIS Camera | 120W HyperCharge | IP68',
    description: 'The supercharged mid-range flagship. Stunning 3D Curved 1.5K AMOLED display, IP68 water & dust resistance, flagship 200MP ISOCELL HP3 camera sensor with in-sensor 4x lossless zoom, and lightning-fast 120W HyperCharge delivering 100% in just 19 minutes.',
    basePrice: 29999,
    originalPrice: 33999,
    discountPercent: 12,
    mainImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-rn13p-8-256-purple',
        ram: '8GB',
        storage: '256GB',
        color: 'Fusion Purple (Vegan Leather)',
        colorHex: '#735b75',
        price: 29999,
        originalPrice: 33999,
        stock: 12,
        sku: 'XMI-RN13P-8-256-FP'
      },
      {
        id: 'var-rn13p-12-512-black',
        ram: '12GB',
        storage: '512GB',
        color: 'Fusion Black',
        colorHex: '#202022',
        price: 33999,
        originalPrice: 37999,
        stock: 7,
        sku: 'XMI-RN13P-12-512-FB'
      }
    ],
    specifications: {
      processor: 'MediaTek Dimensity 7200-Ultra (4nm)',
      displaySize: '6.67 inch 1.5K 120Hz Curved CrystalRes AMOLED',
      displayType: 'Corning Gorilla Glass Victus, 1800 nits peak, 1920Hz PWM dimming',
      refreshRate: '120Hz',
      rearCamera: '200MP (OIS) Samsung HP3 + 8MP Ultra-wide + 2MP Macro',
      frontCamera: '16MP In-display Selfie Camera',
      battery: '5000 mAh Li-Po Battery',
      chargingSpeed: '120W HyperCharge (100% in 19 mins)',
      network5G: 'Dual SIM 5G (10 Global Bands)',
      os: 'MIUI 14 with upgrade to Xiaomi HyperOS',
      simType: 'Dual Nano-SIM',
      connectivity: 'Wi-Fi 6, Bluetooth 5.3, NFC, IR Blaster',
      inBoxContents: 'Redmi Note 13 Pro+, 120W Adapter, USB Type-C Cable, SIM Tool, Case, User Guide',
      warranty: '1 Year Brand Warranty on Mobile Phone and 6 Months on in-box accessories'
    },
    rating: 4.6,
    reviewCount: 54,
    isFeatured: true,
    isBestSeller: true,
    isTodayDeal: true,
    enabled: true,
    createdAt: '2026-01-05T10:00:00.000Z'
  },
  {
    id: 'prod-realme-gt-6',
    brand: 'Realme',
    model: 'Realme GT 6 5G',
    title: 'Realme GT 6 5G (AI Flagship Killer)',
    category: 'gaming',
    shortSpecs: 'Snapdragon 8s Gen 3 | 6000 nits Ultra Bright Display | 50MP Sony LYT-808',
    description: 'Built for speed and power. Equipped with Snapdragon 8s Gen 3 processor, world-record 6000 nits 8T LTPO display, Next-gen Iceberg Vapor Cooling system with 10,014mm² area, and 5500mAh battery with 120W SUPERVOOC charging.',
    basePrice: 40999,
    originalPrice: 44999,
    discountPercent: 9,
    mainImage: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-rgt6-8-256-silver',
        ram: '8GB',
        storage: '256GB',
        color: 'Fluid Silver',
        colorHex: '#c0c3c7',
        price: 40999,
        originalPrice: 44999,
        stock: 9,
        sku: 'RLM-GT6-8-256-FS'
      },
      {
        id: 'var-rgt6-12-256-green',
        ram: '12GB',
        storage: '256GB',
        color: 'Razor Green',
        colorHex: '#1e382b',
        price: 42999,
        originalPrice: 46999,
        stock: 6,
        sku: 'RLM-GT6-12-256-RG'
      }
    ],
    specifications: {
      processor: 'Qualcomm Snapdragon 8s Gen 3 (4nm)',
      displaySize: '6.78 inch 1.5K 8T LTPO AMOLED',
      displayType: '6000 nits peak brightness, 2160Hz PWM Dimming, Gorilla Glass Victus 2',
      refreshRate: '120Hz Adaptive',
      rearCamera: '50MP Sony LYT-808 (OIS) + 50MP 2x Telephoto + 8MP Ultra-wide',
      frontCamera: '32MP Sony IMX615',
      battery: '5500 mAh Dual-cell battery',
      chargingSpeed: '120W SUPERVOOC (50% in 10 mins)',
      network5G: 'Dual 5G Standalone and Non-Standalone',
      os: 'realme UI 5.0 based on Android 14',
      simType: 'Dual Nano-SIM',
      connectivity: 'Wi-Fi 6, Bluetooth 5.4, NFC, 360° Antenna Matrix',
      inBoxContents: 'Realme GT 6, 120W Charger, USB Type-C Cable, Protect Case, SIM Pin',
      warranty: '1 Year Manufacturer Warranty'
    },
    rating: 4.6,
    reviewCount: 19,
    isFeatured: true,
    isNewArrival: true,
    enabled: true,
    createdAt: '2026-02-01T10:00:00.000Z'
  },
  {
    id: 'prod-vivo-v40-pro',
    brand: 'Vivo',
    model: 'Vivo V40 Pro 5G',
    title: 'Vivo V40 Pro 5G (ZEISS Co-engineered Camera)',
    category: 'camera',
    shortSpecs: 'MediaTek Dimensity 9200+ | ZEISS All-Focal Portrait | 5500mAh 80W FlashCharge',
    description: 'Master portrait photography in your pocket. Features co-engineered ZEISS optics on all cameras (50MP main, 50MP 2x telephoto, 50MP ultra-wide, and 50MP eye-AF selfie). Slim 7.58mm ultra-sleek design with huge 5500mAh BlueVolt battery.',
    basePrice: 49999,
    originalPrice: 54999,
    discountPercent: 9,
    mainImage: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-vv40p-8-256-blue',
        ram: '8GB',
        storage: '256GB',
        color: 'Ganges Blue',
        colorHex: '#3d6385',
        price: 49999,
        originalPrice: 54999,
        stock: 5,
        sku: 'VIV-V40P-8-256-GB'
      },
      {
        id: 'var-vv40p-12-512-titanium',
        ram: '12GB',
        storage: '512GB',
        color: 'Titanium Grey',
        colorHex: '#4d4f52',
        price: 55999,
        originalPrice: 60999,
        stock: 4,
        sku: 'VIV-V40P-12-512-TG'
      }
    ],
    specifications: {
      processor: 'MediaTek Dimensity 9200+ Flagship Chip (4nm)',
      displaySize: '6.78 inch 1.5K 3D Curved AMOLED',
      displayType: '4500 nits local peak brightness, 120Hz refresh, HDR10+',
      refreshRate: '120Hz',
      rearCamera: '50MP Sony IMX921 (OIS) ZEISS + 50MP Sony IMX816 2x Telephoto + 50MP Ultra-wide',
      frontCamera: '50MP ZEISS Group Selfie with 92° wide angle and AutoFocus',
      battery: '5500 mAh BlueVolt Battery',
      chargingSpeed: '80W FlashCharge Wired',
      network5G: 'Dual SIM 5G (SA/NSA)',
      os: 'Funtouch OS 14 based on Android 14',
      simType: 'Dual Nano-SIM',
      connectivity: 'Wi-Fi 7, Bluetooth 5.4, NFC, IP68 & IP69 Water Resistance',
      inBoxContents: 'Vivo V40 Pro, 80W Charger, Type-C Cable, Clear Case, SIM Ejector',
      warranty: '1 Year Manufacturer Warranty'
    },
    rating: 4.7,
    reviewCount: 22,
    isFeatured: true,
    isTodayDeal: false,
    enabled: true,
    createdAt: '2026-02-10T10:00:00.000Z'
  },
  {
    id: 'prod-moto-edge-50-pro',
    brand: 'Motorola',
    model: 'Moto Edge 50 Pro 5G',
    title: 'Motorola Edge 50 Pro 5G (Pantone Validated Colors)',
    category: 'mid-range',
    shortSpecs: 'Snapdragon 7 Gen 3 | 50MP AI Camera with 30x Zoom | 125W TurboPower | IP68',
    description: 'Elegance meets pure Android power. World’s first Pantone-validated display and camera. 144Hz 1.5K pOLED curved screen, silicone vegan leather finish, IP68 underwater protection, and blazing 125W wired + 50W wireless TurboPower.',
    basePrice: 31999,
    originalPrice: 35999,
    discountPercent: 11,
    mainImage: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-medg50-8-256-purple',
        ram: '8GB',
        storage: '256GB',
        color: 'Luxe Lavender',
        colorHex: '#9b82a6',
        price: 31999,
        originalPrice: 35999,
        stock: 7,
        sku: 'MOT-E50P-8-256-LL'
      },
      {
        id: 'var-medg50-12-256-black',
        ram: '12GB',
        storage: '256GB',
        color: 'Black Beauty',
        colorHex: '#1b1b1b',
        price: 35999,
        originalPrice: 39999,
        stock: 5,
        sku: 'MOT-E50P-12-256-BB'
      }
    ],
    specifications: {
      processor: 'Qualcomm Snapdragon 7 Gen 3 (4nm)',
      displaySize: '6.7 inch 1.5K 144Hz 3D Curved pOLED',
      displayType: 'Pantone Validated, 2000 nits peak, 100% DCI-P3, HDR10+',
      refreshRate: '144Hz Ultra-smooth',
      rearCamera: '50MP (OIS) f/1.4 + 10MP 3x Optical Telephoto (OIS) + 13MP Ultra-wide/Macro',
      frontCamera: '50MP f/1.9 with AutoFocus and 4K recording',
      battery: '4500 mAh battery',
      chargingSpeed: '125W TurboPower Wired + 50W Wireless Charging',
      network5G: 'Dual SIM 5G (15 Global 5G Bands)',
      os: 'Hello UI based on Android 14 (Clean Android Experience)',
      simType: 'Dual Nano-SIM + eSIM',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.4, NFC, IP68 Submersion Proof',
      inBoxContents: 'Motorola Edge 50 Pro, 125W Charger, USB-C Cable, Eco Case, SIM Needle',
      warranty: '1 Year Motorola Standard Warranty'
    },
    rating: 4.5,
    reviewCount: 31,
    isFeatured: false,
    isBestSeller: true,
    enabled: true,
    createdAt: '2026-01-25T10:00:00.000Z'
  },
  {
    id: 'prod-samsung-galaxy-m35',
    brand: 'Samsung',
    model: 'Galaxy M35 5G',
    title: 'Samsung Galaxy M35 5G (Monster 6000mAh Battery)',
    category: 'budget',
    shortSpecs: 'Exynos 1380 5nm | 50MP OIS No Shake Cam | 6000mAh 2-Day Battery | 120Hz sAMOLED',
    description: 'The ultimate budget powerhouse with a monstrous 6000mAh battery that easily powers through 2 full days. Features 120Hz Super AMOLED display with Vision Booster, Vapor Cooling chamber, and 4 generations of OS upgrades guaranteed.',
    basePrice: 16999,
    originalPrice: 19999,
    discountPercent: 15,
    mainImage: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-sm35-6-128-blue',
        ram: '6GB',
        storage: '128GB',
        color: 'Moonlight Blue',
        colorHex: '#2b4162',
        price: 16999,
        originalPrice: 19999,
        stock: 15,
        sku: 'SAM-M35-6-128-MB'
      },
      {
        id: 'var-sm35-8-256-grey',
        ram: '8GB',
        storage: '256GB',
        color: 'Daybreak Blue',
        colorHex: '#587291',
        price: 19999,
        originalPrice: 22999,
        stock: 10,
        sku: 'SAM-M35-8-256-DB'
      }
    ],
    specifications: {
      processor: 'Samsung Exynos 1380 (5nm)',
      displaySize: '6.6 inch Full HD+ Super AMOLED',
      displayType: '1000 nits High Brightness Mode, Gorilla Glass Victus+',
      refreshRate: '120Hz',
      rearCamera: '50MP (OIS) Main + 8MP Ultra-wide + 2MP Macro',
      frontCamera: '13MP Selfie Camera with 4K video recording',
      battery: '6000 mAh Monster Battery',
      chargingSpeed: '25W Fast Charging support',
      network5G: 'Dual SIM 5G (All Indian 5G Bands supported)',
      os: 'One UI 6.1 on Android 14 (4 Years OS + 5 Years Security Updates)',
      simType: 'Hybrid Dual SIM (Nano + Nano/MicroSD up to 1TB)',
      connectivity: 'Wi-Fi 6, Bluetooth 5.3, Knox Security with Secure Folder',
      inBoxContents: 'Galaxy M35 5G, USB-C to USB-C Data Cable, Ejection Pin, Quick Start Guide',
      warranty: '1 Year Manufacturer Warranty'
    },
    rating: 4.4,
    reviewCount: 45,
    isFeatured: false,
    isBestSeller: true,
    isTodayDeal: true,
    enabled: true,
    createdAt: '2026-02-12T10:00:00.000Z'
  },
  {
    id: 'prod-iqoo-z9-lite',
    brand: 'iQOO',
    model: 'iQOO Z9x 5G',
    title: 'iQOO Z9x 5G (Slimmest 6000mAh Smartphone)',
    category: 'budget',
    shortSpecs: 'Snapdragon 6 Gen 1 | 6000mAh Battery | IP64 Dust & Water Resistant',
    description: 'Remarkable balance of slim form-factor and insane battery stamina. Only 7.99mm thin despite packing a 6000mAh battery. Powered by Qualcomm 4nm Snapdragon 6 Gen 1 processor and dual stereo speakers with 300% audio boost.',
    basePrice: 12999,
    originalPrice: 14999,
    discountPercent: 13,
    mainImage: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-iqz9-4-128-green',
        ram: '4GB',
        storage: '128GB',
        color: 'Tornado Green',
        colorHex: '#42705b',
        price: 12999,
        originalPrice: 14999,
        stock: 14,
        sku: 'IQO-Z9X-4-128-TG'
      },
      {
        id: 'var-iqz9-6-128-black',
        ram: '6GB',
        storage: '128GB',
        color: 'Storm Grey',
        colorHex: '#2f3542',
        price: 14499,
        originalPrice: 16499,
        stock: 11,
        sku: 'IQO-Z9X-6-128-SG'
      }
    ],
    specifications: {
      processor: 'Qualcomm Snapdragon 6 Gen 1 (4nm)',
      displaySize: '6.72 inch Full HD+ 120Hz Ultra Vision Display',
      displayType: '1000 nits High Brightness, TÜV Rheinland Low Blue Light Certified',
      refreshRate: '120Hz',
      rearCamera: '50MP AI HD Main Camera + 2MP Bokeh Camera',
      frontCamera: '8MP HD Front Camera with Portrait Mode',
      battery: '6000 mAh 4-Year Health Guarantee Battery',
      chargingSpeed: '44W FlashCharge (50% in 37 mins)',
      network5G: 'Dual SIM 5G (8 5G Bands)',
      os: 'Funtouch OS 14 based on Android 14',
      simType: 'Hybrid Dual SIM (MicroSD support up to 1TB)',
      connectivity: 'Dual Band Wi-Fi, Bluetooth 5.1, Side-mounted Fingerprint, 3.5mm Headphone Jack',
      inBoxContents: 'Phone, 44W Charger, USB Type-C Cable, TPU Case, SIM Tool',
      warranty: '1 Year Official Manufacturer Warranty'
    },
    rating: 4.4,
    reviewCount: 35,
    isFeatured: false,
    isTodayDeal: false,
    enabled: true,
    createdAt: '2026-02-18T10:00:00.000Z'
  },
  // ACCESSORIES
  {
    id: 'prod-acc-gan-charger-100w',
    brand: 'SmartZone',
    model: 'GaN 100W 3-Port Turbo Charger',
    title: 'SmartZone PowerPro 100W GaN Fast Charger (Dual Type-C + USB-A)',
    category: 'accessory',
    shortSpecs: '100W PD 3.0 / PPS / QC 4.0 | GaN III Tech | Compact Foldable Pins',
    description: 'Fast charge your flagship phone, tablet, and laptop simultaneously with cutting-edge Gallium Nitride (GaN III) technology. Compatible with Samsung Super Fast Charging 2.0 (45W), Apple PD Fast Charging, and OnePlus protocols.',
    basePrice: 2499,
    originalPrice: 3999,
    discountPercent: 37,
    mainImage: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-gan-100w-white',
        ram: 'N/A',
        storage: '100W Max',
        color: 'Pure White',
        colorHex: '#ffffff',
        price: 2499,
        originalPrice: 3999,
        stock: 25,
        sku: 'SZ-ACC-GAN-100W-W'
      },
      {
        id: 'var-gan-100w-black',
        ram: 'N/A',
        storage: '100W Max',
        color: 'Matte Charcoal',
        colorHex: '#222222',
        price: 2499,
        originalPrice: 3999,
        stock: 18,
        sku: 'SZ-ACC-GAN-100W-B'
      }
    ],
    specifications: {
      processor: 'Navitas GaNFast Power IC',
      displaySize: 'N/A',
      displayType: 'N/A',
      refreshRate: 'N/A',
      rearCamera: 'N/A',
      frontCamera: 'N/A',
      battery: 'N/A',
      chargingSpeed: '100W Max Output (PD 3.0, PPS 45W, QC 4+, AFC, FCP)',
      network5G: 'N/A',
      os: 'Intelligent Power Distribution',
      simType: 'N/A',
      connectivity: '2 x USB Type-C, 1 x USB Type-A',
      inBoxContents: '100W GaN Charger, 100W Braided Type-C to Type-C Cable (1.2m), Warranty Card',
      warranty: '1 Year Replacement Warranty by SmartZone Store'
    },
    rating: 4.8,
    reviewCount: 62,
    isFeatured: true,
    isBestSeller: true,
    enabled: true,
    createdAt: '2026-02-05T10:00:00.000Z'
  },
  {
    id: 'prod-acc-tws-pro-anc',
    brand: 'SmartZone',
    model: 'SmartZone WavePods Pro ANC',
    title: 'SmartZone WavePods Pro 50dB Hybrid ANC Wireless Earbuds',
    category: 'accessory',
    shortSpecs: '50dB Hybrid Active Noise Cancellation | 42 Hrs Battery | Spatial Audio | Hi-Res LDAC',
    description: 'Immerse in studio grade acoustic precision. 50dB Hybrid ANC silences city noise, 12.4mm titanium coated dynamic drivers deliver booming bass and sparkling highs, with 6-mic AI Clear Call clarity and Google Fast Pair support.',
    basePrice: 2999,
    originalPrice: 4999,
    discountPercent: 40,
    mainImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-tws-blue',
        ram: 'N/A',
        storage: 'N/A',
        color: 'Electric Blue Metallic',
        colorHex: '#1688ff',
        price: 2999,
        originalPrice: 4999,
        stock: 20,
        sku: 'SZ-ACC-TWS-EB'
      },
      {
        id: 'var-tws-black',
        ram: 'N/A',
        storage: 'N/A',
        color: 'Phantom Black',
        colorHex: '#18181b',
        price: 2999,
        originalPrice: 4999,
        stock: 22,
        sku: 'SZ-ACC-TWS-PB'
      }
    ],
    specifications: {
      processor: 'Dual-core DSP Audio Processing Chip',
      displaySize: 'LED Battery Indicator Case',
      displayType: 'N/A',
      refreshRate: '45ms Ultra-low Latency Game Mode',
      rearCamera: 'N/A',
      frontCamera: 'N/A',
      battery: '42 Hours Playback with Case (7.5 Hrs buds on single charge)',
      chargingSpeed: 'Fast Charge: 10 mins gives 5 hours playtime, Type-C charging',
      network5G: 'N/A',
      os: 'Compatible with iOS, Android, Windows & Mac',
      simType: 'N/A',
      connectivity: 'Bluetooth 5.4, Google Fast Pair, Dual Device Pairing, IP55 Water Resistant',
      inBoxContents: 'Earbuds, Charging Case, 3 Pairs Silicone Ear Tips (S/M/L), Type-C Cable, Manual',
      warranty: '1 Year Warranty'
    },
    rating: 4.7,
    reviewCount: 48,
    isFeatured: true,
    isTodayDeal: true,
    enabled: true,
    createdAt: '2026-02-08T10:00:00.000Z'
  },
  {
    id: 'prod-acc-powerbank-20000',
    brand: 'SmartZone',
    model: 'PowerZone 20000mAh 45W Bank',
    title: 'SmartZone PowerZone 20000mAh 45W Two-Way Fast Charging Power Bank',
    category: 'accessory',
    shortSpecs: '45W Two-Way Fast Charge | High Density Li-Polymer | Digital LED Display | Multi-Device',
    description: 'Never run out of power on the go. High-capacity 20000mAh power bank capable of 45W output to power phones, tablets, and even ultrabooks. Features precision LED percentage readout, 12 layers of circuit safety protection, and low current mode for earbuds.',
    basePrice: 1999,
    originalPrice: 3299,
    discountPercent: 39,
    mainImage: 'https://images.unsplash.com/photo-1609592426508-cc853e5e4d58?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1609592426508-cc853e5e4d58?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-pb-black',
        ram: 'N/A',
        storage: '20000mAh',
        color: 'Space Black',
        colorHex: '#212529',
        price: 1999,
        originalPrice: 3299,
        stock: 16,
        sku: 'SZ-ACC-PB20-SB'
      }
    ],
    specifications: {
      processor: 'Smart MCU Power Management IC',
      displaySize: 'Numeric Digital Display',
      displayType: 'Real-time Battery % Display',
      refreshRate: 'N/A',
      rearCamera: 'N/A',
      frontCamera: 'N/A',
      battery: '20000 mAh / 74Wh Li-Polymer Cell',
      chargingSpeed: '45W Max USB-C In/Out, 22.5W USB-A Out',
      network5G: 'N/A',
      os: 'Universal Protocol Support (PD3.0, QC3.0, PPS, FCP, VOOC)',
      simType: 'N/A',
      connectivity: '1 x Type-C (In/Out), 2 x USB-A (Out)',
      inBoxContents: '20000mAh Power Bank, 60W Type-C Cable (0.3m), Instruction Manual',
      warranty: '6 Months Brand Warranty'
    },
    rating: 4.6,
    reviewCount: 39,
    isFeatured: false,
    isBestSeller: true,
    enabled: true,
    createdAt: '2026-02-14T10:00:00.000Z'
  },
  {
    id: 'prod-acc-armour-glass',
    brand: 'SmartZone',
    model: 'SmartZone 9H Armor Shield',
    title: 'SmartZone 9H Edge-to-Edge Tempered Glass (Anti-Fingerprint, Bubble-Free)',
    category: 'accessory',
    shortSpecs: '9H Hardness Japanese Asahi Glass | Oleophobic Coating | 2.5D Curved Edges',
    description: 'Premium optical protection for your smartphone display. Engineered with Japanese Asahi tempered glass, 9H scratch resistance, smooth touch response, and anti-glare oleophobic nano-coating that repels oils and smudges.',
    basePrice: 299,
    originalPrice: 699,
    discountPercent: 57,
    mainImage: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-glass-s24u',
        ram: 'N/A',
        storage: 'For S24 Ultra',
        color: 'Ultra Clear',
        colorHex: '#e2e8f0',
        price: 349,
        originalPrice: 799,
        stock: 40,
        sku: 'SZ-GLASS-S24U'
      },
      {
        id: 'var-glass-ip16p',
        ram: 'N/A',
        storage: 'For iPhone 16 Pro',
        color: 'Ultra Clear',
        colorHex: '#e2e8f0',
        price: 349,
        originalPrice: 799,
        stock: 35,
        sku: 'SZ-GLASS-IP16P'
      },
      {
        id: 'var-glass-universal',
        ram: 'N/A',
        storage: 'Universal Fit (Free Shop Installation)',
        color: 'Ultra Clear',
        colorHex: '#e2e8f0',
        price: 299,
        originalPrice: 699,
        stock: 50,
        sku: 'SZ-GLASS-UNIV'
      }
    ],
    specifications: {
      processor: 'N/A',
      displaySize: 'Edge-to-Edge Custom Precision Cut',
      displayType: '0.33mm 9H Japanese Tempered Glass',
      refreshRate: '100% Touch Sensitivity Compatible with Ultrasonic Fingerprint',
      rearCamera: 'N/A',
      frontCamera: 'N/A',
      battery: 'N/A',
      chargingSpeed: 'N/A',
      network5G: 'N/A',
      os: 'N/A',
      simType: 'N/A',
      connectivity: 'N/A',
      inBoxContents: 'Tempered Glass, Wet Wipe, Microfiber Cleaning Cloth, Dust Absorber, Alignment Kit',
      warranty: 'Instant Free Replacement if damaged during shipping or application at our shop'
    },
    rating: 4.8,
    reviewCount: 74,
    isFeatured: false,
    isBestSeller: true,
    enabled: true,
    createdAt: '2026-02-01T10:00:00.000Z'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'SMART10',
    description: '10% discount on entire cart (Max discount up to ₹2,000)',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 2000,
    maxDiscount: 2000,
    validUntil: '2026-12-31',
    usageLimit: 500,
    usedCount: 42,
    isActive: true
  },
  {
    id: 'coup-2',
    code: 'FLAT500',
    description: 'Flat ₹500 discount on smartphone purchases above ₹15,000',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 15000,
    validUntil: '2026-12-31',
    usageLimit: 300,
    usedCount: 78,
    isActive: true
  },
  {
    id: 'coup-3',
    code: 'FIRST1000',
    description: 'Welcome gift: Flat ₹1,000 off on orders above ₹30,000',
    discountType: 'fixed',
    discountValue: 1000,
    minOrderValue: 30000,
    validUntil: '2026-12-31',
    usageLimit: 200,
    usedCount: 15,
    isActive: true
  },
  {
    id: 'coup-4',
    code: 'ACC50',
    description: 'Flat ₹150 off on mobile accessories with min purchase ₹999',
    discountType: 'fixed',
    discountValue: 150,
    minOrderValue: 999,
    validUntil: '2026-12-31',
    usageLimit: 500,
    usedCount: 88,
    isActive: true
  }
];

export const INITIAL_DELIVERY_AREAS: DeliveryArea[] = [
  {
    id: 'area-1',
    pincode: '700001',
    locality: 'BBD Bagh / Central Business District',
    city: 'Kolkata',
    state: 'West Bengal',
    estimatedHours: 'Same Day (Within 2-3 Hours)',
    isLocalDeliveryAvailable: true,
    deliveryCharge: 0
  },
  {
    id: 'area-2',
    pincode: '700064',
    locality: 'Salt Lake Sector 1-3 / City Centre',
    city: 'Kolkata',
    state: 'West Bengal',
    estimatedHours: 'Same Day Express (Under 2 Hours - Near Store)',
    isLocalDeliveryAvailable: true,
    deliveryCharge: 0
  },
  {
    id: 'area-3',
    pincode: '700091',
    locality: 'Sector 5 IT Hub & Tech Park',
    city: 'Kolkata',
    state: 'West Bengal',
    estimatedHours: 'Same Day Express (Under 2 Hours)',
    isLocalDeliveryAvailable: true,
    deliveryCharge: 0
  },
  {
    id: 'area-4',
    pincode: '700020',
    locality: 'Park Street / Camac Street / Elgin',
    city: 'Kolkata',
    state: 'West Bengal',
    estimatedHours: 'Same Day (Within 3-4 Hours)',
    isLocalDeliveryAvailable: true,
    deliveryCharge: 49
  },
  {
    id: 'area-5',
    pincode: '700053',
    locality: 'New Alipore / Taratala',
    city: 'Kolkata',
    state: 'West Bengal',
    estimatedHours: 'Same Day Delivery',
    isLocalDeliveryAvailable: true,
    deliveryCharge: 49
  },
  {
    id: 'area-6',
    pincode: '560001',
    locality: 'MG Road / Brigade Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    estimatedHours: 'Express Courier (1-2 Days)',
    isLocalDeliveryAvailable: true,
    deliveryCharge: 99
  },
  {
    id: 'area-7',
    pincode: '110001',
    locality: 'Connaught Place / Central',
    city: 'New Delhi',
    state: 'Delhi',
    estimatedHours: 'Express Courier (1-2 Days)',
    isLocalDeliveryAvailable: true,
    deliveryCharge: 99
  },
  {
    id: 'area-8',
    pincode: '400001',
    locality: 'Fort / South Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    estimatedHours: 'Express Courier (1-2 Days)',
    isLocalDeliveryAvailable: true,
    deliveryCharge: 99
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  storeName: 'SmartZone Mobile Store',
  tagline: 'Your Trusted Smartphone & Tech Destination',
  phone: '+91 98300 45678',
  whatsapp: '+91 98300 45678',
  email: 'support@smartzonestore.in',
  address: 'Shop No. 14-16, Ground Floor, Galaxy Tech Mall, Salt Lake Bypass, Kolkata - 700064',
  openingHours: 'Monday to Sunday: 10:00 AM – 9:30 PM (All 7 Days Open)',
  announcementBarMessages: [
    '⚡ Special Festive Smartphone Deals: Extra ₹2,000 Instant Discount with Code SMART10!',
    '🛵 Lightning Fast Local Delivery Available: Get your phone delivered in 2 hours locally!',
    '🛡️ 100% Genuine Sealed Products with Official Manufacturer Warranty & GST Invoice',
    '🏬 Click & Collect: Order online now & pickup from our Salt Lake shop within 30 minutes!'
  ],
  heroBanner: {
    headline: 'Experience Next-Gen Innovation Today',
    subheadline: 'Explore Samsung Galaxy S24 Ultra & iPhone 16 Pro at unbeatable local prices with instant exchange bonus.',
    tag: 'FESTIVE MEGA DROP',
    featuredProductModel: 'Samsung Galaxy S24 Ultra 5G',
    startingPrice: '₹1,29,999',
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=80'
  },
  deliverySettings: {
    freeDeliveryThreshold: 999,
    standardFee: 49,
    storePickupAddress: 'SmartZone Mobile Store, Galaxy Tech Mall, Salt Lake Sector 1, Kolkata 700064'
  }
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-customer-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    password: '123456',
    role: 'customer',
    wishlist: ['prod-samsung-s24-ultra', 'prod-acc-tws-pro-anc'],
    addresses: [
      {
        id: 'addr-1',
        name: 'Rahul Sharma',
        phone: '+91 98765 43210',
        street: 'Flat 4B, Greenwood Heights, EC Block',
        locality: 'Salt Lake Sector 1',
        pincode: '700064',
        city: 'Kolkata',
        state: 'West Bengal',
        isDefault: true
      }
    ]
  },
  {
    id: 'usr-admin-1',
    name: 'SmartZone Store Manager',
    email: 'admin@smartzone.com',
    phone: '+91 98300 45678',
    password: 'Tanmoy',
    role: 'admin',
    wishlist: [],
    addresses: []
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-samsung-s24-ultra',
    userId: 'usr-customer-1',
    userName: 'Rahul Sharma',
    rating: 5,
    title: 'Mindblowing display and phone camera!',
    comment: 'Purchased directly from SmartZone with local same-day delivery. Received the sealed Indian unit within 90 minutes! The antireflective screen on S24 Ultra is unmatched in sunlight, and Galaxy AI photo editing is super fun.',
    verifiedPurchase: true,
    createdAt: '2026-02-15T14:30:00.000Z'
  },
  {
    id: 'rev-2',
    productId: 'prod-samsung-s24-ultra',
    userId: 'usr-guest-2',
    userName: 'Priya Mukherjee',
    rating: 5,
    title: 'Genuine store, excellent staff guidance',
    comment: 'Opted for store pickup at their Salt Lake showroom. The team helped transfer all my data from my old phone and applied the tempered glass flawlessly. 10/10 service.',
    verifiedPurchase: true,
    createdAt: '2026-02-20T18:00:00.000Z'
  },
  {
    id: 'rev-3',
    productId: 'prod-apple-iphone-16-pro',
    userId: 'usr-guest-3',
    userName: 'Arjun Das',
    rating: 5,
    title: 'Camera Control button and Desert Titanium are sleek!',
    comment: 'Got the 256GB variant with coupon FIRST1000. Super smooth 120Hz display, battery lasts more than a full day easily with heavy usage.',
    verifiedPurchase: true,
    createdAt: '2026-02-22T11:15:00.000Z'
  },
  {
    id: 'rev-4',
    productId: 'prod-redmi-note-13-pro-plus',
    userId: 'usr-guest-4',
    userName: 'Subhashis Roy',
    rating: 5,
    title: '120W charging is insane, full charge under 20 mins',
    comment: 'Best value for money in the 30k segment. Curved AMOLED screen feels like a 70k phone.',
    verifiedPurchase: true,
    createdAt: '2026-02-25T16:45:00.000Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SZ-2026-8921',
    createdAt: '2026-02-24T12:30:00.000Z',
    customerId: 'usr-customer-1',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    customerEmail: 'rahul.sharma@example.com',
    deliveryMode: 'local_delivery',
    deliveryAddress: {
      street: 'Flat 4B, Greenwood Heights, EC Block',
      locality: 'Salt Lake Sector 1',
      pincode: '700064',
      city: 'Kolkata',
      landmark: 'Near EC Market',
      instructions: 'Please call before arrival.'
    },
    items: [
      {
        id: 'var-rn13p-8-256-purple',
        productId: 'prod-redmi-note-13-pro-plus',
        variantId: 'var-rn13p-8-256-purple',
        quantity: 1,
        productTitle: 'Redmi Note 13 Pro+ 5G (200MP OIS | 120W HyperCharge)',
        brand: 'Xiaomi',
        model: 'Redmi Note 13 Pro+ 5G',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
        ram: '8GB',
        storage: '256GB',
        color: 'Fusion Purple (Vegan Leather)',
        price: 29999,
        originalPrice: 33999,
        stockAvailable: 12
      },
      {
        id: 'var-gan-100w-black',
        productId: 'prod-acc-gan-charger-100w',
        variantId: 'var-gan-100w-black',
        quantity: 1,
        productTitle: 'SmartZone PowerPro 100W GaN Fast Charger',
        brand: 'SmartZone',
        model: 'GaN 100W 3-Port Turbo Charger',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
        ram: 'N/A',
        storage: '100W Max',
        color: 'Matte Charcoal',
        price: 2499,
        originalPrice: 3999,
        stockAvailable: 18
      }
    ],
    subtotal: 32498,
    discountTotal: 5499,
    couponCode: 'FLAT500',
    couponDiscount: 500,
    deliveryFee: 0,
    totalAmount: 31998,
    paymentMethod: 'online',
    paymentStatus: 'paid',
    paymentDetails: {
      transactionId: 'pay_SZ_test_99214',
      gateway: 'Razorpay PG (Test Mode Verified)',
      paidAt: '2026-02-24T12:32:15.000Z'
    },
    orderStatus: 'delivered',
    statusTimeline: [
      { status: 'pending_confirmation', timestamp: '2026-02-24T12:30:00.000Z', note: 'Order placed online' },
      { status: 'confirmed', timestamp: '2026-02-24T12:35:00.000Z', note: 'Order accepted & inventory reserved' },
      { status: 'processing', timestamp: '2026-02-24T12:45:00.000Z', note: 'Packed & invoice generated' },
      { status: 'out_for_delivery', timestamp: '2026-02-24T13:10:00.000Z', note: 'SmartZone delivery rider assigned (Mr. Ankit)' },
      { status: 'delivered', timestamp: '2026-02-24T14:15:00.000Z', note: 'Delivered securely with OTP verification' }
    ]
  },
  {
    id: 'SZ-2026-9043',
    createdAt: '2026-02-25T15:10:00.000Z',
    customerId: 'usr-customer-1',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    customerEmail: 'rahul.sharma@example.com',
    deliveryMode: 'store_pickup',
    pickupTimeSlot: 'Today between 5:00 PM – 7:00 PM',
    items: [
      {
        id: 'var-tws-blue',
        productId: 'prod-acc-tws-pro-anc',
        variantId: 'var-tws-blue',
        quantity: 1,
        productTitle: 'SmartZone WavePods Pro 50dB Hybrid ANC Wireless Earbuds',
        brand: 'SmartZone',
        model: 'SmartZone WavePods Pro ANC',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
        ram: 'N/A',
        storage: 'N/A',
        color: 'Electric Blue Metallic',
        price: 2999,
        originalPrice: 4999,
        stockAvailable: 20
      }
    ],
    subtotal: 2999,
    discountTotal: 2000,
    couponDiscount: 0,
    deliveryFee: 0,
    totalAmount: 2999,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'ready_for_pickup',
    statusTimeline: [
      { status: 'pending_confirmation', timestamp: '2026-02-25T15:10:00.000Z', note: 'Store pickup order created' },
      { status: 'confirmed', timestamp: '2026-02-25T15:15:00.000Z', note: 'Item reserved at counter' },
      { status: 'ready_for_pickup', timestamp: '2026-02-25T15:25:00.000Z', note: 'Ready at Counter 2, Galaxy Tech Mall' }
    ]
  }
];
