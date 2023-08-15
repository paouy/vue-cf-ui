<script setup>
import { computed } from 'vue'
import commonProps from './commonProps.js'

const emit = defineEmits(['update:modelValue', 'input'])
const props = defineProps({
  options: Array,
  ...commonProps
})

const computedValue = computed({
  get: () => props.modelValue || props.value,
  set: (value) => {
    emit('update:modelValue', value)
    emit('input', { data: value })
  }
})
</script>

<template>
  <div class="cf-form-control">
    <label v-if="props.label">{{ props.label }}</label>
    <div class="cf-form-control-widget">
      <div v-if="props.prefix">{{ props.prefix }}</div>
      <select
        v-model="computedValue"
        :disabled="props.disabled"
        :required="props.required"
        :autofocus="props.autofocus"
      >
        <option :value="null" v-if="!props.required && props.options.length"></option>
        <option
          v-for="option in props.options"
          :key="option.value || option"
          :value="option.value || option"
          :disabled="option.disabled ?? false"
        >
          {{ option.label || option }}
        </option>
        <slot></slot>
      </select>
      <div v-if="props.suffix">{{ props.suffix }}</div>
    </div>
    <small v-if="props.helper">{{ props.helper }}</small>
  </div>
</template>

<style lang="scss">
@import './commonStyles.scss';
</style>