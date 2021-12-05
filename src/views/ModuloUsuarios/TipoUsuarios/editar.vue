<template>
          <v-card>

            <v-card-title>
              {{cambioTitulo()}}
            </v-card-title>
             <validation-observer
                 ref="observer"
                 v-slot="{ invalid }"
                 >
            <v-card-text>
              <v-container>

                <v-row>
                  <v-col>
                   <validation-provider
                      v-slot="{ errors }"
                      name="Tipo Usuario"
                      rules="required|max:10|alpha_spaces|min:4"
                    >
                          <v-text-field
                          color="#ae5f9e"
                            v-model="datoTU.nombreTipoUsuario"
                            :counter="10"
                            :error-messages="errors"
                            label="Tipo Usuario"
                            required
                          ></v-text-field>
                          </validation-provider>
                  </v-col>

                   </v-row>



              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn

                text
                @click="cerrarDialogeditarTU"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"
                :disabled="invalid"
                @click="GuardarActualizacion"
              >
                Guardar
              </v-btn>
            </v-card-actions>
            </validation-observer>
          </v-card>
</template>
<script>
import axios from 'axios'
import { required, max, min, alpha_spaces} from 'vee-validate/dist/rules'
import {ValidationProvider, ValidationObserver, extend, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')




  extend('alpha_spaces', {
    ...alpha_spaces,
    message: 'El campo {_field_} solo debe tener caracteres alfabeticos y espacios',
  })

  extend('required', {
    ...required,
    message: 'El campo {_field_} no puede estar vacio',
  })

  extend('max', {
    ...max,
    message: 'El campo {_field_} no puede tener más de {length} caracteres',
  })

  extend('min', {
    ...min,
    message: 'El campo {_field_} debe tener minimo {length} caracteres',
  })


export default {

  props:{
        titulo:Number,
        datoTU:Object,
        cerrarDialogeditarTU:Function,
        Snackbar:Function,
        initialize:Function
    },
  components:{
      ValidationProvider,
       ValidationObserver},


  methods:{
    cambioTitulo(){
      return this.titulo === 2 ?'Nuevo tipo Usuario' :'Editar Tipo Usuario'
    },

     GuardarActualizacion() {
        if(this.datoTU.idTipoUsuario){
          console.log("editando")
          this.$refs.observer.validate()
          axios.put("https://sacris.herokuapp.com/api/tipoUsuario/actualizar/"+this.datoTU.idTipoUsuario, this.datoTU,{ headers: { token: localStorage.getItem('token') }  })
          .then(res =>{
            if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")
              this.initialize()
            }else{
              this.makeToast("Error",res.data.mensage,"danger");
              console.log("Error")
            }
          })

        }else{
          console.log("creando")
          axios.post("https://sacris.herokuapp.com/api/tipoUsuario",this.datoTU, { headers: { token: localStorage.getItem('token') }  } )
            .then(res =>{
                console.log(res);
                if(res.status === 201){
                  this.Snackbar(res.data.success, "green")
                  this.initialize()

                }else{
                  if(res.data.err){
                    this.Snackbar(res.data.err, "red")
                  }

                  if(res.data.err.errors){
                    res.data.err.errors.forEach(element => {

                      this.Snackbar(element.message, "red")
                    });
                  }else if(res.data.err.errors[0].message){
                    res.data.err.errors.forEach(el => {
                      this.Snackbar(el.message, "red")
                    })
                  }

                }

            })
        }
      this.cerrarDialogeditarTU()
    },
  }
}
</script>
