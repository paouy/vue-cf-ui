<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: [Number, String, Boolean, Array],
  label: String,
  helper: String,
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

const id = Math.random()
</script>

<template>
  <div class="cf-checkbox">
    <input
      class="cf-checkbox__input"
      v-model="computedValue"
      type="checkbox"
      :id="id"
      :value="props.value"
      :true-value="props.trueValue"
      :false-value="props.falseValue"
      :disabled="props.disabled"
    >
    <div>
      <label class="cf-checkbox__label" :for="id">
        {{ props.label }}
      </label>
      <div class="cf-checkbox__helper" v-if="props.helper">
        {{ props.helper }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cf-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: fit-content;

  &__input {
    flex-shrink: 0;
    border: 1px solid var(--cf-gray-5);
    border-radius: 0.3125rem;
    margin: 0.25rem 0;
    width: 1rem;
    height: 1rem;
    transition: border-color 0.2s ease 0s;
    appearance: none;
    cursor: pointer;

    &:checked {
      background: var(--cf-gray-4) url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="white"><path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z"/></svg>') no-repeat center;
    }

    &:hover:not(:checked, :disabled) {
      border-color: var(--cf-blue-4);
    }

    &:focus {
      border-color: var(--cf-blue-4);
      outline: 2px solid var(--cf-blue-4);
      outline-offset: 3px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: default;

      ~ * {
        opacity: 0.5;
        cursor: default !important;
      }
    }
  }

  &__helper {
    font-size: 0.875rem;
  }
}
</style>