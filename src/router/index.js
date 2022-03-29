import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Front/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    component: () => import('../views/Front/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'Cart',
        component: () => import('../views/Front/CartView.vue')
      },
      {
        path: 'order/:id',
        component: () => import('../views/Front/CheckOrder.vue')
      },
      {
        path: 'Products',
        component: () => import('../views/Front/ProductsView.vue')
      },
      {
        path: 'Product/:id',
        component: () => import('../views/Front/ProductView.vue')
      },
      {
        path: 'Finish',
        component: () => import('../views/Front/FinishView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/Admin/DashboardView.vue'),
    children: [
      {
        path: 'AdminCouple',
        component: () => import('../views/Admin/AdminCoupon.vue')
      },
      {
        path: 'AdminProducts',
        component: () => import('../views/Admin/AdminProducts.vue')
      },
      {
        path: 'AdminOrder',
        component: () => import('../views/Admin/AdminOrder.vue')
      },
      {
        path: 'AdminPost',
        component: () => import('../views/Admin/AdminPost.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
