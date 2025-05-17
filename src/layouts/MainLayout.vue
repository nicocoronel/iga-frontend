<template>
  <q-layout view="lHh Lpr lFf">
    <!-- HEADER -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- botón para toggle del drawer -->
        <q-btn flat dense round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <!-- título de la app -->
        <q-toolbar-title> IGA Cursos </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- DRAWER LATERAL -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list padding>
        <q-item-label header class="text-grey-8"> Navegación </q-item-label>

        <!-- Lista de Cursos -->
        <q-item clickable tag="router-link" to="/" exact>
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section> Cursos </q-item-section>
        </q-item>

        <!-- Mis Compras (cliente) -->
        <q-item clickable tag="router-link" to="/mis-compras">
          <q-item-section avatar>
            <q-icon name="shopping_basket" />
          </q-item-section>
          <q-item-section> Mis Compras </q-item-section>
        </q-item>

        <!-- Admin Compras -->
        <q-item clickable tag="router-link" to="/admin">
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section> Panel Admin </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- CONTENIDO PRINCIPAL -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
</script>
