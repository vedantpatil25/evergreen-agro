import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <div className="p-5 mb-4 bg-light rounded-3 mt-1 header">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">
          Seeds, Sprays & More – Just a Click Away
        </h1>
        <p className="col-md-8 fs-4">
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
  )
}

export default Header
