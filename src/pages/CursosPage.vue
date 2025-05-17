<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-mb-md">
      <q-toolbar-title>Cursos disponibles</q-toolbar-title>
    </q-toolbar>

    <q-table
      :rows="cursos"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :rows-per-page-options="[5, 10, 15]"
      no-data-label="No hay cursos"
      rows-per-page-label="Filas por página:"
      :pagination-label="(start, end, total) => `${start}-${end} de ${total}`"
    >
      <template v-slot:body-cell-acciones="props">
        <q-td align="center">
          <q-btn label="Comprar" size="sm" color="primary" @click="openDialog(props.row)" />
        </q-td>
      </template>
    </q-table>

    <!-- Componente de diálogo importado -->
    <ComprarDialog v-model="dialogOpen" :curso="selectedCurso" @purchased="loadCursos" />
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'
import ComprarDialog from 'components/ComprarDialog.vue'

const cursos = ref([])
const loading = ref(true)

const dialogOpen = ref(false)
const selectedCurso = reactive({ id: null, nombre: '', descripcion: '', precio: 0 })

const columns = [
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left' },
  { name: 'descripcion', label: 'Descripción', field: 'descripcion', align: 'left' },
  { name: 'precio', label: 'Precio', field: 'precio', align: 'right', format: (val) => `$${val}` },
  { name: 'acciones', label: 'Acciones', align: 'center' },
]

async function loadCursos() {
  try {
    loading.value = true
    const res = await axios.get('http://localhost:8080/cursos')
    cursos.value = res.data
  } catch {
    Notify.create({ type: 'negative', message: 'Error cargando cursos.' })
  } finally {
    loading.value = false
  }
}

function openDialog(curso) {
  Object.assign(selectedCurso, curso)
  dialogOpen.value = true
}

onMounted(loadCursos)
</script>
