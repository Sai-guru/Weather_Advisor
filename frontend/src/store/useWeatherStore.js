import { create } from "zustand";


const useWeatherStore = create((set) => ({
  location: "",
  advice: null,
  loading: false,
  error: null,

  setLocation: (location) => set({ location }),
   setAdvice: (advice) => set({ advice }),
  setLoading: (loading) => set({ loading }),


setError: (error) => set({ error }),

  fetchAdvice: async (location, fetchWeatherAdvice) => {
    set({ loading: true, error: null, advice: null });
    try {
      const data = await fetchWeatherAdvice(location);
      set({ advice: data.advice, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useWeatherStore;
