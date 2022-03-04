import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min, max} from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import '@/assets/index.css';
import 'cropperjs/dist/cropper.min.css';

defineRule('email', email);
defineRule('required', required);
defineRule('min', min);
defineRule('max', max);
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);
app.use(VueLoading);
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
