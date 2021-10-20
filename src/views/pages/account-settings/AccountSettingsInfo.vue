<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-form class="multi-col-validation">
      <v-card-text class="pt-5">
        <v-row>
          <v-col cols="12" md="6">
              <v-text-field
              v-model="optionsLocal.nombreUsuario"
              outlined
              dense
              label="Nombre"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="optionsLocal.apellidoUsuario"
              outlined
              dense
              label="Apellido"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="optionsLocal.fechaNacimientoUsuario"
              outlined
              dense
              label="Fecha Cumpleaños"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="optionsLocal.numeroDocumentoUsuario"
              outlined
              dense
              label="Numero Contacto"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
          <v-text-field
              v-model="optionsLocal.tipoDoc.denominacionTipoDocumento"
              outlined
              dense
              label="Tipo Documento"
            ></v-text-field>

          </v-col>

          <v-col
            cols="12"
            md="6"
          >
             <v-text-field
              v-model="optionsLocal.numeroDocumentoUsuario"
              outlined
              dense
              label="Numero Documento"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-btn
          color="primary"
          class="me-3 mt-3"
        >
          Guardar Cambios
        </v-btn>
        <v-btn
          outlined
          class="mt-3"
          color="secondary"
          type="reset"
          @click.prevent="resetForm"
        >
          Cancelar
        </v-btn>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  props: {
    informationData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const optionsLocal = ref(JSON.parse(JSON.stringify(props.informationData)))

    const resetForm = () => {
      optionsLocal.value = JSON.parse(JSON.stringify(props.informationData))
    }

    return { optionsLocal, resetForm }
  },
}
</script>
