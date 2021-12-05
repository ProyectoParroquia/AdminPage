<template>
  <v-app>
    <div v-if="UsuarioLogueado.tipoUsuario===3">
      <menu-feligres :is-drawer-open.sync="isDrawerOpen"/>
    </div>
    <div v-else>
        <vertical-nav-menu :is-drawer-open.sync="isDrawerOpen"></vertical-nav-menu>

    </div>

    <v-app-bar
      app
      flat
      absolute
      color="transparent"
    >
      <div class="boxed-container w-full">
        <div class="d-flex align-center mx-6">
          <!-- Left Content -->
          <v-app-bar-nav-icon
            class="d-block d-lg-none me-2"
            @click="isDrawerOpen = !isDrawerOpen"
          ></v-app-bar-nav-icon>
            <v-breadcrumbs :items="items">
              <template v-slot:item="{ item }">
                <v-breadcrumbs-item
                  :href="item.href"
                  :disabled="item.disabled"
                >
                  {{ item.text.toUpperCase() }}
                </v-breadcrumbs-item>
              </template>
            </v-breadcrumbs>
          <v-spacer></v-spacer>

          <!-- Right Content -->
          <theme-switcher></theme-switcher>

          <app-bar-user-menu></app-bar-user-menu>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <div class="app-content-container boxed-container pa-6">
        <slot></slot>
      </div>
    </v-main>

    <v-footer
      app
      inset
      color="transparent"
      absolute
      height="56"
      class="px-0"
    >
      <div class="boxed-container w-full">
        <div class="mx-6 d-flex justify-space-between">
          <span>
            &copy; 2021 <a
              class="text-decoration-none"
              target="_blank"
            >SACRIS</a></span>
          <span class="d-sm-inline d-none">
            <a
              href=""
              target="_blank"
              class="me-6 text--secondary text-decoration-none"
            >Facebook</a>
            <a
              href=""
              target="_blank"
              class="me-6 text--secondary text-decoration-none"
            >Instagram</a>
            <a
              href=""
              target="_blank"
              class="text--secondary text-decoration-none"
            >Twitter</a>
          </span>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { ref } from '@vue/composition-api'
import { mdiMagnify } from '@mdi/js'
import VerticalNavMenu from './components/vertical-nav-menu/VerticalNavMenu.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import AppBarUserMenu from './components/AppBarUserMenu.vue'
import MenuFeligres from './components/vertical-nav-menu/MenuFeligres.vue'
 import axios from 'axios'

export default {
  components: {
    VerticalNavMenu,
    ThemeSwitcher,
    AppBarUserMenu,
    MenuFeligres,
  },
  data: () => ({
    tokenLogin: localStorage.getItem('token'),
     UsuarioLogueado:{
              idUsu:'',
              tipoUsuario:''
              },
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          to: '/dashboard2'
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }),

created(){
    this.initialize()
  },
  methods:{
      initialize(){
      let ruta="https://sacris.herokuapp.com/api/usuarios/obtener-params"
        axios.get(ruta, { headers: { token:this.tokenLogin } })
        .then(res=>{
          console.log(res)
          this.UsuarioLogueado=res.data
        })
        }
  },
  setup() {
    const isDrawerOpen = ref(null)

    return {
      isDrawerOpen,

      // Icons
      icons: {
        mdiMagnify
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar ::v-deep {
  .v-toolbar__content {
    padding: 0;

    .app-bar-search {
      .v-input__slot {
        padding-left: 18px;
      }
    }
  }
}

.boxed-container {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}

/* vertical-nav-menu::-webkit-scrollbar{
  width: 10px;
  background:#f4f5fa;
}
vertical-nav-menu::-webkit-scrollbar-thumb{
   background: rgba(174, 95, 158, .7);
   border-radius: 5px;
 } */
</style>
