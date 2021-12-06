<template>

     <v-form enctype="multipart/form-data">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
         <v-container>
             <SelectCursoRe  />
         </v-container>

         <v-btn  class="ma-2"
          color="purple"
        dark v-on:click="guardar()"
        text>
        Guardar
        </v-btn>
        </v-col>
      </v-row>
    </v-container>
 </v-form>

</template>
<script>
import SelectCursoRe from '../curso/components/SelectCursoRe.vue';
import axios from 'axios';

export default {

    name:"NuevoIn",
    data() {
        return{
              dialog: false,
            form:{
                 'idCursoFK': '',

            }
        }
    },
    components:{

         SelectCursoRe,

    },
    methods:{
        guardar(){
            this.form.idCursoFK = document.getElementById("idCursoFK").value

            axios.post("https://sacris.herokuapp.com/api/Inscripcion",this.form)
         .then(data =>{
                    console.log(data);
                 this.salir()

            })
        },
        salir(){
                this.$router.push('/Subir')
        },
        cambiarCurso(tipo){
            this.form.idCursoFK = tipo
        },

        makeToast(titulo,texto,tipo) {
            this.toastCount++
            this.$bvToast.toast(texto, {
            title: titulo,
            variant: tipo,
            autoHideDelay: 5000,
            appendToast: true
            })
        }

    }
}

</script>
<style scoped>

</style>
