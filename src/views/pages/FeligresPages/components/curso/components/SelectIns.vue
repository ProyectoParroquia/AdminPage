<template>

<v-text-field
:value="ListaidInscripcion"
name ="idInscripcionFK"
id="ListaidInscripcion"
readonly
>
</v-text-field>

</template>

<script>
import axios from 'axios';


export default {
    name:"SelectIns",
   data(){
        return {
            ListaidInscripcion:null,
        }

    },
    mounted:function(){
        let direccion = "https://sacris.herokuapp.com/api/Inscripcion/max";
                axios.get(direccion).then( data =>{
                this.ListaidInscripcion = data.data;
                  });
    }


}

</script>

<style scoped>
select{
	background-color: #f1f1f100;
	padding: .5rem;
	margin: .5rem 0;
	border: none;
	border-bottom: solid #dddada .1rem;
		transition: all .5s;
  color: #7a7a7a;
}
</style>
