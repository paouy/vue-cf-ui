<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const props = defineProps({
  to: [String, Object],
  href: String,
  label: String,
  icon: Boolean,
  parent: String
})

const isActive = computed(() => {
  if (props.parent) {
    const route = useRoute()
    return route.path.includes(props.parent)
  } else {
    return null
  }
})

const rootElement = computed(() => props.to ? RouterLink : 'a')

const linkClasses = computed(() => ({
  'cf-sidebar-link': true,
  [`cf-sidebar-link--${props.label.toLowerCase().replaceAll(' ', '-')}`]: props.icon
}))
</script>

<template>
  <button v-if="!props.parent">
    <component
      :class="linkClasses"
      :is="rootElement"
      :to="props.to"
      :href="props.href"
    >
      <figure v-if="props.icon"></figure>
      <span>
        {{ props.label }}
      </span>
    </component>
  </button>

  <div :class="['cf-sidebar-link-group', { hasRouterLinkActive: isActive }]" v-else>
    <button :class="linkClasses">
      <figure></figure>
      <span>
        {{ props.label }}
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
    &::before {
      display: block;
      content: '';
      background: var(--icon) center;
      height: 1.25rem;
      width: 1.25rem;
    }
  }

  span {
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

    span {
      color: var(--cf-blue-2);
      font-weight: 700;
    }
  }
}

.cf-sidebar-link-group {
  &:focus-within,
  &.hasRouterLinkActive {
    .cf-sidebar-link-children {
      display: block;
    }
  }
}

.cf-sidebar-link-children {
  display: none;
  margin-left: 1.875rem;

  > button {
    width: 100%;

    .cf-sidebar-link {
      height: 1.75rem;
    }
  }
}

@media (min-width: 880px) {
  .cf-sidebar--toggled:not(:hover) {
    .cf-sidebar-link {
      border-radius: 0;

      span {
        display: none;
      }
    }

    .cf-sidebar-link-group {
      &.hasRouterLinkActive {
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