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

    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <dashboard-weekly-overview></dashboard-weekly-overview>
    </v-col>

    <v-col
      cols="12"
      md="4"
      sm="6"
    >
      <dashboard-card-total-earning></dashboard-card-total-earning>
    </v-col>

    <v-col
      cols="12"
      md="4"
    >
      <v-row class="match-height">
        <v-col
          cols="12"
          sm="6"
        >
          <statistics-card-vertical
            :change="totalProfit.change"
            :color="totalProfit.color"
            :icon="totalProfit.icon"
            :statistics="totalProfit.statistics"
            :stat-title="totalProfit.statTitle"
            :subtitle="totalProfit.subtitle"
          ></statistics-card-vertical>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <statistics-card-vertical
            :change="totalSales.change"
            :color="totalSales.color"
            :icon="totalSales.icon"
            :statistics="totalSales.statistics"
            :stat-title="totalSales.statTitle"
            :subtitle="totalSales.subtitle"
          ></statistics-card-vertical>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <statistics-card-vertical
            :change="newProject.change"
            :color="newProject.color"
            :icon="newProject.icon"
            :statistics="newProject.statistics"
            :stat-title="newProject.statTitle"
            :subtitle="newProject.subtitle"
          ></statistics-card-vertical>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <statistics-card-vertical
            :change="salesQueries.change"
            :color="salesQueries.color"
            :icon="salesQueries.icon"
            :statistics="salesQueries.statistics"
            :stat-title="salesQueries.statTitle"
            :subtitle="salesQueries.subtitle"
          ></statistics-card-vertical>
        </v-col>
      </v-row>
    </v-col>

    <v-col
      cols="12"
      md="4"
    >
    <grafic/>
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
    <grafic2/>
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
    <grafic3/>
    </v-col>

    <v-col cols="12">
      <dashboard-datatable></dashboard-datatable>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'
import StatisticsCardVertical from '@/components/statistics-card/StatisticsCardVertical.vue'

// demos
import DashboardCongratulationJohn from './DashboardCongratulationJohn.vue'
import DashboardStatisticsCard from './DashboardStatisticsCard.vue'
import DashboardCardTotalEarning from './DashboardCardTotalEarning.vue'

import DashboardWeeklyOverview from './DashboardWeeklyOverview.vue'
import DashboardDatatable from './DashboardDatatable.vue'

import grafic from './CardGrafic.vue'
import grafic2 from './CardGrafic2.vue'
import grafic3 from './CardGrafic3.vue'

export default {
  components: {
    StatisticsCardVertical,
    DashboardCongratulationJohn,
    DashboardStatisticsCard,
    DashboardCardTotalEarning,

    DashboardWeeklyOverview,
    DashboardDatatable,

    grafic,
    grafic2,
    grafic3,
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
