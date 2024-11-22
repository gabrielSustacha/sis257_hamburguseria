<script setup lang="ts">
import type { Ventadetalle } from '@/models/ventadetalle'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var ventadetalles = ref<Ventadetalle[]>([])

async function getVentadetalles() {
  ventadetalles.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/ventadetalles/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el detalle de Venta?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getVentadetalles())
  }
}

onMounted(() => {
  getVentadetalles()
})
</script>

<template>
  <div class="container">
  

    <div class="row">
      <h2>Lista de Detalle de Ventas</h2>
      <div class="col-12">
        <RouterLink to="/ventadetalles/crear"
          ><font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo Detalle de Venta</RouterLink
        >
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Venta</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ventadetalle, index) in ventadetalles.values()" :key="ventadetalle.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ ventadetalle.producto.nombre }}</td>
            <td>{{ ventadetalle.venta.totalVenta }}</td>
            <td>{{ ventadetalle.cantidad }}</td>
            <td>{{ ventadetalle.subtotal }}</td>

            <td>
              <button class="btn btn-link" @click="toEdit(ventadetalle.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn btn-link" @click="toDelete(ventadetalle.id)">
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