import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const postOrder = async (data) => {
    try {
        const response = await api.post(`${API_URL}/carts`, data);
        return response.data;
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        throw error;
    }
};

export const getOrders = async () => {
    try {
        const response = await api.get(`${API_URL}/carts`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        throw error;
    }
};

export const getOrderById = async (id) => {
    try {
        const response = await api.get(`${API_URL}/carts/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener pedido:', error);
        throw error;
    }
};

export const updateOrderStatus = async (id, estado) => {
    try {
        // Cambia PUT por PATCH
        const response = await api.patch(`${API_URL}/carts/${id}/status`, { estado });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar estado del pedido:', error);
        throw error;
    }
};

export const updateOrderDeliveryStatus = async (id, estadoPedido) => {
    try {
        // Cambia PUT por PATCH
        const response = await api.patch(`${API_URL}/carts/${id}/order-status`, { estadoPedido });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar estado de entrega:', error);
        throw error;
    }
};