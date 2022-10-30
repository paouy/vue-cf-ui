<script setup>
import { computed, provide } from 'vue'
import Choice from '../Choice/Choice.vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: [Number, String, Boolean, Array],
  label: String,
  choices: Array,
  multiple: Boolean,
  required: Boolean,
  disabled: Boolean
})

const rootClasses = computed(() => {
  return {
    'cf-choice-list': true,
    'cf-choice-list--disabled': props.disabled
  }
})

const computedValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

provide('choice-list-name', Math.random())
provide('choice-list-required', props.required)
</script>

<template>
  <div :class="rootClasses">
    <div class="cf-choice-list__label" v-if="props.label">
      {{ props.label }}
    </div>
    <choice
      v-for="choice in choices"
      :key="choice.value || choice"
      :type="props.multiple ? 'checkbox' : 'radio'"
      :label="choice.label || choice.value || choice"
      :helper="choice.helper"
      :value="choice.value || choice"
      :disabled="props.disabled"
      v-model="computedValue"
    />
    <slot></slot>
  </div>
</template>

<style lang="scss">
.cf-choice-list {
  display: grid;
  gap: 0.5rem;
  height: fit-content;

  &__label {
    font-size: 0.875rem;
    opacity: var(--opacity);
  }

  &--disabled {
    --opacity: 0.5;
  }
}

[inert] .cf-choice-list,
[disabled] .cf-choice-list {
  opacity: 0.5;
}
</style>