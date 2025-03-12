import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Data } from "../data/json/datosuser";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAdmin: false,

      login: (email, password) => {
        const foundUser = Data.find(user => user.correo === email && user.password === password);
        
        if (foundUser) {
          set({ user: foundUser, isAdmin: foundUser.correo === "admin.123@gmail.com" });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null, isAdmin: false })
    }),
    {
      name: "auth-storage", // Guarda en localStorage
      getStorage: () => localStorage
    }
  )
);

export default useAuthStore;
