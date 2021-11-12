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
                        >En este espacio debera ingresar su correo,
                           al cual se le enviara un link para que logre cambiar su actual contraseña.</p>
                      </v-card-text>


                    </v-col>
                    <v-col cols="12" md="7" style="padding-left:30px; padding-right:30px;">
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
                🔐   Verifica el correo ingresado!

            </v-card-title>

            <v-card-text class="text-h6 text-center" >
                Se ha enviado un mensaje al correo ingresado con las instrucciones para el cambio de contraseña!
              </v-card-text>

            <v-card-actions>
 <v-spacer></v-spacer>
              <v-btn

                color="primary"
               to="/pages/login"
              >
                OK
              </v-btn>

 <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- ------------------------------------------------------ -->
     <!--  <v-dialog
      v-model="cambioContraseñaDialog"
      max-width="500px">
      <v-card class="pt-4">
        <marquee>Se a enviado un correo con las instrucciones para el cambio de contraseña!:D</marquee>
        <button @click="ToLogin">Volver Al inicio</button>
        <button @click="changeStateDialog">Cerrar</button>
      </v-card>

      </v-dialog> -->
    </v-main>
  </v-app>
</template>

<script>
import Formulario from '../../../components/RecuperarContra/FormCorreoContra.vue'
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
    ToLogin(){
      alert("Lo lleva al inicio*")
    }
  },
  components:{
      Formulario
    }

};
</script>

