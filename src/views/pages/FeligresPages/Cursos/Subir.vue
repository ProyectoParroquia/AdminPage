<template>
 <validation-observer
    ref="observer"
     v-slot="{invalid}"
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
<v-form @submit.prevent="guardar" enctype="multipart/form-data">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
     <v-container>
        <label>Numero de inscripción :</label>
        <br>
        <SelectIns  />
        </v-container>
        <br>
         <v-container>
         <label>Suba los requisitos deacuerdo al curso que eligió  </label>
        <SelectRC />
</v-container>
              <input
         id="file"
          type="file"
           @change="selecArchivo"
    >
    <br>
         <v-btn
        type="submit"
         color="purple"
        text
         :disabled="invalid"
     >

    Guardar
         </v-btn>
        </v-col>
         <v-avatar

                size="400"
                tile
              >
          <pdf :src="imagen"  alt="pdf"></pdf>
        </v-avatar>
      </v-row>

    </v-container>
 </v-form>
  </validation-observer>

</template>

<script>

import axios from 'axios';
import SelectIns from '@/components/curso/components/SelectIns.vue';
import SelectRC from '@/components/SelectRC.vue';
import pdf from 'vue-pdf'
import { required, max, min, numeric} from 'vee-validate/dist/rules'
  import { extend, ValidationObserver} from 'vee-validate'
   extend('numeric', {
    ...numeric,
    message: 'El campo {field} solo debe contener numeros',
  })
  extend('required', {
    ...required,
    message: 'El campo no puede estar vacio',
  })
  extend('max', {
    ...max,
    message: 'El campo  no puede tener más de {length} caracteres',
  })
  extend('min', {
    ...min,
    message: 'El campo  debe tener minimo {length} caracteres',
  })
  extend('required', {
    ...required,
    message: 'El campo no puede estar vacio',
  })
export default {
    components: {SelectIns,
     ValidationObserver,
         SelectRC,
         pdf
          },
    name:"NuevoIR",
    data() {
        return{
          miniatura:'',
          snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
              color:''
            },
            form:{
                 idInscripcionFK: '',
                   idCursoRequisitoFK:'',
                  file: "",
            }
        }
    },

    methods:{

   selecArchivo(e){
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
      Snackbar(texto, color) {
          this.snackbarData.text=texto,
            this.snackbarData.snackbar=true
            this.snackbarData.color=color
        },
  guardar() {

           this.form.idInscripcionFK = document.getElementById("ListaidInscripcion").value
               this.form.idCursoRequisitoFK= document.getElementById("idCursoRequisitoFK").value
           const formdata = new FormData()
                 formdata.append('idCursoRequisitoFK', this.form.idCursoRequisitoFK),
                  formdata.append('idInscripcionFK', this.form.idInscripcionFK),
             formdata.append('file', this.form.file),
            axios.post( "http://localhost:5000/api/InscriRequi/",formdata)
          .then(res =>{
                    if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")
              //llamamos a este metodo para reenderizar el componente y que muestre los cambios
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
         cambiarIns(tipo){
            this.form.idInscripcionFK = tipo
        }

    },
    computed:{
      imagen(){
      return this.miniatura;
    }
    }
}

</script>
<style scoped>

</style>
