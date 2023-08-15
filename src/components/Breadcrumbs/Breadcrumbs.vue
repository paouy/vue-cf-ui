<script setup>
const props = defineProps({ data: Array })
</script>

<template>
  <ol class="cf-breadcrumbs">
    <li v-for="route in props.data" :key="route.name">
      <span v-if="!route.path">
        {{ route.name }}
      </span>
      <RouterLink :to="route.path" v-else>
        {{ route.name }}
      </RouterLink>
    </li>
  </ol>
</template>

<style lang="scss">
.cf-breadcrumbs {
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
  }
}
</style>