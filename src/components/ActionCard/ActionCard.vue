<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  simple: Boolean
})

const rootClasses = computed(() => ({
  'cf-action-card': true,
  'cf-action-card--simple': props.simple
}))
</script>

<template>
  <div :class="rootClasses">
    <div>
      <h5 v-if="props.title">
        {{ props.title }}
      </h5>
      <div class="cf-action-card__body">
        <slot name="body"></slot>
      </div>
    </div>
    <div class="cf-action-card__action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.cf-action-card {
  display: grid;
  border: 1px solid var(--cf-gray-7);
  border-radius: 0.3125rem;
  margin: 1rem 0;
  --padding: 1rem;

  h5 {
    font-size: 1.25rem;
    font-weight: 600;
    padding: var(--padding);
    padding-bottom: 0;
    margin-bottom: 0.5rem;
  }

  &__body {
    padding: var(--padding);

    &:not(:only-child) {
      padding-top: 0;
      border-bottom: 1px solid var(--cf-gray-7);
    }
  }

  &__action {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background: var(--cf-gray-9);
  }

  &--simple {
    .cf-action-card__body {
      &:only-child {
        padding-bottom: 0;
      }

      &:not(:only-child) {
        border-bottom: none;
      }
    }

    .cf-action-card__action {
      border-left: none;
      background: none;
    }
  }
}

@media (min-width: 755px) {
  .cf-action-card {
    grid-template-columns: 7fr 3fr;
    --padding: 2rem;

    &__body:not(:only-child) {
      border-bottom: none;
    }

    &__action {
      border-left: 1px solid var(--cf-gray-7);
    }

    &--simple {
      .cf-action-card__body:only-child {
        padding-bottom: var(--padding);
      }

      .cf-action-card__action {
        justify-content: flex-end;
      }
    }
  }
}
</style>