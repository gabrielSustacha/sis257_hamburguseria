<script setup lang="ts">
import type { Producto } from '@/models/producto'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const productos = ref<Producto[]>([])

async function getProductos() {
  try {
    const response = await http.get(ENDPOINT)
    productos.value = response.data
  } catch (error) {
    console.error('Error al obtener los productos:', error)
  }
}

function toEdit(id: number) {
  router.push(`/productos/editar/${id}`)
}

async function toDelete(id: number) {
  const r = confirm('¿Está seguro que se desea eliminar el producto?')
  if (r) {
    try {
      await http.delete(`${ENDPOINT}/${id}`)
      await getProductos()
    } catch (error) {
      console.error('Error al eliminar el producto:', error)
    }
  }
}

// Método para formatear la fecha
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Los meses son de 0 a 11
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

onMounted(() => {
  getProductos()
})
</script>

<template>
  <div class="container">
    <div class="row">
      <h2>Productos</h2>
      <div class="col-12">
        <RouterLink to="/productos/crear">
          <font-awesome-icon icon="fa-solid fa-plus" /> Agregar Nuevo Producto
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Categoría</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Fecha de Creación</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in productos" :key="producto.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ producto.categoria?.nombre }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ producto.precioUnitario }}</td>
            <td>{{ producto.stock }}</td>
            <td>{{ formatDate(producto.fechaCreacion) }}</td>
            <td>
              <button class="btn btn-link" @click="toEdit(producto.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn btn-link" @click="toDelete(producto.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
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
