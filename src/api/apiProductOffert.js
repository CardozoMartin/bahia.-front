import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Obtener todos los productos
export const getProductsOff = async () => {
    try {
        const response = await api.get(`${API_URL}/products-offert`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

// Obtener un producto por ID
export const getProductOffById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener producto:', error);
        throw error;
    }
};

// Crear un nuevo producto
export const createProductOff = async (formData) => {
    try {
      const response = await api.post('/products/offert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear el producto');
    }
  };

// Actualizar un producto
export const updateProductOff = async (id, formData) => {
    try {
      const response = await api.put(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar el producto');
    }
  };

// Eliminar un producto
export const deleteProductOff = async (id, token) => {
    try {
        await api.delete(`/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
};
