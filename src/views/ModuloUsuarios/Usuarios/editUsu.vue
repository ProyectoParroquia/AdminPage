<template>
          <v-card>

            <v-card-title>
              Editar al Usuario: {{editedItem.nombreUsuario}}
            </v-card-title>
             <validation-observer
                 ref="observer"
                 v-slot="{ invalid }"
                 >
            <v-card-text>
              <v-container>

                <v-row>
                  <v-col>
                   <validation-provider
                      v-slot="{ errors }"
                      name="Nombre"
                      rules="required|max:25|alpha_spaces|min:3"
                    >
                          <v-text-field
                          color="#ae5f9e"
                            v-model="editedItem.nombreUsuario"
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
                          v-model="editedItem.apellidoUsuario"
                          :counter="25"
                          :error-messages="errors"
                          label="Apellido"
                          required
                        ></v-text-field>
                      </validation-provider>

                  </v-col>
                   </v-row>
                   <!-- Campo Numero contacto -->
                   <v-row>
                  <v-col>
                   <validation-provider
                      v-slot="{ errors }"
                      name="NumContacto"
                      rules="required|max:13|numeric|min:7"
                    >
                      <v-text-field
                        v-model="editedItem.numeroContacto"
                        :error-messages="errors"
                        label="Contacto"
                        required
                      ></v-text-field>
                    </validation-provider>

                  </v-col>
                   <!-- Campo Fecha nacimiento -->

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
                            v-model="editedItem.fechaNacimientoUsuario"
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
                                v-model="editedItem.fechaNacimientoUsuario"
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

                  </v-row>
                  <!-- Campo Correo -->
                  <v-row>
                  <v-col>
                   <validation-provider
                      v-slot="{ errors }"
                      name="Correo"
                      rules="required|email"
                    >
                      <v-text-field
                        v-model="editedItem.correoUsuario"
                        :error-messages="errors"
                        label="correo"
                        required
                      ></v-text-field>
                    </validation-provider>

                  </v-col>
                  </v-row>
                  <v-row>
                    <!-- Campos de Tipo documeto y Numero -->

                  <v-col>
                   <validation-provider
        v-slot="{ errors }"
        name="select"
        rules="required"
      >

        <v-autocomplete
          clearable
          v-model="editedItem.tipoDoc.denominacionTipoDocumento"
          :items="itemSelectName"
          :error-messages="errors"
          label="Tipo Documento"
          data-vv-name="editedItem.idTipoDoc"
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
                  <v-col >
                  <validation-provider
        v-slot="{ errors }"
        name="NumeroDocumento"
        rules="required|max:10|numeric|min:5"
      >
        <v-text-field
          v-model="editedItem.numeroDocumentoUsuario"
          :counter="10"
          :error-messages="errors"
          label="Numero Documento"
          required
        ></v-text-field>
      </validation-provider>

                  </v-col>
                  </v-row>


              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn

                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"
                :disabled="invalid"
                @click="GuardarActualizacion"
              >
                Guardar
              </v-btn>
            </v-card-actions>
            </validation-observer>
          </v-card>
</template>
<script>
import axios from 'axios'
import { required, digits, email, max, min, regex, alpha_spaces, numeric, alpha_dash, confirmed} from 'vee-validate/dist/rules'
import {ValidationProvider, ValidationObserver, extend, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
    extend('confirmed', {
    ...confirmed,
    message: 'El campo {_field_} no coincide ',
  })

   extend('alpha_dash', {
    ...alpha_dash,
    message: 'El campo {_field_} puede contener caracteres alfanuméricos, así como guiones y guiones bajos.',
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
    message: 'el campo {_field_} {_value_} no coincide {regex}',
  })

  extend('email', {
    ...email,
    message: 'El correo debe ser válido',
  })
export default {
  props:{
    consultarInactivos:Function,
        itemSelectName:Array,
        itemSelect:Array,
        editedItem:Object,
        close:Function,
        Snackbar:Function,
        initialize:Function
    },
  components:{
      ValidationProvider,
       ValidationObserver},
  data:()=>({

     //! Fecha
           activePicker: null,
           menu: false,
           date: null,


  }),
  watch: {

     //! FECHA
            menu (val) {
              val && setTimeout(() => (this.activePicker = 'YEAR'))
            },
  },
  methods:{
    saveDate (date) {
        this.$refs.menu.save(date)
      },


     GuardarActualizacion() {


              this.itemSelect.forEach(el => {
                if(el.denominacionTipoDocumento == this.editedItem.tipoDoc.denominacionTipoDocumento){
                  this.editedItem.idTipoDoc_FK = el.idTipoDocumento
                }
              });


        this.$refs.observer.validate()
          axios.put("http://localhost:3000/api/usuarios/actualizar/"+this.editedItem.idUsuario, this.editedItem,{ headers: { token:this.tokenLogin } })
          .then(res =>{
            if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")


                  this.initialize()
            }else{
              this.makeToast("Error",res.data.mensage,"danger");
              console.log("Error")
            }
          })
      this.close()
    },
  }
}
</script>
