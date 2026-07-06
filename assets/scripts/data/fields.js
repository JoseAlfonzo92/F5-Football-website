export const fields = [
   
  //Array Object 1
  {
    id: "estadio-presidente-peron-el-cilindro",
    name: "Estadio Presidente Perón - El Cilindro",
    location: "Caballito",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Caballito",
    type: "abierta",
    //rating: 4.8,
    priceFrom: 8500,
    priceTo: 12000,
    lat: -34.6158,
    lng: -58.4333,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-3-sin-techo_ltwtj0.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-3-sin-techo_ltwtj0.jpg",

        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-2_xxxxx.jpg",

        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-1_xxxxx.jpg"
    ],

    description: "Cancha ideal para partidos entre amigos.",
    address: "Caballito, Buenos Aires",
    lastUpdate: "2026-06-18",
    allowedBoots: ["FG", "TF", "IN"],
    createdAt: "2026-06-18",
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "09:00 - 23:00",
      weekend: "08:00 - 00:00"
    },

    features: [
      "Iluminación",
      "Vestuarios",
      "Duchas",
      "Baños"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Empanadas",
      "Bebidas"
    ],

    extraInfo: [
      "Estacionamiento: 10 espacios",
      "Cajero automático cercano"
    ],

 // Option 1 - Neighborhood club
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 2000,
    cookServiceFee: 8000,

    notes: [
        "Reservá la parrilla con al menos 12 hs de anticipación.",
        "Incluye parrilla, mesas y bancos.",
        "Cada grupo debe traer carbón y utensilios."
    ]
}
,

    surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],


    booking: {


     // For calls
     phone: "+54 11 1234-5678",

     // For WhatsApp
     whatsapp: "5491112345678"
    },

    
  },

  //Array Object 2
  {
    id: "estadio-liberadores-de-america-ricardo-enrique-bochini",
    name: "Estadio Libertadores de América - Ricardo Enrique Bochini",
    location: "Belgrano",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Belgrano",
    type: "techada",
    //rating: 4.9,
    priceFrom: 11000,
    priceTo: 15000,
    lat: -34.555,
    lng: -58.450,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-2-techo_xbxmi4.webp",
    images:[
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-2-techo_xbxmi4.webp",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-1_xxxxx.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-3-sin-techo_ltwtj0.jpg"
    ],

    description: "Cancha premium techada.",
    address: "Belgrano, Buenos Aires",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG", "TF"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "10:00 - 00:00",
      weekend: "09:00 - 02:00"
    },

    features: [
      "Iluminación",
      "Techada",
      "Vestuarios",
      "Duchas",
      "Estacionamiento"
    ],

    sizes: [
      "4 vs 4",
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Pizzas",
      "Hamburguesas",
      "Bebidas"
    ],

    extraInfo: [
      "Estacionamiento: 20 espacios",
      "Zona gastronómica cercana"
    ],

 // Option 2 - Sports complex
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 3500,
    cookServiceFee: 12000,

    notes: [
        "Reserva requerida con 24 hs de anticipación.",
        "Incluye parrilla, mesas y limpieza del sector.",
        "El servicio de parrillero es opcional."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético"
        ],

    booking: {

      // For calls
      phone: "+54 11 1234-5678",
      // For WhatsApp
      whatsapp: "5491112345678"
    
    }
  },

  //Array Object 3
  {
    id: "estadio-pedro-bidegain-el-nuevo-gasometro",
    name: "Estadio Pedro Bidegain - El Nuevo Gasómetro",
    location: "Villa Crespo",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Villa Crespo",
    type: "abierta",
    //rating: 4.3,
    priceFrom: 7000,
    priceTo: 10000,
    lat: -34.600,
    lng: -58.430,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-5-sin-techo_jizma0.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-5-sin-techo_jizma0.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-4-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-3-techo_qfvkud.jpg"

    ],
    description: "Potrero abierto ideal para partidos entre amigos.",
    address: "Villa Crespo, Buenos Aires",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-22",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },

    features: [
      "Iluminación",
      "Baños"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas"
    ],

    extraInfo: [
      "Sin estacionamiento",
      "Zona tranquila"
    ],

 // Option 3 - Premium venue
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 5000,
    cookServiceFee: 18000,

    notes: [
        "Reserva obligatoria con 48 hs de anticipación.",
        "Incluye parrilla, mesas, utensilios y limpieza.",
        "El parrillero puede encargarse de toda la preparación y cocción."
    ]
}
,

    surface: [
    "Césped sintético",
        "Césped natural",
        "Indoor - cancha techada ( Futsal )"
    ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },
    
  //Array Object 4
  {
    id: "estadio-monumental",
    name: "Estadio Monumental",
    location: "Núñez",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Núñez",
    type: "techada",
    //rating: 4.6,
    priceFrom: 9000,
    priceTo: 13000,
    lat: -34.540,
    lng: -58.470,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-3-techo_qfvkud.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-3-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-4-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-5-sin-techo_jizma0.jpg"
    ],
    description: "Cancha techada moderna en Núñez.",
    address: "Núñez, Buenos Aires",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-22",
    allowedBoots: ["FG", "TF"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "10:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Iluminación",
      "Techada",
      "Vestuarios",
      "Duchas"
    ],

      sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Sándwiches"
    ],
    extraInfo: [
      "Estacionamiento cercano",
      "Zona comercial"
    ],

// Option 4 - Grill rental only
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: 2500,
    cookServiceFee: null,

    notes: [
        "Se alquila únicamente la parrilla.",
        "Los jugadores cocinan por su cuenta.",
        "Cada grupo debe traer carbón, utensilios y alimentos."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 5
  {
    id: "estadio-jose-amalfitani-el-fortin",
    name: "Estadio José Amalfitani - El Fortín",
    location: "Palermo",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Palermo",
    type: "abierta",
    //rating: 4.5,
    priceFrom: 10000,
    priceTo: 14000,
    lat: -34.580,
    lng: -58.420,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-4-sin-techo_o6y5xe.jpg",
    images:[
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-4-sin-techo_o6y5xe.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-5-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-3-techo_qfvkud.jpg"
    ],
    description: "Campo abierto con buena superficie.",
    address: "Palermo, Buenos Aires",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-21",
    allowedBoots: [ "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "09:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    features: [
      "Iluminación",
      "Baños",
      "Estacionamiento"
    ],

      sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Hamburguesas",
      "Bebidas"
    ],
    extraInfo: [
      "Zona gastronómica cercana",
      "Fácil acceso"
    ],

 // Option 5 - Grill included
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: null,
    cookServiceFee: 10000,

    notes: [
        "El uso de la parrilla está incluido con la reserva.",
        "El servicio de parrillero puede contratarse de forma opcional.",
        "Capacidad recomendada: hasta 25 personas."
    ]
},


        surface: [
 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {

      phone: "+54 11 1234-5678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 6
  {
    id: "estadio-tomas-adolfo-duco-el-palacio",
    name: "Estadio Tomás Adolfo Duco - El Palacio",
    location: "Boedo",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Boedo",
    type: "abierta",
    //rating: 4.2,
    priceFrom: 6500,
    priceTo: 9500,
    lat: -34.610,
    lng: -58.410,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-6-sin-techo_mrgvjc.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-6-sin-techo_mrgvjc.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-5-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-4-techo_qfvkud.jpg"
    ],
    description: "Potrero clásico de Boedo.",
    address: "Boedo, Buenos Aires",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG", "TF"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],


      sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas"
    ],
    extraInfo: [
      "Ambiente familiar",
      "Sin estacionamiento"
    ],

 // Option 6 - Community club
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: 3000,
    cookServiceFee: null,

    notes: [
        "Los jugadores cocinan por su cuenta.",
        "Incluye parrilla, mesas y bancos.",
        "Se solicita dejar el espacio limpio al finalizar."
    ]
},

        surface: [
    "Césped natural", 
    "Césped sintético",
     
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 7
  {
    id: "estadio-nestor-diaz-perez-la-fortaleza",
    name: "Estadio Néstor Díaz Pérez - La Fortaleza",
    location: "Palermo",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Palermo",
    type: "techada",
    //rating: 4.7,
    priceFrom: 10500,
    priceTo: 13000,
    lat: -34.575,
    lng: -58.425,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-2-techo_xbxmi4.webp",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-2-techo_xbxmi4.webp",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-4-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-5-sin-techo_jizma0.jpg"
    ],
    description: "Cancha techada top en Palermo.",
    address: "Palermo, Buenos Aires",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-12",
    allowedBoots: ["FG", "TF"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "10:00 - 00:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Iluminación",
      "Techada",
      "Estacionamiento",
      "Vestuarios"
    ],
    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],
    buffet: [
      "Pizzas",
      "Bebidas"
    ],
    extraInfo: [
      "Cajero cercano",
      "Zona segura"
    ],

 // Option 7 - Full catering service
barbecue: {
    cookType: "venue",

    grillAvailable: false,
    cookServiceAvailable: true,

    grillFee: null,
    cookServiceFee: 25000,

    notes: [
        "El complejo dispone de parrillero profesional.",
        "El uso de la parrilla está reservado exclusivamente al personal.",
        "Incluye utensilios y limpieza.",
        "Reserva mínima de 48 hs."
    ]
},



        surface: [
    "Césped natural", 
     "Césped sintético"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 8
  {
    id: "estadio-florencio-sola-el-lencho",
    name: "Estadio Florencio Sola - El Lencho",
    location: "Caballito",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Caballito",
    type: "abierta",
    //rating: 4.4,
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-13",
    priceFrom: 8000,
    priceTo: 11000,
    lat: -34.565,
    lng: -58.455,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-3-sin-techo_ltwtj0.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-3-sin-techo_ltwtj0.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-4-sin-techo_o6y5xe.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-5-techo_qfvkud.jpg"
    ],
    description: "Potrero abierto céntrico en Caballito.",
    address: "Caballito, Buenos Aires",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "09:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],

      sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Empanadas",
      "Bebidas"
    ],
    extraInfo: [
      "Estacionamiento limitado",
      "Buen ambiente"
    ],

 // Option 8 - Free barbecue area
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: null,
    cookServiceFee: null,

    notes: [
        "La parrilla puede utilizarse sin costo adicional.",
        "Sujeta a disponibilidad.",
        "Cada grupo debe llevar carbón, utensilios y alimentos."
    ]
},


        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 9
  {
    id: "estadio-uno-jorge-luis-hirschi",
    name: "Estadio UNO Jorge Luis Hirschi",
    location: "Belgrano",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Belgrano",
    type: "abierta",
    //rating: 4.6,
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-19",
    priceFrom: 9000,
    priceTo: 12500,
    lat: -34.550,
    lng: -58.460,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-5-sin-techo_jizma0.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-5-sin-techo_jizma0.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-3-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-4-techo_qfvkud.jpg"
    ],
    description: "Cancha abierta con estilo en Belgrano.",
    address: "Belgrano, Buenos Aires",
    allowedBoots: ["TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Duchas",
      "Baños"
    ],

      sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Snacks"
    ],
    extraInfo: [
      "Cercano a transporte",
      "Zona tranquila"
    ],

 // Option 9 - Event venue
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 4000,
    cookServiceFee: 15000,

    notes: [
        "Reservá con al menos 24 hs de anticipación.",
        "Incluye parrilla, mesas, iluminación y limpieza del sector.",
        "El servicio de parrillero es opcional."
    ]
},

        surface: [
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 10
  {
    id: "estadio-juan-carmelo-zerillo-el-bosque",
    name: "Estadio Juan Carmelo Zerillo - El Bosque",
    location: "Villa Crespo",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Villa Crespo",
    type: "abierta",
    //rating: 4.1,
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-14",
    priceFrom: 7500,
    priceTo: 10000,
    lat: -34.595,
    lng: -58.435,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-4-sin-techo_o6y5xe.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-4-sin-techo_o6y5xe.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-5-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-3-techo_qfvkud.jpg"
    ],
    description: "Cancha abierta ideal para partidos de barrio.",
    address: "Villa Crespo, Buenos Aires",
    allowedBoots: ["TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "09:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",

    ],

    buffet: [
      "Bebidas"
    ],
    extraInfo: [
      "Espacio reducido",
      "Fácil acceso"
    ],

 // Option 10 - Large sports club
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 6000,
    cookServiceFee: 20000,

    notes: [
        "Disponemos de varias parrillas sujetas a disponibilidad.",
        "Reserva recomendada con 48 hs de anticipación.",
        "Podés cocinar por tu cuenta o contratar un parrillero.",
        "Ideal para reuniones de hasta 40 personas."
    ]
},

        surface: [ 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 11
  {
    id: "estadio-marcelo-bielsa-el-coloso",
    name: "Estadio Marcelo Bielsa - El Coloso",
    location: "Núñez",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Núñez",
    type: "techada",
    //rating: 4.8,
    priceFrom: 10000,
    priceTo: 13500,
    lat: -34.540,
    lng: -58.470,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-3-techo_qfvkud.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-3-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-4-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-5-techo_qfvkud.jpg"
    ],
    description: "Cancha techada premium en Núñez.",
    address: "Núñez, Buenos Aires",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-11",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "10:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Iluminación",
      "Techada",
      "Vestuarios",
      "Duchas"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Pizzas",
      "Bebidas"
    ],
    extraInfo: [
      "Cajero cercano",
      "Zona deportiva"
    ],

    // Option 9 - Event venue
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 4000,
    cookServiceFee: 15000,

    notes: [
        "Reservá con al menos 24 hs de anticipación.",
        "Incluye parrilla, mesas, iluminación y limpieza del sector.",
        "El servicio de parrillero es opcional."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 12
  {
    id: "estadio-gigante-de-arroyito",
    name: "Estadio Gigante de Arroyito",
    location: "Boedo",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Boedo",
    type: "abierta",
    //rating: 4.3,
    priceFrom: 6500,
    priceTo: 9000,
    lat: -34.610,
    lng: -58.410,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-6-sin-techo_mrgvjc.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-6-sin-techo_mrgvjc.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-5-sin-techo_jizma0.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-4-sin-techo_o6y5xe.jpg"
    ],
    description: "Cancha popular de Boedo.",
    address: "Boedo, Buenos Aires",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-09",
    allowedBoots: ["FG", "TF"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],


    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas"
    ],
    extraInfo: [
      "Sin estacionamiento",
      "Buenas tarifas"
    ],

 // Option 8 - Free barbecue area
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: null,
    cookServiceFee: null,

    notes: [
        "La parrilla puede utilizarse sin costo adicional.",
        "Sujeta a disponibilidad.",
        "Cada grupo debe llevar carbón, utensilios y alimentos."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 13
  {
    id: "estadio-brigadier-general-estanislao-lopes-el-cementerio-de-los-elefantes",
    name: "Estadio Brigadier General Estanislao López - El Cementerio de los Elefantes",
    location: "Palermo",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Palermo",
    type: "abierta",
    //rating: 4.5,
    priceFrom: 10000,
    priceTo: 13000,
    lat: -34.580,
    lng: -58.420,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-4-sin-techo_o6y5xe.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-4-sin-techo_o6y5xe.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-5-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-3-techo_qfvkud.jpg"
    ],
    description: "Cancha abierta estilo clásico en Palermo.",
    address: "Palermo, Buenos Aires",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "09:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    features: [
      "Iluminación",
      "Vestuarios",
      "Baños"
    ],


    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Empanadas",
      "Bebidas"
    ],
    extraInfo: [
      "Zona gastronómica cercana",
      "Cercano a transporte"
    ],

 // Option 7 - Full catering service
barbecue: {
    cookType: "venue",

    grillAvailable: false,
    cookServiceAvailable: true,

    grillFee: null,
    cookServiceFee: 25000,

    notes: [
        "El complejo dispone de parrillero profesional.",
        "El uso de la parrilla está reservado exclusivamente al personal.",
        "Incluye utensilios y limpieza.",
        "Reserva mínima de 48 hs."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 14
  {
    id: "estadio-15-de-abril-estadio-de-la-avenida",
    name: "Estadio 15 de Abril - Estadio de la Avenida",
    location: "Belgrano",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Belgrano",
    type: "techada",
    //rating: 4.7,
    priceFrom: 11000,
    priceTo: 14500,
    lat: -34.555,
    lng: -58.450,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-2-techo_xbxmi4.webp",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-2-techo_xbxmi4.webp",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-3-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-4-techo_qfvkud.jpg"
    ],
    description: "Potrero techado premium en Belgrano.",
    address: "Belgrano, Buenos Aires",
    lastUpdate: "2026-06-11",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "10:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Iluminación",
      "Techada",
      "Vestuarios",
      "Estacionamiento"
    ],


    sizes: [
      "5 vs 5",
      "6 vs 6",
      
    ],

    buffet: [
      "Pizzas",
      "Bebidas"
    ],
    extraInfo: [
      "Estacionamiento amplio",
      "Acceso rápido"
    ],

 // Option 6 - Community club
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: 3000,
    cookServiceFee: null,

    notes: [
        "Los jugadores cocinan por su cuenta.",
        "Incluye parrilla, mesas y bancos.",
        "Se solicita dejar el espacio limpio al finalizar."
    ]
},


        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 15
  {
    id: "estadio-mario-alberto-kempes-olimpico-de-cordoba",
    name: "Estadio Mario Alberto Kempes - Olímpico de Córdoba",
    location: "Caballito",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Caballito",
    type: "abierta",
    //rating: 4.4,
    priceFrom: 8000,
    priceTo: 11500,
    lat: -34.565,
    lng: -58.455,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-3-sin-techo_ltwtj0.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-3-sin-techo_ltwtj0.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-4-sin-techo_o6y5xe.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-5-sin-techo_jizma0.jpg"
    ],
    description: "Cancha abierta con buena energía.",
    address: "Caballito, Buenos Aires",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-01",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "09:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Snacks"
    ],
    extraInfo: [
      "Espacio limitado",
      "Ambiente animado"
    ],

 // Option 5 - Grill included
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: null,
    cookServiceFee: 10000,

    notes: [
        "El uso de la parrilla está incluido con la reserva.",
        "El servicio de parrillero puede contratarse de forma opcional.",
        "Capacidad recomendada: hasta 25 personas."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 16
  {
    id: "estadio-julio-cesar-villagra-el-gigante-de-alberdi",
    name: "Estadio Julio César Villagra - El Gigante de Alberdi",
    location: "Núñez",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "Núñez",
    type: "techada",
    //rating: 4.9,
    priceFrom: 11500,
    priceTo: 15000,
    lat: -34.540,
    lng: -58.470,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-3-techo_qfvkud.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-3-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-4-techo_qfvkud.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-5-techo_qfvkud.jpg"
    ],
    description: "Cancha techada legendaria en Núñez.",
    address: "Núñez, Buenos Aires",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-02",
    allowedBoots: [ "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    }
],


    schedule: {
      week: "10:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Iluminación",
      "Techada",
      "Vestuarios",
      "Duchas",
      "Estacionamiento"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Pizzas",
      "Bebidas",
      "Snacks"
    ],
    extraInfo: [
      "Servicios premium",
      "Cercana a estación"
    ],

 // Option 4 - Grill rental only
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: 2500,
    cookServiceFee: null,

    notes: [
        "Se alquila únicamente la parrilla.",
        "Los jugadores cocinan por su cuenta.",
        "Cada grupo debe traer carbón, utensilios y alimentos."
    ]
}
,

        surface: [

     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 17
  {
    id: "de-cabeza-futbol",
    name: "De Cabeza Futbol",
    location: "Villa Mercedes",
      province: "San Luis",
      city: "Villa Mercedes",
      zone: "Villa Mercedes",
    type: "abierta",
    //rating: 4.5,
    priceFrom: 8000,
    priceTo: 12000,
    lat: -33.6875393,
    lng: -65.4375539,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992782/cancha-14_sbuear.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992782/cancha-14_sbuear.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992782/cancha-15_sbuear.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992782/cancha-16_sbuear.jpg"
    ],
    description: "Cancha abierta en Villa Mercedes.",
    address: "Villa Mercedes, San Luis",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-04",
    allowedBoots: ["FG", "TF"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "09:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],
    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      
    ],
    buffet: [
      "Bebidas",
      "Snacks"
    ],
    extraInfo: [
      "Ubicación provincial",
      "Cercano a acceso"
    ],

    
// Option 3 - Premium venue
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 5000,
    cookServiceFee: 18000,

    notes: [
        "Reserva obligatoria con 48 hs de anticipación.",
        "Incluye parrilla, mesas, utensilios y limpieza.",
        "El parrillero puede encargarse de toda la preparación y cocción."
    ]
},
        surface: [
    "Césped natural", 
     "Césped sintético"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 18
  {
    id: "el-bernabeu-mercedes",
    name: "El Bernabéu Mercedes",
    location: "Villa Mercedes",
    province: "San Luis",
    city: "Villa Mercedes",
    zone: "Villa Mercedes",
    type: "techada",
    //rating: 5.0,
    priceFrom: 10000,
    priceTo: 15000,
    lat: -33.7087688,
    lng: -65.4662115,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992781/cancha-17_stytcw.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992781/cancha-17_stytcw.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992781/cancha-18_stytcw.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992781/cancha-19_stytcw.jpg"
    ],
    description: "Infraestructura techada en Mercedes.",
    address: "Villa Mercedes, San Luis",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG",  "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "10:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Iluminación",
      "Techada",
      "Vestuarios",
      "Duchas"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Hamburguesas",
      "Bebidas"
    ],
    extraInfo: [
      "Cancha de calidad",
      "Apto para torneos"
    ],

 // Option 2 - Sports complex
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 3500,
    cookServiceFee: 12000,

    notes: [
        "Reserva requerida con 24 hs de anticipación.",
        "Incluye parrilla, mesas y limpieza del sector.",
        "El servicio de parrillero es opcional."
    ]
},

        surface: [
    "Césped natural", 
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

    //Array Object 19
  {
    id: "potrero-lainez",
    name: "Potrero Lainez",
    location: "Villa Mercedes",
    province: "San Luis",
    city: "Villa Mercedes",
    zone: "Villa Mercedes",
    type: "abierta",
    //rating: 4.6,
    priceFrom: 7000,
    priceTo: 11000,
    lat: -33.6722699,
    lng: -65.4697574,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992782/cancha-15_xfdf4z.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992782/cancha-15_xfdf4z.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992782/cancha-16_xfdf4z.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992782/cancha-17_xfdf4z.jpg"
    ],
    description: "Potrero abierto con buena cancha.",
    address: "Villa Mercedes, San Luis",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-09",
    allowedBoots: ["FG",  "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],
    
    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas"
    ],
    extraInfo: [
      "Ambiente familiar",
      "Estacionamiento cercano"
    ],
    
 // Option 1 - Neighborhood club
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 2000,
    cookServiceFee: 8000,

    notes: [
        "Reservá la parrilla con al menos 12 hs de anticipación.",
        "Incluye parrilla, mesas y bancos.",
        "Cada grupo debe traer carbón y utensilios."
    ]
},

        surface: [
    "Césped natural", 
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 20
  {
    id: "el-bosque-futbol",
    name: "El Bosque Fútbol",
    location: "Villa Mercedes",
    province: "San Luis",
    city: "Villa Mercedes",
    zone: "Villa Mercedes",
    type: "abierta",
    //rating: 4.2,
    priceFrom: 6500,
    priceTo: 10500,
    lat: -33.7148971,
    lng: -65.4696884,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992782/cancha-16_sb9zbp.jpg",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992782/cancha-16_sb9zbp.jpg",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992782/cancha-17_sb9zbp.jpg",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1777992782/cancha-18_sb9zbp.jpg"
    ],
    description: "Potrero abierto rodeado de verde.",
    address: "Villa Mercedes, San Luis",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-12",
    allowedBoots: ["FG",  "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Snacks"
    ],
    extraInfo: [
      "Entorno tranquilo",
      "Fácil acceso"
    ],

 // Option 2 - Sports complex
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 3500,
    cookServiceFee: 12000,

    notes: [
        "Reserva requerida con 24 hs de anticipación.",
        "Incluye parrilla, mesas y limpieza del sector.",
        "El servicio de parrillero es opcional."
    ]
}
,

        surface: [
    "Césped natural", 
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

    //Array Object 21
  {
    id: "la-bombonera",
    name: "La Bombonera",
    location: "La Boca",
    province: "Buenos Aires",
    city: "Capital Federal",
    zone: "La Boca",
    type: "abierta",
    //rating: 4.2,
    priceFrom: 6500,
    priceTo: 9500,
    lat: -34.6234,
    lng: -58.4418,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1777570021/la-bombonera-cancha-de-futbol-villavicencio-6628-768x432_bpg8xb.jpg",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1777570021/la-bombonera-cancha-de-futbol-villavicencio-6628-768x432_bpg8xb.jpg",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1777570021/la-bombonera-cancha-de-futbol-villavicencio-6629-768x432_bpg8xb.jpg",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1777570021/la-bombonera-cancha-de-futbol-villavicencio-6630-768x432_bpg8xb.jpg"
    ],
    description: "Cancha La Bombonera 5",
    address: "La Boca, Buenos Aires",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG",  "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "09:00 - 22:00",
      weekend: "09:00 - 22:00"
    },
    features: [
      "Cajero cerca"
    ],
    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],
    buffet: [
      "Bebidas",
      "Snacks",
      "Empanadas",
      "Pizzas",
      "Hamburguesas"
    ],
    extraInfo: [
      "Ambiente familiar",
      "Sin estacionamiento",
      "Zona segura",
      "Cercano a transporte"
    ],

// Option 3 - Premium venue
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 5000,
    cookServiceFee: 18000,

    notes: [
        "Reserva obligatoria con 48 hs de anticipación.",
        "Incluye parrilla, mesas, utensilios y limpieza.",
        "El parrillero puede encargarse de toda la preparación y cocción."
    ]
},

        surface: [
    "Césped natural", 
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {

      phone: "+541112345678",
      whatsapp: "5491112345678"
    },

    


  },

  {
    id: "estadio-francisco-cabases-la-boutique",
    name: "Estadio Francisco Cabasés - La Boutique",
    location: "Nueva Córdoba",
    province: "Córdoba",
    city: "Córdoba Capital",
    zone: "Nueva Córdoba",
    type: "techada",
    //rating: 4.6,
    priceFrom: 7500,
    priceTo: 11000,
    lat: -31.4265,
    lng: -64.1888,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696199/cancha-20_gzohuw.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696199/cancha-20_gzohuw.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696199/cancha-21_gzohuw.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696199/cancha-22_gzohuw.avif"
    ],
    description: "Complejo de fútbol 5 en Nueva Córdoba",
    address: "Nueva Córdoba, Córdoba",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "10:00 - 00:00",
      weekend: "09:00 - 01:00"
    },
    features: [
      "Estacionamiento",
      "Wifi",
      "Iluminación LED"
    ],
    sizes: [
      "5 vs 5",
      "6 vs 6",
      
    ],
    buffet: [
      "Bebidas",
      "Snacks",
      "Pizzas",
      "Lomitos"
    ],
    extraInfo: [
      "Ambiente familiar",
      "Vestuario",
      "Zona segura",
      "Canchas renovadas"
    ],

 // Option 4 - Grill rental only
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: 2500,
    cookServiceFee: null,

    notes: [
        "Se alquila únicamente la parrilla.",
        "Los jugadores cocinan por su cuenta.",
        "Cada grupo debe traer carbón, utensilios y alimentos."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543514567890",
      whatsapp: "5493514567890"
    },
},

{
    id: "estadio-malvinas-argentinas",
    name: "Estadio Malvinas Argentinas",
    location: "Alta Córdoba",
    province: "Córdoba",
    city: "Córdoba Capital",
    zone: "Alta Córdoba",
    type: "abierta",
    //rating: 4.4,
    priceFrom: 6000,
    priceTo: 9200,
    lat: -31.3992,
    lng: -64.1815,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696237/cancha-21_xjbuzx.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696237/cancha-21_xjbuzx.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696237/cancha-22_xjbuzx.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696237/cancha-23_xjbuzx.avif"
    ],
    description: "Fútbol 5 y fútbol 7 en Alta Córdoba",
    address: "Alta Córdoba, Córdoba",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-15",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "08:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],
    features: [
      "Buffet",
      "Duchas",
      "Parking cercano"
    ],
    buffet: [
      "Bebidas",
      "Hamburguesas",
      "Empanadas",
      "Café"
    ],
    extraInfo: [
      "Buen acceso",
      "Ideal para torneos",
      "Zona iluminada",
      "Ambiente competitivo"
    ],

 // Option 5 - Grill included
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: null,
    cookServiceFee: 10000,

    notes: [
        "El uso de la parrilla está incluido con la reserva.",
        "El servicio de parrillero puede contratarse de forma opcional.",
        "Capacidad recomendada: hasta 25 personas."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543514112233",
      whatsapp: "5493514112233"
    },
},

{
    id: "estadio-jose-maria-minella",
    name: "Estadio José María Minella",
    location: "Villa Belgrano",
    province: "Córdoba",
    city: "Córdoba Capital",
    zone: "Villa Belgrano",
    type: "semi-techada",
    //rating: 4.8,
    priceFrom: 8500,
    priceTo: 12500,
    lat: -31.3521,
    lng: -64.2486,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696274/cancha-22_xfa9ex.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696274/cancha-22_xfa9ex.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696274/cancha-23_xfa9ex.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696274/cancha-24_xfa9ex.avif"
    ],
    description: "Complejo premium de fútbol amateur",
    address: "Villa Belgrano, Córdoba",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-22",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    
    schedule: {
      week: "09:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Estacionamiento privado",
      "Streaming de partidos",
      "Wifi",
      "Vestuarios"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Cervezas sin alcohol",
      "Pizzas",
      "Lomitos",
      "Picadas"
    ],
    extraInfo: [
      "Ambiente premium",
      "Ideal para eventos",
      "Zona tranquila",
      "Excelente iluminación"
    ],

// Option 6 - Community club
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: 3000,
    cookServiceFee: null,

    notes: [
        "Los jugadores cocinan por su cuenta.",
        "Incluye parrilla, mesas y bancos.",
        "Se solicita dejar el espacio limpio al finalizar."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543517778899",
      whatsapp: "5493517778899"
    },
},

{
    id: "estadio-unico-madre-de-ciudades",
    name: "Estadio Único Madre de Ciudades",
    location: "Centro",
    province: "Neuquén",
    city: "Neuquén Capital",
    zone: "Centro",
    type: "techada",
    //rating: 4.5,
    priceFrom: 7800,
    priceTo: 11800,
    lat: -38.9516,
    lng: -68.0591,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696358/cancha-23_opuzcb.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696358/cancha-23_opuzcb.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696358/cancha-24_opuzcb.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696358/cancha-25_opuzcb.avif"
    ],
    description: "Complejo moderno de fútbol 5 en Neuquén",
    address: "Centro, Neuquén",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-20",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "10:00 - 00:00",
      weekend: "09:00 - 01:00"
    },
    features: [
      "Wifi",
      "Estacionamiento",
      "Vestuarios"
    ],
    buffet: [
      "Bebidas",
      "Snacks",
      "Pizzas",
      "Hamburguesas"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      
      "11 vs 11"
    ],

    extraInfo: [
      "Ambiente familiar",
      "Zona céntrica",
      "Buena iluminación",
      "Ideal para torneos"
    ],

 // Option 7 - Full catering service
barbecue: {
    cookType: "venue",

    grillAvailable: false,
    cookServiceAvailable: true,

    grillFee: null,
    cookServiceFee: 25000,

    notes: [
        "El complejo dispone de parrillero profesional.",
        "El uso de la parrilla está reservado exclusivamente al personal.",
        "Incluye utensilios y limpieza.",
        "Reserva mínima de 48 hs."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+542994556677",
      whatsapp: "5492994556677"
    },
},

{
    id: "estadio-san-juan-del-bicentenario",
    name: "Estadio San Juan del Bicentenario",
    location: "Alta Barda",
    province: "Neuquén",
    city: "Neuquén Capital",
    zone: "Alta Barda",
    type: "abierta",
    //rating: 4.3,
    priceFrom: 6200,
    priceTo: 9300,
    lat: -38.9342,
    lng: -68.0845,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696405/cancha-24_yrvrga.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696405/cancha-24_yrvrga.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696405/cancha-25_yrvrga.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696405/cancha-26_yrvrga.avif"
    ],
    description: "Canchas de fútbol amateur en Alta Barda",
    address: "Alta Barda, Neuquén",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-21",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "08:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    features: [
      "Buffet",
      "Iluminación LED",
      "Parking cercano"
    ],

    sizes: [
      
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Empanadas",
      "Panchos",
      "Café"
    ],
    extraInfo: [
      "Buen ambiente",
      "Zona tranquila",
      "Ideal para amigos",
      "Acceso fácil"
    ],

 // Option 8 - Free barbecue area
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: null,
    cookServiceFee: null,

    notes: [
        "La parrilla puede utilizarse sin costo adicional.",
        "Sujeta a disponibilidad.",
        "Cada grupo debe llevar carbón, utensilios y alimentos."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+542994112244",
      whatsapp: "5492994112244"
    },
},

{
    id: "estadio-padre-ernesto-martearena",
    name: "Estadio Padre Ernesto Martearena",
    location: "Valentina Sur",
    province: "Neuquén",
    city: "Neuquén Capital",
    zone: "Valentina Sur",
    type: "semi-techada",
    //rating: 4.7,
    priceFrom: 8800,
    priceTo: 13000,
    lat: -38.9828,
    lng: -68.0987,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-1-sin-techo_chwki3.jpg", //repeated change later
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-1-sin-techo_chwki3.jpg",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696405/cancha-25_yrvrga.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696405/cancha-26_yrvrga.avif"
    ],
    description: "Complejo premium de fútbol en Neuquén",
    address: "Valentina Sur, Neuquén",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-20",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "09:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Streaming de partidos",
      "Wifi",
      "Vestuarios",
      "Estacionamiento privado"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Pizzas",
      "Lomitos",
      "Picadas"
    ],
    extraInfo: [
      "Ambiente premium",
      "Excelente iluminación",
      "Zona segura",
      "Canchas nuevas"
    ],

 // Option 9 - Event venue
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 4000,
    cookServiceFee: 15000,

    notes: [
        "Reservá con al menos 24 hs de anticipación.",
        "Incluye parrilla, mesas, iluminación y limpieza del sector.",
        "El servicio de parrillero es opcional."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+542994778899",
      whatsapp: "5492994778899"
    },
},

// TUCUMÁN

{
    id: "estadio-monumental-presidente-jose-pepe-fierro",
    name: "Estadio Monumental Presidente José Pepe Fierro",
    location: "Yerba Buena",
    province: "Tucumán",
    city: "San Miguel de Tucumán",
    zone: "Yerba Buena",
    type: "techada",
    //rating: 4.6,
    priceFrom: 7200,
    priceTo: 10800,
    lat: -26.8167,
    lng: -65.2833,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696523/cancha-25_u7fykv.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696523/cancha-25_u7fykv.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696523/cancha-26_u7fykv.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696523/cancha-27_u7fykv.avif"
    ],
    description: "Complejo moderno de fútbol 5 en Yerba Buena",
    address: "Yerba Buena, Tucumán",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-16",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "10:00 - 00:00",
      weekend: "09:00 - 01:00"
    },
    features: [
      "Wifi",
      "Estacionamiento",
      "Vestuarios"
    ],


    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Pizzas",
      "Empanadas",
      "Hamburguesas"
    ],
    extraInfo: [
      "Ambiente familiar",
      "Excelente iluminación",
      "Zona segura",
      "Ideal para torneos"
    ],

 // Option 10 - Large sports club
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 6000,
    cookServiceFee: 20000,

    notes: [
        "Disponemos de varias parrillas sujetas a disponibilidad.",
        "Reserva recomendada con 48 hs de anticipación.",
        "Podés cocinar por tu cuenta o contratar un parrillero.",
        "Ideal para reuniones de hasta 40 personas."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543814556677",
      whatsapp: "5493814556677"
    },
},

{
    id: "estadio-del-club-atletico-san-martin-tucuman-la-ciudadela",
    name: "Estadio del Club Atlético San Martín (Tucumán) - La Ciudadela",
    location: "Centro",
    province: "Tucumán",
    city: "San Miguel de Tucumán",
    zone: "Centro",
    type: "abierta",
    //rating: 4.2,
    priceFrom: 5800,
    priceTo: 8900,
    lat: -26.8241,
    lng: -65.2226,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696553/cancha-26_oq4jcl.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696553/cancha-26_oq4jcl.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696553/cancha-27_oq4jcl.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696553/cancha-28_oq4jcl.avif"
    ],
    description: "Canchas de fútbol amateur en el centro tucumano",
    address: "Centro, Tucumán",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-12",
    allowedBoots: ["FG", "TF"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "08:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    features: [
      "Buffet",
      "Iluminación LED",
      "Parking cercano"
    ],

    sizes: [
      
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Snacks",
      "Panchos",
      "Café"
    ],
    extraInfo: [
      "Buen ambiente",
      "Acceso fácil",
      "Zona transitada",
      "Ideal para amigos"
    ],

 // Option 9 - Event venue
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 4000,
    cookServiceFee: 15000,

    notes: [
        "Reservá con al menos 24 hs de anticipación.",
        "Incluye parrilla, mesas, iluminación y limpieza del sector.",
        "El servicio de parrillero es opcional."
    ]
}
,

        surface: [
    "Césped natural", 
     "Césped sintético"
        ],

    booking: {
      phone: "+543814223344",
      whatsapp: "5493814223344"
    },
},

{
    id: "estadio-eva-peron-el-cemento",
    name: "Estadio Eva Perón - El Cemento",
    location: "Tafí Viejo",
    province: "Tucumán",
    city: "Tafí Viejo",
    zone: "Tafí Viejo",
    type: "semi-techada",
    //rating: 4.8,
    priceFrom: 8300,
    priceTo: 12400,
    lat: -26.7321,
    lng: -65.2598,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696583/cancha-27_mtgupc.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696583/cancha-27_mtgupc.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696583/cancha-28_mtgupc.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696583/cancha-29_mtgupc.avif"
    ],
    description: "Complejo premium de fútbol amateur",
    address: "Tafí Viejo, Tucumán",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-10",
    allowedBoots: [ "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "09:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Streaming de partidos",
      "Wifi",
      "Vestuarios",
      "Estacionamiento privado"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Pizzas",
      "Lomitos",
      "Picadas"
    ],
    extraInfo: [
      "Ambiente premium",
      "Excelente césped",
      "Zona tranquila",
      "Canchas renovadas"
    ],

 // Option 8 - Free barbecue area
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: null,
    cookServiceFee: null,

    notes: [
        "La parrilla puede utilizarse sin costo adicional.",
        "Sujeta a disponibilidad.",
        "Cada grupo debe llevar carbón, utensilios y alimentos."
    ]
},

        surface: [ 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543814778899",
      whatsapp: "5493814778899"
    },
},

// JUJUY

{
    id: "estadio-bautista-gargantini-la-catedral",
    name: "Estadio Bautista Gargantini - La Catedral",
    location: "Palpalá",
    province: "Jujuy",
    city: "San Salvador de Jujuy",
    zone: "Palpalá",
    type: "abierta",
    //rating: 4.3,
    priceFrom: 5400,
    priceTo: 8600,
    lat: -24.2565,
    lng: -65.2116,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696613/cancha-28_oil8j8.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696613/cancha-28_oil8j8.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696613/cancha-29_oil8j8.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696613/cancha-30_oil8j8.avif"
    ],
    description: "Canchas de fútbol 5 en Palpalá",
    address: "Palpalá, Jujuy",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-08",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Buffet",
      "Iluminación LED"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Empanadas",
      "Snacks",
      "Café"
    ],
    extraInfo: [
      "Ambiente familiar",
      "Zona tranquila",
      "Buen acceso",
      "Ideal para grupos"
    ],

    
// Option 7 - Full catering service
barbecue: {
    cookType: "venue",

    grillAvailable: false,
    cookServiceAvailable: true,

    grillFee: null,
    cookServiceFee: 25000,

    notes: [
        "El complejo dispone de parrillero profesional.",
        "El uso de la parrilla está reservado exclusivamente al personal.",
        "Incluye utensilios y limpieza.",
        "Reserva mínima de 48 hs."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543884556677",
      whatsapp: "5493884556677"
    },
},

{
    id: "estadio-feliciano-gambarte-la-bodega",
    name: "José Alvalade Stadium - La Bodega",
    location: "Centro",
    province: "Jujuy",
    city: "San Salvador de Jujuy",
    zone: "Centro",
    type: "techada",
    //rating: 4.5,
    priceFrom: 6900,
    priceTo: 10200,
    lat: -24.1858,
    lng: -65.2995,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-2-techo_xbxmi4.webp", //repeated change later
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-2-techo_xbxmi4.webp",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696645/cancha-30_qlh7l8.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696645/cancha-31_qlh7l8.avif"
    ],
    description: "Complejo techado de fútbol amateur",
    address: "Centro, Jujuy",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-11",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "09:00 - 00:00",
      weekend: "09:00 - 01:00"
    },
    features: [
      "Wifi",
      "Vestuarios",
      "Estacionamiento"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      
    ],

    buffet: [
      "Bebidas",
      "Hamburguesas",
      "Pizzas",
      "Panchos"
    ],
    extraInfo: [
      "Excelente iluminación",
      "Zona segura",
      "Ideal para torneos",
      "Buen ambiente"
    ],

 // Option 6 - Community club
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: 3000,
    cookServiceFee: null,

    notes: [
        "Los jugadores cocinan por su cuenta.",
        "Incluye parrilla, mesas y bancos.",
        "Se solicita dejar el espacio limpio al finalizar."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543884112233",
      whatsapp: "5493884112233"
    },
},

{
    id: "estadio-diego-armando-maradona",
    name: "Estadio Diego Armando Maradona",
    location: "Alto Comedero",
    province: "Jujuy",
    city: "San Salvador de Jujuy",
    zone: "Alto Comedero",
    type: "semi-techada",
    //rating: 4.7,
    priceFrom: 7900,
    priceTo: 11900,
    lat: -24.2319,
    lng: -65.2471,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696665/cancha-29_dv4on3.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696665/cancha-29_dv4on3.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696665/cancha-30_dv4on3.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696665/cancha-31_dv4on3.avif"
    ],
    description: "Complejo premium de fútbol en Jujuy",
    address: "Alto Comedero, Jujuy",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-13",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "09:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Streaming de partidos",
      "Wifi",
      "Vestuarios",
      "Parking privado"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Picadas",
      "Pizzas",
      "Lomitos"
    ],
    extraInfo: [
      "Ambiente premium",
      "Zona moderna",
      "Excelente césped",
      "Canchas nuevas"
    ],

 // Option 5 - Grill included
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: null,
    cookServiceFee: 10000,

    notes: [
        "El uso de la parrilla está incluido con la reserva.",
        "El servicio de parrillero puede contratarse de forma opcional.",
        "Capacidad recomendada: hasta 25 personas."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543884778899",
      whatsapp: "5493884778899"
    },
},

// MENDOZA

{
    id: "estadio-claudio-chiqui-tapia",
    name: "Estadio Claudio Chiqui Tapia",
    location: "Godoy Cruz",
    province: "Mendoza",
    city: "Mendoza Capital",
    zone: "Godoy Cruz",
    type: "techada",
    //rating: 4.7,
    priceFrom: 8200,
    priceTo: 12200,
    lat: -32.9282,
    lng: -68.8448,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696701/cancha-30_ewvnhc.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696701/cancha-30_ewvnhc.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696701/cancha-31_ewvnhc.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696701/cancha-32_ewvnhc.avif"
    ],
    description: "Complejo premium de fútbol en Mendoza",
    address: "Godoy Cruz, Mendoza",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG", "TF"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "09:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    sizes: [
      "5 vs 5"
      
      
      
    ],
    features: [
      "Wifi",
      "Vestuarios",
      "Estacionamiento privado"
    ],
    buffet: [
      "Bebidas",
      "Pizzas",
      "Lomitos",
      "Picadas"
    ],
    extraInfo: [
      "Excelente iluminación",
      "Ambiente premium",
      "Zona segura"
    ],

 // Option 4 - Grill rental only
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: 2500,
    cookServiceFee: null,

    notes: [
        "Se alquila únicamente la parrilla.",
        "Los jugadores cocinan por su cuenta.",
        "Cada grupo debe traer carbón, utensilios y alimentos."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético"
        ],

    booking: {
      phone: "+542614556677",
      whatsapp: "5492614556677"
    },
},

// SANTA CRUZ

{
    id: "estadio-polideportivo-guillermo-laza",
    name: "Estadio Polideportivo Guillermo Laza",
    location: "Centro",
    province: "Santa Cruz",
    city: "Río Gallegos",
    zone: "Centro",
    type: "semi-techada",
    //rating: 4.4,
    priceFrom: 7600,
    priceTo: 11400,
    lat: -51.6230,
    lng: -69.2168,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696731/cancha-31_aekyin.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696731/cancha-31_aekyin.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696731/cancha-32_aekyin.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696731/cancha-33_aekyin.avif"
    ],
    description: "Complejo de fútbol amateur en Río Gallegos",
    address: "Centro, Río Gallegos",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG",  "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "10:00 - 00:00",
      weekend: "09:00 - 01:00"
    },
    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],
    features: [
      "Calefacción",
      "Wifi",
      "Buffet"
    ],
    buffet: [
      "Bebidas",
      "Snacks",
      "Hamburguesas"
    ],
    extraInfo: [
      "Ideal en invierno",
      "Zona céntrica",
      "Buen ambiente"
    ],

 // Option 3 - Premium venue
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 5000,
    cookServiceFee: 18000,

    notes: [
        "Reserva obligatoria con 48 hs de anticipación.",
        "Incluye parrilla, mesas, utensilios y limpieza.",
        "El parrillero puede encargarse de toda la preparación y cocción."
    ]
},

        surface: [
    "Césped natural", 
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+542966556677",
      whatsapp: "5492966556677"
    },
},

// CHUBUT

{
    id: "estadio-norberto-tito-tomaghello",
    name: "Estadio Norberto Tito Tomaghello",
    location: "Centro",
    province: "Chubut",
    city: "Comodoro Rivadavia",
    zone: "Centro",
    type: "abierta",
    //rating: 4.3,
    priceFrom: 6900,
    priceTo: 9800,
    lat: -45.8641,
    lng: -67.4966,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696765/cancha-32_bpj0or.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696765/cancha-32_bpj0or.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696765/cancha-33_bpj0or.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696765/cancha-34_bpj0or.avif"
    ],
    description: "Canchas de fútbol 5 en Comodoro",
    address: "Centro, Comodoro Rivadavia",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "08:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      
    ],
    features: [
      "Iluminación LED",
      "Parking cercano"
    ],
    buffet: [
      "Bebidas",
      "Empanadas",
      "Panchos"
    ],
    extraInfo: [
      "Buen acceso",
      "Ambiente competitivo",
      "Zona transitada"
    ],

 // Option 2 - Sports complex
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 3500,
    cookServiceFee: 12000,

    notes: [
        "Reserva requerida con 24 hs de anticipación.",
        "Incluye parrilla, mesas y limpieza del sector.",
        "El servicio de parrillero es opcional."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+542974112233",
      whatsapp: "5492974112233"
    },
},

// TIERRA DEL FUEGO

{
    id: "estadio-ciudad-de-vicente-lopez",
    name: "Estadio Ciudad De Vicente Lopez",
    location: "Centro",
    province: "Tierra del Fuego",
    city: "Ushuaia",
    zone: "Centro",
    type: "techada",
    //rating: 4.8,
    priceFrom: 9500,
    priceTo: 13800,
    lat: -54.8019,
    lng: -68.3030,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696794/cancha-33_sb1kyc.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696794/cancha-33_sb1kyc.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696794/cancha-34_sb1kyc.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696794/cancha-35_sb1kyc.avif"
    ],
    description: "Complejo techado de fútbol en Ushuaia",
    address: "Centro, Ushuaia",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-21",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "10:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],
    features: [
      "Calefacción",
      "Streaming de partidos",
      "Wifi"
    ],
    buffet: [
      "Bebidas",
      "Pizzas",
      "Picadas"
    ],
    extraInfo: [
      "Ideal para clima frío",
      "Ambiente premium",
      "Excelente césped"
    ],

 // Option 1 - Neighborhood club
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 2000,
    cookServiceFee: 8000,

    notes: [
        "Reservá la parrilla con al menos 12 hs de anticipación.",
        "Incluye parrilla, mesas y bancos.",
        "Cada grupo debe traer carbón y utensilios."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {

      phone: "+542901556677",
      whatsapp: "5492901556677"
    },
},

// SAN JUAN

{
    id: "estadio-centenario-ciudad-de-quilmes",
    name: "Estadio Centenario Ciudad de Quilmes",
    location: "Rivadavia",
    province: "San Juan",
    city: "San Juan",
    zone: "Rivadavia",
    type: "semi-techada",
    //rating: 4.5,
    priceFrom: 7100,
    priceTo: 10600,
    lat: -31.5375,
    lng: -68.5364,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696731/cancha-31_aekyin.avif", //repeated change later
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696731/cancha-31_aekyin.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696731/cancha-32_aekyin.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696731/cancha-33_aekyin.avif"
    ],
    description: "Complejo moderno de fútbol amateur",
    address: "Rivadavia, San Juan",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-17",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],
    
    schedule: {
      week: "09:00 - 00:00",
      weekend: "09:00 - 01:00"
    },
    sizes: [
      "5 vs 5",
      "6 vs 6",
      
      "11 vs 11"
    ],
    features: [
      "Wifi",
      "Vestuarios",
      "Estacionamiento"
    ],
    buffet: [
      "Bebidas",
      "Lomitos",
      "Empanadas"
    ],
    extraInfo: [
      "Zona tranquila",
      "Excelente iluminación",
      "Ideal para amigos"
    ],

 // Option 2 - Sports complex
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 3500,
    cookServiceFee: 12000,

    notes: [
        "Reserva requerida con 24 hs de anticipación.",
        "Incluye parrilla, mesas y limpieza del sector.",
        "El servicio de parrillero es opcional."
    ]
}
,

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+542644556677",
      whatsapp: "5492644556677"
    },
},

// LA RIOJA

{
    id: "estadio-arquitecto-ricardo-etcheverri-el-templo",
    name: "Estadio Arquitecto Ricardo Etcheverri - El Templo",
    location: "Centro",
    province: "La Rioja",
    city: "La Rioja",
    zone: "Centro",
    type: "abierta",
    //rating: 4.2,
    priceFrom: 5600,
    priceTo: 8700,
    lat: -29.4131,
    lng: -66.8558,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696840/cancha-34_oij32l.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696840/cancha-34_oij32l.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696840/cancha-35_oij32l.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696840/cancha-36_oij32l.avif"
    ],
    description: "Canchas de fútbol amateur en La Rioja",
    address: "Centro, La Rioja",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-21",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],
    features: [
      "Buffet",
      "Iluminación LED"
    ],
    buffet: [
      "Bebidas",
      "Snacks",
      "Panchos"
    ],
    extraInfo: [
      "Buen ambiente",
      "Zona céntrica",
      "Acceso fácil"
    ],

 // Option 3 - Premium venue
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 5000,
    cookServiceFee: 18000,

    notes: [
        "Reserva obligatoria con 48 hs de anticipación.",
        "Incluye parrilla, mesas, utensilios y limpieza.",
        "El parrillero puede encargarse de toda la preparación y cocción."
    ]
}
,

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543804556677",
      whatsapp: "5493804556677"
    },
},

// SANTIAGO DEL ESTERO

{
    id: "estadio-alfredo-martin-beranger-el-teatro-de-turdera",
    name: "Estadio Alfredo Martín Beranger - El Teatro de Turdera",
    location: "La Banda",
    province: "Santiago del Estero",
    city: "Santiago del Estero",
    zone: "La Banda",
    type: "abierta",
    //rating: 4.4,
    priceFrom: 5900,
    priceTo: 9100,
    lat: -27.7335,
    lng: -64.2428,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696869/cancha-35_fu8qjh.avif",
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696869/cancha-35_fu8qjh.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696869/cancha-36_fu8qjh.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696869/cancha-37_fu8qjh.avif"
    ],
    description: "Complejo de fútbol amateur en Santiago",
    address: "La Banda, Santiago del Estero",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-11",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "08:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    features: [
      "Parking cercano",
      "Buffet"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      
      "11 vs 11"
    ],

    buffet: [
      "Bebidas",
      "Empanadas",
      "Hamburguesas"
    ],
    extraInfo: [
      "Ambiente familiar",
      "Zona segura",
      "Ideal para torneos"
    ],

 // Option 4 - Grill rental only
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: 2500,
    cookServiceFee: null,

    notes: [
        "Se alquila únicamente la parrilla.",
        "Los jugadores cocinan por su cuenta.",
        "Cada grupo debe traer carbón, utensilios y alimentos."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543854556677",
      whatsapp: "5493854556677"
    },
},

// SALTA

{
    id: "estadio-eduardo-gallardon",
    name: "Estadio Eduardo Gallardón",
    location: "Tres Cerritos",
    province: "Salta",
    city: "Salta Capital",
    zone: "Tres Cerritos",
    type: "techada",
    //rating: 4.7,
    priceFrom: 8400,
    priceTo: 12600,
    lat: -24.7612,
    lng: -65.3931,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696523/cancha-25_u7fykv.avif", //repeated change later
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696523/cancha-25_u7fykv.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696523/cancha-26_u7fykv.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696523/cancha-27_u7fykv.avif"
    ],
    description: "Complejo premium de fútbol en Salta",
    address: "Tres Cerritos, Salta",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-10",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

    schedule: {
      week: "09:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Streaming de partidos",
      "Wifi",
      "Vestuarios"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      
      "11 vs 11"
    ],

    buffet: [
      "Pizzas",
      "Picadas",
      "Lomitos"
    ],
    extraInfo: [
      "Excelente césped",
      "Zona premium",
      "Buen ambiente"
    ],

 // Option 5 - Grill included
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: null,
    cookServiceFee: 10000,

    notes: [
        "El uso de la parrilla está incluido con la reserva.",
        "El servicio de parrillero puede contratarse de forma opcional.",
        "Capacidad recomendada: hasta 25 personas."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543874556677",
      whatsapp: "5493874556677"
    },
},

// CORRIENTES

{
    id: "estadio-ciudad-de-caseros-el-pincha-de-caseros",
    name: "Estadio Ciudad de Caseros - El Pincha de Caseros",
    location: "Centro",
    province: "Corrientes",
    city: "Corrientes Capital",
    zone: "Centro",
    type: "semi-techada",
    //rating: 4.3,
    priceFrom: 6100,
    priceTo: 9400,
    lat: -27.4692,
    lng: -58.8306,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696583/cancha-27_mtgupc.avif", //repeated change later
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696583/cancha-27_mtgupc.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696583/cancha-28_mtgupc.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696583/cancha-29_mtgupc.avif"
    ],
    description: "Complejo de fútbol amateur en Corrientes",
    address: "Centro, Corrientes",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-12",
    allowedBoots: ["FG", "TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "08:00 - 00:00",
      weekend: "08:00 - 01:00"
    },
    features: [
      "Wifi",
      "Buffet"
    ],

    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      
    ],

    buffet: [
      "Bebidas",
      "Panchos",
      "Empanadas"
    ],
    extraInfo: [
      "Buen acceso",
      "Zona segura",
      "Ambiente familiar"
    ],

 // Option 6 - Community club
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: 3000,
    cookServiceFee: null,

    notes: [
        "Los jugadores cocinan por su cuenta.",
        "Incluye parrilla, mesas y bancos.",
        "Se solicita dejar el espacio limpio al finalizar."
    ]
},

        surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543794556677",
      whatsapp: "5493794556677"
    },
},

// ENTRE RÍOS

{
    id: "estadio-unico-diego-armando-maradona",
    name: "Estadio Único Diego Armando Maradona",
    location: "Centro",
    province: "Entre Ríos",
    city: "Paraná",
    zone: "Centro",
    type: "techada",
    //rating: 4.6,
    priceFrom: 7400,
    priceTo: 11200,
    lat: -31.7319,
    lng: -60.5238,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696358/cancha-23_opuzcb.avif", //repeated change later
    images: [
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696358/cancha-23_opuzcb.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696358/cancha-24_opuzcb.avif",
      "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696358/cancha-25_opuzcb.avif"
    ],
    description: "Complejo techado de fútbol 5 en Paraná",
    address: "Centro, Paraná",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-15",
    allowedBoots: ["TF", "IN"],
    availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],


    schedule: {
      week: "09:00 - 00:00",
      weekend: "09:00 - 01:00"
    },
    features: [
      "Wifi",
      "Vestuarios",
      "Parking"
    ],
    sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],
    buffet: [
      "Bebidas",
      "Pizzas",
      "Hamburguesas"
    ],
    extraInfo: [
      "Excelente iluminación",
      "Buen ambiente",
      "Ideal para torneos"
    ],

 // Option 7 - Full catering service
barbecue: {
    cookType: "venue",

    grillAvailable: false,
    cookServiceAvailable: true,

    grillFee: null,
    cookServiceFee: 25000,

    notes: [
        "El complejo dispone de parrillero profesional.",
        "El uso de la parrilla está reservado exclusivamente al personal.",
        "Incluye utensilios y limpieza.",
        "Reserva mínima de 48 hs."
    ]
},

        surface: [
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

    booking: {
      phone: "+543434556677",
      whatsapp: "5493434556677"
    },
},

// SANTA FE

{
  id: "estadio-alfredo-terrera-el-oeste",
  name: "Estadio Alfredo Terrera - El Oeste",
  location: "Pichincha",
  province: "Santa Fe",
  city: "Rosario",
  zone: "Pichincha",
  type: "techada",
  //rating: 4.7,
  priceFrom: 8500,
  priceTo: 12800,
  lat: -32.9442,
  lng: -60.6505,
  image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696523/cancha-25_u7fykv.avif", //repeated change later
  images: [
    "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696523/cancha-25_u7fykv.avif",
    "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696523/cancha-26_u7fykv.avif",
    "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696523/cancha-27_u7fykv.avif"
  ],
  description: "Complejo premium de fútbol en Rosario",
  address: "Pichincha, Rosario",
  lastUpdate: "2026-06-18",
  createdAt: "2026-06-19",
  allowedBoots: ["FG"],
  availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

  schedule: {
    week: "09:00 - 01:00",
    weekend: "09:00 - 02:00"
  },
  features: [
    "Wifi",
    "Vestuarios",
    "Streaming de partidos"
  ],

  sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      "11 vs 11"
    ],

  buffet: [
    "Pizzas",
    "Hamburguesas",
    "Bebidas"
  ],
  extraInfo: [
    "Excelente iluminación",
    "Zona segura",
    "Ideal para torneos"
  ],

 // Option 8 - Free barbecue area
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: null,
    cookServiceFee: null,

    notes: [
        "La parrilla puede utilizarse sin costo adicional.",
        "Sujeta a disponibilidad.",
        "Cada grupo debe llevar carbón, utensilios y alimentos."
    ]
},

      surface: [
    "Césped natural"
        ],

  booking: {
    phone: "+543414556677",
    whatsapp: "5493414556677"
  },
},

// MISIONES

{
  id: "estadio-don-jose-dellagiovanna-coliseo-de-victoria",
  name: "Estadio Don José Dellagiovanna - Colise de Victoria",
  location: "Centro",
  province: "Misiones",
  city: "Puerto Iguazú",
  zone: "Centro",
  type: "semi-techada",
  //rating: 4.5,
  priceFrom: 6800,
  priceTo: 10200,
  lat: -25.5972,
  lng: -54.5786,
  image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696583/cancha-27_mtgupc.avif", //repeated change later
  images: [
    "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696583/cancha-27_mtgupc.avif",
    "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696583/cancha-28_mtgupc.avif",
    "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696583/cancha-29_mtgupc.avif"
  ],
  description: "Complejo de fútbol amateur en Iguazú",
  address: "Centro, Puerto Iguazú",
  lastUpdate: "2026-06-18",
  createdAt: "2026-06-13",
  allowedBoots: ["FG"],
  availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    },
    {
        code: "boca",
        name: "Boca Juniors",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
    },
    {
        code: "river",
        name: "River Plate",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
    },
    {
        code: "argentina",
        name: "Selección Argentina",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
    },
    {
        code: "independiente",
        name: "Independiente",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
    },
    {
        code: "racing",
        name: "Racing",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
    },
    {
        code: "san-lorenzo",
        name: "San Lorenzo",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
    },
    {
        code: "arsenal",
        name: "Arsenal",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
    },
    {
        code: "bayern",
        name: "Bayern Munich",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821030/camiseta-bayern-munich_u1inoi.avif"
    },
    {
        code: "paris-saint-germain",
        name: "Paris Saint-Germain",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821162/camiseta-PSG_rseozd.avif"
    },
    {
        code: "barcelona",
        name: "Barcelona",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821377/camiseta-barcelona_mruxmm.webp"
    },
    {
        code: "real-madrid",
        name: "Real Madrid",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821528/camiseta-real-madrid_t5q5pj.webp"
    },
    {
        code: "juventus",
        name: "Juventus",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779821786/camiseta-juventus_xtti89.webp"
    },
    {
        code: "manchester-united",
        name: "Manchester United",
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779822364/camiseta-manchester-united_kobmbe.avif"
    }
],

  schedule: {
    week: "08:00 - 00:00",
    weekend: "08:00 - 01:00"
  },
  features: [
    "Buffet",
    "Wifi",
    "Iluminación LED"
  ],

  sizes: [
      "5 vs 5",
      "6 vs 6",
      "7 vs 7",
      
    ],

  buffet: [
    "Bebidas",
    "Empanadas",
    "Snacks"
  ],
  extraInfo: [
    "Ambiente familiar",
    "Zona turística",
    "Buen acceso"
  ],

 // Option 9 - Event venue
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 4000,
    cookServiceFee: 15000,

    notes: [
        "Reservá con al menos 24 hs de anticipación.",
        "Incluye parrilla, mesas, iluminación y limpieza del sector.",
        "El servicio de parrillero es opcional."
    ]
},

      surface: [
    "Césped natural"
        ],

  booking: {
    phone: "+543757556677",
    whatsapp: "5493757556677"
  },
},

// CHACO

{
  id: "estadio-monumental-presidente-peron-monumental-de-alta-cordoba",
  name: "Estadio Monumental Presidente Perón - Monumental de Alta Córdoba",
  location: "Centro",
  province: "Chaco",
  city: "Resistencia",
  zone: "Centro",
  type: "abierta",
  //rating: 4.3,
  priceFrom: 5900,
  priceTo: 9100,
  lat: -27.4514,
  lng: -58.9867,
  image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696237/cancha-21_xjbuzx.avif", //repeated change later
  images: [
    "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696237/cancha-21_xjbuzx.avif",
    "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696237/cancha-22_xjbuzx.avif",
    "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696237/cancha-23_xjbuzx.avif"
  ],
  description: "Canchas de fútbol amateur en Resistencia",
  address: "Centro, Resistencia",
  lastUpdate: "2026-06-18",
  createdAt: "2026-06-18",
  allowedBoots: ["FG", "TF"],
  availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    }
],

  schedule: {
    week: "08:00 - 23:00",
    weekend: "08:00 - 00:00"
  },
  features: [
    "Buffet",
    "Parking cercano"
  ],

  sizes: [
      "5 vs 5",
      
      "7 vs 7",
      "11 vs 11"
    ],

  buffet: [
    "Bebidas",
    "Panchos",
    "Hamburguesas"
  ],
  extraInfo: [
    "Buen ambiente",
    "Zona transitada",
    "Ideal para grupos"
  ],

 // Option 10 - Large sports club
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 6000,
    cookServiceFee: 20000,

    notes: [
        "Disponemos de varias parrillas sujetas a disponibilidad.",
        "Reserva recomendada con 48 hs de anticipación.",
        "Podés cocinar por tu cuenta o contratar un parrillero.",
        "Ideal para reuniones de hasta 40 personas."
    ]
},

      surface: [
    "Césped natural", 
     "Césped sintético"
        ],

  booking: {

    phone: "+543624556677",
    whatsapp: "5493624556677"
  },
},

// RÍO NEGRO

{
  id: "estadio-nuevo-francisco-urbano",
  name: "Estadio Nuevo Francisco Urbano",
  location: "Centro",
  province: "Río Negro",
  city: "San Carlos de Bariloche",
  zone: "Centro",
  type: "techada",
  //rating: 4.8,
  priceFrom: 9200,
  priceTo: 13600,
  lat: -41.1335,
  lng: -71.3103,
  image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696665/cancha-29_dv4on3.avif", //repeated change later
  images: [
    "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696665/cancha-29_dv4on3.avif",
    "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696665/cancha-30_dv4on3.avif",
    "https://res.cloudinary.com/dolmulmgp/image/upload/v1778696665/cancha-31_dv4on3.avif"
  ],
  description: "Complejo techado premium en Bariloche",
  address: "Centro, Bariloche",
  lastUpdate: "2026-06-18",
  createdAt: "2026-06-18",
  allowedBoots: ["FG", "TF", "IN"],
  availableJerseys: [
    {
        code: "plain",
        name: "Lisas / Sin diseño",
        
        image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
    }
],

  schedule: {
    week: "10:00 - 01:00",
    weekend: "09:00 - 02:00"
  },
  features: [
    "Calefacción",
    "Wifi",
    "Streaming de partidos"
  ],
  
  sizes:[
    "5 vs 5",
    "6 vs 6",
    
    "11 vs 11"

  ],

  buffet: [
    "Pizzas",
    "Picadas",
    "Bebidas"
  ],
  extraInfo: [
    "Ideal para invierno",
    "Excelente césped",
    "Ambiente premium"
  ],

 // Option 9 - Event venue
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 4000,
    cookServiceFee: 15000,

    notes: [
        "Reservá con al menos 24 hs de anticipación.",
        "Incluye parrilla, mesas, iluminación y limpieza del sector.",
        "El servicio de parrillero es opcional."
    ]
},

      surface: [
    "Césped natural", 
     "Césped sintético",
     "Indoor - cancha techada ( Futsal )"
        ],

  booking: {
    phone: "+542944556677",
    whatsapp: "5492944556677"
  },
},

 //VILLA MERCEDES - SAN LUIS

{
    id: "canchas-junin-villa-mercedes",
    name: "Canchas Junin",
    location: "Villa Mercedes",
    province: "San Luis",
    city: "Villa Mercedes",
    zone: "Centro",
    type: "abierta",     
    //rating: 4.5,
    priceFrom: 6500,
    priceTo: 9500,
    lat: -33.68196184083624,
    lng: -65.48708051244887,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg", 
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes-2_eblqjv.jpg",
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes-3_eblqjv.jpg"
    ],
    description: "Complejo de fútbol con canchas de excelente calidad en Villa Mercedes",
    address: "D5730 Villa Mercedes, San Luis",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG"],
    availableJerseys: [
        {
            code: "plain",
            name: "Lisas / Sin diseño",
            image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819389/camiseta-sin-dise%C3%B1o_tmw3hl.jpg"
        },
        {
            code: "boca",
            name: "Boca Juniors",
            image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-boca-juniors_xqkft3.avif"
        },
        {
            code: "river",
            name: "River Plate",
            image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-river-plate_oj5z8q.avif"
        },
        {
            code: "argentina",
            name: "Selección Argentina",
            image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779818793/camiseta-argentina_qxvpzj.png"
        },
        {
            code: "independiente",
            name: "Independiente",
            image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779819913/camiseta-independiente_o8zf94.avif"
        },
        {
            code: "racing",
            name: "Racing",
            image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820366/camiseta-racing-nike_rwgxe5.webp"
        },
        {
            code: "san-lorenzo",
            name: "San Lorenzo",
            image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820508/camiseta-san-lorenzo_ponxpm.webp"
        },
        {
            code: "arsenal",
            name: "Arsenal",
            image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779820879/camiseta-arsenal_veld8g.webp"
        }
    ],
    schedule: {
        week: "09:00 - 23:00",
        weekend: "09:00 - 01:00"
    },
    features: [
        "Vestuarios",
        "Parking",
        "Iluminación",
        "Buffet"
    ],
    sizes: [
        "5 vs 5",
        "7 vs 7"
  
    ],
    buffet: [
        "Bebidas",
        "Cerveza",
        "Pizzas",
        "Hamburguesas"
    ],
    extraInfo: [
        "Buen estado de las canchas",
        "Excelente atención",
        "Ideal para partidos y torneos"
    ],

 // Option 8 - Free barbecue area
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: null,
    cookServiceFee: null,

    notes: [
        "La parrilla puede utilizarse sin costo adicional.",
        "Sujeta a disponibilidad.",
        "Cada grupo debe llevar carbón, utensilios y alimentos."
    ]
},

        surface: [
    "Césped natural"
        ],

    booking: {
        phone: "02657 58-1583",
        whatsapp: "5492657581583"
    },
},

// MISIONES

{
    id: "estadio-nueva-chicago",
    name: "Estadio Nueva Chicago",
    location: "Posadas",
    province: "Misiones",
    city: "Posadas",
    zone: "Centro",
    type: "abierta",
    //rating: 4.6,
    priceFrom: 7000,
    priceTo: 10000,
    lat: -27.362137,
    lng: -55.900874,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg"
    ],
    description: "Complejo de fútbol con canchas de excelente calidad en Posadas.",
    address: "Posadas, Misiones",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG"],
    availableJerseys: [],
    schedule: {
        week: "09:00 - 23:00",
        weekend: "09:00 - 01:00"
    },
    features: [
        "Vestuarios",
        "Parking",
        "Iluminación",
        "Buffet"
    ],
    sizes: [
        "5 vs 5",
        "7 vs 7"
    ],
    buffet: [
        "Bebidas",
        "Hamburguesas"
    ],
    extraInfo: [
        "Excelente atención",
        "Ideal para partidos y torneos"
    ],

 // Option 7 - Full catering service
barbecue: {
    cookType: "venue",

    grillAvailable: false,
    cookServiceAvailable: true,

    grillFee: null,
    cookServiceFee: 25000,

    notes: [
        "El complejo dispone de parrillero profesional.",
        "El uso de la parrilla está reservado exclusivamente al personal.",
        "Incluye utensilios y limpieza.",
        "Reserva mínima de 48 hs."
    ]
},

    surface: [
        "Césped natural"
    ],
    booking: {
        phone: "02657 58-1583",
        whatsapp: "5492657581583"
    },
},

{
    id: "estadio-tres-de-febrero",
    name: "Estadio Tres de Febrero",
    location: "Eldorado",
    province: "Misiones",
    city: "Eldorado",
    zone: "Centro",
    type: "abierta",
    //rating: 4.7,
    priceFrom: 7500,
    priceTo: 10500,
    lat: -26.408400,
    lng: -54.625800,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg"
    ],
    description: "Complejo deportivo con canchas para fútbol amateur en Eldorado.",
    address: "Eldorado, Misiones",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG"],
    availableJerseys: [],
    schedule: {
        week: "09:00 - 23:00",
        weekend: "09:00 - 01:00"
    },
    features: [
        "Vestuarios",
        "Parking",
        "Iluminación"
    ],
    sizes: [
        "5 vs 5",
        "7 vs 7"
    ],
    buffet: [
        "Bebidas",
        "Snacks"
    ],
    extraInfo: [
        "Buen ambiente",
        "Canchas cuidadas"
    ],

// Option 6 - Community club
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: 3000,
    cookServiceFee: null,

    notes: [
        "Los jugadores cocinan por su cuenta.",
        "Incluye parrilla, mesas y bancos.",
        "Se solicita dejar el espacio limpio al finalizar."
    ]
},


    surface: [
        "Césped natural"
    ],
    booking: {
        phone: "02657 58-1583",
        whatsapp: "5492657581583"
    },
},

{
    id: "estadio-fragata-presidente-sarmiento-la-fragata",
    name: "Estadio Fragata Presidente Sarmiento - La Fragata",
    location: "Puerto Iguazú",
    province: "Misiones",
    city: "Puerto Iguazú",
    zone: "Centro",
    type: "abierta",
    //rating: 4.8,
    priceFrom: 8000,
    priceTo: 11000,
    lat: -25.597200,
    lng: -54.573100,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg"
    ],
    description: "Predio de fútbol con instalaciones modernas en Puerto Iguazú.",
    address: "Puerto Iguazú, Misiones",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG"],
    availableJerseys: [],
    schedule: {
        week: "09:00 - 23:00",
        weekend: "09:00 - 01:00"
    },
    features: [
        "Vestuarios",
        "Parking",
        "Iluminación",
        "Buffet"
    ],
    sizes: [
        "5 vs 5",
        "7 vs 7"
    ],
    buffet: [
        "Bebidas",
        "Pizzas",
        "Hamburguesas"
    ],
    extraInfo: [
        "Instalaciones modernas",
        "Ideal para torneos"
    ],

 // Option 5 - Grill included
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: null,
    cookServiceFee: 10000,

    notes: [
        "El uso de la parrilla está incluido con la reserva.",
        "El servicio de parrillero puede contratarse de forma opcional.",
        "Capacidad recomendada: hasta 25 personas."
    ]
},


    surface: [
        "Césped natural"
    ],
    booking: {
        phone: "02657 58-1583",
        whatsapp: "5492657581583"
    },
},

// CHACO

{
    id: "estadio-centenario",
    name: "Estadio Centenario",
    location: "Resistencia",
    province: "Chaco",
    city: "Resistencia",
    zone: "Centro",
    type: "abierta",
    //rating: 4.6,
    priceFrom: 7000,
    priceTo: 10000,
    lat: -27.451600,
    lng: -58.986500,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg"
    ],
    description: "Complejo de fútbol con canchas de excelente calidad en Resistencia.",
    address: "Resistencia, Chaco",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG"],
    availableJerseys: [],
    schedule: {
        week: "09:00 - 23:00",
        weekend: "09:00 - 01:00"
    },
    features: [
        "Vestuarios",
        "Parking",
        "Iluminación",
        "Buffet"
    ],
    sizes: [
        "5 vs 5",
        "7 vs 7"
    ],
    buffet: [
        "Bebidas",
        "Hamburguesas"
    ],
    extraInfo: [
        "Excelente atención",
        "Ideal para partidos y torneos"
    ],

 // Option 4 - Grill rental only
barbecue: {
    cookType: "players",

    grillAvailable: true,
    cookServiceAvailable: false,

    grillFee: 2500,
    cookServiceFee: null,

    notes: [
        "Se alquila únicamente la parrilla.",
        "Los jugadores cocinan por su cuenta.",
        "Cada grupo debe traer carbón, utensilios y alimentos."
    ]
},

    surface: [
        "Césped natural"
    ],
    booking: {
        phone: "02657 58-1583",
        whatsapp: "5492657581583"
    },
},

{
    id: "estadio-unico-de-villa-mercedes-la-pedrera",
    name: "Estadio Único de Villa Mercedes - La Pedrera",
    location: "Presidencia Roque Sáenz Peña",
    province: "Chaco",
    city: "Presidencia Roque Sáenz Peña",
    zone: "Centro",
    type: "abierta",
    //rating: 4.7,
    priceFrom: 7500,
    priceTo: 10500,
    lat: -26.785200,
    lng: -60.438800,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg"
    ],
    description: "Predio deportivo con canchas para fútbol amateur en Sáenz Peña.",
    address: "Presidencia Roque Sáenz Peña, Chaco",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-18",
    allowedBoots: ["FG"],
    availableJerseys: [],
    schedule: {
        week: "09:00 - 23:00",
        weekend: "09:00 - 01:00"
    },
    features: [
        "Vestuarios",
        "Parking",
        "Iluminación"
    ],
    sizes: [
        "5 vs 5",
        "7 vs 7"
    ],
    buffet: [
        "Bebidas",
        "Snacks"
    ],
    extraInfo: [
        "Buen ambiente",
        "Canchas cuidadas"
    ],

 // Option 3 - Premium venue
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 5000,
    cookServiceFee: 18000,

    notes: [
        "Reserva obligatoria con 48 hs de anticipación.",
        "Incluye parrilla, mesas, utensilios y limpieza.",
        "El parrillero puede encargarse de toda la preparación y cocción."
    ]
},

    surface: [
        "Césped natural"
    ],
    booking: {
        phone: "02657 58-1583",
        whatsapp: "5492657581583"
    },
},

{
    id: "estadio-unico-de-villa-mercedes-la-pedrera",
    name: "probando fecha ",
    location: "Presidencia Roque Sáenz Peña",
    province: "Chaco",
    city: "Presidencia Roque Sáenz Peña",
    zone: "Centro",
    type: "abierta",
    //rating: 4.7,
    priceFrom: 7500,
    priceTo: 10500,
    lat: -26.785200,
    lng: -60.438800,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg",
    images: [
        "https://res.cloudinary.com/dolmulmgp/image/upload/v1779903952/cancha-junin-villa-mercedes_jsb8kc.jpg"
    ],
    description: "Predio deportivo con canchas para fútbol amateur en Sáenz Peña.",
    address: "Presidencia Roque Sáenz Peña, Chaco",
    lastUpdate: "2026-06-18",
    createdAt: "2026-06-23",
    allowedBoots: ["FG"],
    availableJerseys: [],
    schedule: {
        week: "09:00 - 23:00",
        weekend: "09:00 - 01:00"
    },
    features: [
        "Vestuarios",
        "Parking",
        "Iluminación"
    ],
    sizes: [
        "5 vs 5",
        "7 vs 7"
    ],
    buffet: [
        "Bebidas",
        "Snacks"
    ],
    extraInfo: [
        "Buen ambiente",
        "Canchas cuidadas"
    ],

 // Option 2 - Sports complex
barbecue: {
    cookType: "both",

    grillAvailable: true,
    cookServiceAvailable: true,

    grillFee: 3500,
    cookServiceFee: 12000,

    notes: [
        "Reserva requerida con 24 hs de anticipación.",
        "Incluye parrilla, mesas y limpieza del sector.",
        "El servicio de parrillero es opcional."
    ]
},

    surface: [
        "Césped natural"
    ],
    booking: {
        phone: "02657 58-1583",
        whatsapp: "5492657581583"
    },
},
];