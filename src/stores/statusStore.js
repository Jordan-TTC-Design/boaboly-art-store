import { defineStore } from 'pinia';

export const statusStore = defineStore({
  id: 'statusStore',
  state: () => ({
    isLoading: false,
    cartModel: false,
    hamMenuModel: false,
    collectionModel: false,
    popReminderModel: false,
    popReminderText: '',
    mainContainer: {},
  }),
  getters: {
    fixWindow(state) {
      let isFixed = false;
      if (state.hamMenuModel || state.cartModel || state.collectionModel) {
        isFixed = true;
      }
      return isFixed;
    },
  },
  actions: {
    openPopReminder(txt = '成功') {
      this.popReminderText = txt;
      this.popReminderModel = true;
      setTimeout(() => {
        this.popReminderModel = false;
      }, 1500);
    },
  },
});
