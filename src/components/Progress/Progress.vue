<script setup>
const props = defineProps({
  value: {
    type: [Number, String],
    default: 0
  },
  max: {
    type: [Number, String],
    default: 100
  }
})
</script>

<template>
  <progress
    class="cf-progress"
    :value="props.value"
    :max="props.max"
  >
    {{ value }}%
  </progress>
</template>

<style lang="scss">
.cf-progress {
  width: 100%;
  height: 1rem;

  &::-webkit-progress-value {
    background-color: var(--cf-blue-4);
  }

  &::-webkit-progress-bar {
    background-color: var(--cf-gray-8);
  }

  &::-moz-progress-bar {
    background-color: var(--cf-blue-4);
  }
}
</style>