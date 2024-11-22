import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores';
import { getTokenFromLocalStorage } from '@/helpers';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },


    { path: "/login", name: "login", component: LoginView },



    //VENTA DETALLE
    {
      path: '/ventadetalles',
      name: 'ventadetalles',
      component: () => import('../views/VentadetalleView.vue'),
      children: [
        { path: '', component: () => import('../components/ventadetalle/VentadetalleList.vue') },
        {
          path: 'crear',
          component: () => import('../components/ventadetalle/VentadetalleCreate.vue')
        },
        // {
        //   path: 'editar/:id',
        //   component: () => import('../components/ventadetalle/VentadetalleEdit.vue')
        // }
      ]
    },
    //VENTA
    {
      path: '/ventas',
      name: 'ventas',
      component: () => import('../views/VentaView.vue'),
      children: [
        { path: '', component: () => import('../components/venta/VentaList.vue') },
        { path: 'crear', component: () => import('../components/venta/VentaCreate.vue') },
         {
          path: 'editar/:id',
          component: () => import('../components/venta/VentaEdit.vue')
         }
      ]
    },

    //CATEGORIA
    {
      path: '/categorias',
      name: 'categorias',
      component: () => import('../views/CategoriaView.vue'),
      children: [
        { path: '', component: () => import('../components/categoria/CategoriaList.vue') },
        { path: 'crear', component: () => import('../components/categoria/CategoriaCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/categoria/CategoriaEdit.vue')
        }
      ]
    },
    //PRODUCTO
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/ProductoView.vue'),
      children: [
        { path: '', component: () => import('../components/producto/ProductoList.vue') },
        { path: 'crear', component: () => import('../components/producto/ProductoCreate.vue') },
         {
          path: 'editar/:id',
          component: () => import('../components/producto/ProductoEdit.vue')
          }
      ]
    },
    //CLIENTE
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClienteView.vue'),
      children: [
        { path: '', component: () => import('../components/cliente/ClienteList.vue') },
        { path: 'crear', component: () => import('../components/cliente/ClienteCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/cliente/ClienteEdit.vue')
        }
      ]
    },
    //USUARIO
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/UsuarioView.vue'),
      children: [
        { path: '', component: () => import('../components/usuario/UsuarioList.vue') },
        { path: 'crear', component: () => import('../components/usuario/UsuarioCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/usuario/UsuarioEdit.vue')
        }
      ]
    },

     //EMPLEADO
     {
      path: '/empleados',
      name: 'empleados',
      component: () => import('../views/EmpleadoView.vue'),
      children: [
        { path: '', component: () => import('../components/empleado/EmpleadoList.vue') },
         { path: 'crear', component: () => import('../components/empleado/EmpleadoCreate.vue') },
        // {
        //   path: 'editar/:id',
        //   component: () => import('../components/empleado/EmpleadoEdit.vue')
        // }
      ]
    },
    //ACERCA DE
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
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
