<script setup>
import { inject, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: [Number, String, Boolean],
  label: String,
  helper: String,
  value: [Number, String, Boolean],
  disabled: Boolean
})

const id = Math.random()

const selection = {
  name: inject('selection-name'),
  required: inject('selection-required')
}

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
  <div class="cf-radio">
    <input
      class="cf-radio__input"
      v-model="computedValue"
      type="radio"
      :id="id"
      :name="selection.name"
      :value="props.value"
      :required="selection.required"
      :disabled="props.disabled"
    >
    <div>
      <label class="cf-radio__label" :for="id">
        {{ props.label }}
      </label>
      <div class="cf-radio__helper" v-if="props.helper">
        {{ props.helper }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cf-radio {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: fit-content;

  &__input {
    flex-shrink: 0;
    display: grid;
    place-content: center;
    border: 1px solid var(--cf-gray-5);
    border-radius: 50%;
    margin: 0.25rem 0;
    width: 1rem;
    height: 1rem;
    transition: border-color 0.2s ease 0s;
    appearance: none;
    cursor: pointer;

    &:checked {
      &::before {
        content: '';
        border-radius: 50%;
        background: var(--cf-gray-1);
        height: 0.5rem;
        width: 0.5rem;
      }
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
    font-size: 0.75rem;
  }
}

[inert] .cf-radio,
[disabled] .cf-radio {
  opacity: 0.5;
  cursor: default;
}
</style>