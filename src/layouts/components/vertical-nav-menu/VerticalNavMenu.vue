<template>

  <v-navigation-drawer

    :value="isDrawerOpen"
    app
    floating
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link
        to="/dashboard2"
        class="d-flex align-center text-decoration-none"
      >
        <v-img
          :src="require('@/assets/images/logos/LogosSacris.png')"
          min-height="50px"
          min-width="50px"
          max-height="50px"
          max-width="50px"
          alt="logo"
          contain
          eager
          class="app-logo me-3"
        ></v-img>
        <v-slide-x-transition>
          <h2 class="app-title text--primary">
            SACRIS
          </h2>
        </v-slide-x-transition>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <v-list

      expand
      shaped
      class="vertical-nav-menu-items pr-2"
    >
      <nav-menu-link
        title="Inicio"
        :to="{ name: 'dashboard' }"
        :icon="icons.mdiHomeOutline"
      ></nav-menu-link>
      <nav-menu-link
        title="Configuraciones de cuenta"
        :to="{ name: 'pages-account-settings'}"
        :icon="icons.mdiAccountCogOutline"
      ></nav-menu-link>


      <nav-menu-section-title title="Interfaz de Admin"></nav-menu-section-title>

      <nav-menu-group
        title="Usuarios"
        :icon="icons.mdiAccountOutline"

      >
         <nav-menu-link
         class="ml-8"
        title="Usuarios"
        :to="{ name: 'usuarios' }"
        :icon="icons.mdiAccountOutline"
      ></nav-menu-link>

        <nav-menu-link
          class="ml-8"
          title="Tipo Usuarios"
          :icon="icons.mdiBookCross"
          :to="{ name: 'TipoUsuarios' }"

        ></nav-menu-link>
        <nav-menu-link
          class="ml-8"
          title="Tipo Documentos"
          :icon="icons.mdiBookOpenPageVariant"
          :to="{ name: 'TipoDocu' }"
        ></nav-menu-link>

      </nav-menu-group>

      <nav-menu-link
        title="Cursos"
        :to="{ name: 'cursos' }"
        :icon="icons.mdiEyeOutline"
      ></nav-menu-link>
      <nav-menu-group
        title="Servicios"
        :icon="icons.mdiTextBoxMultiple"

      >
        <nav-menu-link
          class="ml-10"
          title="Particulares"
          :icon="icons.mdiBookCross"
          :to="{ name: 'particulares' }"

        ></nav-menu-link>
        <nav-menu-link
          class="ml-10"
          title="Comunitarios"
          :icon="icons.mdiBookOpenPageVariant"
          :to="{ name: 'comunitarios' }"
        ></nav-menu-link>

      </nav-menu-group>
         <nav-menu-link
        title="Anuncios"
        :to="{ name: 'anuncios' }"
        :icon="icons.mdiFormSelect"
      ></nav-menu-link>

      <!-- navegacion plantilla -->
       <nav-menu-group
        title="Plantilla"
        :icon="icons.mdiTextBoxMultiple"
      >
        <nav-menu-link
        title="Inicio"
        :to="{ name: 'dash' }"
        :icon="icons.mdiHomeOutline"
      ></nav-menu-link>

        <nav-menu-link
          class="ml-12"
          title="Registrar"
          :icon="icons.mdiBookCross"
          :to="{ name: 'pages-register' }"
          target="_blank"

        ></nav-menu-link>
        <nav-menu-link
          class="ml-12"
          title="Error"
          :icon="icons.mdiBookOpenPageVariant"
          :to="{ name: 'error-404' }"
        ></nav-menu-link>
        <nav-menu-link
        title="cartas"
        :to="{ name: 'cards' }"
        :icon="icons.mdiCreditCardOutline"
      ></nav-menu-link>
      <nav-menu-link
        title="Tablas"
        :to="{ name: 'simple-table' }"
        :icon="icons.mdiFormSelect"
      ></nav-menu-link>
      <nav-menu-link
        title="Formularios"
        :to="{ name: 'form-layouts' }"
        :icon="icons.mdiTable"
      ></nav-menu-link>

      <nav-menu-link
        title="tipografia"
        :to="{ name: 'typography' }"
        :icon="icons.mdiAccountOutline"
      ></nav-menu-link>
      <nav-menu-link
        title="Iconos"
        :to="{ name: 'icons' }"
        :icon="icons.mdiEyeOutline"
      ></nav-menu-link>

      </nav-menu-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiTextBoxMultiple,
  mdiBookCross,
  mdiBookOpenPageVariant,
  mdiAccountOutline,
  mdiHomeOutline,
  mdiAlphaTBoxOutline,
  mdiEyeOutline,
  mdiCreditCardOutline,
  mdiTable,
  mdiFileOutline,
  mdiFormSelect,
  mdiAccountCogOutline,
} from '@mdi/js'
import NavMenuSectionTitle from './components/NavMenuSectionTitle.vue'

import NavMenuGroup from './components/NavMenuGroup.vue'
import NavMenuLink from './components/NavMenuLink.vue'

export default {
  components: {
    NavMenuSectionTitle,

    NavMenuGroup,
    NavMenuLink,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  setup() {
    return {
      icons: {
        mdiBookCross,
        mdiTextBoxMultiple,
        mdiBookOpenPageVariant,
        mdiAccountOutline,
        mdiHomeOutline,
        mdiAlphaTBoxOutline,
        mdiEyeOutline,
        mdiCreditCardOutline,
        mdiTable,
        mdiFileOutline,
        mdiFormSelect,
        mdiAccountCogOutline,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}

::-webkit-scrollbar {
    width: 5px;
  }

</style>
