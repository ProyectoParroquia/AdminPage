<template>
    <v-container grid-List-md>
   <v-row>
        <v-col
        cols="4"
           v-for="anuncio in listaAnuncio"
          :key="anuncio.idAnuncio"
           :items="data"
        >
          <v-card  max-width="500">
            <v-img
             class="blue--text align-end"
              :src="'https://sacris.herokuapp.com/'+anuncio.imagenAnuncio"
                 gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <h1 color="white" style="color:#FFFFFF; font-size:30px;"  v-text="anuncio.tituloAnuncio"></h1>
            </v-img>
            <br>
            <v-card-actions>
                <v-spacer></v-spacer>
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
         <p> {{anuncio.mensajeAnuncio}}</p>
         <p> Desde: {{anuncio.fechaInicio}}</p>
        <p> Hasta: {{anuncio.fechaFinal}}</p>
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
import {
  mdiPencil,
   mdiEyePlus,
   mdiContrast,
   mdiCloseCircleOutline
} from '@mdi/js'
import axios from 'axios';

 export default {


  data: () => ({
    data:'',
  listaAnuncio: null

  }),

  methods: {

    },
 setup() {
    return {
      icons: {
        mdiPencil,
         mdiEyePlus,
         mdiContrast,
         mdiCloseCircleOutline
      },
    }
  },
    mounted:function(){

        let direccion = "https://sacris.herokuapp.com/api/Anuncio";
        axios.get(direccion)
                    .then( res =>{
                this.listaAnuncio= res.data;
                  });

    }
}
</script>

<style scoped>

</style>
