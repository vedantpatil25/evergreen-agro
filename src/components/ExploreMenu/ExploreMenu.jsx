import { useRef, useState, useEffect } from "react";
import { categories } from "../../assets/assets";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  
  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (!menuRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = menuRef.current;
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };
  
  useEffect(() => {
    const menuElement = menuRef.current;
    if (menuElement) {
      menuElement.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      
      // Check on window resize
      window.addEventListener('resize', checkScroll);
      
      return () => {
        menuElement.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  return (
    <div className="explore-menu-container">
      <div className="container">
        <div className="explore-menu-header">
          <div className="title-section">
            <h2 className="explore-title">Explore Products</h2>
            <p className="explore-subtitle">Grow better with the right agricultural products for your needs.</p>
          </div>
          <div className="scroll-controls">
            <button 
              className={`scroll-button left ${!showLeftArrow ? 'disabled' : ''}`}
              onClick={scrollLeft}
              disabled={!showLeftArrow}
              aria-label="Scroll left"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button 
              className={`scroll-button right ${!showRightArrow ? 'disabled' : ''}`}
              onClick={scrollRight}
              disabled={!showRightArrow}
              aria-label="Scroll right"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        
        <div className="category-scroll-container">
          <div className="category-list" ref={menuRef}>
            <div 
              className={`category-item ${category === 'All' ? 'active' : ''}`}
              onClick={() => setCategory('All')}
            >
              <div className="category-icon-wrapper">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2276/2276931.png" 
                  alt="All Products"
                  className="category-icon"
                />
              </div>
              <p className="category-name">All Products</p>
            </div>
            
            {categories.map((item, index) => (
              <div 
                key={index}
                className={`category-item ${item.category === category ? 'active' : ''}`}
                onClick={() => setCategory(item.category)}
              >
                <div className="category-icon-wrapper">
                  <img 
                    src={item.icon} 
                    alt={item.category}
                    className="category-icon"
                  />
                  {item.category === category && (
                    <div className="active-indicator"></div>
                  )}
                </div>
                <p className="category-name">{item.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;
