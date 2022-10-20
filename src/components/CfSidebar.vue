<script setup>
import { ref, computed } from 'vue'

const isToggled = ref(false)

const rootClasses = computed(() => {
  return {
    'cf-sidebar': true,
    'cf-sidebar--toggled': isToggled.value
  }
})
</script>

<template>
  <aside :class="rootClasses">
    <nav class="cf-sidebar-nav">
      <slot></slot>
      <hr>
    </nav>
    <button class="cf-sidebar-toggle" @click="isToggled = !isToggled">
      <span class="material-symbols-outlined"></span>
      <span>Collapse sidebar</span>
    </button>
  </aside>
</template>

<style lang="scss">
.cf-sidebar {
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 0;
  height: calc(100vh - 3.875rem);
  position: fixed;
  top: 3.875rem;
  left: 0;
  z-index: var(--z-index-sidebar);
  overflow: hidden;
  --toggle-icon: '\e5d2';

  &-nav {
    display: grid;
    gap: 0.25rem;
    padding: 0.5rem 0 0.5rem 0.25rem;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    hr {
      border-color: var(--cf-gray-8);
      margin: 0.25rem 0 0.25rem -0.25rem;

      &:only-child {
        display: none;
      }
    }
  }

  &-toggle {
    flex-shrink: 0;
    display: grid;
    place-content: center;
    border-right: 1px solid var(--cf-gray-8);
    width: 3.5rem;
    height: 3.875rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: calc(var(--z-index-sidebar) + 10);

    :first-child {
      color: var(--cf-gray-1);
      font-size: 1.5rem;
      font-variation-settings: 'FILL' 0, 'wght' 350, 'GRAD' 0, 'opsz' 24;
      
      &::before {
        content: var(--toggle-icon);
      }
    }

    :last-child {
      display: none;
    }
  }

  &--toggled {
    width: 16.25rem;
    --toggle-icon: '\e5cd';

    &::before {
      display: block;
      content: '';
      background: rgba(0, 0, 0, 0.7);
      width: calc(100% - 16.25rem);
      height: 100%;
      position: fixed;
      top: 3.875rem;
      right: 0;
      z-index: calc(var(--z-index-sidebar) - 10);
    }
  }
}

@media (min-width: 880px) {
  .cf-sidebar {
    display: flex;
    border-right: 1px solid var(--cf-gray-8);
    width: 16.25rem;
    position: sticky;
    --toggle-icon: '\eac3';

    &-toggle {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: flex-start;
      padding-left: 1.25rem;
      margin-top: auto;
      border-top: 1px solid var(--cf-gray-8);
      border-right: 0;
      width: 100%;
      height: 3.75rem;
      position: static;

      :first-child {
        color: var(--cf-blue-4);
        font-size: 1.25rem;
        font-variation-settings: 'FILL' 0, 'wght' 350, 'GRAD' 0, 'opsz' 20;
      }

      :last-child {
        display: inline;
        color: #000;
        font-size: 0.875rem;
      }
    }

    &--toggled {
      width: 3.5625rem;
      --toggle-icon: '\eac9';

      &::before {
        display: none;
      }

      .cf-sidebar-nav {
        padding-left: 0;
      }

      .cf-sidebar-toggle {
        :last-child {
          display: none;
        }
      }
    }
  }
}
</style>