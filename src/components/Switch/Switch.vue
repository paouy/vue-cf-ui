<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: [Number, String, Boolean],
  label: String,
  value: [Number, String, Boolean],
  trueValue: {
    type: [Number, String, Boolean],
    default: true
  },
  falseValue: {
    type: [Number, String, Boolean],
    default: false
  },
  disabled: Boolean
})

const computedValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="cf-switch">
    <input
      class="cf-switch__box"
      v-model="computedValue"
      type="checkbox"
      :value="props.value"
      :true-value="props.trueValue"
      :false-value="props.falseValue"
      :disabled="props.disabled"
    >
    <div class="cf-switch__label" v-if="props.label">{{ props.label }}</div>
  </div>
</template>

<style lang="scss">
.cf-switch {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: fit-content;

  &__box {
    flex-shrink: 0;
    border-radius: 2.5rem;
    width: 3rem;
    height: 1.5rem;
    position: relative;
    appearance: none;
    cursor: pointer;
    --border-color: var(--cf-gray-2);
    --background: var(--cf-gray-4) url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="white"><path d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z"/></svg>') no-repeat calc(100% - 0.125rem) center;

    &::before {
      display: block;
      content: '';
      border: 1px solid var(--border-color);
      border-radius: 3rem;
      background: var(--background);
      width: 100%;
      height: 100%;
      transition: background-color 0.25s ease 0s, border-color 0.25s ease 0s;
    }

    &::after {
      content: '';
      margin: 2px;
      border-radius: 50%;
      background: #fff;
      box-shadow: var(--cf-gray-2) 0 0 2px 1px;
      width: 1.25rem;
      height: 1.25rem;
      position: absolute;
      top: 0;
      left: 0;
      transition: all 0.25s ease 0s;
    }

    &:checked {
      --border-color: var(--cf-green-2);
      --background: var(--cf-green-5) url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="white"><path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z"/></svg>') no-repeat 0.25rem center;
      
      &::after {
        box-shadow: none;
        left: 50%;
      }
    }

    &:focus {
      border-color: var(--cf-blue-4);
      outline: 2px solid var(--cf-blue-4);
      outline-offset: 3px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

[inert] .cf-switch,
[disabled] .cf-switch {
  opacity: 0.5;
  cursor: default;
}
</style>