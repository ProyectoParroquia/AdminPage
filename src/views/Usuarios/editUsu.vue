<template>
  <v-dialog
          v-model="dialog"
          max-width="500px"
        >

          <v-card>

            <v-card-title>
              {{formTitle}} {{DataEdit.nombreUsuario}}
            </v-card-title>
             <validation-observer
                 ref="observer"
                 v-slot="{ invalid }"
                 >
            <v-card-text>
              <v-container>

                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                   <validation-provider
                      v-slot="{ errors }"
                      name="Nombre"
                      rules="required|max:25|alpha_spaces|min:3"
                    >
                          <v-text-field
                          color="#ae5f9e"
                            v-model="DataEdit.nombreUsuario"
                            :counter="25"
                            :error-messages="errors"
                            label="Nombre"
                            required
                          ></v-text-field>
                          </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                     <validation-provider
                        v-slot="{ errors }"
                        name="Apellido"
                        rules="required|max:25|alpha_spaces|min:4"
                      >
                        <v-text-field
                          v-model="DataEdit.apellidoUsuario"
                          :counter="25"
                          :error-messages="errors"
                          label="Apellido"
                          required
                        ></v-text-field>
                      </validation-provider>

                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                   <validation-provider
                      v-slot="{ errors }"
                      name="Correo"
                      rules="required|email"
                    >
                      <v-text-field
                        v-model="DataEdit.correoUsuario"
                        :error-messages="errors"
                        label="correo"
                        required
                      ></v-text-field>
                    </validation-provider>

                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                   <validation-provider
        v-slot="{ errors }"
        name="select"
        rules="required"
      >

        <v-autocomplete
          clearable
          v-model="DataEdit.tipoDoc.denominacionTipoDocumento"
          :items="itemSelectName"
          :error-messages="errors"
          label="Tipo Documento"
          data-vv-name="DataEdit.idTipoDoc"
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <validation-provider
        v-slot="{ errors }"
        name="NumeroDocumento"
        rules="required|max:10|numeric|min:5"
      >
        <v-text-field
          v-model="DataEdit.numeroDocumentoUsuario"
          :counter="10"
          :error-messages="errors"
          label="Numero Documento"
          required
        ></v-text-field>
      </validation-provider>

                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                   <validation-provider
        v-slot="{ errors }"
        name="FechaNacimiento"
        rules="required|max:10|min:10"
      >
        <v-text-field
          type="date"
          v-model="DataEdit.fechaNacimientoUsuario"
          :counter="10"
          :error-messages="errors"
          label="Fecha Nacimiento"
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
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
            </validation-observer>
          </v-card>

        </v-dialog>
</template>

<script>
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

import { ref } from '@vue/composition-api'

export default {
    components:{
      ValidationProvider,
       ValidationObserver

},
 props: {
    DataEditar: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {

    const DataEdit = ref(JSON.parse(JSON.stringify(props.DataEditar)))

    const resetForm = () => {
      DataEdit.value = JSON.parse(JSON.stringify(props.DataEditar))
    }

    return {
      status,
      DataEdit,
      resetForm,

    }
  },
}
</script>
