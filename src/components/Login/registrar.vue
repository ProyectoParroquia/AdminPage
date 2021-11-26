<template>
    <v-card-text class="mt-12">
       <h1
          class="text-center display-10 purple--text text--light2"
       >Registrar</h1>
          <validation-observer
            ref="observer"
            v-slot="{ invalid }"
          >
         <v-form @submit.prevent="submit">

        <v-container>
        <v-stepper v-model="e1">
        <v-stepper-header>
          <template v-for="n in steps">
            <v-stepper-step
            color="purple lighten-2"

              :key="`${n}-step`"
              :complete="e1 > n"
              :step="n"

            >
              Paso {{ n }}
            </v-stepper-step>

            <v-divider
              v-if="n !== steps"
              :key="n"
            ></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            :key="`1-content`"
            :step="1"
          >
            <v-card
              class="mb-12"
            >
              <v-row >
                  <v-col cols="12" md="6">
                     <validation-provider
                      v-slot="{ errors }"
                      name="Nombre"
                      rules="required|max:25|alpha_spaces|min:3"
                    >
                          <v-text-field
                          color="#ae5f9e"
                            v-model="form.nombreUsuario"
                            :counter="25"
                            :error-messages="errors"
                            label="Nombre"
                            required
                          ></v-text-field>
                    </validation-provider>
                  </v-col>

                  <v-col>
                    <validation-provider
                        v-slot="{ errors }"
                        name="Apellido"
                        rules="required|max:25|alpha_spaces|min:4"
                      >
                        <v-text-field
                        color="#ae5f9e"
                          v-model="form.apellidoUsuario"
                          :counter="25"
                          :error-messages="errors"
                          label="Apellido"
                          required
                        ></v-text-field>
                    </validation-provider>
                  </v-col>

              </v-row>
              <v-row>
                  <v-col >

                        <validation-provider
                          v-slot="{ errors }"
                          name="FechaNacimiento"
                          rules="required|max:10|min:10"
                        >

                          <v-text-field
                            color="#ae5f9e"
                            type="date"
                            readonly
                            v-model="form.fechaNacimientoUsuario"
                            :counter="10"
                            :error-messages="errors"
                            label="Fecha Nacimiento"
                            required
                            clearable
                            @click="menu = true"
                          ></v-text-field>
                          <v-dialog

                          max-width="300px"
                           ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                          >
                          <v-date-picker
                                v-model="form.fechaNacimientoUsuario"
                                :active-picker.sync="activePicker"
                                :error-messages="errors"
                                required
                                max="2010-12-31"
                                min="1930-01-01"
                                @change="saveDate"
                              ></v-date-picker>
                          </v-dialog>
                        </validation-provider>
                      </v-col>
                      <v-col>
                         <validation-provider
                              v-slot="{ errors }"
                              name="NumeroContacto"
                              rules="required|max:13|numeric|min:7"
                            >
                                  <v-text-field
                                    color="#ae5f9e"
                                    v-model="form.numeroContacto"
                                    :counter="13"
                                    :error-messages="errors"
                                    label="Numero de Contacto"
                                    required
                                  ></v-text-field>
                            </validation-provider>
                      </v-col>


              </v-row>
            </v-card>

             <div class="text-right">
            <v-btn
            dark
              color="purple lighten-2"
              @click="e1++"
            >
              Continuar
            </v-btn>
             </div>

          </v-stepper-content>

          <v-stepper-content
            :key="`2-content`"
            :step="2"
          >
            <v-card
              class="mb-12"
            >
                  <v-row >
                        <v-col cols="12" md="6">
                          <validation-provider
                            v-slot="{ errors }"
                            name="select"
                            rules="required"
                          >

                            <v-autocomplete
                              color="#ae5f9e"
                              clearable
                              v-model="form.tipoDoc"
                              :items="form.items"
                              :error-messages="errors"
                              label="Tipo Documento"
                              data-vv-name="form.idTipoDoc"
                              required
                            >
                            <template v-slot:no-data>
                            <v-list-item>
                              <v-list-item-title>
                                No se encontraron
                                <strong>datos</strong>
                              </v-list-item-title>
                            </v-list-item>
                          </template>

                            </v-autocomplete>
                          </validation-provider>
                        </v-col>

                        <v-col>
                           <validation-provider
                              v-slot="{ errors }"
                              name="NumeroDocumento"
                              rules="required|max:10|numeric|min:5"
                            >
                                  <v-text-field
                                    color="#ae5f9e"
                                    v-model="form.numeroDocumentoUsuario"
                                    :counter="10"
                                    :error-messages="errors"
                                    label="Numero Documento"
                                    required
                                  ></v-text-field>
                            </validation-provider>

                        </v-col>

                  </v-row>

                  <!-- Validacion de correos -->
                  <v-row>
                       <v-col cols="12" md="6" >
                     <validation-provider
                     vid="confirmationEmail"
                        v-slot="{ errors }"
                        name="Correo"
                        rules="required|email"
                        >
                        <v-text-field
                        color="#ae5f9e"
                          v-model="form.correoUsuario"
                          :error-messages="errors"
                          label="correo"
                          required
                        ></v-text-field>
                      </validation-provider>
                  </v-col>

                   <v-col>
                     <validation-provider
                        v-slot="{ errors }"
                        name="Correo"
                        rules="required|confirmed:confirmationEmail"
                        >
                        <v-text-field
                        color="#ae5f9e"
                          v-model="form.correoUsuarioV"
                          :error-messages="errors"
                          label="Confirmación correo"
                          required
                        ></v-text-field>
                      </validation-provider>
                  </v-col>
                  </v-row>
            </v-card>

             <div class="text-right">
               <v-btn @click="e1--">
              Atras
            </v-btn>
            <v-btn
            dark
              color="purple lighten-2"
              @click="e1++"

            >
              Continuar
            </v-btn>


             </div>
          </v-stepper-content>

          <v-stepper-content
            :key="`3-content`"
            :step="3"
          >
            <v-card
              class="mb-12"
            >
            <v-row>
                  <v-col >
                     <validation-provider
                        v-slot="{ errors }"
                        name="usuario"
                        rules="required|max:10|alpha_dash|min:4"
                        >
                          <v-text-field
                            color="#ae5f9e"

                            v-model="form.username"
                            :counter="10"
                            :error-messages="errors"
                            label="Nombre Usuario"
                            required
                          ></v-text-field>
                      </validation-provider>
                  </v-col>
              </v-row>

              <!-- Validacion contraseñas -->
              <v-row >
                  <v-col cols="12" md="6" mt="10">
                    <validation-provider
                        vid="confirmation"
                        v-slot="{ errors }"
                        name="contraseña"
                        :rules="{ required, regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/, min:8 }"
                      >
                          <v-text-field
                            color="#ae5f9e"
                            v-model="form.password"
                            :counter="20"
                            hint="Obliagorio: Letra en mayuscula, en minuscula, un número y un caracter especial"
                            :append-icon="show1 ? icons.mdiEyeOutline :icons.mdiEyeOffOutline"
                            :type="show1 ? 'text' : 'password'"
                            :error-messages="errors"
                            label="Contraseña"
                            required
                            @click:append="show1 = !show1"
                          ></v-text-field>
                    </validation-provider>
                  </v-col>

                  <v-col>
                     <validation-provider
                        v-slot="{ errors }"
                        name="contraseña"
                        rules="required|confirmed:confirmation"
                      >
                        <v-text-field
                          color="#ae5f9e"
                          v-model="form.passwordV"
                          :counter="20"
                          :append-icon="show2 ? icons.mdiEyeOutline :icons.mdiEyeOffOutline"
                          :type="show2 ? 'text' : 'password'"
                          :error-messages="errors"
                          label="Confirmar Contraseña"
                          required
                          @click:append="show2 = !show2"
                        ></v-text-field>


                      </validation-provider>

                  </v-col>

                    </v-row>
                    <v-row>
                       <v-col>
                     <validation-provider
                        v-slot="{ errors }"
                        name="contraseña"
                        rules="required"
                      >
                   <v-checkbox
                    v-model="politicas"
                    label="Politicas"
                    :error-messages="errors"
                    color="primary"
                    value="error"
                    hide-details
                  >
                  <template v-slot:label>
                    <div>
                      Estoy de acuerdo con
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a
                            target="_blank"
                            @click="VerTerminos()"
                            v-on="on"
                          >
                            los terminos y condiciones
                          </a>
                        </template>
                        Ver los terminos y condiciones
                      </v-tooltip>
                      de Sacris
                    </div>
                  </template>
                  </v-checkbox>
                     </validation-provider>
                  </v-col>
                    </v-row>

            </v-card>
            <div class="text-right">
              <v-btn @click="e1--">
              Atras
            </v-btn>
              <v-btn

              color="purple lighten-2"
              class="mr-4"
              type="submit"
              @click="guardar"
              :disabled="invalid"
            >
              Guardar
            </v-btn>



            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

      </v-container>
                        </v-form>
                          </validation-observer>
        <!-- Dialog para terminos y condiciones -->
           <v-dialog
          v-model="TerminosDialog"
          max-width="650px"
        >
          <Terminos key="key" :VerTerminos="VerTerminos" />
        </v-dialog>

        <!-- ALERTA -->

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
                      </v-card-text>


</template>
<script>
  import { required, digits, email, max, min, regex, alpha_spaces, numeric, alpha_dash, confirmed} from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  import axios from 'axios';
  import {
  mdiEyeOffOutline,
  mdiEyeOutline

} from '@mdi/js'
import Terminos from './terminos.vue';

/* import step from '@/components/Login/step.vue'; */

setInteractionMode('eager')
    extend('confirmed', {
    ...confirmed,
    message: 'El campo {_field_} no coincide ',
  })

   extend('alpha_dash', {
    ...alpha_dash,
    message: 'El campo {_field_} puede contener letras, numeros y guiones ',
  })

   extend('numeric', {
    ...numeric,
    message: 'El campo {_field_} solo debe contener numeros',
  })

  extend('alpha_spaces', {
    ...alpha_spaces,
    message: 'El campo {_field_} solo debe tener caracteres alfabeticos y espacios',
  })

  extend('digits', {
    ...digits,
    message: 'El campo {_field_} debe tener {length} digitos. ({_value_})',
  })

  extend('required', {
    ...required,
    message: 'El campo {_field_} no puede estar vacio',
  })

  extend('max', {
    ...max,
    message: 'El campo {_field_} no puede tener más de {length} caracteres',
  })

  extend('min', {
    ...min,
    message: 'El campo {_field_} debe tener minimo {length} caracteres',
  })

  extend('regex', {
    ...regex,
    message: 'La contraseña {_value_} no coincide con las reglas especificadas. Minusculas, mayusculas, numeros y caracter especial ',
  })

  extend('email', {
    ...email,
    message: 'El correo debe ser válido',
  })

export default {
  components: {
      ValidationProvider,
      ValidationObserver,
    Terminos,
    },
    props:{
      metodo: {
        type:Function,
        default: null
      },
      titulo: {
        type:String,
        default: "Registrarse"
      },
    },
    data:function(){
        return {
          //?Checkbox
          politicas:false,
          //?dialog terminos
          TerminosDialog:false,
          //! Fecha
           activePicker: null,
           menu: false,
           date: null,

          key:0,

          e1: 1,
            steps: 3,
          show1: false,
          show2: false,
            tokenLogin: localStorage.getItem('token'),
            form:{
                "nombreUsuario": "",
                "apellidoUsuario": "",
                "numeroContacto":"",
                "correoUsuario": "",
                "correoUsuarioV": "",

                "tipoDoc": "",
                  "items": [

                  ],
                "numeroDocumentoUsuario": "",
                "fechaNacimientoUsuario": "",

                "username": "",
                "password":"",
                "passwordV":"",

                "idTipoDoc_FK":""

            },
            items:{},
            snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
              color:''
            }
        }
    },

        watch: {
            steps (val) {
            if (this.e1 > val) {
                this.e1 = val
            }
            },

            //! FECHA
            menu (val) {
              val && setTimeout(() => (this.activePicker = 'YEAR'))
            },
        },

         methods: {
          //?politicas

           VerTerminos(){
      this.TerminosDialog = !this.TerminosDialog
      this.key ++
    },

      submit () {
        this.$refs.observer.validate()
      },
      saveDate (date) {
        this.$refs.menu.save(date)
      },

      setformActualizar(){
        this.form.nombreUsuario = this.dataform.nombreUsuario
      },


      guardar(){
            /* this.form.token = localStorage.getItem("token");  */
            this.items.forEach(el => {
                if(el.denominacionTipoDocumento == this.form.tipoDoc){
                  this.form.idTipoDoc_FK = el.idTipoDocumento
                }
              });

            axios.post("http://localhost:3000/api/usuarios",this.form/* , {headers: { token:this.tokenLogin } }*/ )
            .then(res =>{
                console.log(res);
                if(res.status === 201){
                  this.Snackbar(res.data.success, "green")
                  setTimeout((this.metodo)?this.metodo:this.$router.go(0),1000);
                }else{
                  if(res.data.err){
                    this.Snackbar(res.data.err, "red")
                  }
                  if(res.data.err.errors){
                    res.data.err.errors.forEach(element => {

                      this.Snackbar(element.message, "red")
                    });
                  }else if(res.data.err.errors[0].message){
                    res.data.err.errors.forEach(el => {
                      this.Snackbar(el.message, "red")
                    })
                  }else{
                    console.log(res.data.err)
                    this.Snackbar(res.data.err, "red")
                  }

                }

            })

        },

        Snackbar(texto, color) {
          this.snackbarData.text=texto,
            this.snackbarData.snackbar=true
            this.snackbarData.color=color
        },
        initialize(){
        let direccion = "http://localhost:3000/api/tipoDoc/";
                axios.get(direccion/* ,{headers: { token:this.tokenLogin } } */).then( res =>{
                res.data.forEach(el => {
                    this.form.items.push(el.denominacionTipoDocumento)

                  });
                this.items = res.data;

                  });
    },


    },

  created() {
    this.initialize()
  },
  setup() {
    return {
      icons: {
        mdiEyeOffOutline,
        mdiEyeOutline

      },
    }
  },

}
</script>
