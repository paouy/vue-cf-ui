<script setup>
import { computed } from 'vue'

const props = defineProps({
  wide: {
    type: Boolean,
    default: false
  }
})

const classes = computed(() => {
  return {
    'cf-app-body': true,
    'cf-app-body--wide': props.wide
  }
})
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.cf-app-body {
  margin: 0 auto;
  width: 100%;
  max-width: 64rem;

  &--wide {
    max-width: 79rem;
  }
}

@media (min-width: 880px) {
  .cf-app-body {
    width: 90%;
  }
}
</style>