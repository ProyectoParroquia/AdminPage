<template>

  <v-data-table

  :items-per-page="5"
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
        <v-toolbar-title v-if="BotonConsultaTexto=='Inactivos'">Usuarios</v-toolbar-title>
        <v-toolbar-title v-else>Usuarios Inactivos</v-toolbar-title>
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
            <!-- Botones header -->
        <template v-slot:activator="{ on }">

          <v-tooltip bottom
          v-on="on"
          color="secondary">
             <template v-slot:activator="{ on, attrs }">
              <v-btn
              color="primary"
              dark

              v-bind="attrs"
              v-on="on"
              @click="abrir()"
              fab
              small
            >
              <v-icon
              >{{icons.mdiPlus}}</v-icon>
            </v-btn>
             </template>
             <span>Crear Usuario</span>
          </v-tooltip>


            <v-tooltip bottom
            color="secondary">
              <template v-slot:activator="{ on, attrs }">
               <v-btn

              color="primary"
              dark
              class=" mx-3"
              v-bind="attrs"
              v-on="on"
              @click="consultarInactivos()"
              fab
              small
            >
              <v-icon v-if="BotonConsultaTexto=='Inactivos'">
                {{icons.mdiAccountArrowRight}}
              </v-icon>
              <v-icon v-else>
                {{icons.mdiAccountArrowLeft}}
              </v-icon>
            </v-btn>
            </template>
            <span>Consultar {{BotonConsultaTexto}}</span>

            </v-tooltip>

        </template>

<!-- carta para llamar componente de registro=crear -->
<v-card >
  <v-card-text style="padding-top:5px;">
          <registrar :key="keyNuevoUsu"  :metodo="()=>{closeNuevo(); initialize()}"/>
  </v-card-text>

</v-card>
        </v-dialog>

        <!-- Dialog para editar Usuario -->
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <editarUsu
            :key="keyEditarUsu"
            :consultarInactivos="consultarInactivos"
            :itemSelectName="itemSelectName"
            :itemSelect="itemSelect"
            :Snackbar="Snackbar"
            :editedItem="editedItem"
            :close="close"
            :initialize="initialize"
          />
        </v-dialog>


        <!-- Dialog para editar tipo usu -->
          <v-dialog
          v-model="dialogTipoUsu"
          max-width="500px"
        >
        <editar-ti-usu
        :key="keyEditarTiUsu"
        :editedItem="editedItem"
        :initialize="initialize"
        :itemSelectNameTU="itemSelectNameTU"
        :itemSelectTU="itemSelectTU"
        :closeTipoUsu="closeTipoUsu"
        :Snackbar="Snackbar"
        />

        </v-dialog>

        <!-- Dialog para cambiar de estado Usuario -->

         <v-dialog
          v-model="dialogDelete"
          max-width="500px"
        >
         <!--  <eliminar
          :key="keyEliminarUsu"
          :valorBoton="valorBoton"
          :initialize="initialize"
          :Snackbar="Snackbar" :editedItem="editedItem"
          :closeDelete="closeDelete"
          /> -->
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
                    color="white"
                    text
                    icon

                    v-bind="attrs"
                    @click="snackbarData.snackbar = false"
                  >

                   <v-icon>
                    {{ icons.mdiCloseCircleOutline}}
                     </v-icon>
                  </v-btn>
                </template>
              </v-snackbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-speed-dial
      open-on-hover
      transition="slide-x-reverse-transition"
      direction="left"
    >
      <template v-slot:activator>

        <v-btn

          color="primary"
          dark
          fab
          small
        >
          <v-icon>

            {{icons. mdiDotsHorizontal}}
          </v-icon>
        </v-btn>
      </template>
      <!-- Boton para editar Usuario -->
      <v-tooltip bottom
       color="secondary"
       >
      <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        dark
        small
        color="green lighten-1"
        v-bind="attrs"
          v-on="on"
      >
        <v-icon
        @click="editItem(item)"
        >{{icons.mdiPencil}}</v-icon>
      </v-btn>
      </template>
      <span>Editar Usuario</span>
    </v-tooltip>
    <!-- Boton para cambiar de TIPO USUARIO -->
    <v-tooltip bottom
     color="secondary">
      <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        dark
        small
        color="blue lighten-1"
        v-bind="attrs"
          v-on="on"
      >
        <v-icon
        @click="editTiUsu(item)"
        >{{icons.mdiAccountEdit}}</v-icon>
      </v-btn>
      </template>
      <span>Cambiar tipo Usuario</span>
    </v-tooltip>
      <!-- Boton para cambiar de estado al usuario -->
    <v-tooltip bottom
     color="secondary">
      <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        dark
        small
        color="red lighten-1"
        v-bind="attrs"
          v-on="on"
      >
        <v-icon
        @click="deleteItem(item)"
        v-if="BotonConsultaTexto=='Inactivos'"
        >
                {{icons.mdiAccountOff }}
              </v-icon>
              <v-icon
              @click="deleteItem(item)"
              v-else>
                {{icons.mdiAccountPlus}}
        </v-icon>
      </v-btn>
      </template>
      <span v-if="BotonConsultaTexto=='Inactivos'">

        Inactivar a {{item.nombreUsuario}}
      </span>
      <span v-else>
        Activar a {{item.nombreUsuario}}
      </span>
    </v-tooltip>

    </v-speed-dial>
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
  mdiAccountEdit,
  mdiMinusCircle,
  mdiMagnify,
  mdiAccountPlus,
  mdiAccountOff,
  mdiDotsHorizontal,
  mdiPlus,
  mdiAccountArrowLeft,
  mdiAccountArrowRight,
   mdiCloseCircleOutline

} from '@mdi/js'
import axios from 'axios';
import registrar from './NewUsu.vue';/*
import eliminar from './DeleteUsu.vue' */
import editarUsu from './editUsu.vue';
import editarTiUsu from './editarTipoUsu.vue'


 export default {
    components:{
    registrar,
    /* eliminar, */
    editarUsu,
    editarTiUsu
  },

  data: () => ({

     //?ALERTA
      snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
              color:''
            },

    oculto:false,
    mostrado:true,
    keyNuevoUsu:0,
    keyEditarUsu:0,
    keyEditarTiUsu:0,
    keyEliminarUsu:0,
    valorBoton:true,
    BotonConsultaTexto:"Inactivos",
    tokenLogin: localStorage.getItem('token'),
    dialog: false,
    dialogDelete: false,
    dialogTipoUsu:false,
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
      { text: 'Contacto', value: 'numeroContacto' },
      { text: 'Tipo Doc', value: 'tipoDoc.denominacionTipoDocumento' },
      { text: 'Documento', value: 'numeroDocumentoUsuario' },
      { text: 'Nacimiento', value: 'fechaNacimientoUsuario' },
      { text: 'Usuario', value: 'tipoUsuario.nombreTipoUsuario' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    data: [],

    editedItem: {},
     itemSelect: [],
     itemSelectTU: [],
     itemSelectName: [],
     itemSelectNameTU: [],
    defaultItem: {
      idUsuario: 0,
     nombreUsuario: '',
      apellidoUsuario: '',
      numeroContacto:'',
      correoUsuario: '',
      tipoDoc: 0,
      numeroDocumentoUsuario:0,
      fechaNacimientoUsuario: 0,
      tipoUsuario: 0,
    },
  }),

  watch: {
    dialog(val)
    {
      val || this.close()
    },
    dialogDelete(val)
    {
      val || this.closeDelete()
    },
    dialogTipoUsu(val)
    {
      val || this.closeTipoUsu()
    },
    dialogNuevo(val)
    {
      val|| this.closeNuevo()
      },


  },

  created() {
    this.initialize()
  },

  methods: {
    saveDate (date) {
        this.$refs.menu.save(date)
      },
    abrir(){
      this.dialogNuevo = true
      this.keyNuevoUsu ++
    },
    initialize() {
      /* this.BotonConsultaTexto = "Inactivos"
      this.valorBoton = true */
      let direcciondoc = "http://localhost:3000/api/tipoDoc/";
                axios.get(direcciondoc/* ,{headers: { token:this.tokenLogin } } */)
                .then( res =>{
                  res.data.forEach(el => {
                    this.itemSelectName.push(el.denominacionTipoDocumento)
                  });
                this.itemSelect = res.data
                  });


      let direccionTUsu = "http://localhost:3000/api/tipoUsuario/si/";
                axios.get(direccionTUsu).then(res=>{

                  console.log(res)
                    res.data.forEach(el => {
                      this.itemSelectNameTU.push(el.nombreTipoUsuario)
                    });
                  this.itemSelectTU = res.data
                })


        let direccion = "http://localhost:3000/api/usuarios";
        axios.get(direccion, { headers: { token:this.tokenLogin } })
                    .then( res =>{
                this.data = res.data;
                  });
    },

    editItem(item) {
      this.editedItem = item
      console.log(this.editedItem)
      this.keyEditarUsu ++
      this.dialog = true

    },
     editTiUsu(item) {
      this.editedItem = item
      console.log(this.editedItem)
      this.keyEditarTiUsu ++
      this.dialogTipoUsu = true

    },

    deleteItem(item) {
      this.editedItem =  item
      console.log(this.editedItem.nombreUsuario)
      this.keyEliminarUsu ++
      this.dialogDelete = true

    },

     deleteItemConfirm() {
      let cambioEstado
      if(this.valorBoton){
        cambioEstado = "inhabilitar"
      }else{
        cambioEstado = "activar"
      }




      axios.put("http://localhost:3000/api/usuarios/"+cambioEstado+"/"+this.editedItem.idUsuario, this.editedItem,{headers: { token:this.tokenLogin } })
              .then( res =>{
                console.log(res)
                 if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")
                this.valorBoton=!this.valorBoton
                  this.consultarInactivos()
                 }else{
                   this.Snackbar("Error",res.data.mensage,"danger");
              console.log("Error")
                 }
              })
      this.closeDelete()
    },

    //?ALERTA
     Snackbar(texto, color) {
          this.snackbarData.text=texto,
            this.snackbarData.snackbar=true
            this.snackbarData.color=color
        },

    close() {
      this.dialog = false
        this.editedItem = Object.assign({}, this.defaultItem)
        this.initialize()



    },
    closeNuevo(){
      this.dialogNuevo = false
    },
    closeTipoUsu(){
      this.dialogTipoUsu = false

      this.initialize()
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)

      })
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


                 let direccion = "http://localhost:3000/api/usuarios"+varestado;
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
        mdiAccountEdit,
         mdiCloseCircleOutline,
        mdiMagnify,
        mdiAccountPlus,
        mdiAccountOff,
        mdiDotsHorizontal,
        mdiPlus,
        mdiAccountArrowLeft,
        mdiAccountArrowRight
      },
    }
  },


}
</script>
