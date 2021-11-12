<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-card-text class="d-flex">
      <v-avatar
        rounded
        size="120"
        class="me-6"
      ><!--
      agregar ruta de imagenes pero eso lo sabe andreina.. lo sabra* -->
        <v-img ></v-img>
      </v-avatar>

      <!-- upload photo -->
      <div>
        <v-btn
          color="primary"
          class="me-3 mt-5"
          @click="$refs.refInputEl.click()"
        >
          <v-icon class="d-sm-none">
            {{ icons.mdiCloudUploadOutline }}
          </v-icon>
          <span class="d-none d-sm-block">Ingresar nueva FOTO</span>
        </v-btn>

        <input
          ref="refInputEl"
          type="file"
          accept=".jpeg,.png,.jpg"
          :hidden="true"
        />

        <v-btn
          color="error"
          outlined
          class="mt-5"
        >
          Reiniciar
        </v-btn>
        <p class="text-sm mt-5">
          Solo insertar archivo tipo imagen (PNG-JPG-JPEG). Tamaño maximo de 800K
        </p>
      </div>
    </v-card-text>

    <v-card-text>
      <v-form class="multi-col-validation mt-6" @submit.prevent="submit">
        <v-row>
          <v-col
            md="12"
            cols="12"
          >
            <v-text-field
              v-model="accountDataLocale.credencial.username"
              label="Nombre de Usuario"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="accountDataLocale.correoUsuario"
              label="Correo electrónico"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              readonly
              v-model="accountDataLocale.tipoUsuario.nombreTipoUsuario"
              dense
              label="Rol"
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              readonly
              v-model="accountDataLocale.estadoUsuario"
              dense
              outlined
              label="Estado"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              color="primary"
              class="me-3 mt-4"
              type="submit"
            >
              Guardar Cambios
            </v-btn>
            <v-btn
              color="secondary"
              outlined
              class="mt-4"
              type="reset"
              @click.prevent="resetForm"
            >
              Cancelar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
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
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'
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
    accountData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
      submit(){
        this.accountDataLocale.username = this.accountDataLocale.credencial.username
        console.log(this.accountDataLocale)
         axios.put("http://localhost:3000/api/usuarios/actualizar/"+this.accountDataLocale.idUsuario, this.accountDataLocale,{ headers: { token:this.tokenLogin } })
          .then(res =>{
            if(res.status === 201){

              console.log(res);
              this.Snackbar(res.data.success, "green")
              setTimeout(this.recarga,1000);

            }else{

              this.makeToast("Error",res.data.mensage,"danger");
              console.log("Error")

            }
          })

      },
      recarga(){
        this.$router.go(0)
      },
       Snackbar(texto, color) {
          this.snackbarData.text=texto,
          this.snackbarData.snackbar=true
           this.snackbarData.color=color
        },
  },
  setup(props) {

    const accountDataLocale = ref(JSON.parse(JSON.stringify(props.accountData)))

    const resetForm = () => {
      accountDataLocale.value = JSON.parse(JSON.stringify(props.accountData))
    }

    return {
      status,
      accountDataLocale,
      resetForm,
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
      },
    }
  },
}
</script>
