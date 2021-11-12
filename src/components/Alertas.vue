<template>
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
</template>

<script>
export default {
  props:{
    snackbarDataprops:Object
  },
  data:function(){
        return {

            items:{},
            snackbarData:{
              snackbar: false,
              text: '',
              timeout: 2000,
              color:''
            }
        }
    },
    mounted:()=>{

    }
    /*
    methods:{
      Snackbar(texto, color) {
          this.snackbarData.text=texto,
            this.snackbarData.snackbar=true
            this.snackbarData.color=color
        },
    } */
}
</script>
