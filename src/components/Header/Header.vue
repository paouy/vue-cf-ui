<script setup>
import { useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
  size: {
    type: String,
    default: 'h4'
  },
  title: String,
  surtitle: String,
  subtitle: String
})
</script>

<template>
  <div class="cf-header">
    <div>
      <p v-if="props.surtitle">
        {{ props.surtitle }}
      </p>
      <component :is="props.size">
        {{ props.title }}
      </component>
      <p v-if="props.subtitle">
        {{ props.subtitle }}
      </p>
    </div>
    <div v-if="slots.action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.cf-header {
  display: flex;

  :first-child > * {
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }

    &:not(p) {
      font-weight: bold;
    }
  }

  :nth-child(2) {
    align-self: center;
    margin-left: auto;
  }
}
</style>