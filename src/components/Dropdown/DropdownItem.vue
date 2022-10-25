<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: String,
  to: String,
  large: Boolean
})

const rootClasses = computed(() => {
  return {
    'cf-dropdown-item': true,
    'cf-dropdown-item--large': props.large
  }
})
</script>

<template>
  <button :class="rootClasses" v-if="!to">
    <div class="cf-dropdown-item__icon" v-if="icon">
      <span class="material-symbols-outlined">
       {{ icon }}
      </span>
    </div>
    <div class="cf-dropdown-item__label">
      <slot></slot>
    </div>
  </button>

  <router-link :class="rootClasses" :to="to" v-else>
    <div class="cf-dropdown-item__icon" v-if="icon">
      <span class="material-symbols-outlined">
       {{ icon }}
      </span>
    </div>
    <div class="cf-dropdown-item__label">
      <slot></slot>
    </div>
  </router-link>
</template>

<style lang="scss">
.cf-dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  width: 100%;
  min-width: 11.625rem;
  max-width: 20rem;
  height: 2.5rem;

  &--large {
    height: 3.5rem;
  }

  &__icon {
    height: 1.25rem;

    span {
      font-size: 1.25rem;
      font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;
    }
  }

  &__label {
    line-height: 1rem;
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