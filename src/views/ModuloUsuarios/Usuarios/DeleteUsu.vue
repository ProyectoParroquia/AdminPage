<template>


          <v-card class="pt-4">
            <v-card-text class="text-h4 text-center font-weight-black"  >
              Cambiar estado

            </v-card-text>
            <v-card-text class="text-h5 text-center" >
                ¿Cambiar el estado de {{editedItem.nombreUsuario}} ?
              </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn

                text
                @click="closeDelete"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"

                @click="deleteItemConfirm"
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
  data: () => ({
  }),
    props:{
        editedItem:Object,
        closeDelete:Function,
        Snackbar:Function,
        initialize:Function,
        valorBoton:Boolean
    },

methods:{

     deleteItemConfirm() {
        console.log(this.valorBoton)

      let cambioEstado
      if(this.valorBoton){
        cambioEstado = "inhabilitar"
      }else{
        cambioEstado = "activar"
      }


      axios.put("http://localhost:3000/api/usuarios/"+cambioEstado+"/"+this.editedItem.idUsuario, this.editedItem,{headers: { token:this.tokenLogin } })
              .then( res =>{
                console.log(res)
                 if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")
                this.valorBoton=!this.valorBoton
                  this.initialize()
                 }else{
                   this.makeToast("Error",res.data.mensage,"danger");
              console.log("Error")
                 }
              })
      this.closeDelete()
    },

}
}
</script>
