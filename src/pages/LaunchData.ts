export const REPO_FILES = [
  { name: "pages", type: "folder", children: [
    { name: "index.js", type: "file" },
    { name: "laptops.js", type: "file" }
  ]},
  { name: "components", type: "folder", children: [
    { name: "ProductCard.js", type: "file" },
    { name: "ProductSchema.js", type: "file" }
  ]},
  { name: "data", type: "folder", children: [
    { name: "products.json", type: "file" }
  ]},
  { name: "package.json", type: "file" }
];

export const CHECKPOINTS = [
  {
    id: 1,
    name: "Original Repository",
    time: "2 hours ago",
    description: "Initial state of the repository before Arcana analysis.",
    files: {
      "components/ProductCard.js": {
        original: `export default function ProductCard() {\n  return (\n    <div className="product">\n      <h1>TitanX Gaming Laptop</h1>\n      <p>A fast laptop for gaming.</p>\n      <ul>\n        <li>16GB RAM</li>\n        <li>1TB SSD</li>\n      </ul>\n      <button>Buy Now - $1299</button>\n    </div>\n  );\n}`,
        optimized: `export default function ProductCard() {\n  return (\n    <div className="product">\n      <h1>TitanX Gaming Laptop</h1>\n      <p>A fast laptop for gaming.</p>\n      <ul>\n        <li>16GB RAM</li>\n        <li>1TB SSD</li>\n      </ul>\n      <button>Buy Now - $1299</button>\n    </div>\n  );\n}`
      },
      "pages/laptops.js": {
        original: `export default function Laptops() {\n  return <div>Laptops</div>;\n}`,
        optimized: `export default function Laptops() {\n  return <div>Laptops</div>;\n}`
      }
    }
  },
  {
    id: 2,
    name: "Issues Detected",
    time: "1 hour ago",
    description: "Arcana identified missing schema markup and poor product descriptions.",
    files: {
      "components/ProductCard.js": {
        original: `export default function ProductCard() {\n  return (\n    <div className="product">\n      <h1>TitanX Gaming Laptop</h1>\n      <p>A fast laptop for gaming.</p>\n      <ul>\n        <li>16GB RAM</li>\n        <li>1TB SSD</li>\n      </ul>\n      <button>Buy Now - $1299</button>\n    </div>\n  );\n}`,
        optimized: `export default function ProductCard() {\n  return (\n    <div className="product">\n      <h1>TitanX Gaming Laptop</h1>\n      <p>A fast laptop for gaming.</p>\n      <ul>\n        <li>16GB RAM</li>\n        <li>1TB SSD</li>\n      </ul>\n      <button>Buy Now - $1299</button>\n    </div>\n  );\n}`
      }
    }
  },
  {
    id: 3,
    name: "AI Optimization Generated",
    time: "45 minutes ago",
    description: "Arcana AI created optimized repository code to improve AI discoverability.",
    files: {
      "components/ProductCard.js": {
        original: `export default function ProductCard() {\n  return (\n    <div className="product">\n      <h1>TitanX Gaming Laptop</h1>\n      <p>A fast laptop for gaming.</p>\n      <ul>\n        <li>16GB RAM</li>\n        <li>1TB SSD</li>\n      </ul>\n      <button>Buy Now - $1299</button>\n    </div>\n  );\n}`,
        optimized: `export default function ProductCard() {\n  return (\n    <div className="product" itemScope itemType="https://schema.org/Product">\n      <script type="application/ld+json">\n        {\n          "@context": "https://schema.org/",\n          "@type": "Product",\n          "name": "TitanX Gaming Laptop",\n          "offers": { "@type": "Offer", "price": "1299.00", "priceCurrency": "USD" }\n        }\n      </script>\n      <h1 itemProp="name">TitanX Gaming Laptop</h1>\n      <p itemProp="description">Experience desktop-level performance with the TitanX Gaming Laptop. Featuring the latest RTX 4080 GPU, 16GB DDR5 RAM, and a lightning-fast 1TB NVMe SSD.</p>\n      <ul>\n        <li>16GB RAM</li>\n        <li>1TB SSD</li>\n      </ul>\n      <button>Buy Now - $1299</button>\n      <meta itemProp="price" content="1299.00"/>\n    </div>\n  );\n}`
      }
    }
  },
  {
    id: 4,
    name: "Pull Request Created",
    time: "30 minutes ago",
    description: "A pull request was opened with the optimized code.",
    files: {
      "components/ProductCard.js": {
        original: `export default function ProductCard() {\n  return (\n    <div className="product">\n      <h1>TitanX Gaming Laptop</h1>\n      <p>A fast laptop for gaming.</p>\n      <ul>\n        <li>16GB RAM</li>\n        <li>1TB SSD</li>\n      </ul>\n      <button>Buy Now - $1299</button>\n    </div>\n  );\n}`,
        optimized: `export default function ProductCard() {\n  return (\n    <div className="product" itemScope itemType="https://schema.org/Product">\n      <script type="application/ld+json">\n        {\n          "@context": "https://schema.org/",\n          "@type": "Product",\n          "name": "TitanX Gaming Laptop",\n          "offers": { "@type": "Offer", "price": "1299.00", "priceCurrency": "USD" }\n        }\n      </script>\n      <h1 itemProp="name">TitanX Gaming Laptop</h1>\n      <p itemProp="description">Experience desktop-level performance with the TitanX Gaming Laptop. Featuring the latest RTX 4080 GPU, 16GB DDR5 RAM, and a lightning-fast 1TB NVMe SSD.</p>\n      <ul>\n        <li>16GB RAM</li>\n        <li>1TB SSD</li>\n      </ul>\n      <button>Buy Now - $1299</button>\n      <meta itemProp="price" content="1299.00"/>\n    </div>\n  );\n}`
      }
    }
  },
  {
    id: 5,
    name: "Optimized Code Deployed",
    time: "Just now",
    description: "The optimized code has been merged and deployed to production.",
    files: {
      "components/ProductCard.js": {
        original: `export default function ProductCard() {\n  return (\n    <div className="product" itemScope itemType="https://schema.org/Product">\n      <script type="application/ld+json">\n        {\n          "@context": "https://schema.org/",\n          "@type": "Product",\n          "name": "TitanX Gaming Laptop",\n          "offers": { "@type": "Offer", "price": "1299.00", "priceCurrency": "USD" }\n        }\n      </script>\n      <h1 itemProp="name">TitanX Gaming Laptop</h1>\n      <p itemProp="description">Experience desktop-level performance with the TitanX Gaming Laptop. Featuring the latest RTX 4080 GPU, 16GB DDR5 RAM, and a lightning-fast 1TB NVMe SSD.</p>\n      <ul>\n        <li>16GB RAM</li>\n        <li>1TB SSD</li>\n      </ul>\n      <button>Buy Now - $1299</button>\n      <meta itemProp="price" content="1299.00"/>\n    </div>\n  );\n}`,
        optimized: `export default function ProductCard() {\n  return (\n    <div className="product" itemScope itemType="https://schema.org/Product">\n      <script type="application/ld+json">\n        {\n          "@context": "https://schema.org/",\n          "@type": "Product",\n          "name": "TitanX Gaming Laptop",\n          "offers": { "@type": "Offer", "price": "1299.00", "priceCurrency": "USD" }\n        }\n      </script>\n      <h1 itemProp="name">TitanX Gaming Laptop</h1>\n      <p itemProp="description">Experience desktop-level performance with the TitanX Gaming Laptop. Featuring the latest RTX 4080 GPU, 16GB DDR5 RAM, and a lightning-fast 1TB NVMe SSD.</p>\n      <ul>\n        <li>16GB RAM</li>\n        <li>1TB SSD</li>\n      </ul>\n      <button>Buy Now - $1299</button>\n      <meta itemProp="price" content="1299.00"/>\n    </div>\n  );\n}`
      }
    }
  }
];
