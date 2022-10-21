<script setup>
import {
  CfDefaultLayout,
  CfSidebarLink,
  CfAppBody
} from './components'
</script>

<template>
  <cf-default-layout>
    <template v-slot:brand>
      Vue Cloudflare UI
    </template>
    <template v-slot:sidebar>
      <cf-sidebar-link href="#" icon="smart_toy" class="active">Playground</cf-sidebar-link>
      <cf-sidebar-link href="https://github.com/paouy/vue-cf-ui" icon="code">Repository</cf-sidebar-link>
    </template>
    <template v-slot:main>
      <cf-app-body>
        Hello world!
      </cf-app-body>
    </template>
  </cf-default-layout>
</template>