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