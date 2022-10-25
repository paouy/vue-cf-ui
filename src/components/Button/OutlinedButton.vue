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
    'cf-outlined-button': true,
    [`cf-outlined-button--${props.color}`]: props.color
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

.cf-outlined-button {
  border: 1px solid var(--color);

  --default-color: var(--cf-blue-3);
  --default-background: none;
  --hover-color: #fff;
  --hover-background: var(--cf-blue-2);
  --active-color: #fff;
  --active-background: var(--cf-blue-4);

  &--red {
    --default-color: var(--cf-red-3);
    --hover-background: var(--cf-red-2);
    --active-background: var(--cf-red-4);
  }

  &--gray {
    --default-color: #000;
    --hover-color: #000;
    --hover-background: var(--cf-gray-9);
    --active-color: #000;
    --active-background: none;
  }
}
</style>