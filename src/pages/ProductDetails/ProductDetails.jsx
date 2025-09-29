import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { fetchProductDetails } from '../../service/productService'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'
import './ProductDetails.css'

const ProductDetails = () => {
  const { id } = useParams()
  const { increaseQty, quantities } = useContext(StoreContext)
  const navigate = useNavigate()

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Check if product is already in cart
  const isInCart = data.id && quantities[data.id] > 0

  useEffect(() => {
    const loadProductDetails = async () => {
      setLoading(true)
      try {
        const productData = await fetchProductDetails(id)
        setData(productData)
        // If product is in cart, set initial quantity to match cart
        if (productData.id && quantities[productData.id] > 0) {
          setQuantity(quantities[productData.id])
        }
      } catch (error) {
        toast.error('Error displaying the product details.')
      } finally {
        setLoading(false)
      }
    }
    loadProductDetails()
  }, [id, quantities])

  const addToCart = () => {
    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      increaseQty(data.id)
    }
    toast.success(`${data.name} added to cart!`)
    navigate('/cart')
  }
  
  const handleBuyNow = () => {
    // Add to cart and go directly to checkout
    for (let i = 0; i < quantity; i++) {
      increaseQty(data.id)
    }
    navigate('/order')
  }
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  return (
    <div className="product-details-container">
      <div className="container py-5">
        <div className="breadcrumb-nav mb-4">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <i className="bi bi-chevron-right"></i>
          <Link to="/explore" className="breadcrumb-link">Products</Link>
          <i className="bi bi-chevron-right"></i>
          <span className="breadcrumb-current">{data.name || 'Product Details'}</span>
        </div>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading product details...</p>
          </div>
        ) : (
          <div className="product-details-card">
            <div className="row g-0">
              <div className="col-md-6 product-image-section">
                <div className="product-image-container">
                  {!imageLoaded && (
                    <div className="image-placeholder">
                      <div className="spinner-border text-success spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  <img
                    className={`product-image ${imageLoaded ? 'loaded' : ''}`}
                    src={data.imageUrl}
                    alt={data.name}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                  />
                </div>
                
                {data.category && (
                  <div className="product-category-badge">
                    <i className="bi bi-tag-fill me-1"></i>
                    {data.category}
                  </div>
                )}
              </div>
              
              <div className="col-md-6 product-info-section">
                <div className="product-info-content">
                  <h1 className="product-title">{data.name}</h1>
                  
                  <div className="product-price">
                    <span className="price-symbol">₹</span>
                    <span className="price-value">{parseFloat(data.price).toFixed(2)}</span>
                  </div>
                  
                  <div className="product-description">
                    <h5>Description</h5>
                    <p>{data.description}</p>
                  </div>
                  
                  <div className="product-meta">
                    <div className="meta-item">
                      <span className="meta-label">Category:</span>
                      <span className="meta-value">{data.category}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Product ID:</span>
                      <span className="meta-value">{data.id}</span>
                    </div>
                    {data.stock && (
                      <div className="meta-item">
                        <span className="meta-label">Availability:</span>
                        <span className="meta-value in-stock">
                          <i className="bi bi-check-circle-fill me-1"></i>
                          In Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="quantity-selector">
                    <h5>Quantity</h5>
                    <div className="quantity-control">
                      <button 
                        className="btn-quantity decrease" 
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="quantity-display">{quantity}</span>
                      <button 
                        className="btn-quantity increase" 
                        onClick={increaseQuantity}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="product-actions">
                    <button
                      className="btn btn-add-to-cart"
                      type="button"
                      onClick={addToCart}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      {isInCart ? 'Update Cart' : 'Add to Cart'}
                    </button>
                    <button
                      className="btn btn-buy-now"
                      type="button"
                      onClick={handleBuyNow}
                    >
                      <i className="bi bi-lightning-fill me-2"></i>
                      Buy Now
                    </button>
                  </div>
                  
                  <div className="product-features">
                    <div className="feature-item">
                      <i className="bi bi-truck"></i>
                      <span>Free shipping on orders over ₹500</span>
                    </div>
                    <div className="feature-item">
                      <i className="bi bi-shield-check"></i>
                      <span>Quality guaranteed products</span>
                    </div>
                    <div className="feature-item">
                      <i className="bi bi-arrow-return-left"></i>
                      <span>Easy returns within 7 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
