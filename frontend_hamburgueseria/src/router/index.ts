import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/producto',
      name: 'producto',
      component: () => import('../views/ProductoView.vue'),
    },
    {
      path: '/categoria',
      name: 'categoria',
      component: () => import('../views/CategoriaView.vue'),
    },

    {
      path: '/cliente',
      name: 'cliente',
      component: () => import('../views/ClienteView.vue'),
    },


    {
      path: '/usuario',
      name: 'usuario',
      component: () => import('../views/UsuarioView.vue'),
    },

    {
      path: '/empleado',
      name: 'empleado',
      component: () => import('../views/EmpleadoView.vue'),
    },

    {
      path: '/venta',
      name: 'venta',
      component: () => import('../views/VentaView.vue'),
    },
    {
      path: '/ventaDetalle',
      name: 'ventaDetalle',
      component: () => import('../views/VentasDetallesView.vue'),
    },

  ],
})

export default router
