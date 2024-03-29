<script setup>
import { useSlots, ref, computed } from 'vue'
import { useFuse } from '@vueuse/integrations/useFuse'
import { getProperty } from 'dot-prop'
import DataTableHeader from './DataTableHeader.vue'
import DataTableRow from './DataTableRow.vue'

const slots = useSlots()

const emit = defineEmits(['update:selection', 'row-action'])

const props = defineProps({
  title: String,
  description: String,
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  selection: {
    type: Array,
    default: []
  },
  rowActions: [Boolean, Array],
  forceRowMenu: Boolean,
  customTemplate: Boolean,
  selectable: Boolean,
  sortable: Boolean,
  defaultSortKey: {
    type: String,
    default: ''
  },
  searchable: Boolean
})

const sortKey = ref(props.defaultSortKey)
const sortOrder = ref('asc')
const searchText = ref('')

const computedData = computed(() => {
  if (props.searchable) {
    const { results } = useFuse(searchText, props.data, {
      fuseOptions: {
        keys: props.columns.map(({ key }) => key),
        minMatchCharLength: 2,
        threshold: 0.15
      },
      matchAllWhenSearchEmpty: true
    })

    return results.value
  } else {
    return props.data
  }
})

const rows = computed(() => {
  return computedData.value
    .map(data => data.item || data)
    .sort((a, b) => {
      const aValue = getProperty(a, sortKey.value)
      const bValue = getProperty(b, sortKey.value)

      if (typeof aValue === 'string') {
        return sortOrder.value === 'asc'
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue)
      }

      return sortOrder.value === 'asc'
        ? aValue - bValue
        : bValue - aValue
    })
    .map(({ _, ...data }) => {
      return {
        _: {
          isDisabled: _?.disabled ?? false,
          isSelectable: _?.seletable ?? true,
          isSelected: props.selection.includes(data.id),
          actions: _?.actions ?? props.rowActions
        },
        data
      }
    })
})

const isTableSelectable = computed(() => {
  return rows.value.some(row => row._.isSelectable)
})

const isTableSelected = computed({
  get: () => {
    const selectableRows = rows.value
      .filter(row => row._.isSelectable)
      .length

    return selectableRows >= 1 && (selectableRows === props.selection.length)
  },
  set: (value) => {
    let selection = []

    if (value === true) {
      selection = rows.value
        .filter(row => !row._.isDisabled && row._.isSelectable)
        .map(row => row.data.id)
    }
    
    emit('update:selection', selection)
  }
})

const onToggleRow = (rowDataId) => {
  const selection = props.selection.includes(rowDataId)
    ? props.selection.slice().filter(id => rowDataId !== id)
    : props.selection.concat(rowDataId)

  emit('update:selection', selection)
}

const onSortColumn = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}
</script>

<template>
  <div class="cf-data-table">
    <DataTableHeader
      v-model:search="searchText"
      :title="props.title"
      :description="props.description"
      :searchable="props.searchable"
      v-if="props.title || props.description || props.searchable || slots.header"
    >
      <slot name="header"></slot>
    </DataTableHeader>
    <div class="cf-data-table-container">
      <table>
        <colgroup>
          <col v-if="props.selectable" style="--w: 3rem">
          <col v-for="c in props.columns" :key="c.key" :style="{ '--w': c.width }">
          <col v-if="props.rowActions" style="--w: 4rem">
        </colgroup>
        <thead>
          <tr>
            <th data-table-checkbox v-if="props.selectable">
              <input
                v-model="isTableSelected"
                type="checkbox"
                :disabled="!isTableSelectable"
              >
            </th>
            <th v-for="column in props.columns" :key="column.key">
              <button @click="onSortColumn(column.key)" v-if="props.sortable">
                {{ column.label }}
              </button>
              <div v-else>
                {{ column.label }}
              </div>
            </th>
            <th v-if="props.rowActions"></th>
          </tr>
        </thead>
        <tbody>
          <DataTableRow
            v-for="row in rows"
            :key="row.data.id"
            :data="row"
            :columns="props.columns"
            :include-checkbox="props.selectable"
            :force-menu="props.forceRowMenu"
            @toggle="onToggleRow(row.data.id)"
            @action="$event => emit('row-action', $event)"
          >
            <slot name="row" :data="row.data"></slot>
          </DataTableRow>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
.cf-data-table {
  border: 1px solid var(--cf-gray-7);
  border-radius: 0.3125rem;
  margin: 1rem 0 2.5rem 0;
  position: relative;

  &-container {
    overflow-x: auto;
  }

  table {
    white-space: nowrap;
    width: 100%;
  }

  thead {
    background: var(--cf-gray-9);

    button,
    div {
      padding: 0.5rem 1rem;
      width: 100%;
    }

    button:hover {
      background: var(--cf-gray-8);
    }
  }

  tbody {
    &:empty {
      height: 1rem;
    }

    tr {
      border-top: 1px solid var(--cf-gray-8);
    }

    td {
      padding: 0.5rem 1rem;

      &:not([data-table-row-actions], [data-table-checkbox]) {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

  tbody [data-table-row-actions] {
    text-align: right;

    > button {
      &:only-child {
        float: right;
        color: var(--cf-blue-4);

        &:hover {
          text-decoration: underline;
          text-underline-offset: 0.25rem;
        }
      }

      &:not(:only-child) {
        display: inline-block;
        text-align: center;
        border-radius: 0.3125rem;
        height: 1.5rem;
        width: 2rem;

        &:hover {
          background: var(--cf-gray-9);
        }
      }
    }

    div {
      display: none;
      margin-top: 0.25rem;
      border: 1px solid var(--cf-gray-7);
      border-radius: 0.3125rem;
      background: #fff;
      width: max-content;
      position: absolute;
      left: auto;
      right: 1rem;
      z-index: 1;
      overflow: hidden;

      > button {
        > * {
          display: flex;
          padding: 0.5rem 1rem;
          cursor: pointer;

          &:hover {
            background: var(--cf-gray-9);
          }
        }
      }
    }

    &:focus-within {
      > button:not(:only-child) {
        background: var(--cf-gray-9);
      }
      
      div {
        display: grid;
      }
    }
  }

  [data-table-checkbox] {
    padding: 0.5rem 1rem;
    position: relative;
    
    input {
      border: 1px solid var(--cf-gray-5);
      border-radius: 0.3125rem;
      margin: auto;
      background: #fff;
      width: 1rem;
      height: 1rem;
      transition: border-color 0.2s ease 0s;
      position: absolute;
      top: 0;
      bottom: 0;
      appearance: none;
      cursor: pointer;

      &:checked {
        background: var(--cf-gray-4) url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="white"><path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z"/></svg>') no-repeat center;
      }

      &:hover:not(:checked, :disabled) {
        border-color: var(--cf-blue-4);
      }

      &:focus {
        border-color: var(--cf-blue-4);
        outline: 2px solid var(--cf-blue-4);
        outline-offset: 3px;
      }

      &:disabled {
        opacity: 0.5;
        cursor: default;

        ~ * {
          opacity: 0.5;
          cursor: default !important;
        }
      }
    }
  }
}

@media (min-width: 880px) {
  .cf-data-table {
    table {
      table-layout: fixed;
    }

    col {
      width: var(--w);
    }
  }
} 
</style>