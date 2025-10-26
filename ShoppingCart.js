// frontend/src/components/ShoppingCart.js

import React from 'react';

function ShoppingCart({ cart, setCart }) {

  // Function to remove an item completely
  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Function to update quantity
  const updateQuantity = (id, delta) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          if (newQuantity <= 0) {
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item !== null);
      
      return updatedCart;
    });
  };

  // Calculate Totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxRate = 0.10;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return <h1 className="status-message">Your Shopping Cart is Empty.</h1>;
  }

  return (
    <div className="shopping-cart-page">
      <h1 className="page-title">Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item-card">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                {/* Currency Change: $ to ₹ */}
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price.toFixed(2)}</p>
                
                <div className="quantity-controls">
                  {/* NOTE: The minus button here will remove the item if count hits 0 */}
                  <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn">-</button>
                  <span className="qty-display">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn">+</button>
                  <button onClick={() => removeItem(item.id)} className="remove-btn">Remove</button>
                </div>
              </div>
              {/* Item Subtotal: Rupee (₹) and NO ** */}
              <p className="item-subtotal">₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        
        {/* Order Summary/Checkout Box (Amazon-style) */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
          <div className="summary-line">
            <span>Tax (10%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="summary-line total-line">
            <span>Order Total:</span>
            {/* Order Total: Rupee (₹) and NO ** */}
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;