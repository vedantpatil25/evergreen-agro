/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const ProductItem = ({ name, description, id, imageUrl, price }) => {
  const { increaseQty, decreaseQty, quantities } = useContext(StoreContext)

  const [imgHeight, setImgHeight] = useState(240)

  useEffect(() => {
    const handleResize = () => {
      setImgHeight(window.innerWidth < 576 ? 150 : 240)
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3 mt-3 mb-4 d-flex justify-content-center justify-content-sm-between">
      <div
        className="card"
        style={{ maxWidth: '320px', width: '250px', borderRadius: '20px' }}
      >
        <Link to={`/product/${id}`}>
          <img
            src={imageUrl}
            className="card-img-top product-img"
            alt="Product Image"
            width={60}
            style={{
              padding: '5px',
              height: `${imgHeight}px`,
              borderRadius: '20px',
            }}
          />
        </Link>
        <div className="card-body">
          <h6 className="card-title">{name}</h6>
          <p className="card-text" style={{ fontSize: '15px' }}>
            {description.length > 25
              ? `${description.substring(0, 25)}...`
              : description}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0">&#8377;{price}</span>
          </div>
        </div>
        <div
          className="card-footer d-flex justify-content-between bg-light"
          style={{
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
          }}
        >
          <Link className="btn btn-success btn-sm" to={`/product/${id}`} style={{ borderRadius: '10px', width: '100%', marginRight: '5%'}}>
            View Product
          </Link>
          {quantities[id] > 0 ? (
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => decreaseQty(id)}
              >
                <i className="bi bi-dash-circle"></i>
              </button>
              <span className="fw-bold">{quantities[id]}</span>
              <button
                className="btn btn-success btn-sm"
                onClick={() => increaseQty(id)}
              >
                <i className="bi bi-plus-circle"></i>
              </button>
            </div>
          ) : (
            <button
              className="btn btn-success btn-sm"
              style={{ borderRadius: '10px'}}
              onClick={() => increaseQty(id)}
            >
              <i className="bi bi-plus-circle"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductItem
