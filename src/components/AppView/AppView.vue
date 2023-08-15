<script setup>
import { computed } from 'vue'

const props = defineProps({ wide: Boolean })

const rootClasses = computed(() => {
  return {
    'cf-app-view': true,
    'cf-app-view--wide': props.wide
  }
})
</script>

<template>
  <div :class="rootClasses">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.cf-app-view {
  margin: 0 auto;
  width: 100%;
  max-width: 64rem;

  &--wide {
    max-width: 79rem;
  }
}

@media (min-width: 880px) {
  .cf-app-view {
    width: 90%;
  }
}
</style>