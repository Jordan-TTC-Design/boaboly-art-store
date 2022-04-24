import { defineStore } from 'pinia';

export const statusStore = defineStore({
  id: 'statusStore',
  state: () => ({
    isLoading: false,
    cartModel: false,
    collectionModel: false,
    popReminderModel: false,
    popReminderText: '',
  }),
  getters: {},
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
