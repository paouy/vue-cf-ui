<script setup>
import { computed } from 'vue'
import commonProps from './commonProps'

const props = defineProps(commonProps)

const rootClasses = computed(() => {
  return {
    'cf-button': true,
    'cf-button--large': props.large,
    'cf-button--wide': props.wide,
    'cf-button--loading': props.loading,
    'cf-button--disabled': props.disabled,
    'cf-filled-button': true,
    [`cf-filled-button--${props.color}`]: props.color
  }
})
</script>

<template>
  <router-link :class="rootClasses" :to="to" :inert="props.disabled" v-if="to">
    <slot></slot>
  </router-link>

  <button :class="rootClasses" :type="props.type" :disabled="props.disabled" v-else>
    <slot></slot>
  </button>
</template>

<style lang="scss">
@import './commonStyles.scss';

.cf-filled-button {
  --default-color: var(--cf-gray-9);
  --default-background: var(--cf-blue-4);
  --hover-color: var(--cf-gray-9);
  --hover-background: var(--cf-blue-2);
  --active-color: var(--default-color);
  --active-background: var(--default-background);

  &--red {
    --default-color: var(--cf-gray-9);
    --default-background: var(--cf-red-4);
    --hover-color: var(--cf-gray-9);
    --hover-background: var(--cf-red-2);
  }

  &--gray {
    --default-color: var(--cf-gray-1);
    --default-background: var(--cf-gray-8);
    --hover-color: var(--cf-gray-1);
    --hover-background: var(--cf-gray-7);
  }
}
</style>