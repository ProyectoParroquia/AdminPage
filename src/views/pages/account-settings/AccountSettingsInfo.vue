<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-form class="multi-col-validation" @submit.prevent="submit">
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
              v-model="optionsLocal.numeroContacto"
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
              readonly
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
          type="submit"
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
     <!-- ALERTAS -->
             <v-snackbar
                v-model="snackbarData.snackbar"
                :timeout="snackbarData.timeout"
                :color="snackbarData.color"
                top
                right
              >

                {{ snackbarData.text }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbarData.snackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
  </v-card>
</template>

<script>
import { ref } from '@vue/composition-api'
import axios from 'axios'
export default {
  data: function(){
     return {

        tokenLogin: localStorage.getItem('token'),
      snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
              color:''
            }

    }
  },
  props: {
    informationData: {
      type: Object,
      default: () => {},
    },
    recargar:{
      type: Function
    }
  },
  methods: {
      submit(){
         axios.put("http://localhost:3000/api/usuarios/actualizar/"+this.optionsLocal.idUsuario, this.optionsLocal,{ headers: { token:this.tokenLogin } })
          .then(res =>{
            if(res.status === 201){
              this.Snackbar(res.data.success, "green")
              /* setTimeout(this.recarga,1000); */

            }else{
              this.makeToast("Error",res.data.mensage,"danger");
              console.log("Error")
            }
          })

      },
      recarga(){
        this.$router.go(0);
      },
       Snackbar(texto, color) {
          this.snackbarData.text=texto,
          this.snackbarData.snackbar=true
           this.snackbarData.color=color
        },
  },
  setup(props) {
    const optionsLocal = ref(JSON.parse(JSON.stringify(props.informationData)))

    const resetForm = () => {
      optionsLocal.value = JSON.parse(JSON.stringify(props.informationData))
    }

    return {
      optionsLocal,
      resetForm,
      /* tokenLogin: localStorage.getItem('token'),
        snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
              color:''
            } */
       }
  },
}
</script>
