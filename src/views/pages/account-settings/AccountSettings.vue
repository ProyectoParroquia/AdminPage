<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs
      v-model="tab"
      show-arrows
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
      >
        <v-icon
          size="20"
          class="me-3"
        >
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
         <v-card
            flat
            class="mt-5"
          >
             <div class="px-10">
          <v-card-title class="flex-nowrap">
                  <v-icon class="text--primary me-6">

                  </v-icon>
                  <span class="text-break">Bienvenid@, {{accountSettingData.nombreUsuario}}!</span>
                </v-card-title>
                <v-card-text class="pt-6">
                  <v-row>
                   <v-col
              cols="12"
              sm="8"
              md="9"
            >

                      <p>Bienvenido! aquí podrá revisar o editar sus datos personales,
                        como nombre, num de celular, etc.
                        ademas en la zona de seguridad podrá cambiarla a supreferencia
                          siempre y cuando sepa su contraseña actual</p>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="8"
                      md="3"
                      class="d-none d-sm-flex justify-center position-relative"

                    >
                      <v-img
                        contain
                        max-width="100"
                        src="@/assets/images/3d-characters/Richie_2.png"

                      ></v-img>
                    </v-col>
                    </v-row>
                </v-card-text>
             </div>
  </v-card>

      </v-tab-item>

      <v-tab-item>
        <account-settings-account :account-data="accountSettingData"></account-settings-account>
      </v-tab-item>

      <v-tab-item>
        <account-settings-security></account-settings-security>
      </v-tab-item>

      <v-tab-item>
        <account-settings-info :information-data="accountSettingData"></account-settings-info>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline } from '@mdi/js'
import axios from 'axios';
import { ref } from '@vue/composition-api'

// demos
import AccountSettingsAccount from './AccountSettingsAccount.vue'
import AccountSettingsSecurity from './AccountSettingsSecurity.vue'
import AccountSettingsInfo from './AccountSettingsInfo.vue'

export default {
  components: {
    AccountSettingsAccount,
    AccountSettingsSecurity,
    AccountSettingsInfo,
  },

  data: () => ({
    tokenLogin: localStorage.getItem('token'),
    accountSettingData:{},
    }),


  created:function(){
        let direccion = "http://localhost:3000/api/usuarios/perfil";
          axios.get(direccion, { headers: { token:this.tokenLogin } }).then( data =>{
            if (data.status===201){
              this.accountSettingData = data.data;
              console.log(this.accountSettingData)
            }else{
              console.log("error")
            }
          });
      },
  setup() {
    const tab = ref('')

    // tabs
    const tabs = [
      { title: 'Perfil', icon: "" },
      { title: 'Cuenta', icon: mdiAccountOutline },
      { title: 'Seguridad', icon: mdiLockOpenOutline },
      { title: 'Información', icon: mdiInformationOutline },
    ]

    return {
      tab,
      tabs,
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
      },
    }
  },
}
</script>
