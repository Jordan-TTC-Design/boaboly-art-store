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
    popInfoBox: { open: false, title: '', text: '', action: null },
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
    openPopInfoBox(title, text, action) {
      this.popInfoBox.open = true;
      this.popInfoBox.title = title;
      this.popInfoBox.text = text;
      // this.popInfoBox.action = Function(action);
      this.popInfoBox.action = action;
      console.log(this.popInfoBox);
    },
    closePopInfoBox() {
      this.popInfoBox.open = false;
      this.popInfoBox.title = '';
      this.popInfoBox.text = '';
      this.popInfoBox.action = null;
    },
  },
});
