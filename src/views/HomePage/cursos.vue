<template>
    <v-container grid-List-md>
     <!--    <v-dialog
      transition="dialog-top-transition"
      max-width="500px"
    >

  <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
         class="ma-2"
         color="primary"
         exact-active-class=""
         text>
          Inscripciones
             <v-icon
                dark
               right>
            {{ icons.mdiAccountMultiplePlus }}
             </v-icon>
            </v-btn>
      </template>
      <v-card max-width="800px">
        <v-card-title>
          <span class="text-h5">Nueva Inscripcion</span>
        </v-card-title>
        <v-card-text>
      <label>Elija el curso al cual desea inscribirse:</label>
         <NuevoIn/>
        </v-card-text>

      </v-card>
       </v-dialog> -->

<v-row>
        <v-col
        cols="4"
           v-for="curso in listaCurso"
          :key="curso.idCurso"
        >
          <v-card  max-width="500">
            <v-img
             class="blue--text align-end"
              :src="'http://localhost:3000/'+curso.imagenCurso"
                 gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <h1 color="white" style="color:#FFFFFF; font-size:30px;"  v-text="curso.nombreCurso"></h1>
            </v-img>
            <br>
            <v-card-text style="font-size:16px; line-height:0.5em;" >
                         <p>{{curso.fechaInicialCurso}}</p>
                         <p>{{curso.fechaFinalCurso}}</p>
                         <p>{{curso.costoCurso}}</p>
                         <p>{{curso.TipoCurso.nombreTipoCurso}}</p>
                         </v-card-text>
<v-card-actions>
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
          {{curso.descriCurso}}
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

import axios from 'axios';/*
import NuevoIn from '@/components/curso/NuevoIns'; */
import {
  mdiEyePlus,
  mdiDelete,
  mdiBorderColor,
  mdiAccountMultiplePlus
} from '@mdi/js'
export default {
    name:"Dashboard",
    data(){
        return{
          dialog: false,
            listaCurso: null,
            show: false,
            form:{
              'idCursoFK':'',
              "idInscripcion":'',
            },
            icons: {

        mdiDelete,
        mdiEyePlus,
        mdiBorderColor,
        mdiAccountMultiplePlus
      },

        }
    },
    components:{
/* NuevoIn */
    },
    methods:{
         consultarInactivos(){
                 let direccion = "http://localhost:3000/api/Curso/inactivos/recreativo";
                axios.get(direccion).then( data =>{
                    this.listaCurso = data.data;
                    console.log(this.listaCurso)
                });
            },
          salir(){
            this.$router.go(0);
            },
    },
    mounted:function(){
        let url = "http://localhost:3000/api/Curso";
        axios.get(url).then(data => {
            this.listaCurso = data.data;
            console.log(this.listaCurso)
        })

    }
}
</script>
<style lang="stylus" scoped>

</style>
