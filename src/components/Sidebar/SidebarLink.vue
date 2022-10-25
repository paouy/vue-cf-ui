<script setup>
const props = defineProps({
  to: String,
  href: String,
  icon: String
})
</script>

<template>
  <router-link class="cf-sidebar-link" :to="props.to" v-if="to">
    <div class="cf-sidebar-link__icon">
      <span class="material-symbols-outlined">
       {{ icon }}
      </span>
    </div>
    <div class="cf-sidebar-link__label">
      <slot></slot>
    </div>
  </router-link>

  <a class="cf-sidebar-link" :href="href" v-else>
    <div class="cf-sidebar-link__icon">
      <span class="material-symbols-outlined">
       {{ icon }}
      </span>
    </div>
    <div class="cf-sidebar-link__label">
      <slot></slot>
    </div>
  </a>
</template>

<style lang="scss">
.cf-sidebar-link {
  display: flex;
  align-items: center;
  border-radius: 50rem 0 0 50rem;
  border: 1px solid transparent;
  border-right: none;
  height: 2.625rem;

  &__icon {
    display: grid;
    place-content: center;
    width: 3.4375rem;
    height: 2.625rem;

    span {
      color: var(--cf-blue-4);
      font-size: 1.25rem;
      font-variation-settings: 'FILL' 0, 'wght' 350, 'GRAD' 0, 'opsz' 20;
    }
  }

  &__label {
    color: var(--cf-blue-1);
    font-size: 0.875rem;
    line-height: 1.05rem;
  }

  &:hover {
    border-color: var(--cf-cyan-9);
    background: var(--cf-cyan-9);

    .cf-sidebar-link__label {
      text-decoration: underline;
      text-decoration-style: dotted;
      text-underline-offset: 0.25rem;
    }
  }

  &.active {
    border-color: var(--cf-blue-8);
    background: var(--cf-blue-9);

    .cf-sidebar-link__label {
      color: var(--cf-blue-2);
      font-weight: 700;
    }
  }
}

@media (min-width: 880px) {
  .cf-sidebar--toggled {
    .cf-sidebar-link {
      border-radius: 0;

      &__label {
        display: none;
      }
    }
  }
}
</style>