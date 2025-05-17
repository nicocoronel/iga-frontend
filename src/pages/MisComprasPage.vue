<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-mb-md">
      <q-toolbar-title>Mis compras</q-toolbar-title>
    </q-toolbar>

    <q-input
      v-model="email"
      label="Correo electrónico"
      type="email"
      :rules="[(v) => /.+@.+\..+/.test(v) || 'Email inválido']"
      filled
      class="q-mb-md"
      @keyup.enter="buscarCompras"
    />
    <q-btn label="Buscar" color="primary" @click="buscarCompras" class="q-mb-md" />

    <q-table
      :rows="compras"
      :columns="columns"
      row-key="fecha_compra"
      :loading="loading"
      :rows-per-page-options="[5, 10, 15]"
      no-data-label="No se encontraron compras"
      rows-per-page-label="Filas por página:"
      :pagination-label="(start, end, total) => `${start}-${end} de ${total}`"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

const email = ref('')
const compras = ref([])
const loading = ref(false)

const columns = [
  { name: 'nombre', label: 'Curso', field: 'nombre', align: 'left' },
  { name: 'precio', label: 'Precio', field: 'precio', align: 'right', format: (val) => `$${val}` },
  { name: 'fecha_compra', label: 'Fecha de compra', field: 'fecha_compra', align: 'left' },
]

async function buscarCompras() {
  if (!email.value) {
    Notify.create({ type: 'warning', message: 'Ingrese un email válido.' })
    return
  }

  try {
    loading.value = true
    const res = await axios.get('http://localhost:8080/compras/cliente', {
      params: { email: email.value },
    })
    compras.value = res.data
  } catch (error) {
    compras.value = []
    Notify.create({ type: 'negative', message: 'Error buscando compras.', error: error.message })
  } finally {
    loading.value = false
  }
}
</script>
