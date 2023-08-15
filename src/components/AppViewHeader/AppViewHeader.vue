<script setup>
import { useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
  surtitle: String,
  title: String,
  description: String
})
</script>

<template>
  <header class="cf-app-view-header">
    <p v-if="props.surtitle">{{ props.surtitle }}</p>
    <h1 v-if="props.title">{{ props.title }}</h1>
    <p v-if="props.description">{{ props.description }}</p>
    <div class="cf-app-view-header-actions" v-if="slots.actions">
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<style lang="scss">
.cf-app-view-header {
  display: grid;
  grid-template-columns: 1fr fit-content(100%);
  align-items: center;
  margin-bottom: 1rem;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.25;
  }

  p {
    grid-column: span 2;
    color: var(--cf-gray-3);
    margin-top: 0.125rem;

    &:first-child {
      font-weight: 600;

      ~ div {
        grid-row: 2;
      }
    }
  }

  &-actions {
    display: flex;
    gap: 1rem;
    grid-row: 1;
    grid-column: 2;
  }
}
</style>