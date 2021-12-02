<template>
     <v-form enctype="multipart/form-data">
      <Header/>
     <br>
      <v-date-picker
          name="fechaInscripcion" 
          id="fechaInscripcion" 
          v-model="form.fechaInscripcion"
            label="fecha Inscripcion"
          ></v-date-picker>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
           <v-text-field
          name="idCursoFK" 
          id="idCursoFK" 
          v-model="form.idCursoFK"
            label="Curso"
          ></v-text-field>
           <v-btn  class="ma-2"
          color="purple"
        dark
        v-on:click="salir()" >
        Salir
        </v-btn>
         <v-btn  class="ma-2"
          color="purple"
        dark v-on:click="editar()" >
     Editar
        </v-btn>
         <v-btn  class="ma-2"
         color="purple"
        dark
        v-on:click="functionBtn(botonForm.valor,botonForm.idInscripcion)">{{botonForm.valor}}
        </v-btn>
        </v-col>
      </v-row>
    </v-container>
 </v-form>
</template>
<script>
import Header from '@/components/Header.vue';
import axios from 'axios';
export default {
    
    name:"EditarIns",
    data:function() {
        return{   
            form:{
                "idInscripcion":'',
                 "fechaInscripcion":'',
                 "estadoInscripcion":'',
                 "idCursoFK":''
   
   },
              botonForm:{
          "valor":"",
          "idInscripcion":"",
          
        }
        }
    },
    components:{
       Header
    },
    
    methods:{
            editar(){
               
                axios.put("http://localhost:3000/api/Inscripcion/"+this.form.idInscripcion,this.form)
                .then( data => {
                    console.log(data);
                     this.salir();
                })
            },
            salir(){
                this.$router.push("/Inscripcion")
            },
functionBtn(accion, idInscripcion){
            axios.put("http://localhost:3000/api/Inscripcion/"+accion+"/"+idInscripcion)
           .then(data =>{
                    console.log(data);
              this.salir()
                
            })
        },
    },
         
    mounted:function(){
            this.form.idInscripcion = this.$route.params.id;
              axios.get("http://localhost:3000/api/Inscripcion/"+this.form.idInscripcion)
              .then( datos => {
                  console.log(datos)
                  this.form.fechaInscripcion = datos.data.fechaInscripcion;
                         this.form.idCursoFK = datos.data.idCursoFK;
                          this.botonForm.idInscripcion = this.form.idInscripcion;
                  
                  let estado = datos.data.estadoInscripcion;
        if(estado == "Activo"){
          this.botonForm.valor = "Inhabilitar"
        }else{
          this.botonForm.valor = "Activar"
        }
                  
                  
                  console.log(this.form);
              })
        

    }
}
</script>
