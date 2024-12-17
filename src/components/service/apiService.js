import axios from "axios";

// const API_BASE_URL = "http://localhost:9090/order-billing-ws/order";
const API_BASE_URL = "http://localhost:9090/Kopeetearia-API/order";

export const getOrders = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const addOrder = async (order) => {
  try {
    await axios.post(API_BASE_URL, order);
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};

export const updateOrder = async (id, order) => {
  try {
    await axios.put(`${API_BASE_URL}/${id}`, order);
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const getTotalRegularBill = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/totalRegularBill`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total regular bill:", error);
    throw error;
  }
};

export const getTotalDiscountedBill = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/totalDiscountedBill`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total discounted bill:", error);
    throw error;
  }
};
