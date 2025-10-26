// frontend/src/components/ProductList.js

import React, { useState, useEffect, useMemo } from 'react';

function ProductList({ addToCart, cart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('');

  // Fetch products from the backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Could not connect to server. Is the backend running on port 5000?");
        setLoading(false);
      });
  }, []);

  // Filter and Sort Logic (Memoized for performance)
  const filteredAndSortedProducts = useMemo(() => {
    let tempProducts = [...products];

    // 1. Filter by Search Term
    if (searchTerm) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Sort
    if (sortMethod === 'price-low') {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortMethod === 'price-high') {
      tempProducts.sort((a, b) => b.price - a.price);
    }

    return tempProducts;
  }, [products, searchTerm, sortMethod]);

  if (loading) return <h1 className="status-message">Loading Products...</h1>;
  if (error) return <h1 className="status-message error-message">Error loading data: {error}</h1>;

  return (
    <div className="product-page">
      <div className="controls-bar">
        {/* Search Bar (Amazon-style) */}
        <input
          type="text"
          placeholder="Search product names or descriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Sort Dropdown */}
        <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value)} className="sort-select">
          <option value="">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Title Change */}
      <h1 className="page-title">LOCAL E COMMERCE</h1>
      
      {filteredAndSortedProducts.length === 0 && <p>No products found matching your search.</p>}

      <div className="product-grid">
        {filteredAndSortedProducts.map(product => {
            // Check if product is in cart and get quantity
            const cartItem = cart.find(item => item.id === product.id);
            const quantityInCart = cartItem ? cartItem.quantity : 0;

            return (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-details">
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-category">Category: {product.category}</p>
                        <p className="product-description">{product.description.substring(0, 80)}...</p>
                        
                        {/* Final Price Display: Rupee (₹) and NO ** */}
                        <p className="product-price">₹{product.price.toFixed(2)}</p>
                        
                        {/* Display quantity and Add Another button if item is in cart */}
                        {quantityInCart > 0 ? (
                            <div className="product-quantity-controls">
                                <span className="qty-display-small">{quantityInCart} Added</span>
                                <button 
                                  onClick={() => addToCart(product)}
                                  className="add-to-cart-btn-small"
                                >
                                  + Add Another
                                </button>
                            </div>
                        ) : (
                            // Otherwise, display the standard Add to Cart button
                            <button 
                                onClick={() => addToCart(product)}
                                className="add-to-cart-btn"
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
}

export default ProductList;