<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  icon: String,
  to: [Object, String],
  large: Boolean
})

const rootElement = computed(() => props.to ? RouterLink : 'a')
const rootClasses = computed(() => {
  return {
    'cf-dropdown-item': true,
    'cf-dropdown-item--large': props.large
  }
})
const destination = computed(() => {
  if (typeof props.to !== 'string') {
    return { route: props.to };
  } else if (props.to?.includes('http')) {
    return { link: props.to };
  } else if (props.to) {
    return { route: props.to };
  }
})
</script>

<template>
  <component
    :is="rootElement"
    :class="rootClasses"
    :to="destination.route"
    :href="destination.link"
  >
      <slot></slot>
  </component>
</template>

<style lang="scss">
.cf-dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  width: 100%;
  min-width: 11.625rem;
  max-width: 20rem;
  height: 2.5rem;

  &--large {
    height: 3.5rem;
  }

  &:hover {
    background: var(--cf-gray-9);
  }
}

@media (hover: none) and (pointer: coarse) {
  .cf-dropdown-item {
    &:hover:not(:active) {
      background-color: #fff;
    }

    &:active {
      background-color: var(--cf-gray-9);
    }
  }
}
</style>