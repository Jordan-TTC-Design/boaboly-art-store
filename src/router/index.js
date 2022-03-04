import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'FrontLayout',
      component: () => import('../views/FrontLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/front/Home.vue'),
        },
        {
          path: 'products/:id',
          component: () => import('../views/front/ProductPage.vue'),
        },
        {
          path: 'checkout',
          component: () => import('../views/front/OrderPage.vue'),
        },
        {
          path: 'admin-login',
          component: () => import('../views/admin/AdminLogin.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: 'AdminLayout',
      component: () => import('../views/AdminLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
      ],
    },
  ],
});

export default router;
