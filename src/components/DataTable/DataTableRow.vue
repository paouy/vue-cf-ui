<script setup>
import { computed } from 'vue'
import { getProperty } from 'dot-prop'
import { RouterLink } from 'vue-router'

const emit = defineEmits(['toggle', 'action'])

const props = defineProps({
  data: Object,
  columns: Array,
  forceMenu: Boolean,
  includeCheckbox: Boolean
})

const hasMenu = computed(() => props.forceMenu || props.data.actions.length > 1)

const actions = computed(() => props.data.actions.map(action => {
  const name = action.name || action
  const key = action.key || name.toUpperCase().replaceAll(' ', '_')
  const invoke = () => emit('action', { key, data: props.data })

  let component = 'button'

  if (action.to) {
    component = RouterLink
  }

  if (action.href) {
    component = 'a'
  }

  return {
    label: name,
    to: action.to,
    href: action.href,
    key,
    invoke,
    component
  }
}))

const primaryAction = computed(() => {
  return hasMenu.value
    ? { component: 'button', label: '•••', invoke: null }
    : actions.value[0]
})
</script>

<template>
  <tr>
    <td data-table-checkbox v-if="props.includeCheckbox">
      <input
        type="checkbox"
        :value="props.data.id"
        :checked="props.data.selected"
        :disabled="!props.data.selectable"
        @change="emit('toggle')"
      >
    </td>

    <slot>
      <td v-for="column in props.columns" :key="column.key">
        {{ getProperty(props.data, column.key)?.toLocaleString() }}
      </td>
    </slot>

    <td data-table-row-actions v-if="props.data.actions">
      <component
        :is="primaryAction.component"
        :to="primaryAction.to"
        :href="primaryAction.href"
        @click="primaryAction.invoke"
      >
        {{ primaryAction.label }}
      </component>
      <div v-if="hasMenu">
        <component
          v-for="action in actions"
          :key="action.key"
          :is="action.component"
          :to="action.to"
          :href="action.href"
          @click="action.invoke"
        >
          {{ action.label }}
        </component>
      </div>
    </td>
  </tr>
</template>