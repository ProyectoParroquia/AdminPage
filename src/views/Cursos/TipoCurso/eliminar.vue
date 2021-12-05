<template>
  <v-card class="pt-4">
            <v-card-text class="text-h4 text-center font-weight-black"  >
              Eliminar Tipo Curso
            </v-card-text>
            <v-card-text class="text-h5 text-center" >
                ¿Eliminar Tipo curso "{{datoTD.nombreTipoCurso}}" ?
                Recuerde que para hacerlo no debe haber ningún curso registrado
                con este tipo curso
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
     salir(){
            this.$router.go(0);
            },
    eliminarTU() {
      axios.delete("https://sacris.herokuapp.com/api/TipoCurso/"+this.datoTD.idTipoCurso,{ headers: { token: localStorage.getItem('token') }  })
              .then( res =>{
                console.log(res)
                 if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")
              this.initialize()
              this.salir()
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
