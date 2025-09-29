import { useContext, useState, useEffect } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Menubar = () => {
  const location = useLocation();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { quantities, token, setToken, setQuantities } = useContext(StoreContext);
  
  const uniqueItemsInCart = Object.values(quantities).filter(
    (qty) => qty > 0
  ).length;
  
  const navigate = useNavigate();

  // Set active menu item based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActive("home");
    else if (path === "/explore") setActive("explore");
    else if (path === "/contact") setActive("contact-us");
    else setActive("");
  }, [location]);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
  };

  return (
    <nav className={`navbar navbar-expand-lg ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="navbar-brand" onClick={() => setActive("home")}>
          <img
            src={assets.logo}
            alt="AgriMart Logo"
            height={40}
            width={110}
          />
        </Link>
        
        <div className="navbar-mobile-actions d-flex d-lg-none align-items-center">
          <Link to="/cart" className="cart-icon-mobile me-3">
            <div className="position-relative">
              <i className="bi bi-cart3"></i>
              {uniqueItemsInCart > 0 && (
                <span className="cart-badge">{uniqueItemsInCart}</span>
              )}
            </div>
          </Link>
          
          <button
            className={`navbar-toggler ${mobileMenuOpen ? 'collapsed' : ''}`}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={active === "home" ? "nav-link active" : "nav-link"}
                to="/"
                onClick={() => {
                  setActive("home");
                  setMobileMenuOpen(false);
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={active === "explore" ? "nav-link active" : "nav-link"}
                to="/explore"
                onClick={() => {
                  setActive("explore");
                  setMobileMenuOpen(false);
                }}
              >
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={active === "contact-us" ? "nav-link active" : "nav-link"}
                to="/contact"
                onClick={() => {
                  setActive("contact-us");
                  setMobileMenuOpen(false);
                }}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          
          <div className="navbar-actions d-none d-lg-flex align-items-center">
            <Link to="/cart" className="cart-icon">
              <div className="position-relative">
                <i className="bi bi-cart3"></i>
                {uniqueItemsInCart > 0 && (
                  <span className="cart-badge">{uniqueItemsInCart}</span>
                )}
              </div>
            </Link>
            
            {!token ? (
              <div className="auth-buttons">
                <button
                  className="btn btn-login"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-register"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="dropdown user-dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={assets.profile}
                    alt="User Profile"
                    className="user-avatar"
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a 
                      className="dropdown-item" 
                      onClick={() => navigate("/myorders")}
                    >
                      <i className="bi bi-box me-2"></i>
                      My Orders
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" onClick={logout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          {/* Mobile menu auth buttons */}
          <div className="mobile-auth d-lg-none mt-3">
            {!token ? (
              <div className="d-grid gap-2">
                <button
                  className="btn btn-login"
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="btn btn-register"
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="list-group">
                <a 
                  className="list-group-item list-group-item-action" 
                  onClick={() => {
                    navigate("/myorders");
                    setMobileMenuOpen(false);
                  }}
                >
                  <i className="bi bi-box me-2"></i>
                  My Orders
                </a>
                <a 
                  className="list-group-item list-group-item-action text-danger" 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
