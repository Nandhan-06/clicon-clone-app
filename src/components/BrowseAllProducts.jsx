import React, { useMemo } from "react";
import "./BrowseAllProducts.css";

function groupByCategory(products) {
  return products.reduce((groups, p) => {
    const cat = p.category || "other";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(p);
    return groups;
  }, {});
}

export default function BrowseAllProducts({ products }) {
  const grouped = useMemo(() => groupByCategory(products), [products]);

  if (!products || products.length === 0) {
    return <div className="no-products">No products available.</div>;
  }

  return (
    <section className="browse-all">
      {Object.keys(grouped).map((category) => (
        <div key={category} className="category-block">
          <h2 className="cat-title">
            {category.replace("-", " ").toUpperCase()}
          </h2>

          <div className="cat-grid">
            {grouped[category].map((item) => (
              <article key={item.id} className="product-card">
                <div className="img-wrap">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;utf8," +
                        encodeURIComponent(
                          `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'>
                            <rect width='100%' height='100%' fill='#eee'/>
                            <text x='50%' y='50%' dominant-baseline='middle'
                             text-anchor='middle' fill='#999'>
                              No Image
                            </text>
                           </svg>`
                        );
                    }}
                  />
                </div>

                <div className="info">
                  <h3 className="title">{item.title}</h3>
                  <div className="meta">
                    <span className="price">₹{item.price}</span>
                    <span className="rating">★ {item.rating?.toFixed(1)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
