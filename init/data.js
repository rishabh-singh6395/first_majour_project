const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Mountain Retreat",
    description:
      "Peaceful mountain cabin surrounded by nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Luxury Villa in Tuscany",
    description:
      "Beautiful villa with amazing views and comfort.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Relax near the beach with a beautiful private stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "A peaceful cabin perfect for nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Luxury Penthouse",
    description:
      "Enjoy luxury living with city views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Beach House in Bali",
    description:
      "Beautiful beach house with amazing ocean view.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?w=800",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Mountain Cabin in Canada",
    description:
      "Enjoy breathtaking mountain views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?w=800",
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
  },
  {
    title: "Modern Apartment Tokyo",
    description:
      "Explore Tokyo from this modern apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
  },
{
title:"Luxury Beach Villa",
description:"Beautiful villa near ocean with premium facilities.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"},
price:2500,
location:"Goa",
country:"India"
},

{
title:"Modern City Apartment",
description:"Stylish apartment located in the city center.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"},
price:1800,
location:"Mumbai",
country:"India"
},

{
title:"Mountain Cabin",
description:"Peaceful cabin surrounded by mountains.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800"},
price:1200,
location:"Manali",
country:"India"
},

{
title:"Ocean View Cottage",
description:"Relaxing cottage with beautiful ocean view.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"},
price:3000,
location:"Maldives",
country:"Maldives"
},

{
title:"Royal Palace Stay",
description:"Luxury stay with royal interiors.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"},
price:5000,
location:"Dubai",
country:"UAE"
},

{
title:"Forest Tree House",
description:"Unique tree house surrounded by nature.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800"},
price:1500,
location:"Kerala",
country:"India"
},

{
title:"Luxury Penthouse",
description:"Premium penthouse with city skyline.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800"},
price:7000,
location:"New York",
country:"USA"
},

{
title:"Lakeside House",
description:"Beautiful house beside a calm lake.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"},
price:2200,
location:"Canada",
country:"Canada"
},

{
title:"Beach Paradise",
description:"Stay close to the beach with comfort.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800"},
price:3500,
location:"Bali",
country:"Indonesia"
},

{
title:"Traditional Villa",
description:"Traditional villa with modern design.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800"},
price:2800,
location:"Italy",
country:"Italy"
},

{
title:"Snow Mountain Resort",
description:"Amazing winter resort near snowy mountains.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"},
price:4000,
location:"Switzerland",
country:"Switzerland"
},

{
title:"Desert Luxury Camp",
description:"Luxury camping experience in desert.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800"},
price:3200,
location:"Dubai",
country:"UAE"
},

{
title:"Modern Farm House",
description:"Beautiful farmhouse with peaceful surroundings.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"},
price:2100,
location:"Punjab",
country:"India"
},

{
title:"City Loft",
description:"Comfortable loft for city travelers.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800"},
price:1700,
location:"London",
country:"UK"
},

{
title:"Island Resort",
description:"Private island stay with luxury rooms.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1602391833977-358a52198938?w=800"},
price:9000,
location:"Fiji",
country:"Fiji"
},

{
title:"Countryside Cottage",
description:"Cute cottage in countryside.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800"},
price:1300,
location:"England",
country:"UK"
},

{
title:"Modern Villa",
description:"Luxury villa with swimming pool.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"},
price:6000,
location:"Spain",
country:"Spain"
},

{
title:"Lake Resort",
description:"Peaceful resort near lake.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800"},
price:2400,
location:"Finland",
country:"Finland"
},

{
title:"Beach Bungalow",
description:"Small bungalow near beach.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"},
price:1900,
location:"Thailand",
country:"Thailand"
},

{
title:"Luxury Apartment",
description:"Premium apartment with modern furniture.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1617104678098-de229db51175?w=800"},
price:2600,
location:"Paris",
country:"France"
},

{
title:"Mountain Resort",
description:"Beautiful mountain resort stay.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"},
price:3300,
location:"Nepal",
country:"Nepal"
},

{
title:"Forest Retreat",
description:"Escape into peaceful forest.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800"},
price:1400,
location:"Amazon",
country:"Brazil"
},

{
title:"City Hotel Room",
description:"Comfortable room in city.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"},
price:1600,
location:"Singapore",
country:"Singapore"
},

{
title:"Private Villa",
description:"Private luxury villa stay.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800"},
price:5500,
location:"Greece",
country:"Greece"
},

{
title:"Cozy Home",
description:"Beautiful cozy home for vacation.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800"},
price:2000,
location:"California",
country:"USA"
}
];

module.exports = { data: sampleListings };