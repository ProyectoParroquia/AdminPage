<template>
<validation-observer
    ref="observer"

  >
  <v-form  @submit.prevent="guardar"  enctype="multipart/form-data">
    <v-container>
      <v-row>
 <v-stepper v-model="e1"  >
    <v-stepper-header  max-width="900px">
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
        Definir fechas 2
      </v-stepper-step>

      <v-divider></v-divider>

    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card  height="300px" width="900px">
           <v-row>
              <v-col
          cols="6"
          sm="6"
        >  <validation-provider
        v-slot="{ errors }"
        name="nombreCurso"
        rules="required|max:25|alpha_spaces|min:3"
      >
          <v-text-field
             name="nombreCurso"
             id="nombreCurso"
             v-model="form.nombreCurso"
             :counter="25"
          :error-messages="errors"
          required
            label="Nombre curso"
          ></v-text-field>
          </validation-provider>
        </v-col>
              <v-col
          cols="12"
          sm="6"
        >
         <validation-provider
        v-slot="{ errors }"
        name="costoCurso"
        rules="required|max:6|numeric|min:5"
      >
          <v-text-field
             name="costoCurso"
             type="number"
             id="costoCurso"
             v-model="form.costoCurso"
            label="costo curso"
             :counter="6"
          :error-messages="errors"
          required
          ></v-text-field>
             </validation-provider>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
         <validation-provider
        v-slot="{ errors }"
        name="descriCurso"
        rules="required|max:250|alpha_spaces|min:10"
      >

          <v-textarea
             name="descriCurso"
             type="text"
             id="descriCurso"
             v-model="form.descriCurso"
            label="Descripción"
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
        >
          <input
         id="file"
          type="file"
           @change="selectedHandler"
           >


        <figure>
          <img width="100" :src="imagen" height="100" alt="foto curso">
        </figure>
  <v-autocomplete
          clearable
          v-model="form.idTipoCurso"
          :items="form.items"
          label="Tipo Curso"
          data-vv-name="form.idTipoCurso"
          required
           height="30px"
        >
        </v-autocomplete>
        </v-col>

 </v-row>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
          text
        >
          Continue
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card  height="350px" width="900px">
             <v-row>
        <v-col
          cols="12"
          sm="6"
        >
           <validation-provider
        v-slot="{ errors }"
        name="fechaInicialCurso"
        rules="required|max:10|min:10"

      >Fecha inicial
          <datepicker
            name="fechaInicialCurso"
             id="fechaInicialCurso"
             :error-messages="errors"
             v-model="form.fechaInicialCurso"
            :disabledDates="disabledDates"
            :format="DatePickerFormat"
             required
             class="fechas"

          >
         </datepicker>
           </validation-provider>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >Fecha final


             <datepicker
          name="fechaFinalCurso"
          id="fechaFinalCurso"
          label="Fecha final "
          v-model="form.fechaFinalCurso"
          :disabledDates="disabledDates"
          :format="DatePickerFormat"
          class="fechas"

          ></datepicker>

        </v-col>
           </v-row>
        </v-card>

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
           text

          @click="guardar()"
        >
          Guardar
        </v-btn>
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
import Datepicker from 'vuejs-datepicker';
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

        Snackbar:Function,
    },
  components: {
         ValidationObserver,
         ValidationProvider,
         Datepicker
          },

    name:"Nuevo",
    data() {
        return{
          e1: 1,
          miniatura:'',
            form:{
                "idCurso":"",
                "costoCurso":"",
                "estadoCurso": "",
                 "fechaInicialCurso": "",
                 "idTipoCurso": null,
                  "items": [
                    'Sacramental',
                    'Recreativo'
                  ],
               "fechaFinalCurso": "",
                "imagenCurso": "",
                "nombreCurso": "",
                "descriCurso": "",
                 "idTipoCursoFK": ""
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

   // allowedDates: val => parseInt(val.split('-')[2], 20) % 2=== 0,
  guardar() {
    switch (this.form.idTipoCurso ) {
              case 'Sacramental':
                      this.form.idTipoCursoFK = 1
                break;
              case 'Recreativo':
                      this.form.idTipoCursoFK = 2
                break;
            }
  const formdata = new FormData()
  formdata.append('nombreCurso', this.form.nombreCurso),
  formdata.append('costoCurso', this.form.costoCurso),
  formdata.append('descriCurso', this.form.descriCurso),
  formdata.append('fechaInicialCurso', this.form.fechaInicialCurso),
  formdata.append('fechaFinalCurso', this.form.fechaFinalCurso),
   formdata.append('idTipoCursoFK', this.form.idTipoCursoFK),
  formdata.append('file', this.form.file),
  axios.post('http://localhost:3000/api/Curso',formdata)
    .then( res =>{
                console.log(res)
                 if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")
              this.initialize()
              this.salir()
                 }else{
                   this.makeToast("Error",res.data.mensage,"danger");
              console.log("Error")
                 }
              })
  },
  salir(){
            this.$router.go(0);
            },
  }
}
</script>
<style scoped>
.left{
    text-align: left;

}

.fechas{
	padding: .1rem;
	margin: .3rem 0;
	border: none;
	border-bottom: solid #dddada 1px; width: 225px;
	transition: all .5s;
  color: #7a7a7a;
}

</style>
