import axios from 'axios'
import { API_URL} from '../appConfig' 

export const fetchProductList = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.log('Error fetching product list:', error)
    throw error
  }
}

export const fetchProductDetails = async (id) => {
  try {
    const response = await axios.get(API_URL + '/' + id)
    return response.data
  } catch (error) {
    console.log('Error fetching product details:', error)
    throw error
  }
}
