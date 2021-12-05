<template>

  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="5"
    sort-by="idTipoUsuario"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        color = "tableHeader"
        flat
      >
        <v-toolbar-title>Tipo Usuarios</v-toolbar-title>
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
          v-model="dialogEditar"
           max-width="500px"
          max-height="500px"
        >
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
              @click="abrirNuevo()"
              fab
              small
            >
              <v-icon
              >{{icons.mdiPlusThick}}</v-icon>
            </v-btn>
             </template>
             <span>Nuevo Tipo Usuario</span>
          </v-tooltip>

        </template>

          <!-- carta para llamar componente de registro=crear -->
          <v-card >
            <v-card-text style="padding-top:5px;">
                     <editar :key="keyEditarTiUsu" :initialize="initialize" :Snackbar="Snackbar" :datoTU="datoTU" :titulo="titulo"  :cerrarDialogeditarTU="cerrarDialogeditarTU"/>
            </v-card-text>

          </v-card>
        </v-dialog>

        <!-- <v-dialog
        v-model="dialogEditar"
        max-width="500px"
        >
          <editar :key="keyEditarTiUsu" :initialize="initialize" :Snackbar="Snackbar" :datoTU="datoTU" :cerrarDialogeditarTU="cerrarDialogeditarTU"/>
        </v-dialog> -->

        <!-- Dialog para eliminar -->
       <v-dialog
          v-model="dialogEliminar"
          max-width="500px"
        >
          <eliminar
          :key="keyEliminarTiUsu"
          :initialize="initialize"
          :Snackbar="Snackbar" :datoTU="datoTU"
          :cerrarDialogEliminarTU="cerrarDialogEliminarTU"
          />


        </v-dialog>
      </v-toolbar>

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
      <!-- Boton para editar Tipo Usuario -->
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
        @click="editarDato(item)"
        >{{icons.mdiPencil}}</v-icon>
      </v-btn>
      </template>
      <span>Editar Tipo Usuario</span>
    </v-tooltip>

      <!-- Boton para eliminar tipo usuario -->
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
        @click="eliminarItem(item)"
        >
                {{icons.mdiMinusCircle }}
              </v-icon>

      </v-btn>
      </template>
      <span>Eliminar Tipo Usuario</span>
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
  mdiDotsHorizontal,
  mdiMinusCircle,
  mdiPlusThick,
  mdiMagnify,
  mdiCloseCircleOutline

} from '@mdi/js'
import axios from 'axios';
import eliminar from './eliminar.vue'
import editar from './editar.vue'
 export default {
   components:{
      eliminar,
      editar
   },
  data: () => ({
    titulo:1,
    //?ALERTA
      snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
              color:''
            },

    dialogEditar:false,
    dialogEliminar: false,
    search: '',
    headers: [
      {
        text: 'ID',
        align: 'start',

        value: 'idTipoUsuario',
      },
      { text: 'Tipo Usuario', value: 'nombreTipoUsuario' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    data: [],
    datoTU: {
    },
    //llaves para props
    keyNuevoUsu:0,
    keyEditarTiUsu:0,
    keyEliminarTiUsu:0,

    defaultItem: {
      idTipoUsuario: 0,
      nombreTipoUsuario: '',
    },
  }),


  watch: {
    dialogEditar(val)
    {
      val || this.cerrarDialogeditarTU()
    },
    dialogEliminarTu(val)
    {
      val || this.cerrarDialogEliminarTU()
    },
  },

  created() {
    this.initialize()
  },

  methods: {

    initialize() {
      let direccion = "https://sacris.herokuapp.com/api/tipoUsuario/si";
                axios.get(direccion).then( res =>{
                this.data = res.data;
                console.log(this.data)
                  });
    },
    abrirNuevo(){
      this.dialogEditar = true
      this.titulo=2
      console.log(this.titulo)
      this.keyEditarTiUsu ++
    },

    editarDato(item) {
      this.datoTU =  item
      this.dialogEditar = true
      this.titulo=1
      console.log(this.titulo)
       this.keyEditarTiUsu ++
    },
     eliminarItem(item) {
      this.datoTU =  item
      console.log(this.datoTU)
      this.keyEliminarTiUsu ++
      this.dialogEliminar = true

    },

    cerrarDialogeditarTU(){
        this.dialogEditar=false
         this.$nextTick(() => {
        this.datoTU = this.defaultItem

      })
    },

    cerrarDialogEliminarTU() {
      this.dialogEliminar = false
      this.$nextTick(() => {
        this.datoTU = this.defaultItem

      })

    },

    //?ALERTA
     Snackbar(texto, color) {
          this.snackbarData.text=texto,
            this.snackbarData.snackbar=true
            this.snackbarData.color=color
        },

  },
  setup() {
    return {
      icons: {
        mdiMinusCircle,
        mdiPlusThick,
        mdiDotsHorizontal,
        mdiPencil,
        mdiMagnify,
        mdiCloseCircleOutline
      },
    }
  },
}
</script>
