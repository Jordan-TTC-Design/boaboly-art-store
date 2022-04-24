import { defineStore } from 'pinia';

export const statusStore = defineStore({
  id: 'statusStore',
  state: () => ({
    isLoading: false,
  }),
  getters: {},
  actions: {},
});
