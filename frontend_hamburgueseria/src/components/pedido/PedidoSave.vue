<script setup lang="ts">
import type { Pedido } from '@/models/pedido'
import type { Cliente } from '@/models/cliente'
import type { Empleado } from '@/models/empleado'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'pedidos';
const props = defineProps({
  mostrar: Boolean,
  pedido: {
    type: Object as () => Pedido,
    default: () => ({}) as Pedido
  },
  modoEdicion: Boolean
});
const emit = defineEmits(['guardar', 'close']);

const clientes = ref<Cliente[]>([]);
const empleados = ref<Empleado[]>([]);

const pedido = ref<Pedido>({ ...props.pedido });

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close');
  }
});

watch(
  () => props.pedido,
  (newVal) => {
    pedido.value = { ...newVal };
  }
);

async function obtenerClientes() {
  clientes.value = await http.get('clientes').then((response) => response.data);
}

async function obtenerEmpleados() {
  empleados.value = await http.get('empleados').then((response) => response.data);
}

async function handleSave() {
  try {



    const body = {
      metodoPago: pedido.value.metodoPago,
      estado: pedido.value.estado, // Asegúrate de que esto tenga un valor válido
      idEmpleado: pedido.value.empleado?.id, // Usa optional chaining para evitar errores
      idCliente: pedido.value.cliente?.id // Usa optional chaining para evitar errores
    };

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${pedido.value.id}`, body);
    } else {
      await http.post(ENDPOINT, body);
    }

    emit('guardar');
    pedido.value = {} as Pedido; // Reiniciar el objeto después de guardar
    dialogVisible.value = false;
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar el pedido');
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerClientes();
      obtenerEmpleados();
    }
  }
);

const metodoPagoOptions = [
  { label: 'Efectivo', value: 'Efectivo' },
  { label: 'Tarjeta', value: 'Tarjeta' },
  { label: 'Transferencia', value: 'Transferencia' }
];

const estadoOptions = [
  { label: 'Pendiente', value: 'Pendiente' },
  { label: 'Completado', value: 'Completado' },
  { label: 'Cancelado', value: 'Cancelado' }
];
</script>

<template>
<div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Pedido'"
      style="width: 30rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="metodoPago" class="font-semibold w-4">Método de Pago</label>
        <Select
          id="metodoPago"
          v-model="pedido.metodoPago"
          :options="metodoPagoOptions"
          optionLabel="label"
          optionValue="value"
          class="flex-auto"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="estado" class="font-semibold w-4">Estado</label>
        <Select
          id="estado"
          v-model="pedido.estado"
          :options="estadoOptions"
          optionLabel="label"
          optionValue="value"
          class="flex-auto"
          required
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="empleado" class="font-semibold w-4">Empleado</label>
        <Select
          id="empleado"
          v-model="pedido.empleado"
          :options="empleados"
          optionLabel="nombre"
          class="flex-auto"
        />
      </div>
      <div v-if="pedido.empleado" class="ml-8 mb-4">
        <div class="flex items-center gap-4 mb-2">
          <label class="font-semibold w-4">Cargo</label>
          <InputText v-model="pedido.empleado.cargo" class="flex-auto" disabled />
        </div>
        <div class="flex items-center gap-4">
          <label class="font-semibold w-4">Celular</label>
          <InputText v-model="pedido.empleado.celular" class="flex-auto" disabled />
        </div>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="cliente" class="font-semibold w-4">Cliente</label>
        <Select
          id="cliente"
          v-model="pedido.cliente"
          :options="clientes"
          optionLabel="nombre"
          class="flex-auto"
        />
      </div>
      <div v-if="pedido.cliente" class="ml-8 mb-4">
        <div class="flex items-center gap-4 mb-2">
          <label class="font-semibold w-4">Email</label>
          <InputText v-model="pedido.cliente.email" class="flex-auto" disabled />
        </div>
        <div class="flex items-center gap-4 mb-2">
          <label class="font-semibold w-4">Celular</label>
          <InputText v-model="pedido.cliente.celular" class="flex-auto" disabled />
        </div>
        <div class="flex items-center gap-4">
          <label class="font-semibold w-4">Dirección</label>
          <InputText v-model="pedido.cliente.direccion" class="flex-auto" disabled />
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type='button'
          label='Cancelar'
          icon='pi pi-times'
          severity='secondary'
          @click='dialogVisible = false'
        ></Button>
        <Button type='button' label='Guardar' icon='pi pi-save' @click='handleSave'></Button>
      </div>
    </Dialog>
</div>
</template>

<style scoped></style>
