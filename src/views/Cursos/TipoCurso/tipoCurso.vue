<template>

  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="5"
    sort-by="idTipoCurso"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <!-- toolbar= menù -->
      <v-toolbar
        color = "tableHeader"
        flat
      >
        <v-toolbar-title>Tipo Curso</v-toolbar-title>
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
             <span>Nuevo Tipo Curso</span>
          </v-tooltip>

        </template>

          <!-- carta para llamar componente de EDITAR que tambien sirve para crear -->
          <v-card >
            <v-card-text style="padding-top:5px;">
                 <editar :key="keyEditarTiDoc" :initialize="initialize" :Snackbar="Snackbar" :datoTD="datoTD" :titulo="titulo"  :cerrarDialogeditarTD="cerrarDialogeditarTD"/>
            </v-card-text>

          </v-card>
        </v-dialog>



        <!-- Dialog para eliminar -->
       <v-dialog
          v-model="dialogEliminar"
          max-width="500px"
        >
          <eliminar
          :key="keyEliminarTiDoc"
          :initialize="initialize"
          :Snackbar="Snackbar" :datoTD="datoTD"
          :cerrarDialogEliminarTD="cerrarDialogEliminarTD"
          />


        </v-dialog>
      </v-toolbar>

              <!-- Alerta para mensajes -->
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

    <!-- Espacio para las acciones dentro de la DataTable -->
    <template v-slot:[`item.actions`]="{ item }">
      <!-- spedd dial para el despliegue de acciones -->
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

      <!-- toltip para mensaje al pasar cursor -->
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
      <span>Editar Tipo Curso</span>
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
      <span>Eliminar Tipo Curso</span>
    </v-tooltip>

    </v-speed-dial>
         </template>

      <!-- Templates para mensajes al no encontrar datos o no haya resultados al buscar -->
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
//importacion de los iconos
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
    //variable que guarda numero para validar el titulo de editar o agregar
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

        value: 'idTipoCurso',
      },
      { text: 'Tipo Curso', value: 'nombreTipoCurso' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    //guarda los datos al listar
    data: [],
    datoTD: {
    },
    //llaves para props
    keyNuevoUsu:0,
    keyEditarTiDoc:0,
    keyEliminarTiDoc:0,

  }),


  watch: {
    dialogEditar(val)
    {
      val || this.cerrarDialogeditarTD()
    },
    dialogEliminarTu(val)
    {
      val || this.cerrarDialogEliminarTD()
    },
  },

  created() {
    this.initialize()
  },

  methods: {

    //Listar
    initialize() {
      let direccion = "https://sacris.herokuapp.com/api/TipoCurso";
                axios.get(direccion).then( res =>{
                this.data = res.data;
                console.log(this.data)
                  });
    },

    //Abrir los dialog cambiandolos de estado a true
    abrirNuevo(){
      this.dialogEditar = true
      //Asigna a titulo otro numero para el cambio de titulo
      this.titulo=2
      console.log(this.titulo)
      //llave de las propiedades para recargar componente
      this.keyEditarTiDoc ++
    },

    editarDato(item) {
      //asignamos a objeto DatoTD el item que llega como parametro(item que guarda solo el dato del arreglo)
      this.datoTD =  item
      this.dialogEditar = true
      this.titulo=1
      console.log(this.titulo)
       this.keyEditarTiDoc ++
    },
     eliminarItem(item) {
      this.datoTD =  item
       this.dialogEliminar = true
      console.log(this.datoTD)
      this.keyEliminarTiDoc ++


    },





    //?funcion para asignarle diferentes atributos(texto y color) a la ALERTA dinamicamente
     Snackbar(texto, color) {
          this.snackbarData.text=texto,
            this.snackbarData.snackbar=true
            this.snackbarData.color=color
        },

  },
  //retorno para usar los iconos
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
