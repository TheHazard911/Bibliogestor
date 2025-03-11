import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Users } from "../data/json/datosuser";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAdmin: false,

      login: (email, password) => {
        const users = Users;

        if (users[email] && users[email].password === password) {
          set({ user: email, isAdmin: users[email].isAdmin });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null, isAdmin: false })
    }),
    {
      name: "auth-storage", // Nombre del almacenamiento en localStorage
      getStorage: () => localStorage // Usa localStorage para persistencia
    }
  )
);

export default useAuthStore;
