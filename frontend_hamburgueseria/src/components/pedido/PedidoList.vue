<script setup lang="ts">
import type { Pedido } from '@/models/pedido'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'pedidos'
const pedidos = ref<Pedido[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const emit = defineEmits(['edit'])
const pedidoDelete = ref<Pedido | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  try {
    loading.value = true
    error.value = null
    const response = await http.get(ENDPOINT)
    pedidos.value = response.data
  } catch (err: any) {
    console.error('Error al obtener pedidos:', err)
    error.value = err.response?.data?.message || 'Error al cargar los pedidos'
  } finally {
    loading.value = false
  }
}

function emitirEdicion(pedido: Pedido) {
  emit('edit', { ...pedido })
}

function mostrarEliminarConfirm(pedido: Pedido) {
  pedidoDelete.value = pedido
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  if (!pedidoDelete.value?.id) return

  try {
    loading.value = true
    await http.delete(`${ENDPOINT}/${pedidoDelete.value.id}`)
    await obtenerLista()
    mostrarConfirmDialog.value = false
  } catch (err: any) {
    console.error('Error al eliminar pedido:', err)
    error.value = err.response?.data?.message || 'Error al eliminar el pedido'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div class="relative overflow-x-auto sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-700">
        <thead class="text-xs uppercase bg-gray-50">
          <tr>
            <th >Nro.</th>
            <th >Empleado</th>
            <th >Cliente</th>
            <th >Método de Pago</th>
            <th >Estado</th>
            <th >Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="6" class="px-6 py-4 text-center">Cargando...</td>
          </tr>
          <tr v-else-if="pedidos.length === 0">
            <td colspan="6" class="px-6 py-4 text-center">No hay pedidos registrados</td>
          </tr>
          <tr
            v-for="(pedido, index) in pedidos"
            :key="pedido.id"
            class="border-b hover:bg-gray-50"
          >
            <td >{{ index + 1 }}</td>
            <td >{{ pedido.empleado?.nombre || 'N/A' }}</td>
            <td >{{ pedido.cliente?.nombre || 'N/A' }}</td>
            <td >{{ pedido.metodoPago }}</td>
            <td >
              <span
                :class="{
                  'bg-yellow-100 text-yellow-800': pedido.estado === 'Pendiente',
                  'bg-green-100 text-green-800': pedido.estado === 'Completado',
                  'bg-red-100 text-red-800': pedido.estado === 'Cancelado'
                }"
                class="px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ pedido.estado }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  aria-label="Editar"
                  text
                  severity="warning"
                  @click="emitirEdicion(pedido)"
                />
                <Button
                  icon="pi pi-trash"
                  aria-label="Eliminar"
                  text
                  severity="danger"
                  @click="mostrarEliminarConfirm(pedido)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      modal
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p class="m-0">
        ¿Estás seguro de que deseas eliminar el pedido
        {{ pedidoDelete?.id ? `#${pedidoDelete.id}` : '' }}?
      </p>
      <template #footer>
        <div class="flex justify-end gap-2">
          <Button
            label="Cancelar"
            icon="pi pi-times"
            text
            @click="mostrarConfirmDialog = false"
          />
          <Button
            label="Eliminar"
            icon="pi pi-trash"
            severity="danger"
            :loading="loading"
            @click="eliminar"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>

</style>
