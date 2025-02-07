import { create } from 'zustand';

export const useProduct = create((set) => ({
  product: null,
  setProductToEdit: (product) => set({ product }),
  clearProduct: () => set({ product: null }),
}));