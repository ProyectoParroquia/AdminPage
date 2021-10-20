<template>

  <v-data-table
  items-per-page=5
    :headers="headers"
    :items="data"
    sort-by="usuarios"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        color = "tableHeader"
        flat
      >
        <v-toolbar-title>Usuarios</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
         <v-text-field
        v-model="search"
        :append-icon="icons.mdiMagnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialogNuevo"
          max-width="500px"
          max-height="500px"
        >

        <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="reseteo()"
            >
              Nuevo Usuario
            </v-btn>
            <v-btn
              color="primary"
              dark
              class="mb-2 mr-4"
              v-bind="attrs"
              @click="consultarInactivos()"
            >
              {{BotonConsultaTexto}}
            </v-btn>
          </template>

<v-card >
  <v-card-text style="padding-top:5px;">
          <registrar :titulo="formTitle" link="/usuarios"/>
  </v-card-text>
</v-card>
        </v-dialog>

        <v-dialog
          v-model="dialog"
          max-width="500px"
        >

          <v-card>

            <v-card-title>
              {{formTitle}} {{editedItem.nombreUsuario}}
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
                            v-model="editedItem.nombreUsuario"
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
                          v-model="editedItem.apellidoUsuario"
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
                        v-model="editedItem.correoUsuario"
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
          v-model="editedItem.numeroDocumentoUsuario"
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
          v-model="editedItem.fechaNacimientoUsuario"
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
        <v-dialog
          v-model="dialogDelete"
          max-width="500px"
        >
          <v-card class="pt-4">
            <v-card-text class="text-h4 text-center font-weight-black"  >
              Cambiar estado

            </v-card-text>
            <v-card-text class="text-h5 text-center" >
                ¿Cambiar el estado de {{editedItem.nombreUsuario}} ?
              </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn

                text
                @click="closeDelete"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"

                @click="deleteItemConfirm"
              >
                Aceptar
              </v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        color="primary"
        class="mr-2"
        @click="editItem(item)"
      >
        {{icons.mdiPencil}}
      </v-icon>
      <v-icon
        color="delete"
        @click="deleteItem(item)"
      >
        {{icons.mdiMinusCircle}}
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-col>
      <p>
      ¡UY! Al parecer no se encuentra información.
      </p>

      </v-col>
    </template>
    <template v-slot:no-results>
      <v-col>
      <p>
      ¡Oops! La información que deseas buscar, no se encuentra.
      </p>
            </v-col>
    </template>

  </v-data-table>

</template>

<script>
import {
  mdiPencil,
  mdiMinusCircle,
  mdiMagnify,

} from '@mdi/js'
import axios from 'axios';
import registrar from '@/components/Login/registrar.vue';
import { required, digits, email, max, min, regex, alpha_spaces, numeric, alpha_dash, confirmed} from 'vee-validate/dist/rules'
import { extend, setInteractionMode,ValidationProvider, ValidationObserver } from 'vee-validate'
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
    components:{
      ValidationProvider,
       ValidationObserver,
    registrar
  },

  data: () => ({
    valorBoton:true,
    BotonConsultaTexto:"Inactivos",
    tokenLogin: localStorage.getItem('token'),
    dialog: false,
    dialogDelete: false,
    dialogNuevo:false,
    search: '',
    headers: [
      {
        text: 'Nombres',
        align: 'start',
        value: 'nombreUsuario',
      },
      {
        text: 'Apellido',
        align: 'start',
        value: 'apellidoUsuario',
      },
      { text: 'Correo', value: 'correoUsuario' },
      { text: 'Tipo Docu', value: 'tipoDoc.denominacionTipoDocumento' },
      { text: 'Num. Docu', value: 'numeroDocumentoUsuario' },
      { text: 'Fecha Nacimiento', value: 'fechaNacimientoUsuario' },
      { text: 'Tipo Usu', value: 'tipoUsuario.nombreTipoUsuario' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    data: [],
    editedIndex: -1,
    editedItem: {},
     itemSelect: {},
     itemSelectName: [],
    defaultItem: {
      idUsuario: 0,
     nombreUsuario: '',
      apellidoUsuario: '',
      correoUsuario: '',
      tipoDoc: 0,
      numeroDocumentoUsuario:0,
      fechaNacimientoUsuario: 0,
      tipoUsuario: 0,
    },
  }),

  computed: {
    formTitle() {
      console.log(21)
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar al Usuario'
    },
  },

  watch: {
    dialog(val)
    {
      val || this.close()
    },
    dialogDelete(val)
    {
      val || this.closeDelete()
    },
    dialogNuevo(val)
    {
      val|| this.closeNuevo()
      }
  },

  created() {
    this.initialize()
  },

  methods: {

    reseteo(){
      this.dialogNuevo = true
      this.editedIndex= -1
      this.editedItem = this.defaultItem
    },
    initialize() {
      let direcciondoc = "http://localhost:3000/api/tipoDoc/";
                axios.get(direcciondoc/* ,{headers: { token:this.tokenLogin } } */)
                .then( res =>{
                  res.data.forEach(el => {
                    this.itemSelectName.push(el.denominacionTipoDocumento)
                  });
                this.itemSelect = res.data
                  });


        let direccion = "http://localhost:3000/api/usuarios";
        axios.get(direccion, { headers: { token:this.tokenLogin } })
                    .then( res =>{
                this.data = res.data;
                  });
    },

    editItem(item) {
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem)
      this.dialog = true
      this.editedIndex= 1
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      this.editedIndex= 1
    },

    deleteItemConfirm() {
      let cambioEstado
      if(this.valorBoton){
        cambioEstado = "inhabilitar"
      }else{
        cambioEstado = "activar"
      }

      axios.put("http://localhost:3000/api/usuarios/"+cambioEstado+"/"+this.editedItem.idUsuario, this.editedItem,{headers: { token:this.tokenLogin } })
              .then( () =>{
                this.valorBoton=!this.valorBoton
                  this.consultarInactivos()
              })
      this.closeDelete()
    },

    close() {
      this.dialog = false
        this.editedItem = Object.assign({}, this.defaultItem)


    },
    closeNuevo(){
      this.dialogNuevo = false
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
        /*  switch (this.editedItem.tipoDoc.denominacionTipoDocumento ) */

              this.itemSelect.forEach(el => {
                if(el.denominacionTipoDocumento == this.editedItem.tipoDoc.denominacionTipoDocumento){
                  this.editedItem.idTipoDoc_FK = el.idTipoDocumento
                }
              });


        this.$refs.observer.validate()
          axios.put("http://localhost:3000/api/usuarios/actualizar/"+this.editedItem.idUsuario, this.editedItem,{ headers: { token:this.tokenLogin } })
          .then(data =>{
            if(data.status===201){
              console.log("correcto")
             /*  this.makeToast("Actualizado",data.data.success,"info");
                   setTimeout(this.salir,1800); */

                this.valorBoton=!this.valorBoton
                  this.consultarInactivos()
            }else{
              /* this.makeToast("Error",data.data.mensage,"danger"); */
              console.log("Error")
            }
          })
      this.close()
    },
    consultarInactivos(){
          let varestado
              if(this.valorBoton){
                varestado ="/inactivos"
                this.BotonConsultaTexto=  "Activos"

              }else{
                varestado = "/" ;
                this.BotonConsultaTexto= "Inactivos"
              }

                /* credencial_token = localStorage(credencial_token) */
                 let direccion = "http://localhost:3000/api/tipoDoc"+varestado;
                axios.get(direccion, { headers: { token:this.tokenLogin } } ).then( res =>{
                    this.data = res.data;
                    console.log(this.data)
                });
                this.valorBoton= !this.valorBoton

            },

  },
  setup() {
    return {
      icons: {
        mdiMinusCircle,
        mdiPencil,
        mdiMagnify,
      },
    }
  },


}
</script>
