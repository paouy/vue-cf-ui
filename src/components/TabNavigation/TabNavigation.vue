<script setup>
const props = defineProps({
  tabs: Array
})
</script>

<template>
  <nav class="cf-navigation-tabs">
    <ul>
      <li v-for="(tab, index) in props.tabs" :key="index">
        <router-link :to="tab.to">{{ tab.label }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.cf-navigation-tabs {
  border-bottom: 1px solid var(--cf-gray-7);
  margin-bottom: 2rem;

  ul {
    display: flex;
    margin-bottom: -1px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      flex-shrink: 0;

      a {
        display: flex;
        align-items: center;
        color: var(--cf-gray-3);
        padding: 0 1rem;
        border-bottom: 2px solid transparent;
        height: 3.125rem;

        &.active {
          color: var(--cf-gray-1);
          font-weight: 500;
          border-color: var(--cf-blue-4);
        }
      }
    }
  }
}
</style>