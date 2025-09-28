import { useContext, useState } from 'react'
import './PlaceOrder.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { calculateCartTotals } from '../../util/cartUtils'
import { toast } from 'react-toastify'
import { RAZORPAY_KEY } from '../../util/contants'
import { useNavigate } from 'react-router-dom'
import {
  createOrder,
  deleteOrder,
  verifyPayment,
} from '../../service/orderService'
import { clearCartItems } from '../../service/cartService'

const PlaceOrder = () => {
  const { productList, quantities, setQuantities, token } = useContext(
    StoreContext,
  )
  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    state: '',
    city: '',
    zip: '451770',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const orderData = {
      userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}`,
      phoneNumber: data.phoneNumber,
      orderedItems: cartItems.map((item) => ({
        productId: item.productId,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
      })),
      amount: total.toFixed(2),
      orderStatus: 'Processing',
    }

    try {
      const response = await createOrder(orderData, token)
      if (response.razorpayOrderId) {
        // initiate the payment
        initiateRazorpayPayment(response)
      } else {
        toast.error('Unable to place order. Please try again.')
      }
    } catch (error) {
      toast.error('Unable to place order. Please try again.')
    }
  }

  const initiateRazorpayPayment = (order) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount, //Convert to paise
      currency: 'INR',
      name: 'Product Land',
      description: 'Product order payment',
      order_id: order.razorpayOrderId,
      handler: verifyPaymentHandler,
      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        contact: data.phoneNumber,
      },
      theme: { color: '#3399cc' },
      modal: {
        ondismiss: deleteOrderHandler,
      },
    }
    const razorpay = new window.Razorpay(options)
    razorpay.open()
  }

  const verifyPaymentHandler = async (razorpayResponse) => {
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature,
    }
    try {
      const success = await verifyPayment(paymentData, token)
      if (success) {
        toast.success('Payment successful.')
        await clearCart()
        navigate('/myorders')
      } else {
        toast.error('Payment failed. Please try again.')
        navigate('/')
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    }
  }

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId, token)
    } catch (error) {
      toast.error('Something went wrong. Contact support.')
    }
  }

  const clearCart = async () => {
    try {
      await clearCartItems(token, setQuantities)
    } catch (error) {
      toast.error('Error while clearing the cart.')
    }
  }

  //cart items
  const cartItems = productList.filter((product) => quantities[product.id] > 0)

  //calcualtiong
  const { subtotal, shipping, total } = calculateCartTotals(
    cartItems,
    quantities,
  )
  return (
    <div className="container mt-4">
      <main>
        <div className="py-5 text-center">
          <img
            className="d-block mx-auto"
            src={assets.logo}
            alt=""
            width="270"
            height="98"
          />
        </div>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-success">Your cart</span>
              <span className="badge bg-success rounded-pill">
                {cartItems.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between lh-sm"
                >
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-body-secondary">
                      Qty: {quantities[item.id]}
                    </small>
                  </div>
                  <span className="text-body-secondary">
                    &#8377;{item.price * quantities[item.id]}
                  </span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span>Shipping</span>
                </div>
                <span className="text-body-secondary">
                  &#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>&#8377;{total.toFixed(2)}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" onSubmit={onSubmitHandler}>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="firstName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Jhon"
                    required
                    name="firstName"
                    onChange={onChangeHandler}
                    value={data.firstName}
                  />
                </div>

                {/* <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Doe"
                    value={data.lastName}
                    onChange={onChangeHandler}
                    name="lastName"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required
                      name="email"
                      onChange={onChangeHandler}
                      value={data.email}
                    />
                  </div>
                </div> */}

                <div className="col-12">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="9876543210"
                    required
                    value={data.phoneNumber}
                    name="phoneNumber"
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                    value={data.address}
                    name="address"
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select
                    className="form-select"
                    id="state"
                    required
                    name="state"
                    value={data.state}
                    onChange={onChangeHandler}
                  >
                    <option>Madhya Pradesh</option>
                    <option>Maharashtra</option>
                    {/* <option value="">Other ... </option>                   */}
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="city" className="form-label">
                    City / Town
                  </label>
                  <select
                    className="form-select"
                    id="city"
                    required
                    name="city"
                    value={data.city}
                    onChange={onChangeHandler}
                  >
                    <option value="">Choose...</option>
                    <option>Pansemal</option>
                    <option>Jalgone</option>
                    <option>Bandhara</option>
                    <option>Junapani</option>
                    <option>Mandane</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="zip"
                    placeholder="451770"
                    required
                    name="zip"
                    value={data.zip}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>

              <hr className="my-4" />

              <button
                className="w-100 btn btn-success btn-lg"
                style={{ marginBottom: '100px' }}
                type="submit"
                disabled={cartItems.length === 0}
              >
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PlaceOrder
