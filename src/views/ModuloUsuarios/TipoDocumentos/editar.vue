<template>
          <v-card>

            <v-card-title>
              <!-- integramos la funcion para el cambio del titulo -->
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
                      rules="required|max:10|alpha_spaces|min:2"
                    >
                          <v-text-field
                          color="#ae5f9e"
                            v-model="datoTD.denominacionTipoDocumento"
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
                @click="cerrarDialogeditarTD"
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
  data:()=>({
    tokenLogin: localStorage.getItem('token'),
  }),
  //accedemos a las propiedades que recibimos del componente padre(tipoDocu)
  //(las propiedades las traemos al necesitar alguna funcion, arreglo o atributo en este componente)
  props:{
        titulo:Number,
        datoTD:Object,
        cerrarDialogeditarTD:Function,
        Snackbar:Function,
        initialize:Function
    },
  components:{
      ValidationProvider,
       ValidationObserver},


  methods:{
    /* metodo que valida si la variable titulo trae un 2 o no lo trae,
    si lo trae (?) pondra Nuevo... si no (:) pondra editar */
    cambioTitulo(){
      return this.titulo === 2 ?'Nuevo tipo Documento' :'Editar Tipo Documento'
    },

    //Metodo en el que valiamos si el id viene lleno o no
     GuardarActualizacion() {
       //si viene lleno, realizaremos una edicion de el dato que llegue por ese id
        if(this.datoTD.idTipoDocumento){
          console.log("editando")
          this.$refs.observer.validate()
          axios.put("https://sacris.herokuapp.com/api/tipoDoc/actualizar/"+this.datoTD.idTipoDocumento, this.datoTD,{ headers: { token:this.tokenLogin } })
          .then(res =>{
            if(res.status === 201){
              console.log(res)
              this.Snackbar(res.data.success, "green")
              //llamamos a este metodo para reenderizar el componente y que muestre los cambios
              this.initialize()
            }else{
              this.makeToast("Error",res.data.mensage,"danger");
              console.log("Error")
            }
          })
          //si no, agregaremos un nuevo Tipo Doc
        }else{
          console.log("creando")
          axios.post("https://sacris.herokuapp.com/api/tipoDoc/",this.datoTD, {headers: { token:this.tokenLogin } } )
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
      this.cerrarDialogeditarTD()
    },
  }
}
</script>
