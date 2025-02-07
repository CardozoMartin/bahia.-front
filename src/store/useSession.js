import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

// Función para obtener el estado inicial de la sesión
const getInitialState = () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return {
        user: decoded,
        isLoggedIn: true
      };
    } catch (e) {
      sessionStorage.removeItem('token');
      Swal.fire({
        title: 'Error',
        text: 'Inicie sesión nuevamente',
        icon: 'error',
      });
    }
  }
  return {
    user: null,
    isLoggedIn: false
  };
};

export const useSession = create((set) => ({
  ...getInitialState(),
  login: (userData) => {
    set({ user: userData, isLoggedIn: true });
  },
  logout: () => {
    sessionStorage.removeItem('token');
    set({ user: null, isLoggedIn: false });
  }
}));