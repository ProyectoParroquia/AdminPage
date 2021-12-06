<template>
  <v-row>
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




<v-col class="col-12 col-sm-6 col-md-4 ">
  <v-card

  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">

        </div>
        <v-list-item-title class="text-h6 mb-1 ">
       Cursos<br> inhabilitados
        </v-list-item-title>
        <v-list-item-subtitle class="text-h6"  style="color: red">
    <center>                  {{dato}}</center>
        </v-list-item-subtitle>
        <v-list-item-action-text>
          Si desea activar o consultar los cursos de clic
        </v-list-item-action-text>
      </v-list-item-content>

      <v-list-item-avatar
        size="80"
        color="grey"
      > <v-img src="https://10palabras.com/wp-content/uploads/2019/04/inactivo-palabras-in.png"></v-img></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        dark
        color="red"
  @click="Consultar()"
      >
        Consultar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
<v-col class="col-12 col-sm-6 col-md-4 ">
   <v-card

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
<v-col class="col-12 col-sm-6 col-md-4 ">
  <v-card

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
<v-col class="col-12 col-sm-6 col-md-4 ">
  <v-card

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
<v-col
class="col-12 col-sm-6 col-md-4 "
 >
  <v-card

  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">

        </div>
        <v-list-item-title class="text-h6 mb-1">
       Inscripciones<br> realizadas
        </v-list-item-title>
        <v-list-item-subtitle class="text-h6" style="color: yellow">
    <center>                  {{dato4}}</center>
        </v-list-item-subtitle>
        <v-list-item-action-text>
          Si desea conocer las consultas realizadas de clic
        </v-list-item-action-text>
      </v-list-item-content>

      <v-list-item-avatar
        size="80"
        color="grey"
      >
      <v-img src="https://escuela.derecho.digital/wp-content/uploads/2020/02/form2big-1024x683.jpg">
        </v-img></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        dark
        color="yellow"
  @click="ConsultarIns()"
      >
        Consultar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
<v-col class="col-12 col-sm-6 col-md-4 ">
  <v-card

  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">

        </div>
        <v-list-item-title class="text-h6 mb-1">
      Inscripciones<br> por revisar
        </v-list-item-title>
        <v-list-item-subtitle class="text-h6" style="color: orange">
    <center>                  {{dato5}}</center>
        </v-list-item-subtitle>
        <v-list-item-action-text>
          Si desea revisar las inscripciones de clic
        </v-list-item-action-text>
      </v-list-item-content>
<v-list-item-avatar
 size="80"
        height="80">
      <v-img

        src="https://unienceproduction-images-dhnw29xkhb2o.s3.amazonaws.com/de9e7ded9c67b3ea7b312ad103dc04115a0df636d7c"
      >
      </v-img></v-list-item-avatar>

    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        dark
        color="orange"
  @click="ConsultarIns()"
      >
        Consultar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>

  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'
/* import StatisticsCardVertical from '@/components/statistics-card/StatisticsCardVertical.vue'
 */
// demos
import DashboardCongratulationJohn from './DashboardCongratulationJohn.vue'
import DashboardStatisticsCard from './DashboardStatisticsCard.vue'
/* import DashboardCardTotalEarning from './DashboardCardTotalEarning.vue'

import DashboardWeeklyOverview from './DashboardWeeklyOverview.vue'
import DashboardDatatable from './DashboardDatatable.vue'

import grafic from './CardGrafic.vue'
import grafic2 from './CardGrafic2.vue'
import grafic3 from './CardGrafic3.vue' */
import axios from 'axios';
export default {
  components: {
    /* StatisticsCardVertical, */
    DashboardCongratulationJohn,
    DashboardStatisticsCard,
   /*  DashboardCardTotalEarning,

    DashboardWeeklyOverview,
    DashboardDatatable,

    grafic,
    grafic2,
    grafic3, */
  },
     data: () => ({
 dato: null,
 dato1: null,
 dato2: null,
 dato3: null,
  dato4: null,
 dato5: null,
    }),
    methods: {
    Consultar(){

            this.$router.push('/Cursos');

    },
      ConsultarIns(){

            this.$router.push('/Inscripcion');

    },
        ConsultarRe(){

            this.$router.push('/Recreativos');

    },
    },
  mounted:function(){
        let url = "https://sacris.herokuapp.com/api/Curso/i";
        axios.get(url)
    .then(data => {
         console.log(data)
           this.dato= data.data;

        })
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
          let url5 = "https://sacris.herokuapp.com/api/Inscripcion//R";
        axios.get(url5)
    .then(data => {
         console.log(data)
           this.dato4= data.data;

        })
          let url6 = "https://sacris.herokuapp.com/api/Inscripcion//PR";
        axios.get(url6)
    .then(data => {
         console.log(data)
           this.dato5= data.data;

        })
  },
  setup() {
    const totalProfit = {
      statTitle: 'Comunitarias',
      icon: mdiPoll,
      color: 'success',
      subtitle: 'Ingreso Semanal',
      statistics: '$25.6k',
      change: '+42%',
    }

    const totalSales = {
      statTitle: 'Particular',
      icon: mdiCurrencyUsd,
      color: 'secondary',
      subtitle: 'Ingreso Semanal',
      statistics: '$220.6k',
      change: '-15%',
    }

    // vertical card options
    const newProject = {
      statTitle: 'Comunitaria',
      icon: mdiLabelVariantOutline,
      color: 'primary',
      subtitle: 'Ingreso Mensual',
      statistics: '$420.6k',
      change: '-18%',
    }

    const salesQueries = {
      statTitle: 'Particular',
      icon: mdiHelpCircleOutline,
      color: 'warning',
      subtitle: 'Ingreso mensual',
      statistics: '$920.6k',
      change: '-18%',
    }

    return {
      totalProfit,
      totalSales,
      newProject,
      salesQueries,
    }
  },
}
</script>
