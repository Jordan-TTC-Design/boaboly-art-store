<script>
import { ref } from 'vue';
import { apiMethod } from '@/methods/api.js';
import { Form } from 'vee-validate';
import VeeFormInput from '@/components/form/VeeFormInput.vue';
export default {
  components: {
    VeeFormInput,
    Form,
  },
  setup() {
    const user = ref({
      username: '',
      password: '',
    });
    function login() {
      apiMethod.login(user.value);
    }
    return {
      user,
      login,
    };
  },
};
</script>

<template>
  <div class="w-72 mx-auto p-4 border border-gray-300 rounded mt-6">
    <h1 class="text-2xl font-bold text-center mb-6">請先登入</h1>
    <Form id="form" class="form-signin" v-slot="{ errors }" @submit="login">
      <div class="mb-6">
        <VeeFormInput
          v-model="user.username"
          input-id="username"
          input-type="email"
          :errors="errors"
          label-name="登入信箱"
          text-holder="請輸入登入信箱"
        />
      </div>
      <div class="mb-6">
        <VeeFormInput
          v-model="user.password"
          input-id="password"
          input-type="password"
          :errors="errors"
          label-name="密碼"
          text-holder="請輸入密碼"
        />
      </div>
      <button class="bg-black w-full px-3 py-2 text-white" type="submit">
        登入
      </button>
    </Form>
  </div>
</template>

<style lang="scss"></style>
