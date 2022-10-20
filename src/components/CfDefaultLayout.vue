<script setup>
import { onMounted } from 'vue'
import CfAppBar from './CfAppBar.vue'
import CfSidebar from './CfSidebar.vue'

onMounted(() => {
  document.body.dataset.layout = 'default'
})
</script>

<template>
  <cf-app-bar>
    <template v-slot:left>
      <slot name="brand"></slot>
    </template>
    <template v-slot:right>
      <slot name="navigation"></slot>
    </template>
  </cf-app-bar>
  <cf-sidebar>
    <slot name="sidebar"></slot>
  </cf-sidebar>
  <main>
    <slot name="main"></slot>
  </main>
</template>

<style lang="scss">
body[data-layout="default"] {
  main {
    padding: 1rem;
  }
}

@media (min-width: 880px) {
  body[data-layout="default"] {
    display: flex;
    flex-wrap: wrap;

    main {
      flex-grow: 1;
      display: flex;
      padding: 2rem 0;
      min-height: calc(100vh - 3.875rem);
    }
  }
}
</style>