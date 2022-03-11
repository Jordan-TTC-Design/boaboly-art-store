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
          path: 'about',
          name: 'About',
          component: () => import('../views/front/About.vue'),
        },
        {
          path: 'contact',
          name: 'Contact',
          component: () => import('../views/front/Contact.vue'),
        },
        {
          path: 'products',
          name: 'ProductList',
          component: () => import('../views/front/ProductListPage.vue'),
        },
        {
          path: 'products/:id',
          component: () => import('../views/front/ProductPage.vue'),
        },
        {
          path: 'arts',
          name: 'ArtList',
          component: () => import('../views/front/ArtListPage.vue'),
        },
        {
          path: 'arts/:id',
          component: () => import('../views/front/ArtPage.vue'),
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('../views/front/OrderPage.vue'),
        },
        {
          path: 'admin-login',
          name: 'AdminLogin',
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
          name: 'AdminHome',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
        {
          path: 'products',
          name: 'AdminProducts',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
        {
          path: 'arts',
          name: 'AdminArts',
          component: () => import('../views/admin/AdminArts.vue'),
        },
        {
          path: 'orders',
          name: 'AdminOrders',
          component: () => import('../views/admin/AdminOrders.vue'),
        },
      ],
    },
  ],
});

export default router;
