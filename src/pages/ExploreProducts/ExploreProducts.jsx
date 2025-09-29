import { useState, useEffect } from 'react'
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'
import './ExploreProducts.css'

const ExploreProducts = () => {
  const [category, setCategory] = useState('All')
  const [searchText, setSearchText] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches')
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches).slice(0, 5))
    }
  }, [])

  // Save search to recent searches
  const saveSearch = (text) => {
    if (!text.trim()) return
    
    const updatedSearches = [
      text,
      ...recentSearches.filter(item => item !== text)
    ].slice(0, 5)
    
    setRecentSearches(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    saveSearch(searchText)
  }

  const applyRecentSearch = (text) => {
    setSearchText(text)
    saveSearch(text)
  }

  const clearSearch = () => {
    setSearchText('')
  }

  return (
    <div className="explore-products-container">
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-md-8">
            <h2 className="explore-title">Explore Products</h2>
            <p className="text-muted">Find the perfect agricultural products for your needs</p>
          </div>
        </div>
        
        <div className="search-section mb-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form onSubmit={handleSearch} className="search-form">
                <div className="category-filter">
                  <label htmlFor="category-select" className="filter-label">Category</label>
                  <select
                    id="category-select"
                    className="form-select"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="All">All Products</option>
                    <option value="Seed">Seeds</option>
                    <option value="Pesticide">Pesticides</option>
                    <option value="Fertilizer">Fertilizers</option>
                    <option value="Other">Other Products</option>
                  </select>
                </div>
                
                <div className="search-input-container">
                  <div className="position-relative flex-grow-1">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="bi bi-search text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 ps-0"
                        placeholder="Search products by name..."
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                      />
                      {searchText && (
                        <button 
                          type="button" 
                          className="btn btn-link position-absolute end-0 top-0 bottom-0 text-muted"
                          onClick={clearSearch}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      )}
                    </div>
                    
                    {isSearchFocused && recentSearches.length > 0 && (
                      <div className="recent-searches">
                        <div className="recent-searches-header">
                          <small className="text-muted">Recent Searches</small>
                        </div>
                        <div className="recent-searches-list">
                          {recentSearches.map((text, index) => (
                            <button 
                              key={index} 
                              className="recent-search-item"
                              onClick={() => applyRecentSearch(text)}
                              type="button"
                            >
                              <i className="bi bi-clock-history me-2 text-muted"></i>
                              {text}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button className="btn btn-success search-button" type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="active-filters">
          {category !== 'All' && (
            <div className="filter-badge">
              Category: {category}
              <button 
                className="filter-remove" 
                onClick={() => setCategory('All')}
                aria-label="Remove category filter"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          )}
          
          {searchText && (
            <div className="filter-badge">
              Search: {searchText}
              <button 
                className="filter-remove" 
                onClick={clearSearch}
                aria-label="Remove search filter"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          )}
        </div>
        
        <ProductDisplay category={category} searchText={searchText} />
      </div>
    </div>
  )
}

export default ExploreProducts
