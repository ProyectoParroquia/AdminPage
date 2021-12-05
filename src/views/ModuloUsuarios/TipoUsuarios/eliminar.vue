<template>
  <v-card class="pt-4">
            <v-card-text class="text-h4 text-center font-weight-black"  >
              Eliminar Tipo Usuario
            </v-card-text>
            <v-card-text class="text-h5 text-center" >
                ¿Eliminar Tipo usuario "{{datoTU.nombreTipoUsuario}}" ?
              </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn

                text
                @click="cerrarDialogEliminarTU()"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"

                @click="eliminarTU"
              >
                Aceptar
              </v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>

          </v-card>
</template>
<script>
import axios from 'axios'
export default {
   props:{
        datoTU:Object,
        cerrarDialogEliminarTU:Function,
        Snackbar:Function,
        initialize:Function,
    },

  methods:{
    eliminarTU() {
      axios.delete("https://sacris.herokuapp.com/api/tipoUsuario/"+this.datoTU.idTipoUsuario,{ headers: { token: localStorage.getItem('token') }  })
              .then( res =>{
                console.log(res)
                 if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")
              this.initialize()
                 }else{
                   this.makeToast("Error",res.data.mensage,"danger");
              console.log("Error")
                 }
              })
      this.cerrarDialogEliminarTU()
      this.initialize()
    },
  }


}
</script>
