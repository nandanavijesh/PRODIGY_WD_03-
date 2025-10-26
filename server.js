const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- 📦 Simple Product Data (Mock Database with .jpeg paths) ---
const products = [
    {
        id: 1,
        name: "Artisan Coffee Mug",
        price: 100.00,
        description: "Hand-thrown ceramic mug perfect for your morning brew. High-quality and locally sourced.",
        image: "/images/mug.jpeg",
        category: "Kitchenware"
    },
    {
        id: 2,
        name: "Local Honey (Jar)",
        price: 150.00,
        description: "Raw, unfiltered honey sourced from local bee farms. Great natural sweetener.",
        image: "/images/honey.jpeg",
        category: "Pantry"
    },
    {
        id: 3,
        name: "Handmade Soap Bar",
        price: 80.00,
        description: "Gentle on sensitive skin.",
        image: "/images/soap.jpeg",
        category: "Bath & Body"
    },
    {
        id: 4,
        name: "Hand-knitted Scarf",
        price: 150.00,
        description: "Warm, soft woolen scarf, knitted by local artisans. Perfect winter wear.",
        image: "/images/scarf.jpeg",
        category: "Apparel"
    },
    {
        id: 5,
        name: "Olive Oil",
        price: 300.00,
        description: "Pure Olive oil for good Health. Local harvest.",
        image: "/images/oil.jpeg",
        category: "Bath & Body"
    },
    {
        id:6,
        name:"Liquid Detergent",
        price: 200.00,
        description:"Makes Cloths Fresh and Fragrant",
        image:"/images/detergent.jpeg",
        category:"Washing"
    },
    {
        id:7,
        name:"Body Perfume",
        price: 250.00,
        description:"Unisex Body Perfume",
        image:"/images/perfume.jpeg",
        category:"Bath and Body"

    },
    {
        id:8,
        name:"Wallet",
        price:300.00,
        description:"Classic Leather Wallet",
        image:"/images/wallet.jpeg",
        category:"Apparel"
    }

];

// API Endpoint to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});