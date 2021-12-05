<template>

    <v-card-text class="mt-12 p-5">
                        <h1
                          class="text-center display-10 purple--text text--light2 mb-4"
                        >Recuperar Contraseña🔐</h1>

                        <!-- <p class="mb-2">
                          En este espacio debera ingresar su correo,
                           al cual se le enviara un link para que logre cambiar su actual contraseña.

                        </p> -->
                        <p class="mb-2">
                          TENER EN CUENTA: El correo que ingrese debe ser el
                          mismo que ingreso cuando se registro a nuestra pagina

                        </p>
                         <validation-observer
                          ref="observer"
                          v-slot="{ invalid }"
                        >
                        <v-form  @submit.prevent="submit">
                          <validation-provider
                              v-slot="{ errors }"
                              name="Correo"
                              rules="required|email"
                              >
                           <v-text-field
                           v-model="correoSoli"
                            label="Correo"
                            name="Correo"
                            placeholder="ejemplo@gmail.com"
                            class="mt-7"
                            :error-messages="errors"
                            :prepend-inner-icon="icons.mdiEmail"
                            type="text"
                            color="#ae5f9e"
                          />
                          </validation-provider>






              <div class="text-right mt-5">
              <v-btn
              to="/pages/login">
              ya me acordé
              </v-btn>
              <v-btn

              color="purple lighten-2"
              class="mr-4"
              type="submit"
              :disabled="invalid"
            >
              Enviar
            </v-btn>
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
                         </validation-observer>
                      </v-card-text>

</template>
<script>
/* import axios from 'axios'; */
import { required,email} from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
import {
  mdiEmail

} from '@mdi/js'
import axios from 'axios';
setInteractionMode('eager')
extend('required', {
    ...required,
    message: 'El campo {_field_} no puede estar vacio',
  })
  extend('email', {
    ...email,
    message: 'El correo debe ser válido',
  })
export default {
   data: function(){
     return {
       error: false,
      show1: false,
      correoSoli: "",

    }

  },

 components: {
      ValidationProvider,
      ValidationObserver,
    },
  props:{
    changeStateDialog: Function
  },
  methods:{
    submit () {
        this.$refs.observer.validate()

        let url="https://sacris.herokuapp.com/api/credenciales/solicitudContra"
        axios.post(url,{correoSoli:this.correoSoli}).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
        this.changeStateDialog()
      },

  },
  setup() {
    return {
      icons: {
        mdiEmail

      },
    }
  },
};
</script>
