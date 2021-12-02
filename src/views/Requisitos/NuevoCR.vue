
<template>

     <v-form enctype="multipart/form-data">

    <v-container >

      <v-row>
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

                  </v-btn>
                </template>
              </v-snackbar>
        <v-col
          cols="12"
          sm="6"
        >
         <v-container>
           <label>Elija el curso al cual definirá sus requisios</label>
           <br>
             <SelectCurso  />
         </v-container>
          <v-autocomplete
          clearable
          v-model="form.idRequisitos"
          :items="form.items"
          :error-messages="errors"
          label="Requisitos"
          data-vv-name="form.idRequisitos"
          required
          id="idRequisitosFK"
        >
        </v-autocomplete>
         <v-btn  class="ma-2"
         color="purple"
         text
         v-on:click="guardar()" >
        Guardar
        </v-btn>
        </v-col>
      </v-row>
    </v-container>
 </v-form>
</template>
<script>
import SelectCurso from '@/components/SelectCurso.vue';
import axios from 'axios';

export default {

    name:"NuevoInscri",
    data() {

        return{
           snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
              color:''
            },
            form:{
                 'idCursoFK': '',
                 'idRequisitosFK':'',
                 "idRequisitos": null,
                  "items": [
                    'Documento de identidad',
                    'Registro civil',
                    'Partida de bautismo',
                    'Partida de bautismo,certificado de primera comunión',
                     'Certificado de confirmación',

                  ],
            }
        }
    },
    components:{

         SelectCurso,
    },
    methods:{
        guardar(){
            this.form.idCursoFK = document.getElementById("idCursoFK").value
              switch (this.form.idRequisitos) {
              case 'Documento de identidad':
                      this.form.idRequisitosFK = 1
                break;
              case 'Registro civil':
                      this.form.idRequisitosFK = 2
                break;
                case 'Partida de bautismo':
                      this.form.idRequisitosFK = 3
                break;
                 case 'Partida de bautismo y certificado de primera comunión':
                      this.form.idRequisitosFK = 4
                break;
                case  'Certificado de confirmación':
                      this.form.idRequisitosFK = 5
                break;
            }

            axios.post("http://localhost:3000/api/CursoRequisito",this.form)
         .then(res =>{
                    if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")
              this.salir()
            }else{
              this.makeToast("Error",res.data.mensage,"danger");
              console.log("Error")
            }
              })
        },
          Snackbar(texto, color) {
          this.snackbarData.text=texto,
            this.snackbarData.snackbar=true
            this.snackbarData.color=color
        },
        cambiarCurso(tipo){
            this.form.idCursoFK = tipo
        },
        cambiarRequisito(tipo){
            this.form.idRequisitosFK = tipo
        }



    }
}

</script>
<style scoped>

</style>
