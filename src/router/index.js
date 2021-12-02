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
    path: '/Otros',
    name: 'Otros',
    component: () => import('@/views/ModuloUsuarios/TipoDocyUsu/TiposDyU.vue'),
  },

   {
    path: '/Cursos',
    name: 'cursos',
    component: () => import('@/views/Cursos/cursos.vue'),
  },

    {
    path: '/Consultar',
    name: 'RequisitoIns',
    component: () => import('@/views/Requisitos/RequisitoIns.vue'),
  },
  {
  path: '/Recreativos',
  name: 'cards',
  component: () => import('@/views/Cursos/cards.vue'),
},
{
  path: '/TipoCurso',
  name: 'tipoCurso',
  component: () => import('@/views/Cursos/TipoCurso/tipoCurso.vue'),
},
  {
    path: '/Definir',
    name: 'NuevoCR',
    component: () => import('@/views/Requisitos/NuevoCR.vue'),
  },
  {
    path: '/Inscripcion',
    name: 'inscripcion',
    component: () => import('@/views/Cursos/Inscripcion/Inscripcion.vue'),
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
    path: '/HomePage',
    name: 'HomePage',
    component: () => import('@/views/HomePage/home.vue'),
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
