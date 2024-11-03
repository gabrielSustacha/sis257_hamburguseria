<script setup lang="ts">
import type { Producto } from '@/models/producto'
import type { Categoria } from '@/models/categoria'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import { computed, ref, watch } from 'vue'

// Definición del endpoint de productos
const ENDPOINT = 'productos'

// Props recibidas desde el componente padre
const props = defineProps({
  mostrar: Boolean,
  producto: {
    type: Object as () => Producto,
    default: () => ({}) as Producto
  },
  modoEdicion: Boolean // Indica si es modo edición
})

// Emitimos eventos 'guardar' y 'close' para acciones
const emit = defineEmits(['guardar', 'close'])

// Producto local para manejar los cambios y categorías
const producto = ref<Producto>({ ...props.producto })
const categorias = ref<Categoria[]>([])

// Sincroniza el producto local con el prop `producto`
watch(
  () => props.producto,
  (newVal) => {
    producto.value = { ...newVal }
  },
  { immediate: true }
)

// Computed para manejar la visibilidad del diálogo
const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close') // Cerrar diálogo si cambia el valor
  }
})

// Función para obtener categorías del backend
async function obtenerCategorias() {
  try {
    const response = await http.get('categorias') // Asume que esta es la ruta de la API
    categorias.value = response.data
  } catch (error) {
    console.error('Error al cargar categorías:', error)
  }
}

// Función para guardar o actualizar el producto
async function handleSave() {
  try {
    const body = {
      idCategoria: producto.value.categoria?.id,
      descripcion: producto.value.descripcion,
      precio: producto.value.precio,
      stock: producto.value.stock,
      descuento: producto.value.descuento
    }

    if (props.modoEdicion) {
      // Actualiza el producto si está en modo edición
      await http.patch(`${ENDPOINT}/${producto.value.id}`, body)
    } else {
      // Crea un nuevo producto
      await http.post(ENDPOINT, body)
    }

    emit('guardar') // Emite el evento guardar
    producto.value = {} as Producto // Resetea el producto
    dialogVisible.value = false // Cierra el diálogo
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar el producto')
  }
}

// Carga las categorías cuando se muestra el diálogo
watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) obtenerCategorias()
  }
)
</script>

<template>
  <div class="card flex justify-center">
    <!-- Diálogo para crear/editar el producto -->
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Producto' : 'Crear Producto'"
      style="width: 25rem"
    >
      <!-- Selector para la categoría -->
      <div class="flex items-center gap-4 mb-4">
        <label for="categoria" class="font-semibold w-4">Categoría</label>
        <Select
          id="categoria"
          v-model="producto.categoria"
          :options="categorias"
          optionLabel="descripcion"
          class="flex-auto"
          placeholder="Seleccione una categoría"
        />
      </div>

      <!-- Campo de descripción del producto -->
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-4">Descripción</label>
        <InputText
          id="descripcion"
          v-model="producto.descripcion"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <!-- Campo para el precio del producto -->
      <div class="flex items-center gap-4 mb-4">
        <label for="precio" class="font-semibold w-4">Precio</label>
        <InputNumber
          id="precio"
          v-model="producto.precio"
          mode="currency"
          currency="USD"
          locale="en-US"
          class="flex-auto"
          :min="0"
        />
      </div>

      <!-- Campo para el stock del producto -->
      <div class="flex items-center gap-4 mb-4">
        <label for="stock" class="font-semibold w-4">Stock</label>
        <InputNumber
          id="stock"
          v-model="producto.stock"
          class="flex-auto"
          :min="0"
        />
      </div>

      <!-- Campo para el descuento del producto -->
      <div class="flex items-center gap-4 mb-4">
        <label for="descuento" class="font-semibold w-4">Descuento</label>
        <InputNumber
          id="descuento"
          v-model="producto.descuento"
          class="flex-auto"
          :min="0"
        />
      </div>

      <!-- Botones de acción -->
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
