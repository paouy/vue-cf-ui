<script setup>
import { useSlots, ref, computed, watch, provide } from 'vue'
import Field from '../Field/Field.vue'
import DataTableItem from './DataTableItem.vue'

const slots = useSlots()

const props = defineProps({
  title: String,
  description: String,
  expandable: Boolean,
  itemDropdown: Boolean,
  paginate: {
    type: Boolean,
    default: true
  },
  searchKey: String,
  pluralTerm: {
    type: String,
    default: 'items'
  },
  itemKey: String,
  pageSize: {
    type: [Number, String],
    default: 10
  },
  columns: {
    type: Array,
    default: []
  },
  data: {
    type: Array,
    default: []
  }
})

const searchString = ref('')

const filteredData = computed(() => {
  return props.data.filter(item => {
    if (searchString.value) {
      const value = item[props.searchKey].replaceAll(' ', '').toLowerCase()
      const key = searchString.value.replaceAll(' ', '').toLowerCase()
      
      return value.includes(key)
    } else {
      return true
    }
  })
})

const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / parseInt(props.pageSize))
})

const pagination = computed(() => {
  const end =
    currentPage.value < totalPages.value
      ? currentPage.value * props.pageSize
      : filteredData.value.length
    
  return {
    start: ((currentPage.value - 1) * props.pageSize) + 1,
    end
  }
})

const paginatedData = computed(() => {
  if (props.paginate) {
    return filteredData.value.slice(
      (currentPage.value - 1) * parseInt(props.pageSize),
      currentPage.value * parseInt(props.pageSize)
    )
  } else {
    return filteredData.value
  }
})

const showNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const showPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

watch(searchString, () => {
  if (currentPage.value > 1) {
    currentPage.value = 1
  }
})

provide('columns', props.columns)
</script>

<template>
  <div class="cf-data-table">
    <div class="cf-data-table__header">
      <div class="cf-data-table__header__content">
        <div class="cf-data-table__title" v-if="props.title">
          {{ props.title }}
        </div>
        <div class="cf-data-table__description" v-if="props.description">
          {{ props.description }}
        </div>
        <div class="cf-data-table__search" v-if="props.searchKey">
          <field v-model="searchString" type="text" label="Search"/>
        </div>
        <div class="cf-data-table__actions" v-if="slots.actions">
          <slot name="actions"></slot>
        </div>
      </div>
      <div class="cf-data-table__header__slot" v-if="slots.header">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="cf-data-table__body" :style="`--columns: ${props.columns.length}`">
      <div class="cf-data-table__body__header">
        <div v-for="column in props.columns" :key="column.key">{{ column.label }}</div>
      </div>
      <div class="cf-data-table__body__items">
        <data-table-item
          v-for="item in paginatedData"
          :key="item._id || item[props.itemKey]"
          :data="item"
          :expandable="props.expandable"
          :dropdown="props.itemDropdown"
        >
          <template v-slot:drawer="props">
            <slot name="item-drawer" :item="props.item"></slot>
          </template>
          <template v-slot:dropdown="props">
            <slot name="item-dropdown" :item="props.item"></slot>
          </template>
        </data-table-item>
      </div>
    </div>
    <div class="cf-data-table__footer" v-if="props.paginate">
      <div class="cf-data-table__footer__pagination">
        <button :disabled="currentPage <= 1" @click="showPreviousPage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
            <path d="M11.022 14.503L4.518 8l6.504-6.504.707.707L5.932 8l5.797 5.796-.707.707z"></path>
          </svg>
        </button>
        <button :disabled="currentPage >= totalPages" @click="showNextPage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
            <path d="M4.99 14.503l-.707-.707L10.08 8 4.283 2.203l.707-.707L11.494 8 4.99 14.503z"></path>
          </svg>
        </button>
        <div v-if="filteredData.length">
          <b>{{ `${pagination.start} to ${pagination.end}` }}</b> of <b>{{ filteredData.length }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cf-data-table {
  border: 1px solid var(--cf-gray-7);
  border-radius: 0.3125rem;

  &__header {
    &__content {
      display: grid;
      margin: 1rem;

      > :first-child {
        margin-top: 0;
      }
    }

    &__slot {
      margin: 1rem;
    }
  }

  &__title {
    order: 1;
    font-size: 1.25rem;
    font-weight: 600;
  }

  &__description {
    order: 2;
    margin-top: 1rem;
  }

  &__search {
    order: 3;
    margin-top: 1rem;
  }

  &__actions {
    order: 4;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.5rem;
    margin-top: 0.5rem;

    > * {
      width: 100%;
    }
  }

  &__body {
    &__header {
      display: none;
    }

    &__items {
      &:empty {
        border-top: 1px solid var(--cf-gray-8);
        padding: 1rem 2rem;

        &::before {
          content: 'You do not have any items to display.';
        }
      }
    }
  }

  &__footer {
    border-top: 1px solid var(--cf-gray-8);
    padding: 0.5rem;

    &__pagination {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--cf-gray-4);

      button {
        display: grid;
        place-content: center;
        border: 1px solid var(--cf-gray-7);
        border-radius: 0.3125rem;
        width: 2.125rem;
        height: 2.125rem;

        &:disabled {
          opacity: 0.5;
        }
      }
    }
  }
}

@media (min-width: 755px) {
  .cf-data-table {
    &__header {
      &__content {
        grid-template-columns: 1fr fit-content(100%);

        > * {
          grid-column: 1;
        }
      }
    }

    &__description {
      &:first-child {
        ~ :last-child:nth-child(3) {
          align-self: flex-end;
        }
      }

      ~ :last-child:nth-child(3) {
        grid-row: -1 / span 2;
        align-self: center;
      }
    }

    &__search {
      &:last-child:nth-child(3) {
        grid-row: 3;
      }
    }

    &__actions {
      grid-column: 2;
      flex-direction: row-reverse;
      padding-bottom: 1px;
      align-self: flex-end;
      margin: 0 0 0 0.5rem;
    }

    &__body {
      &__header {
        display: grid;
        grid-template-columns: repeat(var(--columns), 1fr);
        font-weight: 600;
        padding: 0 1.5rem;
        background: #f2f2f2;

        > div {
          padding: 0.5rem;
        }
      }
    }
  }
}
</style>