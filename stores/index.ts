import { defineStore } from "pinia";
export const useStore = defineStore("counter", () => {
  const current_page = ref("");
  return { current_page };
});
