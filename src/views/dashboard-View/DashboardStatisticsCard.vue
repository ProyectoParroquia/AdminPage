<template>
  <v-card>
    <v-card-title>
      <span class="font-weight-semibold">Nuestros servicios</span>
      <v-spacer></v-spacer>
      <v-btn
        icon
        small
        class="me-n3 mt-n2"
        disabled
      >
        <v-icon>
          {{ icons.mdiCheckboxMarkedCircleOutline  }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle class="mb-8 mt-n5">
      <span class="font-weight-semibold text--primary me-1">Le facilitamos sus tareas</span>
      <span>😎</span>
    </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col
          v-for="data in statisticsData"
          :key="data.title"
          cols="6"
          md="3"
          class="d-flex align-center"
        >
          <v-avatar
            size="44"
            :color="resolveStatisticsIconVariation (data.title).color"
            rounded
            class="elevation-1"
          >
            <v-icon
              dark
              color="white"
              size="30"
            >
              {{ resolveStatisticsIconVariation (data.title).icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ data.title }}
            </p>
            <h3 class="text-xl font-weight-semibold">
              {{ data.total }}
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiCurrencyUsd, mdiTrendingUp, mdiCheckboxMarkedCircleOutline , mdiLabelOutline } from '@mdi/js'

export default {
  setup() {
    const statisticsData = [
      {
        title: 'Cantidad de Cursos',
        total: '6',
      },
      {
        title: 'Feligreses',
        total: '30',
      },
      {
        title: 'Total Incritos ',
        total: '2',
      },
      {
        title: 'Ingresos',
        total: '0',
      },
    ]

    const resolveStatisticsIconVariation = data => {
      if (data === 'Cantidad de Cursos') return { icon: mdiTrendingUp, color: 'primary' }
      if (data === 'Feligreses') return { icon: mdiAccountOutline, color: 'success' }
      if (data === 'Eucaristias') return { icon: mdiLabelOutline, color: 'warning' }
      if (data === 'Ingresos') return { icon: mdiCurrencyUsd, color: 'info' }

      return { icon: mdiAccountOutline, color: 'success' }
    }

    return {
      statisticsData,
      resolveStatisticsIconVariation,

      // icons
      icons: {
        mdiCheckboxMarkedCircleOutline ,
        mdiTrendingUp,
        mdiAccountOutline,
        mdiLabelOutline,
        mdiCurrencyUsd,
      },
    }
  },
}
</script>
