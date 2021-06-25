import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Font',
    component: () => import('../views/Font.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('../views/Font/Index.vue'),
      },
      {
        name: 'products',
        path: 'products',
        component: () => import('../views/Font/Products.vue'),
      },
      {
        name: 'product',
        path: 'product/:id',
        component: () => import('../views/Font/Product.vue'),
      },
      {
        name: 'Cart',
        path: 'cart',
        component: () => import('../views/Font/Cart.vue'),
      },
      {
        name: 'checkout',
        path: 'checkout/:orderId',
        component: () => import('../views/Font/Checkout.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Notfound',
    component: () => import('@/views/NotFound.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    children: [
      {
        name: 'Products',
        path: 'products',
        component: () => import('../views/Admin/Products.vue'),
      },
      {
        name: 'Orders',
        path: 'orders',
        component: () => import('../views/Admin/Orders.vue'),
      },
      {
        name: 'Coupons',
        path: 'coupons',
        component: () => import('../views/Admin/Coupons.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),

  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
