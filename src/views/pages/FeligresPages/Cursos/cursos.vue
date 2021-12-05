<template>
    <v-container grid-List-md>

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
        <v-dialog
      transition="dialog-top-transition"
      max-width="1000px"
        max-height="1800px"
    >
      <v-card max-width="900px">
        <v-card-title>
          <span class="text-h5">Nueva Inscripcion</span>
        </v-card-title>
        <v-card-text>
         <NuevoInsci :Snackbar="Snackbar"/>
        </v-card-text>

      </v-card>
       </v-dialog>
      <v-dialog
          v-model="dialogNuevo"
          max-width="800px"
          max-height="1000px"
        >
         <v-card max-width="800px">
           <v-card-title>
              {{formTitle}}&nbsp;
               </v-card-title>
        <v-card-text>
       <nuevo :key="keyNuevoUsu" :closeNuevo="closeNuevo" :renderizar="initialize" :Snackbar="Snackbar"/>
        </v-card-text>
      </v-card>
</v-dialog>
   <v-row>
        <v-col
           v-for="curso in listaCurso"
          :key="curso.idCurso"
           :items="data"
        >
          <v-card max-width="270" >
            <v-img
             class="blue--text align-end"
              :src="'https://sacris.herokuapp.com/'+curso.imagenCurso"
                 gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <h1 color="white" style="color:#FFFFFF; font-size:30px;"  v-text="curso.nombreCurso"></h1>
            </v-img>
            <br>
            <v-card-text style="font-size:16px; line-height:0.5em;" >
                         <p>{{curso.fechaInicialCurso}}</p>
                         <p>{{curso.fechaFinalCurso}}</p>
                         <p>{{curso.costoCurso}}</p>
                         <p>{{curso.TipoCurso.nombreTipoCurso}}</p>
                         <p>{{curso.estadoCurso}}</p>
                         </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
       <v-dialog
          max-width="500px"
        >
         <template v-slot:activator="{ on, attrs }">
              <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              @click="deleteItem(curso)"
              small
              fab
            >
              <v-icon
              >{{icons.mdiContrast}}
             </v-icon>
            </v-btn>

        </template>
          <v-card class="pt-4">
            <v-card-text class="text-h4 text-center font-weight-black"  >
              Cambiar estado

            </v-card-text>
            <v-card-text class="text-h5 text-center" >
                ¿Cambiar el estado de {{editedItem.nombreCurso}} ?
              </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="primary"

               @click="deleteItemConfirm()">
                    Aceptar
              </v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
         &nbsp;
       <v-dialog
        max-width="570px"
      >
      <template v-slot:activator="{ on, attrs }">
      <v-btn
        dark
        fab
        small
        v-bind="attrs"
          v-on="on"
           color="primary"
      >
         <v-icon
              >{{icons.mdiEyePlus}}
             </v-icon>
      </v-btn>
       </template>
       <v-card style="padding:10px" >
         <h2 class="text-center " >
           Más información aquí
         </h2>


         <v-divider class="mb-4"></v-divider>
        <v-card-text>
        <v-row>
          <v-col class="col-8">
            <v-img
              class="blue--text align-end"
              :src="'https://sacris.herokuapp.com/'+curso.imagenCurso"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <h1 color="white" style="color:#FFFFFF; font-size:30px;"  v-text="curso.nombreCurso"></h1>
            </v-img>
          </v-col>
          <v-col class="col-4">
            <p style="font-size:17px;"><strong>Descripcion:</strong>  {{curso.descriCurso}}</p>
            <p style="font-size:17px;"><strong>Costo:</strong>  {{curso.costoCurso}}</p>
            <p style="font-size:17px;"><strong>Estado:</strong> {{curso.estadoCurso}}</p>
          </v-col>
        </v-row>

        </v-card-text>
       </v-card>
       </v-dialog>
       </v-card-actions>
          </v-card>
           </v-col>
     </v-row>
    </v-container>
</template>
<script>
import {
  mdiPencil,
   mdiEyePlus,
   mdiContrast,
   mdiCloseCircleOutline
} from '@mdi/js'
import axios from 'axios';
import NuevoInsci from '@/components/curso/NuevoInsci.vue';
import Nuevo from '@/components/curso/Nuevo';
/* import editUsu from './editUsu.vue' */
import { required, digits, email, max, min, regex, alpha_spaces, numeric, alpha_dash, confirmed} from 'vee-validate/dist/rules'
import { extend, setInteractionMode } from 'vee-validate'
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
    message: 'El campo {_field_} debe tener {length} digitos. ({value})',
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
    message: 'el campo {_field_} {value} no coincide {regex}',
  })

  extend('email', {
    ...email,
    message: 'El correo debe ser válido',
  })

 export default {

    components:{

  Nuevo,
  NuevoInsci,
   /*  editUsu */
  },

  data: () => ({
 e1: 1,
 errors:'',
 //! Fecha
            fechaMin:'',

           activePicker: null,
           menu: false,
           date: null,

  snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
              color:''
            },
          miniatura:'',
    oculto:false,
    mostrado:true,
    keyNuevoUsu:0,
    valorBoton:true,
    BotonConsultaTexto:"Inactivo",
    dialog: false,
    dialogVermas: false,
    dialogDelete: false,
    dialogNuevo:false,
  listaCurso: null,
    data: [],
    editedIndex: -1,
    editedItem: {},
    itemSelect: {},
    itemSelectName: [],
    defaultItem: {
    idCurso:0,
    costoCurso:0,
    estadoCurso: "",
    fechaInicialCurso: "",
    idTipoCurso: null,
    fechaFinalCurso: "",
    file: "",
    nombreCurso: "",
    descriCurso:""
    },
     DatePickerFormat:'dd-MM-yy',

  }),
  computed: {
     imagen(){
      return this.miniatura;
    },
    formTitle() {

      return this.editedIndex === -1 ? 'Nuevo Curso' : 'Editar el Curso'
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
    DeleteDate(){
        this.editedItem.fechaFinalCurso=''
    },
    selectedHandler(e){
          let file = e.target.files[0];
          console.log(file);
          this.editedItem.file=file;
          this.cargarImagen(file)
    },
    cargarImagen(file){
        let reader= new FileReader();
        reader.onload =(e)=>{
          this.miniatura =e.target.result;
        }
        reader.readAsDataURL(file);
    },
    //?funcion para asignarle diferentes atributos(texto y color) a la ALERTA dinamicamente
     Snackbar(texto, color) {
          this.snackbarData.text=texto,
            this.snackbarData.snackbar=true
            this.snackbarData.color=color
        },
    abrir(){
      this.dialogNuevo = true
      this.keyNuevoUsu +=1
    },
    initialize() {
      let direcciondoc = "https://sacris.herokuapp.com/api/TipoCurso/";
                axios.get(direcciondoc)
                .then( res =>{
                  res.data.forEach(element => {
                    this.itemSelectName.push(element.nombreTipoCurso)
                  });
                this.itemSelect = res.data
                  });


        let direccion = "https://sacris.herokuapp.com/api/Curso/recreativo";
        axios.get(direccion)
                    .then( res =>{
                this.listaCurso= res.data;
                  });
    },

    editItem(curso) {
      this.editedItem = curso
      console.log(curso)
      console.log('BUENAS TARDES')
      this.dialog = true
      this.editedIndex= 1
    },

    deleteItem(curso) {
      this.editedItem = Object.assign({}, curso)
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

      axios.put("https://sacris.herokuapp.com/api/Curso/"+cambioEstado+"/"+this.editedItem.idCurso,{ headers: { token: localStorage.getItem('token') }  })
           .then(res =>{
                this.valorBoton=!this.valorBoton
                  this.consultarInactivos()
                    if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")
              this.initialize()
            }else{
              this.makeToast("Error",res.data.mensage,"danger");
              console.log("Error")
            }
              })
      this.closeDelete()
    },
    consultarInactivos(){
          let varestado
              if(this.valorBoton){
                varestado ="inactivos/"
                this.BotonConsultaTexto=  "Activos"

              }else{
                varestado = "" ;
                this.BotonConsultaTexto= "Inactivo"
              }

                let direccion = "https://sacris.herokuapp.com/api/Curso/"+varestado+"recreativo/";
                axios.get(direccion).then( res =>{
                   this.listaCurso= res.data;
                    console.log(this.data)
                });
                this.valorBoton= !this.valorBoton

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
          axios.put("https://sacris.herokuapp.com/api/Curso/"+this.editedItem.idCurso, this.editedItem,{ headers: { token: localStorage.getItem('token') }  })
          .then(data =>{
                   if(data.status === 201){
              console.log(data)
              this.Snackbar(data.data.success, "green")
              //llamamos a este metodo para reenderizar el componente y que muestre los cambios
              this.initialize()

            }else{
              this.makeToast("Error",data.data.mensage,"danger");
              console.log("Error")
            }
          })
    },

    },
 setup() {
    return {
      icons: {
        mdiPencil,
         mdiEyePlus,
         mdiContrast,
         mdiCloseCircleOutline
      },
    }
  },
}
</script>

<style scoped>
.fechas{
	padding: .1rem;
	margin: .3rem 0;
	border: none;
	border-bottom: solid #dddada 1px; width: 225px;
	transition: all .5s;
  color: #7a7a7a;
}
</style>

