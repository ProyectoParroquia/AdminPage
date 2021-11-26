<template>
  <v-card
    flat
    class="mt-5"
  >
   <validation-observer
                          ref="observer"
                          v-slot="{ invalid }"
                        >
    <v-form @submit.prevent="submit">
      <div class="px-3">
        <v-card-text class="pt-5">
          <v-row>
            <v-col
              cols="12"
              sm="8"
              md="6"
            >
            <validation-provider
                  vid="confirmation"
                   v-slot="{ errors }"
                  name="contraseña"
                  rules="required"
               >
              <!-- current password -->
              <v-text-field
                v-model="currentPassword"
                :type="isCurrentPasswordVisible ? 'text' : 'password'"
                :append-icon="isCurrentPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                label="Contraseña Actual"
                :error-messages="errors"
                outlined
                dense
                @click:append="isCurrentPasswordVisible = !isCurrentPasswordVisible"
              ></v-text-field>
            </validation-provider>
               <validation-provider
                  vid="confirmation"
                   v-slot="{ errors }"
                  name="contraseña"
                  :rules="{ required, regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/, min:8 }"
               >
              <!-- new password -->
              <v-text-field
                v-model="newPassword"
                :type="isNewPasswordVisible ? 'text' : 'password'"
                :append-icon="isNewPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                label="Nueva Contraseña"
                :error-messages="errors"
                outlined
                dense
                hint="Asegúrese de que tenga al menos 8 caracteres."
                persistent-hint
                @click:append="isNewPasswordVisible = !isNewPasswordVisible"
              ></v-text-field>
               </validation-provider>
              <!-- confirm password -->
               <validation-provider
                        v-slot="{ errors }"
                        name="contraseña"
                        rules="required|confirmed:confirmation"
                      >
              <v-text-field
                v-model="cPassword"
                :type="isCPasswordVisible ? 'text' : 'password'"
                :append-icon="isCPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                label="Confirmación de contraseña nueva"
                :error-messages="errors"
                outlined
                dense
                class="mt-3"
                @click:append="isCPasswordVisible = !isCPasswordVisible"
              ></v-text-field>
               </validation-provider>
            </v-col>

            <v-col
              cols="12"
              sm="4"
              md="6"
              class="d-none d-sm-flex justify-center position-relative"
            >
              <v-img
                contain
                max-width="170"
                src="@/assets/images/3d-characters/pose-m-1.png"
                class="security-character"
              ></v-img>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <!-- divider -->
      <v-divider></v-divider>

      <!-- <div class="pa-3">
        <v-card-title class="flex-nowrap">
          <v-icon class="text--primary me-3">
            {{ icons.mdiKeyOutline }}
          </v-icon>
          <span class="text-break">Autenticación de dos factores</span>
        </v-card-title>

        <v-card-text class="two-factor-auth text-center mx-auto">
          <v-avatar
            color="primary"
            class="primary mb-4"
            rounded
          >
            <v-icon
              size="25"
              color="white"
            >
              {{ icons.mdiLockOpenOutline }}
            </v-icon>
          </v-avatar>
          <p class="text-base text--primary font-weight-semibold">
            La autenticación de dos factores aún no está habilitada
          </p>
          <p class="text-sm text--primary">
            La autenticación de dos factores agrega una capa adicional
            de seguridad a su cuenta al requerir algo más que una
            contraseña para iniciar sesión.
          </p>
        </v-card-text> -->

        <!-- action buttons -->
        <v-card-text>
          <v-btn
            color="primary"
            class="me-3 mt-3"
            type="submit"
            :disabled="invalid"
          >
            Guardar Cambios
          </v-btn>

        </v-card-text>

    </v-form>
   </validation-observer>

           <!-- ALERTAS -->
             <v-snackbar
                v-model="snackbarData.snackbar"
                :timeout="snackbarData.timeout"
                :color="snackbarData.color"
                top
                right
              >

                {{ snackbarData.text }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbarData.snackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { required, min, regex, alpha_dash, confirmed} from 'vee-validate/dist/rules'
 import { extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
import { mdiKeyOutline, mdiLockOpenOutline, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
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
     message: 'La contraseña {_value_} no coincide con las reglas especificadas. Minusculas, mayusculas, numeros y caracter especial ',
  })
export default {
   data: function(){
     return {
       error:'',
      isCurrentPasswordVisible: false,
      isNewPasswordVisible: false,
      isCPasswordVisible: false,
      currentPassword:"",
      newPassword:"",
      cPassword:"",

      snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
              color:''
            }

    }
  },
  components: {
      ValidationProvider,
      ValidationObserver,
    },
  props: {
    securityData: Object
  },

  methods:{
    submit () {
      let body={
        idUsu:this.securityData.idUsuario,
        contraseñaActual:this.currentPassword,
        nuevaContraseña:this.newPassword
      }

      let direccion= "http://localhost:3000/api/credenciales/cambioContra"
       axios.put(direccion, body).then(res=>{
          console.log(res)
          if(res.status === 201){
                  this.Snackbar(res.data.success, "green")
                }else{
                  if(res.data.error){
                    this.Snackbar(res.data.error, "red")
                  }}
        }).catch(error=>{
          console.log(error)
        })
      },
      Snackbar(texto, color) {
          this.snackbarData.text=texto,
            this.snackbarData.snackbar=true
            this.snackbarData.color=color
        },
  },
  mounted:()=>{/*
    this.passToken = getParameterByName('tokenpass') */
  },
  setup() {
    return {
      icons: {
        mdiKeyOutline,
        mdiLockOpenOutline,
        mdiEyeOffOutline,
        mdiEyeOutline
      },
    }
  },
};

</script>

<style lang="scss" scoped>
.two-factor-auth {
  max-width: 25rem;
}
.security-character {
  position: absolute;
  bottom: -0.5rem;
}
</style>
