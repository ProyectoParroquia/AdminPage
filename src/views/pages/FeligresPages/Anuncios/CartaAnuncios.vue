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
          v-model="dialogNuevo"
          max-width="800px"
          max-height="1000px"
        >
         <v-card max-width="800px">
           <v-card-title>
              Nuevo Anuncio
               </v-card-title>
        <v-card-text>
       <nuevo :key="keyNuevoUsu"  :Snackbar="Snackbar" :initialize="initialize" :closeNuevo="closeNuevo" :UsuarioLogueado="UsuarioLogueado"/>
        </v-card-text>
      </v-card>
</v-dialog>
   <v-row>
        <v-col
        cols="4"
           v-for="anuncio in listaAnuncio"
          :key="anuncio.idAnuncio"
           :items="data"
        >
          <v-card  max-width="500">
            <v-img
             class="blue--text align-end"
              :src="'https://localhost:3000/'+anuncio.imagenAnuncio"
                 gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <h1 color="white" style="color:#FFFFFF; font-size:30px;"  v-text="anuncio.tituloAnuncio"></h1>
            </v-img>
            <br>
            <v-card-actions>
                <v-spacer></v-spacer>
       <v-dialog
        v-model="dialogEditar"
      transition="dialog-top-transition"
      max-width="800px"
      max-height="1000px"

    >
      <v-card max-width="800px">
         <v-card-title>
              {{formTitle}}&nbsp;{{editedItem.tituloAnuncio}}
        </v-card-title>

      </v-card>
       </v-dialog>
       &nbsp;
        <v-dialog
          max-width="500px"
        >
          <v-card class="pt-4">
            <v-card-text class="text-h4 text-center font-weight-black"  >
              Cambiar estado

            </v-card-text>
            <v-card-text class="text-h5 text-center" >
                ¿Cambiar el estado de {{editedItem.tituloAnuncio}} ?
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
       color="white"
         max-width="400px"
          max-height="800px"
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
              >{{icons.mdiEyePlus,}}
             </v-icon>
      </v-btn>
       </template>
       <v-card color="white">
        <v-card-text>
         <p> {{anuncio.mensajeAnuncio}}</p>
         <p> {{anuncio.fechaInicio}}</p>
        <p>  {{anuncio.fechaFinal}}</p>
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
import Nuevo from '@/components/FormularioAnuncio.vue';
/* import editUsu from './editUsu.vue' */
import { required, digits, email, max, min, regex, alpha_spaces, numeric, alpha_dash, confirmed} from 'vee-validate/dist/rules'
import {extend, setInteractionMode } from 'vee-validate'
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
  Nuevo
   /*  editUsu */
  },

  data: () => ({
 e1: 1,
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
    dialogEditar:false,
    dialogVermas: false,
    dialogDelete: false,
    dialogNuevo:false,
  listaAnuncio: null,
    data: [],
    editedIndex: -1,
    editedItem: {},
    itemSelect: {},
    itemSelectName: [],
    UsuarioLogueado:{
              idUsu:''
              },
    defaultItem: {
    idAnuncio:0,
    estadoAnuncio: "",
    fechaFinal: "",
    file: "",
    tituloAnucio: "",
    mensajeAnuncio:""
    },
     DatePickerFormat:'dd-MM-yy',

  }),
  computed: {
     imagen(){
      return this.miniatura;
    },
    formTitle() {

      return this.editedIndex === -1 ? 'Nuevo Anuncio' : 'Editar el Auncio'
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
      },

  },

  created() {
    this.initialize()
  },

  methods: {
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

let ruta="https://localhost:3000/api/usuarios/obtener-params";
        axios.get(ruta)
        .then(res=>{
          this.UsuarioLogueado=res.data
        })
        let direccion = "https://localhost:3000/api/Anuncio";
        axios.get(direccion)
                    .then( res =>{
                this.listaAnuncio= res.data;
                  });
    },

    editItem(anuncio) {
      this.editedItem = anuncio
      console.log(anuncio)
      console.log('BUENAS TARDES')
      this.dialog = true
      this.editedIndex= 1
    },

    deleteItem(anuncio) {
      this.editedItem = Object.assign({}, anuncio)
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

      axios.put("https://localhost:3000/api/Anuncio/"+cambioEstado+"/"+this.editedItem.idAnuncio,{ headers: { token: localStorage.getItem('token') } })
           .then(res =>{
                this.valorBoton=!this.valorBoton
                  this.consultarInactivos()
                    if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")
              //llamamos a este metodo para reenderizar el componente y que muestre los cambios
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
                varestado ="/inactivos"
                this.BotonConsultaTexto=  "Activo"

              }else{
                varestado = "/" ;
                this.BotonConsultaTexto= "Inactivo"
              }

                let direccion = "https://localhost:3000/api/Anuncio"+varestado;
                axios.get(direccion).then( res =>{
                   this.listaAnuncio= res.data;
                    console.log(this.listaAnuncio)
                });
                this.valorBoton= !this.valorBoton

            },
    close() {
      this.dialog = false
        this.editedItem = Object.assign({}, this.defaultItem)


    },
    closeNuevo(){
      this.dialogNuevo = false
      this.dialogEditar = false
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
          axios.put("https://localhost:3000/api/Anuncio/actualizar/"+this.editedItem.idAnuncio, this.editedItem,{ headers: { token: localStorage.getItem('token') } })
          .then(data =>{
                   if(data.status === 200){
              console.log(data)
              this.Snackbar(data.data.success, "green")

              //llamamos a este metodo para reenderizar el componente y que muestre los cambios
              this.initialize()
            }else{
              this.Snackbar("Error",data.data.mensage,"danger");
              console.log("Error")
            }
          })
          this.closeNuevo()

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

