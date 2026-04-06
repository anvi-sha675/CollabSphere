import { create } from 'zustand';

export const useThemeStore = create((set) => ({
    // set theme to local storage
  theme: localStorage.getItem("collabsphere-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("collabsphere-theme", theme);
    set({theme});
  },
}));