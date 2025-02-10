import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Obtener todos los productos
export const getBanner = async () => {
    try {
        const response = await api.get(`${API_URL}/banners`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};



// Crear un nuevo producto
export const createBanner = async (formData) => {
    try {
      const response = await api.post('/banners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear el producto');
    }
  };

// Eliminar un producto
export const deleteBanner = async (id, token) => {
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
