<script setup>
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: null
  },
  large: {
    type: Boolean,
    default: false
  },
  wide: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  faux: {
    type: Boolean,
    default: false
  }
})

const rootClasses = computed(() => {
  return {
    'cf-button': true,
    [`cf-button--${props.variant}`]: props.variant,
    'cf-button--large': props.large,
    'cf-button--wide': props.wide,
    'cf-button--loading': props.loading,
    'cf-button--disabled': props.disabled
  }
})
</script>

<template>
  <router-link :class="rootClasses" :to="to" v-if="to">
    <slot></slot>
  </router-link>

  <div :class="rootClasses" v-else-if="faux">
    <slot></slot>
  </div>

  <button :class="rootClasses" :type="props.type" :disabled="props.disabled" v-else>
    <slot></slot>
  </button>
</template>

<style lang="scss">
.cf-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color);
  font-size: 0.875rem;
  line-height: 1.2;
  padding: 0 1rem;
  border-radius: 0.3125rem;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  position: relative;
  width: fit-content;
  min-width: fit-content;
  height: 2.05rem;
  transition-property: background-color, border-color, color;
  transition-duration: 200ms;
  transition-timing-function: ease;
  user-select: none;
  cursor: pointer;
  --color: var(--cf-gray-9);
  --border-color: currentColor;
  --background-color: var(--cf-blue-4);

  &:hover:not(:active) {
    --background-color: var(--cf-blue-2);
  }

  &--wide {
    width: 100%;
  }

  &--large {
    font-size: 1rem;
    font-weight: 600;
    padding: 0 4rem;
    height: 2.8125rem;
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &--loading {
    color: transparent;
    border-color: var(--color);
    pointer-events: none;

    &::before {
      display: block;
      content: '•••';
      color: var(--color);
      text-align: center;
      width: 100%;
      position: absolute;
      left: 0;
      animation: cf-loading 1s linear infinite;
    }

    @keyframes cf-loading {
      50% {
        opacity: 0
      }
    }
  }
}

.cf-button--tonal {
  --color: var(--cf-gray-1);
  --background-color: var(--cf-gray-8);

  &:hover:not(:active) {
    --background-color: var(--cf-gray-7);
  }
}

.cf-button--outlined {
  --color: #000;
  --background-color: transparent;

  &:hover:not(:active) {
    --background-color: var(--cf-gray-9);
  }

  &-red {
    --color: var(--cf-red-3);
    --background-color: transparent;

    &:hover:not(:active) {
      --color: #fff;
      --background-color: var(--cf-red-3);
    }

    &:active {
      --color: var(--cf-gray-9);
      --background-color: var(--cf-red-4);
    }
  }

  &-blue {
    --color: var(--cf-blue-3);
    --background-color: transparent;

    &:hover:not(:active) {
      --color: #fff;
      --background-color: var(--cf-blue-2);
    }

    &:active {
      --color: var(--cf-gray-9);
      --background-color: var(--cf-blue-4);
    }
  }
}

.cf-button--text {
  display: inline;
  text-decoration: underline;
  text-underline-offset: 0.25rem;
  padding: 0;
  border-width: 0;
  background: none;
  height: auto;
  --color: var(--cf-blue-4);

  &:hover:not(:active) {
    --color: var(--cf-blue-2);
  }

  &:focus {
    --color: var(--cf-blue-5);
  }
}

@media (hover: none) and (pointer: coarse) {
  .cf-button {
    &:hover:not(:active) {
      --background-color: var(--cf-blue-4);
    }

    &:active {
      --background-color: var(--cf-blue-2);
    }
  }
  
  .cf-button--tonal {
    &:hover:not(:active) {
      --background-color: var(--cf-gray-8);
    }

    &:active {
      --background-color: var(--cf-gray-7);
    }
  }
  
  .cf-button--outlined {
    &:hover:not(:active) {
      --background-color: transparent;
    }

    &:active {
      --background-color: var(--cf-gray-9);
    }
  
    &-red { 
      &:hover:not(:active) {
        --color: var(--cf-red-3);
        --background-color: transparent;
      }

      &:active {
        --color: #fff;
        --background-color: var(--cf-red-3);
      }
    }
  
    &-blue {
      &:hover:not(:active) {
        --color: var(--cf-blue-3);
        --background-color: transparent;
      }

      &:active {
        --color: #fff;
        --background-color: var(--cf-blue-2);
      }
    }
  }
}
</style>

