<script setup>
import { provide } from 'vue'

const props = defineProps({
  label: String,
  disabled: Boolean,
  required: {
    type: Boolean,
    default: false
  }
})

provide('selection-name', Math.random())
provide('selection-required', props.required)
</script>

<template>
  <div class="cf-selection" :inert="disabled">
    <div class="cf-selection-label" v-if="label">{{ label }}</div>
      <slot></slot>
  </div>
</template>

<style lang="scss">
.cf-selection {
  display: grid;
  gap: 1rem;

  &-label {
    font-size: 0.875rem;
  }

  &[inert] {
    opacity: 0.5;
  }
}
</style>