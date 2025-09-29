import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import './MyOrders.css'
import { fetchUserOrders } from '../../service/orderService'
import { format } from 'date-fns' // You'll need to install this package

const MyOrders = () => {
  const { token } = useContext(StoreContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await fetchUserOrders(token)
      setData(response)
      setError(null)
    } catch (err) {
      setError('Failed to load orders. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-success'
      case 'shipped':
        return 'text-primary'
      case 'processing':
        return 'text-warning'
      case 'cancelled':
        return 'text-danger'
      default:
        return 'text-secondary'
    }
  }

  // Helper function to format date (assuming your order objects have a date field)
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      return format(new Date(dateString), 'MMM dd, yyyy')
    } catch (e) {
      return 'N/A'
    }
  }

  return (
    <div className="my-orders-container">
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col">
            <h2 className="orders-title">My Orders</h2>
            <p className="text-muted">Track and manage your orders</p>
          </div>
          <div className="col-auto d-flex align-items-center">
            <button 
              className="btn btn-outline-success refresh-btn" 
              onClick={fetchOrders}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : (
                <i className="bi bi-arrow-clockwise me-2"></i>
              )}
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        {loading && !error ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your orders...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="empty-orders-container text-center py-5">
            <img 
              src={assets.delivery} 
              alt="No orders" 
              className="empty-orders-image mb-4"
              height={80}
              width={80}
            />
            <h4>No Orders Found</h4>
            <p className="text-muted">You haven't placed any orders yet.</p>
            <a href="/" className="btn btn-success">
              <i className="bi bi-bag-plus me-2"></i>
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="orders-list">
            {data.reverse().map((order, index) => (
              <div key={index} className="order-card">
                <div className="order-header">
                  <div className="d-flex align-items-center">
                    <img
                      src={assets.delivery}
                      alt=""
                      className="order-icon"
                    />
                    <div className="ms-3">
                      <h5 className="order-id mb-0">Order #{order.id || index + 1}</h5>
                      <small className="text-muted">
                        {order.orderDate ? formatDate(order.orderDate) : 'Date not available'}
                      </small>
                    </div>
                  </div>
                  <div className={`order-status ${getStatusColor(order.orderStatus)}`}>
                    <i className="bi bi-circle-fill status-dot"></i>
                    <span className="status-text">{order.orderStatus}</span>
                  </div>
                </div>
                
                <div className="order-items">
                  {order.orderedItems.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <div className="item-quantity">{item.quantity}x</div>
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                
                <div className="order-footer">
                  <div className="order-summary">
                    <div className="summary-item">
                      <span>Items:</span>
                      <span>{order.orderedItems.length}</span>
                    </div>
                    <div className="summary-item">
                      <span>Total:</span>
                      <span className="order-total">₹{order.amount.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="order-actions">
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="bi bi-eye me-1"></i> Details
                    </button>
                    {order.orderStatus.toLowerCase() !== 'delivered' && 
                     order.orderStatus.toLowerCase() !== 'cancelled' && (
                      <button className="btn btn-sm btn-outline-danger ms-2">
                        <i className="bi bi-x-circle me-1"></i> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
