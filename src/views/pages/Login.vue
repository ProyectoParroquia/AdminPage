<template>

  <v-app id="inspire" >

    <v-main >

      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">

                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="7" style="padding-left:30px; padding-right:30px;">

                      <ingresar/>


                    </v-col>
                    <v-col cols="12" md="5" class="purple lighten-2">
                      <v-card-text class="white--text mt-12">
                        <div class="imagenLogo text-center ">
                            <img src="@/assets/LogoSacris.png" style="max-width: 60%; margin-bottom:20px;"/>
                        </div>

                        <!-- <h1 class="text-center display-1">Hola!</h1>
                        <h5
                          class="text-center"
                        >¿No tienes una cuenta? Ingresa tus datos personales para ingresar a SACRIS</h5> -->
                      </v-card-text>
                      <div class="text-center mb-12">
                        <v-btn rounded outlined dark @click="step++">Registrarse</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="purple lighten-2">
                      <v-card-text class="white--text mt-12">
                        <div class="imagenLogo  text-center mt-10">
                            <img src="@/assets/LogoSacris.png" style="max-width: 80%; margin-bottom:20px;"/>
                        </div>
                        <!-- <h1 class="text-center display-1">Bienvenido de nuevo!</h1>
                        <h5
                          class="text-center"
                        >Si ya estas registrado, puedes iniciar sesion</h5> -->
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Iniciar Sesion</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">

                      <registrar />

                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

/* import Header from '@/components/header1.vue'; */
import ingresar from '@/components/Login/ingresar.vue';
import registrar from '@/components/Login/registrar.vue';
localStorage.removeItem('token')
export default {
   data: function(){
     return {
      step: 1,

    }
  },

  props: {
    source: String
  },
  components:{
    /* Header */
    ingresar,
    registrar
  }

};
</script>

<style>


.fondo{
  background-image:  url("../../assets/fondoPunH.svg");
  background-position: center center;
  background-size: cover;
  /* background: url("../assets/FondoMoraoH.svg") center center cover no-repeat fixed;*/

  }

  /* @media (max-width: 952px) {
  .fondo {
      background-image:  url("../assets/FondoMoraoV.svg");
  }
}*/

</style>
