<template>
<div>
  <h3 class="text-center">Esta sección esta hecha para que usted pueda realizar la gestión (Agregar- Editar - Eliminar) de otra información</h3>
<v-divider class="my-5 mb-7"></v-divider>
    <v-row>
        <v-col>
           <tipo-usu/>
        </v-col>
        <v-col>
         <tipo-docu/>
        </v-col>
    </v-row>
</div>
</template>

<script>
import tipoDocu from '../TipoDocumentos/tipoDocu.vue'
import tipoUsu from '../TipoUsuarios/tipoUsu.vue'
export default {
    components:{
      tipoDocu,
      tipoUsu
    }
}
</script>

