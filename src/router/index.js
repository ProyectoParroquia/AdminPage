import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home-page',
    /* redirect: '/pages/login', */
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
    component: () => import('@/views/Cursos/cursoSacramental.vue'),
  },

    {
    path: '/Consultar',
    name: 'RequisitoIns',
    component: () => import('@/views/Requisitos/RequisitoIns.vue'),
  },
  {
  path: '/Recreativos',
  name: 'cards',
  component: () => import('@/views/Cursos/cursoRecreativo.vue'),
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
  //Feligres
  {
    path: '/dashboardF',
    name: 'dashF',
    component: () => import('@/views/pages/FeligresPages/dashboard/Dashboard.vue'),
  },
  {
    path: '/AnunciosF',
    name: 'anunciosF',
    component: () => import('@/views/pages/FeligresPages/Anuncios/CartaAnuncios.vue'),
  },

  {
    path: '/CursosF',
    name: 'cursosF',
    component: () => import('@/views/pages/FeligresPages/Cursos/Recreativos.vue'),
  },
  {
    path: '/SacramentalF',
    name: 'SacramentalF',
    component: () => import('@/views/pages/FeligresPages/Cursos/Sacramentales.vue'),
  },
  {
    path: '/Subir',
    name: 'subir',
    component: () => import('@/views/pages/FeligresPages/Cursos/subir.vue'),
  },


  // aqui se acaban feligres

  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/pages/login',
    name: 'login',
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
    path: '/home-page',
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
