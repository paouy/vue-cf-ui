<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: [String, Object],
  href: String,
  icon: String,
  parent: Boolean
})

const rootElement = computed(() => {
  return props.to ? RouterLink : 'a'
})
</script>

<template>
  <component
    class="cf-sidebar-link"
    :is="rootElement"
    :to="props.to"
    :href="props.href"
    v-if="!props.parent"
  >
    <figure v-if="props.icon">
      <span class="material-symbols-outlined">
        {{ props.icon }}
      </span>
    </figure>
    <span>
      <slot></slot>
    </span>
  </component>

  <div class="cf-sidebar-link-group" v-else>
    <button class="cf-sidebar-link">
      <figure>
        <span class="material-symbols-outlined">
          {{ props.icon }}
        </span>
      </figure>
      <span>
        <slot></slot>
      </span>
    </button>
    <div class="cf-sidebar-link-children">
      <slot name="children"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.cf-sidebar-link {
  display: flex;
  align-items: center;
  gap: 1.125rem;
  padding-left: 1.125rem;
  border-radius: 50rem 0 0 50rem;
  border: 1px solid transparent;
  border-right: none;
  height: 2.625rem;
  width: 100%;
  cursor: pointer;

  figure {
    display: grid;

    span {
      color: var(--cf-blue-4);
      font-size: 1.25rem;
      font-variation-settings: 'FILL' 0, 'wght' 350, 'GRAD' 0, 'opsz' 20;
    }
  }

  > span {
    color: var(--cf-blue-1);
    font-size: 0.875rem;
    line-height: 1.05rem;

    &:only-child {
      padding-left: 0.5rem;
    }
  }

  &:hover {
    border-color: var(--cf-cyan-9);
    background: var(--cf-cyan-9);

    > span {
      text-decoration: underline;
      text-decoration-style: dotted;
      text-underline-offset: 0.25rem;
    }
  }

  &.router-link-active {
    border-color: var(--cf-blue-8);
    background: var(--cf-blue-9);

    > span {
      color: var(--cf-blue-2);
      font-weight: 700;
    }
  }
}

.cf-sidebar-link-group {
  &:focus-within {
    .cf-sidebar-link-children {
      display: block;
    }
  }
}

.cf-sidebar-link-children {
  display: none;
  margin-left: 1.875rem;

  &:hover,
  &:has(.router-link-active) {
    display: block;
  }

  .cf-sidebar-link {
    height: 1.75rem;
  }
}

@media (min-width: 880px) {
  .cf-sidebar--toggled {
    .cf-sidebar-link {
      border-radius: 0;

      > span {
        display: none;
      }
    }

    .cf-sidebar-link-group {
      &:has(.router-link-active) {
        > button {
          border-color: var(--cf-blue-8);
          background: var(--cf-blue-9);
        }
      }

      .cf-sidebar-link-children {
        display: none;
      }
    }
  }
}
</style>