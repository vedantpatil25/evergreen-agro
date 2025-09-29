import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer mt-auto py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-success">Evergreen Agro Service</h5>
            <p className="text-muted">
              Your trusted source for quality agricultural products. Supporting
              farmers with the best seeds, fertilizers, and pesticides.
            </p>
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          <div className="col-md-2 mb-4 mb-md-0">
            <h6 className="text-success">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="footer-link">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="footer-link">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="footer-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="footer-link">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4 mb-md-0">
            <h6 className="text-success">Product Categories</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/explore?category=Seed" className="footer-link">
                  Seeds
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Fertilizer" className="footer-link">
                  Fertilizers
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Pesticide" className="footer-link">
                  Pesticides
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Other" className="footer-link">
                  Other Products
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="text-success">Contact Us</h6>
            <address className="text-muted">
              <p>
                <i className="bi bi-geo-alt me-2"></i> Jalgone Road, Pansemal
              </p>
              <p>
                <i className="bi bi-telephone me-2"></i> +91 9424056126
              </p>
              <p>
                <i className="bi bi-envelope me-2"></i>{' '}
                <span className="small-email">
                  evergreenagropansemal@gmail.com
                </span>
              </p>
            </address>
          </div>
        </div>

        <hr className="my-3" />

        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="small text-muted mb-0">
              &copy; {currentYear} Evergreen Agro Service. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link to="/terms" className="small text-muted">
                  Terms of Use
                </Link>
              </li>
              <li className="list-inline-item">
                <span className="text-muted mx-1">|</span>
              </li>
              <li className="list-inline-item">
                <Link to="/privacy" className="small text-muted">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
