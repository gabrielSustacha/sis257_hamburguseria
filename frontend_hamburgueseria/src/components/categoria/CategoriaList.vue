<script setup lang="ts">
import type { Categoria } from '@/models/categoria'    
import { onMounted, ref } from 'vue'  
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var categorias = ref<Categoria[]>([])


async function getCategorias() {
  categorias.value = await http.get(ENDPOINT).then((response) => response.data)
}


function toEdit(id: number) {
  router.push(`/categorias/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar la Categoria?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getCategorias())
  }
}

onMounted(() => {
  getCategorias()    
})
</script>


<template>
  <div class="container">
   

    <div class="row">
      <h2>Categorias</h2>
      <div class="col-12">
        <RouterLink to="/categorias/crear"
        ><font-awesome-icon icon="fa-solid fa-plus" title="Agregar Nueva Categoria" /></RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="(categoria, index) in categorias.values()" :key="categoria.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ categoria.nombre }}</td>
           

            <td>
              <button class="btn btn-link" @click="toEdit(categoria.id)">
              <font-awesome-icon icon="fa-solid fa-edit" title="Editar" />
              </button>



              <button class="btn btn-link" @click="toDelete(categoria.id)"
              ><font-awesome-icon icon="fa-solid fa-trash" title="Elimnar" /></button>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<style scoped>
.table th{
   background-color: white; /* Color plomo */
  border: 1px solid #000000; /* Bordes negros */
}
.table td {
  background-color:rgba(227, 155, 20); /* Color plomo */
  border: 1px solid #000000; /* Bordes negros */
}


.table td {
  color: #000000; /* Texto oscuro para las celdas */
}
.btn{
  color :#000000;
}
</style>
