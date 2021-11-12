import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/pages/login',
  },
  {
    path: '/dashboard',
    name: 'dash',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },

   {
    path: '/dashboard2',
    name: 'dashboard',
    component: () => import('@/views/dashboard-View/DashComplet.vue'),
  },

   {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('@/views/ModuloUsuarios/Usuarios/usuarios.vue'),
  },

   {
    path: '/TipoUsuarios',
    name: 'TipoUsuarios',
    component: () => import('@/views/ModuloUsuarios/TipoUsuarios/tipoUsu.vue'),
  },

   {
    path: '/TipoDocumentos',
    name: 'TipoDocu',
    component: () => import('@/views/ModuloUsuarios/TipoDocumentos/tipoDocu.vue'),
  },

   {
    path: '/ServiciosCom',
    name: 'comunitarios',
    component: () => import('@/views/Servicios/Comunitarios.vue'),
  },

   {
    path: '/ServiciosPar',
    name: 'particulares',
    component: () => import('@/views/Servicios/Particulares.vue'),
  },

   {
    path: '/Cursos',
    name: 'cursos',
    component: () => import('@/views/Cursos/cursos.vue'),
  },

   {
    path: '/Anuncios',
    name: 'anuncios',
    component: () => import('@/views/Anuncios/CartaAnuncios.vue'),
  },

  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/SoliRestablecerContra',
    name: 'Recuperar Contra',
    component: () => import('@/views/pages/RecuContra/SolicitudRecuperarContra.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/RestablecerContra',
    name: 'Restablecer Contra',
    component: () => import('@/views/pages/RecuContra/RecuperacionContra.vue'),
    meta: {
      layout: 'blank',
    },

  },
  {
    path: '/actualizar',
    name: 'actualizar',
    component: () => import('@/views/ModuloUsuarios/Usuarios/editUsu.vue'),
    meta: {
      layout: 'blank',
    },

  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

})

export default router
