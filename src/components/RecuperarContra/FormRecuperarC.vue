<template>

    <v-card-text class="mt-12 p-5">
                        <h1
                          class="text-center display-10 purple--text text--light2 mb-4"
                        >Recuperar Contraseña🔓</h1>

                        <p class="mb-4">
                          RECOMENDACION: Usar una contraseña que pueda recordar y  a la vez sea segura

                        </p>
                         <validation-observer
                          ref="observer"
                          v-slot="{ invalid }"
                        >
                        <v-form  @submit.prevent="submit">
                          <!--  Validacion contraseñas-->

                       <validation-provider
                        vid="confirmation"
                        v-slot="{ errors }"
                        name="contraseña"
                        rules="required|min:8|alpha_dash"
                      >
                          <v-text-field
                            color="#ae5f9e"
                            v-model="password"
                            :counter="30"
                            :prepend-inner-icon="icons.mdiLock"
                            :append-icon="show1 ?icons.mdiEyeOffOutline :icons.mdiEyeOutline"
                            :type="show1 ? 'text' : 'password'"
                            :error-messages="errors"
                            label="Nueva Contraseña"
                            required
                            @click:append="show1 = !show1"
                          ></v-text-field>
                    </validation-provider>

                     <validation-provider
                        v-slot="{ errors }"
                        name="contraseña"
                        rules="required|confirmed:confirmation"
                      >
                        <v-text-field
                          color="#ae5f9e"
                          v-model="passwordV"
                          :counter="30"
                          :prepend-inner-icon="icons.mdiLock"
                          :append-icon="show2 ?icons.mdiEyeOffOutline :icons.mdiEyeOutline"
                          :type="show2 ? 'text' : 'password'"
                          :error-messages="errors"
                          label="Confirmar Nueva Contraseña"
                          required
                          @click:append="show2 = !show2"
                        ></v-text-field>


                      </validation-provider>


              <div class="text-right mt-5">
              <v-btn

              color="primary"
              class="mr-4"
              type="submit"
              :disabled="invalid"
            >
              Guardar
            </v-btn>
              </div>

                        </v-form>
                         </validation-observer>
                      </v-card-text>
</template>
<script>
/* import axios from 'axios'; */
import { required, min, regex, alpha_dash, confirmed} from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
import {
  mdiEyeOffOutline,
          mdiEyeOutline,
          mdiLock,

} from '@mdi/js'
import axios from 'axios'
setInteractionMode('eager')
extend('required', {
    ...required,
    message: 'El campo {_field_} no puede estar vacio',
  })
    extend('confirmed', {
    ...confirmed,
    message: 'El campo {_field_} no coincide ',
  })

   extend('alpha_dash', {
    ...alpha_dash,
    message: 'El campo {_field_} puede contener letras, numeros y guiones ',
  })
  extend('min', {
    ...min,
    message: 'El campo {_field_} debe tener minimo {length} caracteres',
  })

  extend('regex', {
    ...regex,
    message: 'el campo {_field_} {_value_} no coincide {regex}',
  })
export default {
   data: function(){
     return {
      error:'',
      passToken: getParameterByName('tokenpass'),
      show1: false,
      show2: false,
     "password":"",
      "passwordV":"",

    }
  },
  props:{
    changeStateDialog: Function
  },
 components: {
      ValidationProvider,
      ValidationObserver,
    },
  methods:{
    submit () {
        this.$refs.observer.validate()
        let url="http://localhost:3000/api/credenciales/restablecercontra"
        axios.put(url, {nuevaContraseña:this.password},{headers:{tokenpass:this.passToken}}).then(res=>{
          console.log(res)
        }).catch(error=>{
          console.log(error)
        })

        this.changeStateDialog()
      },
  },
  mounted:()=>{/*
    this.passToken = getParameterByName('tokenpass') */
  },
  setup() {
    return {
      icons: {
        mdiEyeOffOutline,
          mdiEyeOutline,
          mdiLock,
      },
    }
  },
};
function getParameterByName(name) { name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]"); var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); }

</script>
