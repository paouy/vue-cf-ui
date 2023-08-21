<script setup>
import { useSlots, computed } from 'vue'
import Input from '../FormControls/Input.vue'

const slots = useSlots()

const emit = defineEmits(['update:search'])

const props = defineProps({
  title: String,
  description: String,
  searchable: Boolean,
  search: String
})

const search = computed({
  get: () => props.search,
  set: (value) => emit('update:search', value)
})
</script>

<template>
  <header>
    <div class="cf-data-table-title" v-if="props.title">
      {{ props.title }}
    </div>
    <div class="cf-data-table-description" v-if="props.description">
      {{ props.description }}
    </div>
    <div class="cf-data-table-search" v-if="props.searchable">
      <Input v-model="search" label="Search"/>
    </div>
    <div class="cf-data-table-action" v-if="slots.default">
      <slot></slot>
    </div>
  </header>
</template>

<style lang="scss">
.cf-data-table {
  header {
    display: grid;
    margin: 1rem;

    > :first-child {
      margin-top: 0;
    }
  }

  &-title {
    order: 1;
    font-size: 1.25rem;
    font-weight: 600;
  }

  &-description {
    order: 2;
    margin-top: 0.5rem;
  }

  &-search {
    order: 3;
    margin-top: 1rem;
  }

  &-action {
    order: 4;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.5rem;
    margin-top: 0.5rem;

    > * {
      width: 100%;
    }
  }
}

@media (min-width: 755px) {
  .cf-data-table {
    header {
      grid-template-columns: 1fr fit-content(100%);

      > * {
        grid-column: 1;
      }
    }

    &-description {
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

    &-search {
      &:last-child:nth-child(3) {
        grid-row: 3;
      }
    }

    &-action {
      grid-column: 2 !important;
      flex-direction: row-reverse;
      align-self: flex-end;
      margin: 0 0 0 0.5rem;
    }
  }
}
</style>