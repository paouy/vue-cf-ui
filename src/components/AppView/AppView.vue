<script setup>
import { useSlots, computed } from 'vue'

const slots = useSlots()

const props = defineProps({
  title: String,
  description: String,
  breadcrumbs: Array,
  wide: Boolean
})

const rootClasses = computed(() => {
  return {
    'cf-app-view': true,
    'cf-app-view--wide': props.wide
  }
})
</script>

<template>
  <div :class="rootClasses">
    <ol class="cf-app-view-breadcrumbs" v-if="props.breadcrumbs">
      <li v-for="route in props.breadcrumbs" :key="route.name">
        <router-link :to="route.path" v-if="route.path">{{ route.name }}</router-link>
        <span v-else>{{ route.name }}</span>
      </li>
    </ol>
    <div class="cf-app-view-header" v-if="props.title || props.description || slots.actions">
      <h1 v-if="props.title">{{ props.title }}</h1>
      <div class="cf-app-view-header__description" v-if="props.description">
        {{ props.description }}
      </div>
      <div class="cf-app-view-header__actions" v-if="slots.actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.cf-app-view {
  margin: 0 auto;
  width: 100%;
  max-width: 64rem;

  &--wide {
    max-width: 79rem;
  }

  &-breadcrumbs {
    display: flex;
    font-size: 0.875rem;
    margin-bottom: 2rem;

    li {
      display: flex;

      &:not(:first-child) {
        &::before {
          content: '/';
          margin: 0 0.5rem;
        }
      }

      a {
        display: flex;
        align-items: center;
        gap: 0.125rem;
        color: var(--cf-blue-4);
        text-decoration: underline;
        text-underline-offset: 0.25rem;
      }

      &:first-child {
        a {
          &::before {
            display: block;
            content: '';
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="%230051c3"><path d="M14 7.5H3.439l4.29-4.387-.714-.699L1.55 8l5.465 5.586.714-.7L3.44 8.5h10.56v-1z"></path></svg>') no-repeat center;
            width: 1rem;
            height: 1rem;
          }
        }
      }

      span {
        font-weight: 600;
      }
    }
  }

  &-header {
    display: grid;
    grid-template-columns: 1fr fit-content(100%);
    align-items: center;
    margin-bottom: 1rem;

    h1 {
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.25;
    }

    &__description {
      grid-column: span 2;
      color: var(--cf-gray-3);
      margin-top: 0.125rem;
    }

    &__actions {
      display: flex;
      gap: 1rem;
      grid-row: 1;
      grid-column: 2;
    }
  }
}

@media (min-width: 880px) {
  .cf-app-view {
    width: 90%;
  }
}
</style>