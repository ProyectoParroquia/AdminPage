<template>

  <v-data-table
    :headers="headers"
    :items="desserts"
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
          <registrar :titulo="formTitle"/>
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
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >


                    <v-text-field
                      v-model="editedItem.nombreUsuario"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >


                    <v-text-field
                      v-model="editedItem.apellidoUsuario"
                      label="Apellido"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.correoUsuario"
                      label="Correo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.idTipoDoc_FK"
                      label="Tipo Documento"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.numeroDocumentoUsuario"
                      label="Numero Documento"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fechaNacimientoUsuario"
                      label="Fecha Nacimiento"
                      type="date"
                    ></v-text-field>
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
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
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
 export default {
    components:{

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
        sortable: false,
        value: 'nombreUsuario',
      },
      {
        text: 'Apellido',
        align: 'start',
        sortable: false,
        value: 'apellidoUsuario',
      },
      { text: 'Correo', value: 'correoUsuario' },
      { text: 'Tipo Docu', value: 'tipoDoc.denominacionTipoDocumento' },
      { text: 'Num. Docu', value: 'numeroDocumentoUsuario' },
      { text: 'Fecha Nacimiento', value: 'fechaNacimientoUsuario' },
      { text: 'Tipo Usu', value: 'tipoUsuario.nombreTipoUsuario' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      idUsuario: 0,
      nombreUsuario: '',
      apellidoUsuario: '',
      correoUsuario: '',
      //hacer select
      idTipoDoc_FK: 0,
      numeroDocumentoUsuario:0,
      fechaNacimientoUsuario: '',
      tipoUsuario: 0,


    },
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
        let direccion = "http://localhost:3000/api/usuarios";
        axios.get(direccion, { headers: { token:this.tokenLogin } })
                    .then( res =>{
                        console.log(res)
                this.desserts = res.data;
                console.log(this.desserts)
                  });
    },

    editItem(item) {
      this.editedItem = Object.assign({}, item)
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
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })

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
      if (this.editedItem.idUsuario >= 1) {
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
      }else{
        console.log("pan")

        try{
          console.log("hola?")
          axios.post("http://localhost:3000/api/usuarios", this.editedItem)
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
          }catch(e){
            console.log("ouno :(")
          }

      }
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
                 let direccion = "http://localhost:3000/api/usuarios"+varestado;
                axios.get(direccion, { headers: { token:this.tokenLogin } } ).then( res =>{
                    this.desserts = res.data;
                    console.log(this.desserts)
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
