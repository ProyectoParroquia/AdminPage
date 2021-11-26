<template>
  <v-card class="pt-4">
            <v-card-text class="text-h4 text-center font-weight-black"  >
              Eliminar Tipo Documento
            </v-card-text>
            <v-card-text class="text-h5 text-center" >
                ¿Eliminar Tipo Documento "{{datoTD.denominacionTipoDocumento}}" ?
              </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn

                text
                @click="cerrarDialogEliminarTD()"
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
  //(las propiedades las traemos al necesitar O USAR alguna funcion, arreglo o atributo en este componente)
   props:{
        datoTD:Object,
        cerrarDialogEliminarTD:Function,
        Snackbar:Function,
        initialize:Function,
    },

  methods:{
    eliminarTU() {
      axios.delete("http://localhost:3000/api/tipoDoc/"+this.datoTD.idTipoDocumento)
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
      this.cerrarDialogEliminarTD()
      this.initialize()
    },
  }


}
</script>
