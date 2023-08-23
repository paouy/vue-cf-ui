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

const rowMeta = computed(() => props.data._)
const rowData = computed(() => props.data.data)
const hasMenu = computed(() => props.forceMenu || rowMeta.value.actions.length > 1)
const actions = computed(() => rowMeta.value.actions.map(action => {
  const name = action.name || action
  const key = action.key || name.toUpperCase().replaceAll(' ', '_')
  const invoke = () => emit('action', { key, data: rowData.value })

  let component = 'span'

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
  const menuToggle = {
    component: 'span',
    label: '•••',
    invoke: null
  }

  return hasMenu.value ? menuToggle : actions.value[0]
})
</script>

<template>
  <tr>
    <td data-table-checkbox v-if="props.includeCheckbox">
      <input
        type="checkbox"
        :value="rowData.id"
        :checked="rowMeta.isSelected"
        :disabled="!rowMeta.isSelectable"
        @change="emit('toggle')"
      >
    </td>

    <slot>
      <td v-for="column in props.columns" :key="column.key">
        {{ getProperty(rowData, column.key)?.toLocaleString() }}
      </td>
    </slot>

    <td data-table-row-actions v-if="rowMeta.actions">
      <button>
        <component
          :is="primaryAction.component"
          :to="primaryAction.to"
          :href="primaryAction.href"
          @click="primaryAction.invoke"
          tabindex="0"
        >
          {{ primaryAction.label }}
        </component>
      </button>
      <div v-if="hasMenu">
        <button v-for="action in actions" :key="action.key">
          <component
            :is="action.component"
            :to="action.to"
            :href="action.href"
            tabindex="0"
            @click="action.invoke"
          >
            {{ action.label }}
          </component>
        </button>
      </div>
    </td>
  </tr>
</template>