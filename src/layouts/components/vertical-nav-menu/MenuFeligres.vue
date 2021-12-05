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


      <nav-menu-section-title title="Consulta y registrate aqui"></nav-menu-section-title>


      <nav-menu-group
        title="Cursos"
        :icon="icons.mdiEyeOutline"
      >
        <nav-menu-link
          class="ml-12"
          title="Sacramentales"
          :icon="icons.mdiBookCross"
          :to="{ name: 'SacramentalF' }"

        ></nav-menu-link>
        <nav-menu-link
          class="ml-12"
          title="Recreativos"
          :icon="icons.mdiBookOpenPageVariant"
          :to="{ name: 'cursosF' }"
        ></nav-menu-link>

      </nav-menu-group>




         <nav-menu-link
        title="Anuncios"
        :to="{ name: 'anunciosF' }"
        :icon="icons.mdiFormSelect"
      ></nav-menu-link>


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
  mdiFilePdfBox,
  mdiAccountCogOutline,
} from '@mdi/js'


import NavMenuGroup from './components/NavMenuGroup.vue'
import NavMenuLink from './components/NavMenuLink.vue'
import NavMenuSectionTitle from './components/NavMenuSectionTitle.vue'

export default {
  components: {
    NavMenuGroup,
    NavMenuLink,
    NavMenuSectionTitle
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
        mdiFilePdfBox,
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
