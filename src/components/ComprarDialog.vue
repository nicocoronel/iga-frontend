<template>
  <q-dialog v-model="isOpen">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Comprar: {{ curso.nombre }}</div>
        <div class="text-subtitle2 q-mt-sm">
          {{ formatARS(curso.precio) }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-form ref="compraForm" @submit.prevent="submitCompra" class="q-gutter-md">
          <q-input
            v-model="form.nombre"
            label="Tu nombre"
            :rules="[(v) => !!v || 'Requerido']"
            dense
            outlined
          />
          <q-input
            v-model="form.email"
            label="Tu email"
            type="email"
            :rules="[(v) => !!v || 'Requerido', (v) => /.+@.+\..+/.test(v) || 'Email inválido']"
            dense
            outlined
          />
          <q-input
            v-model="form.telefono"
            label="Tu teléfono"
            type="tel"
            inputmode="numeric"
            @keydown="bloquearTeclas"
            maxlength="10"
            :rules="[(v) => !!v || 'Requerido']"
            dense
            outlined
          />

          <div class="row justify-end q-mt-md">
            <q-btn flat label="Cancelar" @click="closeDialog" />
            <q-btn label="Confirmar" type="submit" color="primary" :loading="submitting" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

// Props and emits
const props = defineProps({
  modelValue: Boolean,
  curso: Object,
})
const emit = defineEmits(['update:modelValue', 'purchased'])

// Dialog open state
const isOpen = ref(props.modelValue)
watch(
  () => props.modelValue,
  (val) => {
    isOpen.value = val
  },
)
watch(isOpen, (val) => {
  emit('update:modelValue', val)
})

function bloquearTeclas(e) {
  const teclasPermitidas = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete']
  const esNumero = /^[0-9]$/.test(e.key)

  if (!esNumero && !teclasPermitidas.includes(e.key)) {
    e.preventDefault()
  }
}

// Form state
const form = reactive({ nombre: '', email: '', celular: '' })
const submitting = ref(false)
const compraForm = ref(null)

// Helper to format price
function formatARS(val) {
  return `$${val} ARS`
}

function resetForm() {
  form.nombre = ''
  form.email = ''
  form.telefono = ''
  compraForm.value?.resetValidation()
}

// Close handler
function closeDialog() {
  resetForm()
  isOpen.value = false
}

watch(isOpen, (val) => {
  if (!val) return
  resetForm()
})

// Submit purchase
async function submitCompra() {
  const valid = await compraForm.value.validate()
  if (!valid) return

  submitting.value = true
  try {
    await axios.post('http://localhost:8080/comprar', {
      curso_id: Number(props.curso.id),
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono,
    })
    Notify.create({ type: 'positive', message: 'Compra exitosa!' })
    emit('purchased')
    closeDialog()
  } catch (err) {
    console.error(err)
    Notify.create({ type: 'negative', message: 'Error al comprar.' })
  } finally {
    submitting.value = false
  }
}
</script>
