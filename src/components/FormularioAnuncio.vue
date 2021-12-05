<template>
<validation-observer
    ref="observer"
   v-slot="{ invalid }"
  >
  <v-form  @submit.prevent="guardar"  enctype="multipart/form-data">
    <v-container>
      <v-row>
 <v-stepper v-model="e1"  >
    <v-stepper-header  max-width="700px">
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Definir datos 1
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Definir fecha 2
      </v-stepper-step>

      <v-divider></v-divider>

    </v-stepper-header>

    <v-stepper-items>
       <v-stepper-content step="1">
        <v-card  height="310px" width="800px">
           <v-row>
              <v-col
          cols="12"
          sm="12"
        >  <validation-provider
        v-slot="{ errors }"
        name="nombreCurso"
        rules="required|max:25|alpha_spaces|min:3"
      >
          <v-text-field
             name="tituloAnuncio"
             id="tituloAnuncio"
             v-model="form.tituloAnuncio"
             :counter="25"
          :error-messages="errors"
          required
            label="Titulo anuncio"
          ></v-text-field>
          </validation-provider>

              </v-col>
              <br>
              <br>
     <v-col
          cols="12"
          sm="12"
        >
         <validation-provider
        v-slot="{ errors }"
        name="mensajeAnuncio"
        rules="required|max:250|alpha_spaces|min:10"
      >

          <v-textarea
             name="mensajeAnuncio"
             type="text"
             id="mensajeAnuncio"
             v-model="form.mensajeAnuncio"
            label="mensajeAnuncio"
             :counter="250"
          :error-messages="errors"
          required
          height="30px"
          ></v-textarea>
             </validation-provider>
     </v-col>
     <v-col
          cols="12"
          sm="6"
        >          <input
         id="file"
          type="file"
           @change="selectedHandler"
           >
             </v-col>
              &nbsp;&nbsp;
             <v-col cols="12"
             sm="5">
        <figure>
          <img width="100" :src="imagen" height="100" alt="foto curso">
        </figure>
             </v-col>
           </v-row>
        </v-card>
<div class=" mt-7 text-right">
          <v-btn
          color="primary"
          @click="e1 = 2"
          text
        >
          Continuar
        </v-btn>

         </div>

      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card  height="450px" width="800px">
        <v-col
          cols="12"
        >
        <validation-provider
                          v-slot="{ errors }"
                          name="Fecha Final"
                          rules="required|max:10|min:10"
                        >

                          <v-text-field
                            color="#ae5f9e"
                            type="date"
                            readonly
                            v-model="form.fechaFinal"
                            :counter="10"
                            :error-messages="errors"
                            label="Fecha Inicial"
                            clearable
                          ></v-text-field>
                          <v-date-picker
                                elevation="15"
                                v-model="form.fechaFinal"
                                :active-picker.sync="activePicker"
                                :error-messages="errors"
                                :min="fechaMin"
                                   full-width
                              ></v-date-picker>
                        </validation-provider>
        </v-col>
        </v-card>
<div class=" mt-7 text-right">
    <v-btn
          color="primary"
          @click="e1 = 1"
          text
           >
          Regresar
        </v-btn>
           <v-btn
          color="primary"
           type="submit"
          @click="guardar()"
           :disabled="invalid"
        >
          Guardar
        </v-btn>
</div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
      </v-row>
    </v-container>
  </v-form>
  </validation-observer>
</template>
<script>

import axios from 'axios';
import { required, max, min, alpha_spaces,numeric ,alpha_dash} from 'vee-validate/dist/rules'
import { extend, ValidationObserver,ValidationProvider } from 'vee-validate'
import {
  mdiDelete,
  mdiBorderColor,
  mdiAccountMultiplePlus
} from '@mdi/js'
extend('required', {
    ...required,
    message: 'El campo no puede estar vacio',
  })
extend('alpha_spaces', {
    ...alpha_spaces,
    message: 'El campo  solo debe tener caracteres alfabeticos y espacios',
  })
  extend('max', {
    ...max,
    message: 'El campo  no puede tener más de {length} caracteres',
  })
  extend('min', {
    ...min,
    message: 'El campo  debe tener minimo {length} caracteres',
  })
  extend('numeric', {
    ...numeric,
    message: 'El campo {field} solo debe contener numeros',
  })

  extend('alpha_dash', {
    ...alpha_dash,
    message: 'El campo {field} puede contener caracteres alfanuméricos, así como guiones y guiones bajos.',
  })
export default {
     props:{
       initialize:Function,
       closeNuevo:Function,
        UsuarioLogueado:Object,
        Snackbar:Function,
    },
  components: {
         ValidationObserver,
         ValidationProvider
          },

    name:"Nuevo",
    data() {
        return{
           //! Fecha
            fechaMin:'',
           activePicker: null,
           date: null,

           snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
              color:''
            },
           /* UsuarioLogueado:{
              idUsu:''
              }, */
          e1: 1,
          miniatura:'',
            form:{
                "idAnuncio":"",
                "estadoAnuncio": "",
               "fechaFinal": "",
                "imagenAnuncio": "",
                "tituloAnuncio": "",
                "mensajeAnuncio": "",
                 "file": ""
            },
               icons: {

        mdiDelete,
        mdiBorderColor,
        mdiAccountMultiplePlus
      },
            DatePickerFormat:'dd-MM-yy',
            disabledDates:{
              to: new Date(Date.now()-8640000)
            }
        }
    },
computed: {
    imagen(){
      return this.miniatura;
    }
    },
  methods:{
      selectedHandler(e){
          let file = e.target.files[0];
          console.log(file);
          this.form.file=file;
          this.cargarImagen(file)
    },
    cargarImagen(file){
        let reader= new FileReader();
        reader.onload =(e)=>{
          this.miniatura =e.target.result;
        }
        reader.readAsDataURL(file);
    },

  guardar() {

  const formdata = new FormData()
  formdata.append('tituloAnuncio', this.form.tituloAnuncio),
  formdata.append('mensajeAnuncio', this.form.mensajeAnuncio),
  formdata.append('fechaInicio', this.form.fechaInicio),
  formdata.append('fechaFinal', this.form.fechaFinal),
  formdata.append('UsuarioFK', this.form.UsuarioFK = this.UsuarioLogueado.idUsu),
  formdata.append('file', this.form.file),


  axios.post('https://sacris.herokuapp.com/api/Anuncio',formdata)
   .then(res =>{

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
              this.closeNuevo()

  },

  }
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
