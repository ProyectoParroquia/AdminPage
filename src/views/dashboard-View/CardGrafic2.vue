<template>
  <v-card
    class="mx-auto text-center"

    max-width="600"
  >
    <v-card-text >
      <v-sheet class="ola" color="primary">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            ${{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text >
      <div class="d-flex align-center">
        <h3 class="text-2xl font-weight-semibold me-4">
          30%
        </h3>
        <span>el 30% de las eucaristias comunitarias de esta semana estan ocupadas🤩 Revisa las Eucaristias</span>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn
        block
        text
        color="primary"
      >
       Ver Eucaristias
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
    }),
  }
</script>

<style>

.ola{
border-radius: 20px;
}

</style>
