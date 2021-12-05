<template>
    <v-card-text class="mt-12">
                        <h1
                          class="text-center display-10 purple--text text--light2"
                        >Iniciar sesion</h1>

                        <v-form v-on:submit.prevent="login">
                          <v-text-field
                           v-model="username"
                            label="Usuario"
                            name="Usuario"
                            :prepend-inner-icon="icons.mdiAccountCircle"
                            type="text"
                            color="#ae5f9e"
                          />

                          <v-text-field
                            v-model="password"
                            id="password"
                            label="Password"
                            name="password"
                            :prepend-inner-icon="icons.mdiLock "
                            :append-icon="show1  ?icons.mdiEyeOutline :icons.mdiEyeOffOutline "
                            :type="show1 ? 'text' : 'password'"

                            required
                            @click:append="show1 = !show1"
                            color="#ae5f9e"
                          />
                          <div class="text-center my-3 ">
                            <v-btn type="submit" block rounded color="#ae5f9e" dark>Ingresar</v-btn>
                          </div>

                          <div class="mt-6">
                            <v-alert
                              margin="3"



                            role="alert" v-if="error"
                              border="left"
                              color="error"
                              dark
                            >
                          {{error_msg}}
                          </v-alert>
                        </div>

                        </v-form>
                        <div class=" text-center mt-3 ">
                          <v-btn
                          to="/pages/Recuperacion"
                          plain
                          class="ma-1"
                          >
                          <h3 class="text-center mt-4">¿Olvidaste tu contraseña?</h3>
                          </v-btn>
                        </div>

                      </v-card-text>
</template>
<script>
import axios from 'axios';
import {
  mdiAccountCircle,
  mdiLock,
  mdiEyeOffOutline,
  mdiEyeOutline

} from '@mdi/js'
export default {
   data: function(){
     return {
      show1: false,
      username: "",
      password: "",
      error: false,
      error_msg: "",
    }
  },

  methods:{
    login(){
        let json = {
          //this para llamar a una funcion a una variable de la misma clase
          "username" : this.username,
          "password": this.password
        };
        axios.post('https://sacris.herokuapp.com/api/credenciales/login/', json)
        //eso devuelve una promesa
        .then( respuesta =>{
          console.log(respuesta)
           if(respuesta.status === 201){

             localStorage.token = respuesta.data.success;
             this.$router.push('/dashboard2');
           }else{
             this.error = true;
             this.error_msg = respuesta.data.error;
           }
        })
    }
  },
  setup() {
    return {
      icons: {
        mdiAccountCircle,
        mdiLock,
        mdiEyeOffOutline,
        mdiEyeOutline

      },
    }
  },
};
</script>
