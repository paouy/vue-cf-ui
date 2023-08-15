<script setup>
import { computed } from 'vue'
import commonProps from './commonProps.js'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  prefix: String,
  suffix: String,
  list: String,
  step: [Number, String],
  max: [Number, String],
  min: [Number, String],
  ...commonProps
})

const computedValue = computed({
  get: () => props.modelValue || props.value,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="cf-form-control">
    <label v-if="props.label">{{ props.label }}</label>
    <div class="cf-form-control-widget">
      <div v-if="props.prefix">{{ props.prefix }}</div>
      <input
        v-model="computedValue"
        :disabled="props.disabled"
        :required="props.required"
        :type="props.type"
        :placeholder="props.placeholder"
        :list="props.list"
        :step="props.step"
        :max="props.max"
        :min="props.min"
        :autofocus="props.autofocus"
      >
      <div v-if="props.suffix">{{ props.suffix }}</div>
    </div>
    <small v-if="props.helper">{{ props.helper }}</small>
  </div>
</template>

<style lang="scss">
@import './commonStyles.scss';
</style>