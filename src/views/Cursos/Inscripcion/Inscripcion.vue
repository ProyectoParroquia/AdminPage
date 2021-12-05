<template>

<div id="htmlData">
  <v-data-table
  :items-per-page="5"
    :headers="headers"
    :items="data"
    sort-by="inscripciones"
    class="elevation-1"
    :search="search"
  >
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
  <template v-slot:top>
      <v-toolbar
        color = "tableHeader"
        flat
      >
        <v-toolbar-title>Inscripciones</v-toolbar-title>
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
            <!-- <template> -->
        <template v-slot:activator="">

          <v-tooltip bottom
          color="secondary">
             <template v-slot:activator="{ on, attrs }">
              <v-btn
              color="primary"
              dark

              v-bind="attrs"
              v-on="on"
              @click="downloadPDF()"
              fab
              small
            >
              <v-icon
              >{{icons.mdiArrowDownCircleOutline}}</v-icon>
            </v-btn>
             </template>
             <span>Descargar reporte</span>
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
              @click="consultarIncompletos()"
              fab
              small
            >
              <v-icon>
                {{icons.mdiAlertCircleOutline}}
              </v-icon>
            </v-btn>
            </template>
            <span>Consultar Incompleto</span>
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
              @click="consultarInscritos()"
              fab
              small
            >
              <v-icon>
                {{icons.mdiCheckCircleOutline }}
              </v-icon>
            </v-btn>
            </template>
            <span>Consultar inscrito</span>

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
              @click="consultarCancelados()"
              fab
              small
            >
              <v-icon>
                 {{icons.mdiCloseCircleOutline }}
              </v-icon>
            </v-btn>
            </template>
            <span>Consultar cancelados</span>

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
              @click="initialize()"
              fab
              small
            >
              <v-icon>
                {{icons.mdiClockTimeTenOutline}}
              </v-icon>
            </v-btn>
            </template>
            <span>Consultar Inscripciones en proceso</span>

            </v-tooltip>
        </template>

        </v-dialog>

        <v-dialog
          v-model="dialog"
          max-width="500px"
        >

          <v-card>

            <v-card-title>
              {{formTitle}} {{editedItem.estadoInscripcion}}
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
                      name="fechaInscripcion"
                    >
                          <v-text-field
                          color="#ae5f9e"
                            v-model="editedItem.fechaInscripcion"
                            :counter="25"
                            :error-messages="errors"
                            label="Fecha Inscripcion"
                            required
                            readonly
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
                        name="Curso.nombreCurso"
                        rules="required|max:25|alpha_spaces|min:4"
                      >
                        <v-text-field
                          v-model="editedItem.Curso.nombreCurso"
                          value="idCursoFK"
                          :counter="25"
                          :error-messages="errors"
                          label="nombreCurso"
                          required
                          readonly
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
                        name="Usuario.nombreUsuario"
                        rules="required|max:25|alpha_spaces|min:4"
                      >
                        <v-text-field
                          v-model="editedItem.Usuario.nombreUsuario"
                          value="idUsuarioFK"
                          :counter="25"
                          :error-messages="errors"
                          label="Nombre del usuario"
                          required
                          readonly
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
                        name="Usuario.apellidoUsuario"
                        rules="required|max:25|alpha_spaces|min:4"
                      >
                        <v-text-field
                          v-model="editedItem.Usuario.apellidoUsuario"
                          value="idUsuarioFK"
                          :counter="25"
                          :error-messages="errors"
                          label="Apellido del usuario"
                          required
                          readonly
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
                        name="Usuario.numeroDocumentoUsuario"
                        rules="required|max:25|numeric|min:4"
                      >
                        <v-text-field
                          v-model="editedItem.Usuario.numeroDocumentoUsuario"
                          value="idUsuarioFK"
                          :counter="25"
                          :error-messages="errors"
                          label="Identificacióm del usuario"
                          required
                          readonly
                        ></v-text-field>
                      </validation-provider>

                  </v-col>
          <v-col
           cols="12"
                    sm="6"
                    md="4"
        >
        <v-autocomplete
          clearable
          v-model="editedItem.idEstado"
          :items="itemSelectName"
          :error-messages="errors"
          label="Estado"
          data-vv-name="editedItem.idEstado"
          required
        >
        </v-autocomplete>
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
      </v-toolbar>
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
            {{icons.mdiDotsHorizontal}}
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green lighten-1"

      >
        <v-icon
        @click="editItem(item)"
        >{{icons.mdiPencil}}</v-icon>
      </v-btn>
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
</div>
</template>
<script>
import {
  mdiPencil,
  mdiMinusCircle,
  mdiMagnify,
  mdiDotsHorizontal,
  mdiPlus,
  mdiAccountArrowLeft,
  mdiAccountArrowRight,
mdiAlertCircleOutline,
mdiArrowDownCircleOutline,
 mdiCheckCircleOutline,
mdiCloseCircleOutline,
mdiClockTimeTenOutline
} from '@mdi/js'
import axios from 'axios';
 import jsPDF from 'jspdf';
 import html2canvas from 'html2canvas';
/* import editUsu from './editUsu.vue' */
import { required, digits, email, max, min, regex, alpha_spaces, numeric, alpha_dash, confirmed} from 'vee-validate/dist/rules'
import {ValidationProvider, ValidationObserver, extend, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
    extend('confirmed', {
    ...confirmed,
    message: 'El campo {field} no coincide ',
  })

   extend('alpha_dash', {
    ...alpha_dash,
    message: 'El campo {field} puede contener caracteres alfanuméricos, así como guiones y guiones bajos.',
  })

   extend('numeric', {
    ...numeric,
    message: 'El campo {field} solo debe contener numeros',
  })

  extend('alpha_spaces', {
    ...alpha_spaces,
    message: 'El campo {field} solo debe tener caracteres alfabeticos y espacios',
  })

  extend('digits', {
    ...digits,
    message: 'El campo {field} debe tener {length} digitos. ({value})',
  })

  extend('required', {
    ...required,
    message: 'El campo {field} no puede estar vacio',
  })

  extend('max', {
    ...max,
    message: 'El campo {field} no puede tener más de {length} caracteres',
  })

  extend('min', {
    ...min,
    message: 'El campo {field} debe tener minimo {length} caracteres',
  })

  extend('regex', {
    ...regex,
    message: 'el campo {field} {value} no coincide {regex}',
  })

  extend('email', {
    ...email,
    message: 'El correo debe ser válido',
  })

 export default {
    components:{
      ValidationProvider,
       ValidationObserver,
  /*  editUsu */
  },

  data: () => ({
snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
              color:''
            },
    oculto:false,
    mostrado:true,
    keyNuevoUsu:0,
    dialog: false,
    dialogDelete: false,
    dialogNuevo:false,
    search: '',
    headers: [
      {
        text: '#',
        align: 'start',
        value: 'idInscripcion',
      },
      {
        text: 'Fecha de inscripción',
        align: 'start',
        value: 'fechaInscripcion',
      },
      { text: 'Nombre curso', value: 'Curso.nombreCurso' },
      { text: 'Estado ', value: 'Estado.nombreEstado' },
       { text: 'Nombre  ', value: 'Usuario.nombreUsuario' },
        { text: 'Apellido ', value: 'Usuario.apellidoUsuario' },
         { text: 'Identificación ', value: 'Usuario.numeroDocumentoUsuario' },
          { text: 'Telefono ', value: 'Usuario.numeroContacto' },
         { text: 'Correo ', value: 'Usuario.correoUsuario' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    data: [],
    editedIndex: -1,
    editedItem: {},
     itemSelect: '',
     itemSelectName: [
        'Inscrito' ,
          'Incompleto' ,
              'Cancelado' ,
     ],
    defaultItem: {
     idInscripcion:0,
     fechaInscripcion:'',
     idCursoFK:0,
     idEstado:0,
     idEstadoFK:0
    },
  }),

  computed: {
    formTitle() {

      return this.editedIndex === -1 ? 'Nueva Inscripcion' : 'Editar estado'
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

    abrir(){
      this.dialogNuevo = true
      this.keyNuevoUsu +=1
    },
      Snackbar(texto, color) {
          this.snackbarData.text=texto,
            this.snackbarData.snackbar=true
            this.snackbarData.color=color
        },
    initialize() {

        let direccion = "https://sacris.herokuapp.com/api/Inscripcion";
        axios.get(direccion)
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

    close() {
      this.dialog = false
        this.editedItem = Object.assign({}, this.defaultItem)


    },
    consultarInscritos(){
 let direccion = "https://sacris.herokuapp.com/api/Inscripcion/Inscrito";
                axios.get(direccion).then( res =>{
                    this.data = res.data;
                    console.log(this.data)
                });
    },
    consultarCancelados(){
 let direccion = "https://sacris.herokuapp.com/api/Inscripcion/cancelado";
                axios.get(direccion).then( res =>{
                    this.data = res.data;
                    console.log(this.data)
                });
    },
    consultarIncompletos(){
 let direccion = "https://sacris.herokuapp.com/api/Inscripcion/Incompleto";
                axios.get(direccion).then( res =>{
                    this.data = res.data;
                    console.log(this.data)
                });
    },
    save() {
        /*  switch (this.editedItem.tipoDoc.denominacionTipoDocumento ) */
   switch (this.editedItem.idEstado ) {
              case 'Inscrito':
                      this.editedItem.idEstadoFK = 2
                break;
              case 'Incompleto':
                      this.editedItem.idEstadoFK = 3
                break;
                case 'Cancelado':
                      this.editedItem.idEstadoFK = 4
                break;
            }
          axios.put("https://sacris.herokuapp.com/api/Inscripcion/"+this.editedItem.idInscripcion, this.editedItem,{ headers: { token: localStorage.getItem('token') }  })
            .then(data =>{
                   if(data.status === 201){
              console.log(data)
              this.Snackbar(data.data.success, "green")
              //llamamos a este metodo para reenderizar el componente y que muestre los cambios
              this.initialize()
              this.salir()
            }else{
              this.makeToast("Error",data.data.mensage,"danger");
              console.log("Error")
            }
          })
    },
  salir(){
            this.$router.go(0);
            },
     downloadPDF() {
         const doc = new jsPDF('p', 'pt', 'a4');
     var imgData = 'data:image/png;base64,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';

   doc.addImage(imgData, 'PNG', 344, 5,200,40);
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const options = {
      background: 'white',
      scale: 4
    };
    doc.setFontSize(15);
    doc.setFont('helvetica');
    doc.text('Reporte de inscritos',20, 40)
    doc.line(20,60,550,60)
    html2canvas(DATA, options).then((canvas) => {
const img = canvas.toDataURL('image/PNG');
//Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 150;
      const imgProps = (doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_reporteInscritos.pdf`);
    })

},

  },
  setup() {
    return {
      icons: {
        mdiMinusCircle,
        mdiPencil,
        mdiMagnify,
        mdiDotsHorizontal,
        mdiPlus,
        mdiAccountArrowLeft,
        mdiAccountArrowRight,
        mdiAlertCircleOutline,
      mdiArrowDownCircleOutline,
        mdiCheckCircleOutline,
       mdiCloseCircleOutline,
       mdiClockTimeTenOutline

      },
    }
  },


}
</script>

