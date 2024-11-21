import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from "@/stores/index";
import { getTokenFromLocalStorage } from '@/helpers';
const authStore = useAuthStore();


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },


    { path: "/login", name: "login", component: LoginView },


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

router.beforeEach(async to => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout();
    authStore.returnUrl = to.fullPath;
    return "/login";
  }
});

export default router
