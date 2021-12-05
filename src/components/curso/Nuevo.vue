<template>
<validation-observer
    ref="observer"
       v-slot="{ invalid }"

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
        <v-card   width="900px">
           <v-row>
              <v-col
          cols="12"
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
        rules="required|max:250|min:10"
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
   <v-col cols="12" md="6">
                          <validation-provider
                            v-slot="{ errors }"
                            name="select"
                            rules="required"
                          >
         <!--                  <select class="form-control" name="idTipoDoc_FK" id="idTipoDoc_FK">
    <option v-for="documento in ListaDocumentos" :key="documento.idTipoDocumento" :value="documento.idTipoDocumento">{{documento.denominacionTipoDocumento}}</option>
</select> -->
                            <v-autocomplete
                              color="#ae5f9e"
                              clearable
                              v-model="form.TipoCurso"
                              :items="form.items"
                              :error-messages="errors"
                              label="Tipo Curso"
                              data-vv-name="form.idTipoCurso"
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
        </v-col>

 </v-row>
        </v-card>
        <div class=" mt-7 text-right">
          <v-btn
        class="text-rigth"
          color="primary"
          @click="e1 = 2"
          text
          outlined
        >
          Continuar
        </v-btn>
        </div>


      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card  width="900px">
             <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <validation-provider
                          v-slot="{ errors }"
                          name="Fecha Inicial"
                          rules="required|max:10|min:10"
                        >

                          <v-text-field
                            color="#ae5f9e"
                            type="date"
                            readonly
                            v-model="form.fechaInicialCurso"
                            :counter="10"
                            :error-messages="errors"
                            label="Fecha Inicial"

                            clearable

                          ></v-text-field>

                          <v-date-picker
                                elevation="10"
                                 @change="DeleteDate"
                                v-model="form.fechaInicialCurso"
                                :active-picker.sync="activePicker"
                                :error-messages="errors"
                                full-width
                                :min="fechaMin"
                              ></v-date-picker>

                        </validation-provider>
        </v-col>

        <v-col

          cols="12"
          sm="6"
        > <validation-provider
                          v-slot="{ errors }"
                          name="Fecha Final"
                          rules="required|max:10|min:10"
                        >

                          <v-text-field
                            color="#ae5f9e"
                            type="date"
                            readonly
                            v-model="form.fechaFinalCurso"
                            :counter="10"
                            :error-messages="errors"
                            label="Fecha Final"

                            clearable
                          ></v-text-field>

                          <v-date-picker
                                elevation="10"
                                v-model="form.fechaFinalCurso"

                                :active-picker.sync="activePicker"
                                :error-messages="errors"
                                full-width
                                :min="form.fechaInicialCurso"
                              ></v-date-picker>

                        </validation-provider>

        </v-col>
           </v-row>
        </v-card>
        <div>
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

    :disabled="invalid"
          @click="guardar()"
        >
          Guardar
        </v-btn>
          </div>

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
        closeNuevo:Function,
        Snackbar:Function,
    },
  components: {
         ValidationObserver,
         ValidationProvider,

          },

    name:"Nuevo",
    data() {
        return{
          e1: 1,
          miniatura:'',
          //! Fecha
            fechaMin:'',
           activePicker: null,
           date: null,

            form:{
                "idCurso":"",
                "costoCurso":"",
                "estadoCurso": "",
                 "fechaInicialCurso": "",
                 "TipoCurso": "",
                  "items": [

                  ],
               "fechaFinalCurso": "",
                "imagenCurso": "",
                "nombreCurso": "",
                "descriCurso": "",
                 "idTipoCursoFK": ""
            },
                items:{},
               icons: {

        mdiDelete,
        mdiBorderColor,
        mdiAccountMultiplePlus
      },

        }
    },
computed: {
    imagen(){
      return this.miniatura;
    }
    },
  methods:{
      DeleteDate(){
        this.form.fechaFinalCurso=''
    },
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
      this.items.forEach(el => {
                if(el.nombreTipoCurso == this.form.TipoCurso){
                  this.form.idTipoCursoFK = el.idTipoCurso
                }
              });
  const formdata = new FormData()
  formdata.append('nombreCurso', this.form.nombreCurso),
  formdata.append('costoCurso', this.form.costoCurso),
  formdata.append('descriCurso', this.form.descriCurso),
  formdata.append('fechaInicialCurso', this.form.fechaInicialCurso),
  formdata.append('fechaFinalCurso', this.form.fechaFinalCurso),
   formdata.append('idTipoCursoFK', this.form.idTipoCursoFK),
  formdata.append('file', this.form.file)

  axios.post('https://sacris.herokuapp.com/api/Curso',formdata)
  .then(res =>{
                console.log(res);
                if(res.status === 201){
                  this.Snackbar(res.data.success, "green")
                  this.closeNuevo()

                }else{

                   this.Snackbar(res.data.mensage, "red")

                }

            })
  },
      initialize(){
        let direccion = "https://sacris.herokuapp.com/api/TipoCurso/";
                axios.get(direccion/* ,{headers: { token:this.tokenLogin } } */).then( res =>{
                res.data.forEach(el => {
                    this.form.items.push(el.nombreTipoCurso)

                  });
                this.items = res.data;

                  });

                   let today = new Date();
                  let dd = today.getDate();
                  let mm = today.getMonth() + 1; //January is 0!
                  let yyyy = today.getFullYear();

                  if (dd < 10) {
                      dd = '0' + dd;
                    }

                    if (mm < 10) {
                      mm = '0' + mm;
                    }

                    today =  yyyy + '-' + mm + '-' + dd ;
                    this.fechaMin=today
    },

  },
   created() {
    this.initialize()
  },
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
