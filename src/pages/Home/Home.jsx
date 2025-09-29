import { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'
import Footer from '../../components/Footer/Footer'
import './Home.css'

const Home = () => {
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="loading-text">Loading Evergreen...</p>
        </div>
      ) : (
        <>
          <Header />
          
          <div className="hero-section">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <h1 className="hero-title">Quality Agricultural Products for Your Farm</h1>
                  <p className="hero-subtitle">
                    Find the best seeds, fertilizers, pesticides and more to maximize your crop yield
                  </p>
                  <div className="hero-buttons">
                    <a href="#products" className="btn btn-success btn-lg">
                      <i className="bi bi-search me-2"></i>
                      Explore Products
                    </a>
                    <a href="/contact" className="btn btn-outline-success btn-lg ms-3">
                      <i className="bi bi-headset me-2"></i>
                      Contact Us
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 d-none d-lg-block">
                  <img 
                    src="https://cbeditz.com/public/cbeditz/preview/agriculture-white-blue-powerpoint-background-13-11614416088ugsqiiijot.jpg" 
                    alt="Farmer with crops" 
                    className="hero-image img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="features-section">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="bi bi-truck"></i>
                    </div>
                    <h3 className="feature-title">Fast Delivery</h3>
                    <p className="feature-text">Quick delivery to your doorstep within 24-48 hours</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="bi bi-shield-check"></i>
                    </div>
                    <h3 className="feature-title">Quality Products</h3>
                    <p className="feature-text">All products are tested and certified for quality</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="bi bi-headset"></i>
                    </div>
                    <h3 className="feature-title">Expert Support</h3>
                    <p className="feature-text">Get advice from agricultural experts for your farm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div id="products" className="products-section">
            <ExploreMenu category={category} setCategory={setCategory} />
            <div className="container">
              <ProductDisplay category={category} searchText={''} />
            </div>
          </div>
          
          <div className="cta-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                  <h2 className="cta-title">Ready to Boost Your Farm's Productivity?</h2>
                <p className="cta-text">
                    Join thousands of farmers who trust our products for their agricultural needs
                  </p>
                  <a href="/register" className="btn btn-light btn-lg">
                    <i className="bi bi-person-plus me-2"></i>
                    Create an Account
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          
          {showScrollTop && (
            <button 
              className="scroll-to-top" 
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <i className="bi bi-arrow-up"></i>
            </button>
          )}
        </>
      )}
    </>
  )
}

export default Home
