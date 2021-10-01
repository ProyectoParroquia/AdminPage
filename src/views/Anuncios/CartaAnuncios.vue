<template>
<v-row>
    <v-col
        sm="6"
        cols="12"
      >
        <v-hover
        v-slot="{ hover }"
          close-delay="496"
          open-delay="191"
        >
        <v-card
          :elevation="hover ? 10 : 2"
          :class="{ 'on-hover': hover }"
          class="d-flex align-center"
        >
          <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
            <div class="mx-auto">
              <v-img
                width="220"
                height="260px"
                src="@/assets/images/pages/card-basic-mobile.png"
              ></v-img>
            </div>
            <v-divider :vertical="$vuetify.breakpoint.mdAndUp"></v-divider>
            <div>
              <v-card-title>
                Aviso
              </v-card-title>
              <v-card-text>
                Los proclamadores de la palabra que deseen participar en las Misas de Navidad y Día de Reyes deben asistir a una reunión el sábado 19 de diciembre a las 9:30 de la mañana.
              </v-card-text>

              <v-card-actions class="d-flex justify-space-between dense">
                <v-btn
                  text
                  color="primary"
                  dark
                >
                  <v-icon>{{ icons.mdiTooltipEditOutline }}</v-icon>
                  <span class="ms-2">Editar</span>
                </v-btn>
                <v-btn icon>
                  <v-icon>{{ icons.mdiDelete }}</v-icon>
                </v-btn>
              </v-card-actions>
            </div>
          </div>
          <v-overlay
          absolute
          opacity= .5
          value=true
        >
          <v-btn
            color="primary"
            @click="overlay = false"
          >
            Re-publicar
          </v-btn>
        </v-overlay>
        </v-card>
        </v-hover>
      </v-col>
       <v-col
        sm="6"
        cols="12"
      >
        <v-card class="d-flex align-center">
          <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
            <div class="mx-auto">
              <v-img
                width="220"
                height="260px"
                src="@/assets/images/pages/Pensamiento.jpg"
              ></v-img>
            </div>
            <v-divider :vertical="$vuetify.breakpoint.mdAndUp"></v-divider>
            <div>
              <v-card-title>
                Recuerden
              </v-card-title>
              <v-card-text>
                El hecho de Proclamar la Palabra de Dios es una dignidad, una misión divina, y esa dignidad no la puede ejercer cualquier persona que simplemente lea bien, si antes no ha
              </v-card-text>

              <v-card-actions class="d-flex justify-space-between dense">
                <v-btn
                  text
                  color="primary"
                  dark
                >
                  <v-icon>{{ icons.mdiTooltipEditOutline }}</v-icon>
                  <span class="ms-2">Editar</span>
                </v-btn>
                <v-btn icon>
                  <v-icon>{{ icons.mdiDelete }}</v-icon>
                </v-btn>
                <v-btn
              icon
              @click="isCardDetailsVisible = !isCardDetailsVisible"
            >
              <v-icon>{{ isCardDetailsVisible ? icons.mdiChevronUp : icons.mdiChevronDown }}</v-icon>
            </v-btn>
              </v-card-actions>
              <v-expand-transition>
            <div v-show="isCardDetailsVisible">
              <v-divider></v-divider>
              <v-card-text>
                penetrado en el contenido de esa Palabra y si no vive el mensaje de la Palabra.              </v-card-text>
            </div>
          </v-expand-transition>
            </div>
          </div>
        </v-card>
      </v-col>
      <!-- Stumptown Roasters. -->
       <v-col
        sm="6"
        cols="12"
      >
        <v-card class="d-flex align-center">
          <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
            <div class="mx-auto">
              <v-img
                width="220"
                height="260px"
                src="@/assets/images/pages/actividades.jpg"
              ></v-img>
            </div>
            <v-divider :vertical="$vuetify.breakpoint.mdAndUp"></v-divider>
            <div>
              <v-card-title>
                Recuerden
              </v-card-title>
              <v-card-text>
                Como es costumbre la Parroquia anticipa sus actividades. Las mismas corresponden a la semana desde el lunes 27 al domingo 3 de octubre de 2021.
              </v-card-text>

              <v-card-actions class="d-flex justify-space-between dense">
                <v-btn
                  text
                  color="primary"
                  dark
                >
                  <v-icon>{{ icons.mdiTooltipEditOutline }}</v-icon>
                  <span class="ms-2">Editar</span>
                </v-btn>
                <v-btn icon>
                  <v-icon>{{ icons.mdiDelete }}</v-icon>
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
      <!-- Apple Watch card -->
      <v-col
        sm="6"
        cols="12"
      >
        <v-card class="d-flex align-center">
          <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
            <div class="mx-auto">
              <v-img
                width="220"
                height="260px"
                src="@/assets/images/pages/Lindo.jpg"
              ></v-img>
            </div>
            <v-divider :vertical="$vuetify.breakpoint.mdAndUp"></v-divider>
            <div>
              <v-card-title>
                Recuerden
              </v-card-title>
              <v-card-text>
                Se recuerda que el curso prematrimonial se realizara los días 11, 12 y 18 de septiembre en modalidad presencial aún hay cupos disponibles.
              </v-card-text>

              <v-card-actions class="d-flex justify-space-between dense">
                <v-btn
                  text
                  color="primary"
                  dark
                >
                  <v-icon>{{ icons.mdiTooltipEditOutline }}</v-icon>
                  <span class="ms-2">Editar</span>
                </v-btn>
                <v-btn icon>
                  <v-icon>{{ icons.mdiDelete }}</v-icon>
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
</v-row>
</template>
<script>
import { ref } from '@vue/composition-api'
import {
  mdiChevronUp,
  mdiChevronDown,
  mdiTooltipEditOutline,
  mdiDelete,
  mdiLockOpenOutline,
  mdiStarOutline,
  mdiAccountOutline,
  mdiTrendingUp,
  mdiHelpCircleOutline,
} from '@mdi/js'

export default {
  setup() {
    const isCardDetailsVisible = false
    const rating = ref(5)

    return {
      isCardDetailsVisible,
      rating,

      // icons
      icons: {
        mdiChevronUp,
        mdiChevronDown,
        mdiTooltipEditOutline,
        mdiDelete,
        mdiLockOpenOutline,
        mdiStarOutline,
        mdiAccountOutline,
        mdiTrendingUp,
        mdiHelpCircleOutline,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/plugins/vuetify/default-preset/preset/mixins.scss';

.avatar-center {
  top: -2rem;
  left: 1rem;
  border: 3px solid white;
  position: absolute;
}

// membership pricing
@include theme--child(memberpricing-bg) using ($material) {
  background-color: rgba(map-deep-get($material, 'primary-shade'), map-deep-get($material, 'states', 'hover'));
}

.memberpricing-bg {
  position: relative;
}
.membership-pricing {
  text-align: center;
  sup {
    font-size: 3.75rem;
    top: 9px;
  }
}
</style>
