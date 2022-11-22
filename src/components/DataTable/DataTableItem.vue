<script setup>
import { inject, ref } from 'vue'
import CfDropdown from '../Dropdown/Dropdown.vue'

const props = defineProps({
  data: Object,
  expandable: Boolean,
  dropdown: Boolean
})

const columns = inject('columns', [])

const isExpanded = ref(false)
</script>

<template>
  <div class="cf-data-table-item">
    <div class="cf-data-table-item__drawer" v-if="isExpanded">
      <div class="cf-data-table-item__drawer__content">
        <slot name="drawer" :item="props.data"></slot>
      </div>
    </div>

    <div class="cf-data-table-item__content">
      <div v-for="column in columns" :key="column.key" :data-label="column.label">
        {{ data[column.key] }}
      </div>
    </div>

    <button
      class="cf-data-table-item__toggle"
      @click="isExpanded = !isExpanded"
      v-if="props.expandable"
    >
      <span class="material-symbols-outlined"></span>
    </button>

    <router-link
      class="cf-data-table-item__toggle"
      :to="props.data.to"
      v-if="props.data.to"
    >
      <span class="material-symbols-outlined"></span>
    </router-link>

    <div class="cf-data-table-item__dropdown" v-if="props.dropdown">
      <cf-dropdown>
        <template v-slot:toggle>
          <button>
            <span class="material-symbols-outlined">more_vert</span>
          </button>
        </template>
        <template v-slot:body>
          <slot name="dropdown" :item="props.data"></slot>
        </template>
      </cf-dropdown>
    </div>

    <div class="cf-data-table-item__backdrop"
      @click="isExpanded = false"
      v-if="props.expandable && isExpanded"
    ></div>
  </div>
</template>

<style lang="scss">
.cf-data-table-item {
  display: grid;
  border-top: 1px solid var(--cf-gray-8);
  position: relative;

  &__content {
    order: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    border-left: 0.375rem solid transparent;
    padding: 1rem 1.25rem 1rem 0.875rem;
    transition: border-color 300ms ease 0s;

    > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &::before {
        display: block;
        content: attr(data-label);
        font-size: 0.875rem;
        margin-bottom: 0.25rem;
      }
    } 
  }

  &__toggle {
    display: block;
    color: var(--cf-blue-4);
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
    --icon: '\e5df';

    &:hover {
      color: var(--cf-blue-2);
    }

    &:active {
      background: none;
    }

    span {
      font-size: 2rem;
      font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;

      &::before {
        content: var(--icon);
      }
    }
  }

  &__drawer {
    order: 2;
    padding: 1rem 2rem 3rem;
    border-top: 1px solid var(--cf-gray-8);
    border-left: 0.375rem solid var(--cf-blue-4);
    box-shadow: rgb(0 0 0 / 12%) 0 0 5px 5px;
    position: relative;
    z-index: 500;

    &__content {
      position: relative;
    }

    ~ button {
      --icon: '\e5c5';
    }

    + div {
      border-color: var(--cf-blue-4);
      height: 3rem;
      overflow: hidden;
    }
  }

  &__dropdown {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    button > span {
      color: var(--cf-gray-3);
    }
  }

  &__backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 499;
  }
}

@media (min-width: 755px) {
  .cf-data-table-item {
    &__content {
      grid-template-columns: repeat(var(--columns), 1fr);
      gap: 0;
      padding: 0 1.5rem 0 1.125rem;

      > div {
        padding: 0.5rem;
        margin: 0;

        &::before {
          display: none;
        }
      }
    }

    &__toggle {
      top: 0.25rem;
      right: 0.25rem;
    }

    &__drawer {
      padding: 1.5rem 1.5rem 3rem 4.125rem;

      + div {
        height: unset;
      }
    }
  }
}
</style>