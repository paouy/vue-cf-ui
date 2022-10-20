## Vue Cloudflare UI

A lightweight UI component library for Vue.js based on Cloudflare dashboard

### Installation

#### Vue 3

1. Install Vue Cloudflare UI.

```
npm install vue-cf-ui
```

2. Import the components in your SFC.

```
<script setup>
import { ref } from 'vue'
import { CfInput, CfButton } from 'vue-cf-ui

const email = ref('')
</script>

<template>
  <form>
    <cf-input
      v-model="email"
      label="Email address"
      type="email"
      required
    />
    <cf-button type="submit">Register</cf-button>
  </form>
</template>

<style>
form {
 display: grid;
 gap: 1rem;
}
</style>
```

## License

Code released under ISC license.