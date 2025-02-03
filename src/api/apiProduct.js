import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Obtener todos los productos
export const getProducts = async () => {
    try {
        const response = await api.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener producto:', error);
        throw error;
    }
};

// Crear un nuevo producto
export const createProduct = async (formData) => {
    try {
      const response = await api.post('/products', formData, {
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
export const updateProduct = async (id, formData) => {
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
export const deleteProduct = async (id, token) => {
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
