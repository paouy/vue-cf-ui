<script setup>
import { ref, computed } from 'vue'

const isOpen = ref(false)

const rootClasses = computed(() => {
  return {
    'cf-dropdown': true,
    'cf-dropdown--open': isOpen.value
  }
})
</script>

<template>
  <div :class="rootClasses">
    <div class="cf-dropdown-toggle" @click="isOpen = !isOpen">
      <slot name="toggle"></slot>
    </div>
    <div class="cf-dropdown-body">
      <slot name="body"></slot>
    </div>
    <div class="cf-dropdown-backdrop" @click="isOpen = false"></div>
  </div>
</template>

<style lang="scss">
.cf-dropdown {
  display: inline-block;
  position: relative;
  --body-display: none;

  &--open {
    --body-display: block;
  }

  &-toggle {
    display: block;
  }

  &-body {
    display: var(--body-display);
    border: 1px solid var(--cf-gray-7);
    border-radius: 0 0 0.1875rem 0.1875rem;
    background: #fff;
    box-shadow: rgb(0 0 0 / 15%) 0.125rem 0.25rem 1.25rem 0;
    min-width: auto;
    max-height: 80vh;
    position: absolute;
    top: 100%;
    right: 0;
    left: auto;
    z-index: var(--z-index-dropdown);
    overflow-y: auto;

    hr {
      border-color: var(--cf-gray-8);
    }
  }

  &-backdrop {
    display: var(--body-display);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: calc(var(--z-index-dropdown) - 10);
  }
}
</style>