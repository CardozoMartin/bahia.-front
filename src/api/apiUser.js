import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;


export const postLoginFn = async (formData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Ocurrió un error al loguearse');
    }
  
    if (!data.token) {
      throw new Error('No se recibió un token válido');
    }
  
    // Guardamos el token
    sessionStorage.setItem('token', data.token);
  
    try {
      const decoded = jwtDecode(data.token);
      return decoded; // Retornamos el usuario decodificado completo
    } catch (error) {
      console.error('Error al decodificar el token:', error.message);
      sessionStorage.removeItem('token');
      throw new Error('Token inválido');
    }
  };


  export const postUserFn = async (data) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error("Ocurrio un error al registrarse");
    }
    return data;
  };

