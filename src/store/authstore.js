import { create } from "zustand";
import datauser from "../data/json/datosuser.json";

const useAuthStore = create((set) => ({
  user: null,
  isAdmin: false,

  login: (email, password) => {
    const users = datauser;

    if (users[email] && users[email].password === password) {
      set({ user: email, isAdmin: users[email].isAdmin });
      return true;
    }
    return false;
  },

  logout: () => set({ user: null, isAdmin: false })
}));

export default useAuthStore;
