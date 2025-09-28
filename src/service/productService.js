/* eslint-disable no-import-assign */
import axios from 'axios'
import { API_URL} from '../appConfig' 

const baseUrl = API_URL + '/products'
export const fetchProductList = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.log('Error fetching product list:', error)
    throw error
  }
}

export const fetchProductDetails = async (id) => {
  try {
    const response = await axios.get(baseUrl + '/' + id)
    return response.data
  } catch (error) {
    console.log('Error fetching product details:', error)
    throw error
  }
}
