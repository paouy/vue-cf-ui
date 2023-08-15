<script setup>
const emit = defineEmits(['toggle-table', 'sort-column'])

const props = defineProps({
  columns: Array,
  selectable: Boolean,
  sortable: Boolean,
  rowActions: Array
})
</script>

<template>
  <colgroup>
    <col style="--w: 3rem" v-if="props.selectable">
    <col
      v-for="column in props.columns"
      :key="column.key"
      :style="{ '--w': column.width }"
    >
    <col style="--w: 4rem" v-if="props.rowActions">
  </colgroup>
  <thead>
    <tr>
      <th data-table-checkbox v-if="props.selectable">
        <input
          type="checkbox"
          :checked="isTableSelected"
          :disabled="!isTableSelectable"
          @change="emit('toggle-table')"
        >
      </th>
      <th v-for="column in props.columns" :key="column.key">
        <button @click="emit('sort-column', column.key)" v-if="props.sortable">
          {{ column.label }}
        </button>
        <div v-else>
          {{ column.label }}
        </div>
      </th>
      <th data-table-row-actions v-if="props.rowActions"></th>
    </tr>
  </thead>
</template>