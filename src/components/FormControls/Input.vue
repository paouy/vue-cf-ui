<script setup>
import { ref, computed } from 'vue'
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
  maxlength: [Number, String],
  minlength: [Number, String],
  pattern: String,
  ...commonProps
})

const isText = ref(false)

const computedType = computed(() => {
  if (props.type.toLowerCase() === 'password') {
    return isText.value ? 'text' : 'password'
  } else {
    return props.type
  }
})

const computedValue = computed({
  get: () => props.modelValue || props.value,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="cf-form-control">
    <label v-if="props.label">
      {{ props.label }}
      <button
        type="button"
        tabindex="-1"
        @click="isText = !isText"
        v-if="props.type.toLowerCase() === 'password'"
      >
        {{ isText ? 'Hide' : 'Show' }}
      </button>
    </label>
    <div class="cf-form-control-widget">
      <div v-if="props.prefix">{{ props.prefix }}</div>
      <input
        v-model="computedValue"
        :disabled="props.disabled"
        :required="props.required"
        :type="computedType"
        :placeholder="props.placeholder"
        :list="props.list"
        :step="props.step"
        :max="props.max"
        :min="props.min"
        :maxlength="props.maxlength"
        :minlength="props.minlength"
        :pattern="props.pattern"
        :title="props.title"
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