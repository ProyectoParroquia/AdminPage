
<template>
<v-row>
<v-col
        cols="4"
           v-for="requi in listaInscriRequi"
          :key="requi.idInscriRequi"
        >
        <v-card
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="requi.Inscripcion.estadoInscripcion"
                ></v-card-title>

                <v-card-subtitle v-text="requi.CursoRequisito.Curso.nombreCurso"></v-card-subtitle>
                 <v-card-subtitle v-text="requi.CursoRequisito.Requisito.nombreRequisitos"></v-card-subtitle>
                  <v-btn
          v-bind="attrs"
          v-on="on"
          icon
         class="ma-2"
        :href="'https://sacris.herokuapp.com/'+requi.urlRequisito"
         color="primary"
        target="_blank">
             <v-icon
                dark
               right>
            {{ icons.mdiEye }}
             </v-icon>
        </v-btn>
                <v-card-actions>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="200"
                tile
              >
                <pdf :src="'https://sacris.herokuapp.com/'+requi.urlRequisito "></pdf>

              </v-avatar>
            </div>
          </v-card>
         <!---<v-card
          >
          <h1 color="blue" style="color:black; font-size:30px;"  v-text="requi.idInscripcionFK"></h1>

                <v-card-text v-text="requi.idCursoRequisitoFK">
                </v-card-text>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
             <pdf style="width:200px; height:200px" :src="'http://localhost:5000/'+requi.urlRequisito "></pdf>

     <v-btn
          v-bind="attrs"
          v-on="on"
          icon
         class="ma-2"
        :href="'http://localhost:5000/'+requi.urlRequisito"
         color="primary"
        target="_blank">
             <v-icon
                dark
               right>
            {{ icons.mdiEye }}
             </v-icon>
        </v-btn>
              </v-avatar>

          </v-card>--->
                           </v-col>
                           </v-row>


</template>

<script>
import {
  mdiDelete,
  mdiBorderColor,
  mdiAccountMultiplePlus,
  mdiEye
} from '@mdi/js'
import axios from 'axios';
import pdf from 'vue-pdf'
export default {
    name:"RequisitoIns",
    data(){
        return{
           form:{
              'idCursoFK':'',
              "idInscripcionFK":'',
            },
      listaInscriRequi:null,
         icons: {

        mdiDelete,
        mdiBorderColor,
        mdiAccountMultiplePlus,
        mdiEye
      },
        }
    },
    components:{
pdf
    },
    methods:{
        editar(id){
            this.$router.push('/EditarIR/'+id);
        },
        nuevo(){
           this.$router.push('/NuevoIR');
        },

    },
    mounted:function(){
        let url = "https://sacris.herokuapp.com/api/InscriRequi/";
        axios.get(url)
    .then(data => {
         console.log(data)
           this. listaInscriRequi= data.data;

        })

    }
}
</script>

<style scoped>

</style>
