<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-app-bar
      height="60px"
    >

        <div class="vertical-nav-header d-flex items-center ps-5  ">

        <v-img
          :src="require('@/assets/logos/Sacris_logo.png')"
          class="d-none d-lg-flex d-md-flex "

          width="250px"

        ></v-img>
        <v-img
          :src="require('@/assets/logos/Sacris_logo.png')"
          class="d-flex d-lg-none d-md-none"
          width="250px"

        ></v-img>


    </div>

      <v-spacer></v-spacer>


      <v-btn icon  color="primary" :to="{ name: 'login' }" class="d-flex d-lg-none d-md-none">
        <v-icon large>
          {{icons.mdiLogin  }}
        </v-icon>
      </v-btn>
      <v-btn color="primary" :to="{ name: 'login' }" outlined class="d-none d-lg-flex d-md-flex ">

        <v-icon  class="mr-1">
           {{icons.mdiLogin  }}
        </v-icon>
        <b>Ingresar</b>
      </v-btn>

      <template v-slot:extension>
        <v-tabs fixed-tabs  v-model="tab"
      show-arrows>

      <v-tab>Inicio</v-tab>
          <v-tab>Cursos</v-tab>
          <v-tab>Anuncios</v-tab>
    </v-tabs>


      </template>
    </v-app-bar>



    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
          <Inicio/>
      </v-tab-item>

      <v-tab-item>
          <Cursos/>
      </v-tab-item>

      <v-tab-item>
          <Anuncios/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline, mdiLogin } from '@mdi/js'

import { ref } from '@vue/composition-api'

// demos
import Inicio from './inicio.vue'
import Cursos from './cursos.vue'
import Anuncios from './anuncios.vue'
export default {

components:{
Inicio,
Cursos,
Anuncios
},
  data: () => ({

    }),

  methods:{

  },


  setup() {
    const tab = ref('')

    // tabs


    return {
      tab,

      icons: {
        mdiLogin,
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
      },
    }
  },
}
</script>
