import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import './MyOrders.css'
import { fetchUserOrders } from '../../service/orderService'

const MyOrders = () => {
  const { token } = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOrders = async () => {
    const response = await fetchUserOrders(token)
    setData(response)
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className="table table-responsive">
            <tbody>
              {data.reverse().map((order, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img
                        src={assets.delivery}
                        alt=""
                        height={48}
                        width={48}
                      />
                    </td>
                    <td>
                      {order.orderedItems.map((item, index) => (
                        <div key={index}>
                          {item.quantity} x {item.name}
                        </div>
                      ))}
                    </td>
                    <td>&#x20B9;{order.amount.toFixed(2)}</td>
                    <td>Items: {order.orderedItems.length}</td>
                    <td className="fw-bold text-capitalize">
                      &#x25cf;{order.orderStatus}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={fetchOrders}
                      >
                        <i className="bi bi-arrow-clockwise"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyOrders
