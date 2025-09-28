import axios from "axios";
import { API_URL } from "../appConfig";

const baseUrl = API_URL + "/orders";

export const fetchUserOrders = async (token) => {
    try {
        const response = await axios.get(baseUrl, {
            headers: { Authorization: `Bearer ${token}` },
        }); 
        return response.data;
    } catch (error) {
        console.error('Error occured while fetching the orders', error);
        throw error;
    }
}

export const createOrder = async (orderData, token) => {
    try {
        const response = await axios.post(
            baseUrl+"/create",
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error occured while creating the order', error);
        throw error;
    }
}

export const verifyPayment = async (paymentData, token) => {
    try {
        const response = await axios.post(
            baseUrl+"/verify",
            paymentData,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.status === 200;
    } catch (error) {
        console.error('Error occured while verifing the payment', error);
        throw error;
    }
}

export const deleteOrder = async (orderId, token) => {
    try {
        await axios.delete(baseUrl+"/"+ orderId, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error occured while deleting the order', error);
        throw error;
    }
}