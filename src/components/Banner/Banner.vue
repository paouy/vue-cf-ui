<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: String
})

const rootClasses = computed(() => {
  return {
    'cf-banner': true,
    [`cf-banner--${props.type}`]: props.type
  }
})
</script>

<template>
  <div :class="rootClasses">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.cf-banner {
  color: var(--color);
  border: 1px solid var(--border-color);
  border-radius: 0.3125rem;
  padding: 0.5rem 1rem;
  background: var(--background);
  margin-bottom: 1rem;
  --color: var(--cf-blue-1);
  --border-color: var(--cf-blue-7);
  --background: var(--cf-blue-9);

  &--error {
    --color: var(--cf-red-1);
    --border-color: var(--cf-red-7);
    --background: var(--cf-red-9);
  }

  &--warning {
    --color: var(--cf-orange-1);
    --border-color: var(--cf-orange-7);
    --background: var(--cf-orange-9);
  }

  &--success {
    --color: var(--cf-green-1);
    --border-color: var(--cf-green-7);
    --background: var(--cf-green-9);
  }
}
</style>