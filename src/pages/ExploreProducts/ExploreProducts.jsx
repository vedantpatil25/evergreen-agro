import { useState } from 'react'
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'

const ExploreProducts = () => {
  const [category, setCategory] = useState('All')
  const [searchText, setSearchText] = useState('')
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group mb-3">
                <select
                  className="form-select mt-2"
                  style={{ maxWidth: '150px' }}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Seed">Seed</option>
                  <option value="Pesticide">Pesticide</option>
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Search Product..."
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                />
                <button className="btn btn-success mt-2" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ProductDisplay category={category} searchText={searchText} />
    </>
  )
}

export default ExploreProducts
