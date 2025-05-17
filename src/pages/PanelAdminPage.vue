<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-mb-md">
      <q-toolbar-title>Resumen de compras</q-toolbar-title>
    </q-toolbar>

    <q-table
      :rows="resumen"
      :columns="columns"
      row-key="nombre"
      :loading="loading"
      :rows-per-page-options="[5, 10, 15]"
      no-data-label="No hay datos de compras"
      rows-per-page-label="Filas por página:"
      :pagination-label="(start, end, total) => `${start}-${end} de ${total}`"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

const resumen = ref([])
const loading = ref(true)

const columns = [
  { name: 'nombre', label: 'Curso', field: 'nombre', align: 'left' },
  { name: 'cantidad', label: 'Cantidad de compras', field: 'cantidad', align: 'center' },
]

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8080/compras/admin')
    resumen.value = res.data
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: 'Error cargando resumen de compras.',
      error: error.message,
    })
  } finally {
    loading.value = false
  }
})
</script>
