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
  large: {
    type: Boolean,
    default: false
  },
  wide: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: null
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
    'cf-button--outlined': props.outlined,
    'cf-button--large': props.large,
    'cf-button--wide': props.wide,
    [`cf-button--${props.color}`]: props.color,
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
  background-color: var(--background);
  position: relative;
  width: fit-content;
  min-width: fit-content;
  white-space: nowrap;
  height: 2.05rem;
  transition-property: background-color, border-color, color;
  transition-duration: 200ms;
  transition-timing-function: ease;
  user-select: none;
  cursor: pointer;
  --color: var(--default-color);
  --background: var(--default-background);

  &:hover:not(:active) {
    --color: var(--hover-color);
    --background: var(--hover-background);
  }

  &:active {
    --color: var(--default-color);
    --background: var(--default-background);
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

[inert] .cf-button:not(.cf-button--loading),
[disabled] .cf-button:not(.cf-button--loading),
.cf-button--disabled {
  opacity: 0.5;
  pointer-events: none;
}

@media (hover: none) and (pointer: coarse) {
  .cf-button {
    &:hover:not(:active) {
      --color: var(--default-color);
      --background: var(--default-background);
    }

    &:active {
      --color: var(--hover-color);
      --background: var(--hover-background);
    }
  }
}

.cf-button {
  --default-color: var(--cf-gray-9);
  --default-background: var(--cf-blue-4);
  --hover-color: var(--cf-gray-9);
  --hover-background: var(--cf-blue-2);

  &.cf-button--red {
    --default-color: var(--cf-gray-9);
    --default-background: var(--cf-red-4);
    --hover-color: var(--cf-gray-9);
    --hover-background: var(--cf-red-2);
  }

  &.cf-button--gray {
    --default-color: var(--cf-gray-1);
    --default-background: var(--cf-gray-8);
    --hover-color: var(--cf-gray-1);
    --hover-background: var(--cf-gray-7);
  }
}

.cf-button--outlined {
  border: 1px solid var(--cf-blue-3);

  &:hover:not(:active) {
    border-color: var(--hover-background);
  }

  &:active {
    --color: #fff;
    --background: var(--cf-blue-4);
  }

  --default-color: var(--cf-blue-3);
  --default-background: none !important;
  --hover-color: #fff;
  --hover-background: var(--cf-blue-2);


  &.cf-button--red {
    border-color: var(--cf-red-3);

    &:hover:not(:active) {
      border-color: var(--hover-background);
    }

    &:active {
      --color: #fff;
      --background: var(--cf-red-4);
    }

    --default-color: var(--cf-red-3);
    --hover-color: #fff;
    --hover-background: var(--cf-red-2);
  }

  &.cf-button--gray {
    border-color: #000;

    &:hover:not(:active) {
      border-color: #000;
    }

    &:active {
      --color: #000;
      --background: none;
    }

    --default-color: #000;
    --hover-color: #000;
    --hover-background: var(--cf-gray-9);
  }
}
</style>

