import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProductDetails } from '../../service/productService'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'

const ProductDetails = () => {
  const { id } = useParams()
  const { increaseQty } = useContext(StoreContext)
  const navigate = useNavigate()

  const [data, setData] = useState({})

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const productData = await fetchProductDetails(id)
        setData(productData)
      } catch (error) {
        toast.error('Error displaying the Product details.')
      }
    }
    loadProductDetails()
  }, [id])

  const addToCart = () => {
    increaseQty(data.id)
    navigate('/cart')
  }

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center flex-column flex-md-row">
          {/* Product Image */}
          <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
            <img
              className="img-fluid"
              src={data.imageUrl}
              alt={data.name}
              style={{
                maxHeight: '400px',
                objectFit: 'contain',
                borderRadius: '20px'
              }}
            />
          </div>

          {/* Product Details */}
          <div className="col-12 col-md-6 text-start">
            <div className="fs-6 mb-2">
              Category:{' '}
              <span className="badge text-bg-success fs-6">
                {data.category}
              </span>
            </div>
            <h1 className="display-6 fw-bold mt-2">{data.name}</h1>
            <div className="fs-4 my-2 text-success">
              ₹{data.price}.00
            </div>
            <p className="lead mb-4">{data.description}</p>
            <div className="d-flex justify-content-center justify-content-md-start">
              <button
                className="btn flex-1 btn-success px-4 py-2"
                type="button"
                onClick={addToCart}
                style={{width: '-webkit-fill-available'}}
              >
                <i className="bi-cart-fill me-2"></i>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
