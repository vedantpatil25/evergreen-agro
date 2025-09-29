import { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Cart.css'
import { Link, useNavigate } from 'react-router-dom'
import { calculateCartTotals } from '../../util/cartUtils'

const Cart = () => {
  const navigate = useNavigate()
  const {
    productList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
  } = useContext(StoreContext)
  
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  
  // Cart items
  const cartItems = productList.filter((product) => quantities[product.id] > 0)

  // Calculations
  const { subtotal, shipping, total } = calculateCartTotals(
    cartItems,
    quantities,
  )
  
  const handleCouponSubmit = (e) => {
    e.preventDefault()
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }
    // This would normally validate with backend
    setCouponError('Invalid or expired coupon code')
  }
  
  const handleRemoveItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(productId)
    }
  }

  return (
    <div className="cart-container">
      <div className="container py-4">
        <div className="cart-header">
          <h1 className="cart-title">Your Shopping Cart</h1>
          <p className="text-muted cart-subtitle">
            {cartItems.length === 0 
              ? 'Your cart is empty' 
              : `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`}
          </p>
        </div>
        
        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">
                  <i className="bi bi-cart-x"></i>
                </div>
                <h3>Your cart is empty</h3>
                <p className="text-muted">Looks like you haven't added any products to your cart yet.</p>
                <Link to="/" className="btn btn-success btn-lg mt-3">
                  <i className="bi bi-shop me-2"></i>Start Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-items-container">
                  <div className="cart-items-header d-none d-md-flex">
                    <div className="row w-100 align-items-center">
                      <div className="col-md-6">
                        <span className="cart-header-text">Product</span>
                      </div>
                      <div className="col-md-2 text-center">
                        <span className="cart-header-text">Price</span>
                      </div>
                      <div className="col-md-2 text-center">
                        <span className="cart-header-text">Quantity</span>
                      </div>
                      <div className="col-md-2 text-end">
                        <span className="cart-header-text">Total</span>
                      </div>
                    </div>
                  </div>
                  
                  {cartItems.map((product) => (
                    <div key={product.id} className="cart-item">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <div className="d-flex align-items-center">
                            <div className="cart-item-image">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="img-fluid rounded"
                              />
                            </div>
                            <div className="cart-item-details">
                              <h5 className="cart-item-title">{product.name}</h5>
                              <p className="cart-item-category">
                                <span className="badge bg-light text-dark">{product.category}</span>
                              </p>
                              <div className="d-md-none cart-item-price-mobile">
                                <span>₹{parseFloat(product.price).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-md-2 text-center d-none d-md-block">
                          <div className="cart-item-price">
                            ₹{parseFloat(product.price).toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="col-md-2">
                          <div className="cart-quantity-control">
                            <button
                              className="btn-quantity decrease"
                              onClick={() => decreaseQty(product.id)}
                              aria-label="Decrease quantity"
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <span className="quantity-display">{quantities[product.id]}</span>
                            <button
                              className="btn-quantity increase"
                              onClick={() => increaseQty(product.id)}
                              aria-label="Increase quantity"
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                        
                        <div className="col-md-2 text-end">
                          <div className="cart-item-total">
                            ₹{(product.price * quantities[product.id]).toFixed(2)}
                          </div>
                          <button
                            className="btn-remove"
                            onClick={() => handleRemoveItem(product.id)}
                            aria-label="Remove item"
                          >
                            <i className="bi bi-trash"></i>
                            <span className="remove-text">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="cart-actions">
                  <Link to="/" className="btn btn-outline-success">
                    <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                  </Link>
                  <button 
                    className="btn btn-outline-danger ms-2"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to clear your cart?')) {
                        cartItems.forEach(item => removeFromCart(item.id))
                      }
                    }}
                  >
                    <i className="bi bi-cart-x me-2"></i>Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
          
          <div className="col-lg-4">
            <div className="order-summary">
              <h5 className="summary-title">Order Summary</h5>
              
              <div className="summary-items">
                <div className="summary-item">
                  <span className="summary-item-label">Subtotal</span>
                  <span className="summary-item-value">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-item-label">Shipping</span>
                  <span className="summary-item-value">
                    {subtotal === 0 ? 'N/A' : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>
              
              <div className="coupon-section">
                <form onSubmit={handleCouponSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      className={`form-control ${couponError ? 'is-invalid' : ''}`}
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value)
                        if (couponError) setCouponError('')
                      }}
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <div className="invalid-feedback d-block">{couponError}</div>
                  )}
                </form>
              </div>
              
              <div className="summary-total">
                <span className="total-label">Total</span>
                <span className="total-value">
                  ₹{subtotal === 0 ? '0.00' : total.toFixed(2)}
                </span>
              </div>
              
              <button
                className="btn btn-success btn-checkout"
                disabled={cartItems.length === 0}
                onClick={() => navigate('/order')}
              >
                <i className="bi bi-credit-card me-2"></i>
                Proceed to Checkout
              </button>
              
              <div className="payment-methods">
                <div className="payment-methods-title">We Accept</div>
                <div className="payment-icons">
                  <i className="bi bi-credit-card payment-icon" title="Credit Card"></i>
                  <i className="bi bi-wallet2 payment-icon" title="Digital Wallet"></i>
                  <i className="bi bi-bank payment-icon" title="Bank Transfer"></i>
                  <i className="bi bi-cash-stack payment-icon" title="Cash on Delivery"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
