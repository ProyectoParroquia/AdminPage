<template>

  <v-app id="inspire" >

    <v-main >

      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">

                  <v-row>
                    <v-col cols="12" md="5" class="purple lighten-2">
                      <v-card-text class="mt-12">
                        <div class="imagenLogo text-center">
                            <img src="@/assets/LogoSacris.png" style="max-width: 60%;"/>
                        </div>


                        <p
                          class="text-center grey--text text--lighten-3 mt-6"
                        >En este espacio debera ingresar una contraseña nueva y verificarla, para
                        volver a ingresar a la pagina.</p>
                      </v-card-text>


                    </v-col>
                    <v-col cols="12" md="7" style="padding-left:40px; padding-right:60px;">
                      <Formulario :changeStateDialog="changeStateDialog"/>
                    </v-col>
                  </v-row>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog
          v-model="cambioContraseñaDialog"
          max-width="650px"
        >
          <v-card class="pt-4">
            <v-card-title class="text-h4 text-center font-weight-black"  >
              🔐 Cambio de contraseña Exitoso!

            </v-card-title>

            <v-card-text class="text-h6 text-center" >
                La contraseña se cambio Correctamente
              </v-card-text>

            <v-card-actions>

              <v-spacer ></v-spacer>

              <v-btn

                text
                @click="changeStateDialog"
              >
                Cerrar
              </v-btn>
              <v-btn
                color="primary"
               to="/pages/login"
              >
                Ir a Iniciar sesion
              </v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>


    </v-main>
  </v-app>
</template>

<script>
import Formulario from '../../../components/RecuperarContra/FormRecuperarC.vue'
export default {
   data: function(){
     return {
       cambioContraseñaDialog:false
    }
  },
  methods:{
    changeStateDialog(){
      this.cambioContraseñaDialog = !this.cambioContraseñaDialog
    },

  },

components:{
      Formulario
    }

};


</script>

