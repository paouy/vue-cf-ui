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
    <div>
      <nav class="cf-sidebar-nav">
        <slot></slot>
        <hr>
      </nav>
      <button class="cf-sidebar-toggle" @click="isToggled = !isToggled">
        <figure></figure>
        <span></span>
      </button>
    </div>
  </aside>
</template>

<style lang="scss">
.cf-sidebar {
  background: #fff;
  width: 0;
  height: calc(100vh - 3.875rem);
  position: fixed;
  top: 3.875rem;
  left: 0;
  z-index: var(--z-index-sidebar);
  overflow: hidden;
  --toggle-icon: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="%23313131" height="24" viewBox="0 -960 960 960" width="24"><path d="M140.001-254.616v-59.999h679.998v59.999H140.001Zm0-195.385v-59.998h679.998v59.998H140.001Zm0-195.384v-59.999h679.998v59.999H140.001Z"/></svg>');

  > div {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}

.cf-sidebar-nav {
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

.cf-sidebar-toggle {
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

  figure {
    &::before {
      display: block;
      content: '';
      background: var(--toggle-icon) center;
      background-size: contain;
      height: 1.25rem;
      width: 1.25rem;
    }
  }

  span {
    display: none;
  }
}

.cf-sidebar--toggled {
  width: 16.25rem;
  --toggle-icon: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="%23313131" height="24" viewBox="0 -960 960 960" width="24"><path d="M256-213.847 213.847-256l224-224-224-224L256-746.153l224 224 224-224L746.153-704l-224 224 224 224L704-213.847l-224-224-224 224Z"/></svg>');

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

@media (min-width: 880px) {
  .cf-sidebar {
    width: 16.25rem;
    position: sticky;
    --toggle-icon: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="%230051c3" height="24" viewBox="0 -960 960 960" width="24"><path d="M445-253.847 218.848-480 445-706.153 487.153-664 303.769-480l183.384 184L445-253.847Zm254 0L472.847-480 699-706.153 741.152-664 557.768-480l183.384 184L699-253.847Z"/></svg>');

    > div {
      border-right: 1px solid var(--cf-gray-8);
    }
  }

  .cf-sidebar-toggle {
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

    span {
      display: inline;
      color: #000;
      font-size: 0.875rem;

      &::before {
        content: 'Collapse sidebar'
      }
    }
  }

  .cf-sidebar--toggled {
    width: 3.5625rem;
    --toggle-icon: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="%230051c3" height="24" viewBox="0 -960 960 960" width="24"><path d="M402.232-480 218.848-664 261-706.153 487.153-480 261-253.847 218.848-296l183.384-184Zm253.999 0L472.847-664 515-706.153 741.152-480 515-253.847 472.847-296l183.384-184Z"/></svg>');

    &::before {
      display: none;
    }

    .cf-sidebar-nav {
      padding-left: 0;
    }

    .cf-sidebar-toggle {
      span {
        display: none;
      }
    }

    &:hover {
      overflow: visible;

      > div {
        background: #fff;
        width: 16.25rem;
      }

      .cf-sidebar-nav {
        padding-left: 0.25rem;
      }

      .cf-sidebar-toggle {
        span {
          display: inline;
          
          &::before {
            content: 'Expand sidebar'
          }
        }
      }
    }
  }
}
</style>