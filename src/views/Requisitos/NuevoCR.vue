
<template>

     <v-form enctype="multipart/form-data">

        <v-card style="padding:30px;">
           <h2 class="text-center">Elija el curso al cual definirá sus requisitos</h2>



           <v-divider></v-divider>
           <v-row>
      <v-col
      class="mt-5"
        cols="12"
        md="2"
      >
        <label for="curso">Curso:</label>
      </v-col>

      <v-col
        cols="12"
        md="9"
      >
        <!-- <v-text-field
          id="firstnameHorizontalIcons"
          v-model="firstname"
          :prepend-inner-icon="icons.mdiAccountOutline"
          outlined
          dense
          placeholder="First Name"
          hide-details
        ></v-text-field> -->
        <SelectCurso id="curso" />
      </v-col>
       <v-col
      class="mt-5"
        cols="12"
        md="2"
      >
        <label for="requisito">Requisitos:</label>
      </v-col>
      <v-col
        cols="12"
        md="9"
      >

        <v-autocomplete
          clearable
          v-model="form.idRequisitos"
          :items="form.items"
          label="Requisitos"
          data-vv-name="form.idRequisitos"
          required
          id="requisito"
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
      </v-col>
       <v-col
        offset-md="2"
        cols="12"
      >
        <v-btn  class="ma-2"
         color="primary"
         dark
         v-on:click="guardar()" >
        Guardar
        </v-btn>
      </v-col>
           </v-row>
             <!-- <SelectCurso  /> -->


        </v-card>

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

            axios.post("https://sacris.herokuapp.com/api/CursoRequisito",this.form)
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
