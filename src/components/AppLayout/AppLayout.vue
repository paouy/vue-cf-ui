<script setup>
import { onMounted } from 'vue'
import AppBar from '../AppBar/AppBar.vue'
import Sidebar from '../Sidebar/Sidebar.vue'

onMounted(() => {
  document.body.dataset.layout = 'app'
})
</script>

<template>
  <app-bar>
    <template v-slot:left>
      <slot name="brand"></slot>
    </template>
    <template v-slot:right>
      <slot name="navigation"></slot>
    </template>
  </app-bar>
  <sidebar>
    <slot name="sidebar"></slot>
  </sidebar>
  <main>
    <slot name="main"></slot>
  </main>
</template>

<style lang="scss">
body[data-layout="app"] {
  main {
    padding: 1rem;
  }
}

@media (min-width: 880px) {
  body[data-layout="app"] {
    display: grid;
    grid-template-columns: max-content 1fr;

    main {
      display: flex;
      padding: 2rem 0;
      min-height: calc(100vh - 3.875rem);
    }
  }
}
</style>