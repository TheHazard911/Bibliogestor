import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAdmin: false,

      // Función para actualizar el usuario
      setUser: (userData) => set({ user: userData }),

      // Login que también asigna el usuario
      login: (usuario) => {
        set({
          user: usuario,
          isAdmin: usuario.email === "admin123@gmail.com",
        });
      },

      logout: () => set({ user: null, isAdmin: false }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
