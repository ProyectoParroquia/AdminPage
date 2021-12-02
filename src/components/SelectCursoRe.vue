<template>

<select class="form-control" name="idCursoFK" id="idCursoFK">
    <option v-for="Curso in ListaCurso" :key="Curso.idCurso"
     :value="Curso.idCurso">{{Curso.nombreCurso}}
     </option>
</select>

</template>

<script>
import axios from 'axios';


export default {
    name:"SelectCursoRe",
   data(){
        return {
            ListaCurso:null,
        }

    },
    mounted:function(){
        let direccion = "http://localhost:3000/api/Curso/recreativos";
                axios.get(direccion).then( data =>{
                this.ListaCurso = data.data;
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
