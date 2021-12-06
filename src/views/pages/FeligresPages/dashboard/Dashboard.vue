<template>
    <v-container grid-List-md >

      <v-row cols="2" >
        <v-col
      cols="12"
      md="4"
    >
      <dashboard-congratulation-john></dashboard-congratulation-john>
    </v-col>
    <v-col
      cols="12"
      md="8"
    >
      <dashboard-statistics-card></dashboard-statistics-card>
    </v-col>
<v-col  >
   <v-card
    max-width="354"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">

        </div>
        <v-list-item-title class="text-h6 mb-1">
       Cursos <br>disponibles
        </v-list-item-title>
        <v-list-item-subtitle class="text-h6" style="color: green">
    <center>                  {{dato1}}</center>
        </v-list-item-subtitle>
        <v-list-item-action-text>
          Si desea consultar los cursos de clic
        </v-list-item-action-text>
      </v-list-item-content>

      <v-list-item-avatar
        size="80"
        color="grey"
      ><v-img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Disponible.png"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        dark
        color="green"
  @click="Consultar()"
      >
        Consultar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
<br>
<v-col>
  <v-card
    max-width="354"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">

        </div>
        <v-list-item-title class="text-h6 mb-1">
       Cursos<br> recreativos
        </v-list-item-title>
        <v-list-item-subtitle class="text-h6" style="color: blue">
    <center>                  {{dato2}}</center>
        </v-list-item-subtitle>
        <v-list-item-action-text>
          Si desea consultar los cursos de clic
        </v-list-item-action-text>
      </v-list-item-content>

      <v-list-item-avatar
        size="80"
        color="grey"
      > <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdWm-GuFCf4nfrURJLhcdOc2yBjPhCA237Jw&usqp=CAU"></v-img> </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        dark
        color="blue"
  @click="ConsultarRe()"
      >
        Consultar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
<v-col cols="4" >
  <v-card
    max-width="354"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">

        </div>
        <v-list-item-title class="text-h6 mb-1" >
       Cursos<br> sacramentales
        </v-list-item-title>
        <v-list-item-subtitle class="text-h6" style="color: purple">
    <center>                  {{dato3}}</center>
        </v-list-item-subtitle>
        <v-list-item-action-text>
          Si consultar los cursos sacramentales disponibles de clic
        </v-list-item-action-text>
      </v-list-item-content>

      <v-list-item-avatar
        size="80"
        color="grey"
      ><v-img src="https://www.uniminutoradio.com.co/wp-content/uploads/2019/10/sacramentos-696x466.jpg"></v-img> </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        dark
        color="purple"
  @click="Consultar()"
      >
        Consultar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
  </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';
import DashboardCongratulationJohn from '../../../dashboard-View/DashboardCongratulationJohn.vue'
import DashboardStatisticsCard from '../../../dashboard-View/DashboardStatisticsCard.vue'

  export default {
    components:{
      DashboardCongratulationJohn,
      DashboardStatisticsCard
    },

    data: () => ({
 dato1: null,
 dato2: null,
 dato3: null,
    }),
    methods: {
    Consultar(){

            this.$router.push('/Cursos');

    },
        ConsultarRe(){

            this.$router.push('/Recreativos');

    },
    },
  mounted:function(){
           let url2 = "https://sacris.herokuapp.com/api/Curso/c";
        axios.get(url2)
    .then(data => {
         console.log(data)
           this.dato1= data.data;

        })
           let url3 = "https://sacris.herokuapp.com/api/Curso/r";
        axios.get(url3)
    .then(data => {
         console.log(data)
           this.dato2= data.data;

        })
             let url4 = "https://sacris.herokuapp.com/api/Curso/s";
        axios.get(url4)
    .then(data => {
         console.log(data)
           this.dato3= data.data;

        })

  }
  }


</script>
