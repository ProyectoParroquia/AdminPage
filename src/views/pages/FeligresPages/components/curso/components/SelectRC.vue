<template>

<select style=""  class="form-control" name="idCursoRequisitoFK" id="idCursoRequisitoFK">
    <option v-for="RCurso in ListaRCurso" :key="RCurso.idCursoRequisito"
     :value="RCurso.idCursoRequisito">{{RCurso.Curso.nombreCurso}}:&nbsp;{{RCurso.Requisito.nombreRequisitos}}
     </option>
</select>

</template>

<script>
import axios from 'axios';


export default {
    name:"SelectRC",
   data(){
        return {
            ListaRCurso:null,
        }

    },
    mounted:function(){
        let direccion = "https://sacris.herokuapp.com/api/CursoRequisito";
                axios.get(direccion).then( data =>{
                this.ListaRCurso = data.data;
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
