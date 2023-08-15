<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <dl class="cf-summary-list">
    <template v-for="item in props.data">
      <dt>{{ item.label }}</dt>
      <dd>{{ item.value }}</dd>
    </template>
  </dl>
</template>

<style lang="scss">
.cf-summary-list {
  display: grid;
  grid-template-columns: max-content auto;
  gap: 0.5rem 2rem;
  padding: 2rem;
  border: 1px solid var(--cf-gray-7);
  border-radius: 0.3125rem;
  margin: 1rem 0 2.5rem 0;

  dt {
    color: var(--cf-gray-3);
  }
}
</style>