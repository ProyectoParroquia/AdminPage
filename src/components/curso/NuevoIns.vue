
<template>

     <v-form enctype="multipart/form-data">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="10"
        >
         <v-container>
           <label>Elija el curso al que desea inscribirse</label>
           <br>
             <SelectCursoSa  />
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
import SelectCursoSa from '@/components/SelectCursoSa.vue';
import axios from 'axios';

export default {
  props:{

        Snackbar:Function,
    },
    name:"NuevoInscri",
    data() {
        return{
              dialog: false,
            form:{
                 'idCursoFK': '',

            }
        }
    },
    components:{

         SelectCursoSa,

    },
    methods:{
        guardar(){
            this.form.idCursoFK = document.getElementById("idCursoFK").value

            axios.post("http://localhost:3000/api/Inscripcion",this.form)
          .then( res =>{
                console.log(res)
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
         salir(){
            this.$router.go(0);
            },
        cambiarCurso(tipo){
            this.form.idCursoFK = tipo
        },


    }
}

</script>
<style scoped>

</style>
