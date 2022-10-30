<script setup>
const props = defineProps({
  to: String,
  disabled: Boolean
})
</script>

<template>
  <router-link class="cf-text-button" :to="to" :inert="props.disabled" v-if="to">
    <slot></slot>
  </router-link>

  <button class="cf-text-button" type="button" :disabled="props.disabled" v-else>
    <slot></slot>
  </button>
</template>

<style lang="scss">
.cf-text-button {
  color: var(--cf-blue-4);
  font-size: 0.875rem;
  line-height: 1.3125rem;
  text-decoration: underline;
  text-underline-offset: 0.25rem;
  white-space: nowrap;
  width: fit-content;
  min-width: fit-content;
  cursor: pointer;
}
</style>