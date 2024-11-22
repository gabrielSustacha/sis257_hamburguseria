<script setup lang="ts">
import router from "@/router";
import { onMounted, ref } from "vue";
import http from '@/plugins/axios';
import type { Venta } from "@/models/ventadetalle";
import type { Cliente } from '@/models/cliente';

const props = defineProps<{
  ENDPOINT_API: string;
}>()

const ENDPOINT = props.ENDPOINT_API ?? '';
const clientes = ref<Cliente[]>([]);

async function getClientes() {
  try {
    const response = await http.get('clientes');
    clientes.value = response.data;
  } catch (error) {
    console.error('Error fetching clientes:', error);
  }
}

onMounted(() => {
  getClientes();
});

const ventas = ref<Venta[]>([]);

async function getVentas() {
  try {
    const response = await http.get(ENDPOINT);
    ventas.value = response.data;
  } catch (error) {
    console.error('Error fetching ventas:', error);
  }
}

function toEdit(id: number) {
  router.push(`/ventas/editar/${id}`);
}

async function toDelete(id: number) {
  const r = confirm('¿Está seguro que se desea eliminar la venta?');
  if (r) {
    try {
      await http.delete(`${ENDPOINT}/${id}`);
      getVentas();
    } catch (error) {
      console.error('Error deleting venta:', error);
    }
  }
}

// Método para formatear la fecha
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

onMounted(() => {
  getVentas();
});
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <!-- Breadcrumb -->
    </nav>

    <div class="row">
      
      <div class="col-12 text-center">
        <div class="row">
          <div class="col-12 text-center mt-3 mb-3">
            <router-link to="/ventas/crear" class="btn btn-primary venta">
            
              Generar Nueva Venta
            </router-link>
          </div>
          <div class="col-12 text-center mt-3 mb-3">
      </div>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Cliente</th>
            <th scope="col">Producto</th>
            <th scope="col">Precio por Unidad</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Total de Venta (Bs.)</th>
            <th scope="col">Registrado por :</th>
            <th scope="col">Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(venta, index) in ventas" :key="venta.id">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ venta.cliente?.nombres }} {{ venta.cliente?.apellidos }}</td>
            <td>{{ venta.producto?.nombre }}</td>
            <td>{{ venta.precioUnitario }}</td>
            <td>{{ venta.cantidad }}</td>
              <td>{{ venta.totalVenta }}</td>
            <td>{{ venta.empleado?.nombres }} {{ venta.empleado?.apellidos }}</td>
            <td>{{ formatDate(venta.fechaCreacion) }}</td>
           
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
