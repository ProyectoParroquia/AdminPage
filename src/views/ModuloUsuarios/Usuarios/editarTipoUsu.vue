<template>
  <v-card>
            <v-card-title>
              Cambiar tipo de usuario a: {{editedItem.nombreUsuario}}
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
                          name="select"
                          rules="required"
                        >

                          <v-autocomplete
                            clearable
                            v-model="editedItem.tipoUsuario.nombreTipoUsuario"
                            :items="itemSelectNameTU"
                            :error-messages="errors"
                            label="Tipo Usu"
                            data-vv-name="editedItem.idTipoUsuario"
                            required
                          >
                          <template v-slot:no-data>
                          <v-list-item>
                            <v-list-item-title>
                              No se encontraron
                              <strong>datos</strong>
                            </v-list-item-title>
                          </v-list-item>
                        </template>

                          </v-autocomplete>
                        </validation-provider>

                       </v-col>


                  </v-row>


              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn

                text
                @click="closeTipoUsu"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"
                :disabled="invalid"
                @click="GuardarActualizacionTipoUsu"
              >
                Guardar
              </v-btn>
            </v-card-actions>
            </validation-observer>
          </v-card>
</template>

<script>
import axios from 'axios'
import { required} from 'vee-validate/dist/rules'
import {ValidationProvider, ValidationObserver, extend, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')

  extend('required', {
    ...required,
    message: 'El campo {_field_} no puede estar vacio',
  })

export default {
   props:{
        itemSelectNameTU:Array,
        itemSelectTU:Array,
        editedItem:Object,
        closeTipoUsu:Function,
        Snackbar:Function,
        initialize:Function
    },
     components:{
      ValidationProvider,
       ValidationObserver},
    methods:{

  GuardarActualizacionTipoUsu(){
    this.itemSelectTU.forEach(el => {
                if(el.nombreTipoUsuario == this.editedItem.tipoUsuario.nombreTipoUsuario){
                  this.editedItem.idTipoUsuario_FK = el.idTipoUsuario
                }
              });

       axios.put("https://sacris.herokuapp.com/api/usuarios/tipoUsu/"+this.editedItem.idUsuario, this.editedItem,{ headers: { token: localStorage.getItem('token') } })
          .then(res =>{
            if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")

                  this.initialize()
            }else{
              this.Snackbar(res.data.mensage,"red");
              console.log("Error")
            }
          })
      this.closeTipoUsu()


  },
    }
}
</script>
