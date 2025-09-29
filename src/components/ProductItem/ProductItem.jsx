/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import './ProductItem.css'

const ProductItem = ({ name, description, id, imageUrl, price, category }) => {
  const { increaseQty, decreaseQty, quantities } = useContext(StoreContext)
  const [imgHeight, setImgHeight] = useState(240)
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setImgHeight(150)
      } else if (window.innerWidth < 768) {
        setImgHeight(180)
      } else {
        setImgHeight(220)
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div 
        className={`product-card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {category && (
          <div className="product-badge">{category}</div>
        )}
        
        <Link to={`/product/${id}`} className="product-image-container">
          {!imageLoaded && (
            <div className="image-placeholder">
              <div className="spinner-border text-success spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <img
            src={imageUrl}
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            alt={name}
            style={{ height: `${imgHeight}px` }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)} // Handle error case too
          />
          <div className="quick-view-overlay">
            <span className="quick-view-text">Quick View</span>
          </div>
        </Link>
        
        <div className="product-info">
          <h5 className="product-title">{name}</h5>
          <div className="product-price">₹{parseFloat(price).toFixed(2)}</div>
          <p className="product-description">
            {description.length > 60
              ? `${description.substring(0, 60)}...`
              : description}
          </p>
        </div>
        
        <div className="product-actions">
          <Link 
            className="btn-view-product" 
            to={`/product/${id}`}
          >
            View Details
          </Link>
          
          {quantities[id] > 0 ? (
            <div className="quantity-control">
              <button
                className="btn-quantity decrease"
                onClick={() => decreaseQty(id)}
                aria-label="Decrease quantity"
              >
                <i className="bi bi-dash"></i>
              </button>
              <span className="quantity-display">{quantities[id]}</span>
              <button
                className="btn-quantity increase"
                onClick={() => increaseQty(id)}
                aria-label="Increase quantity"
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          ) : (
            <button
              className="btn-add-to-cart"
              onClick={() => increaseQty(id)}
              aria-label="Add to cart"
            >
              <i className="bi bi-cart-plus me-2"></i>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductItem
