import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <div className="header-banner">
      <div className="header-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10">
            <div className="header-content">
              <h1 className="header-title">Seeds, Sprays & More – Just a Click Away</h1>
              <p className="header-subtitle">
                Your Trusted One-Stop Shop for Seeds, Pesticides & Fertilizers!
              </p>
              <Link
                to="/explore"
                className="btn btn-success text-success fw-bold"
                style={{
                  minWidth: '150px',
                  width: '20%',
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                }}
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
