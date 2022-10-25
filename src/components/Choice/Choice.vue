<script setup>
import { inject, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: [Number, String, Boolean, Array],
  value: [Number, String, Boolean],
  trueValue: {
    type: [Number, String, Boolean],
    default: true
  },
  falseValue: {
    type: [Number, String, Boolean],
    default: false
  },
  type: String,
  label: String,
  helper: String,
  disabled: Boolean
})

const id = Math.random()

const choiceList = {
  name: inject('choice-list-name', null),
  required: inject('choice-list-required', null)
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
  <div class="cf-choice">
    <input
      v-model="computedValue"
      :type="props.type"
      :id="id"
      :name="choiceList.name"
      :value="props.value"
      :true-value="props.trueValue"
      :false-value="props.falseValue"
      :required="choiceList.required"
      :disabled="props.disabled"
    >
    <label :for="id">
      {{ props.label || props.value }}
    </label>
    <small v-if="props.helper">
      {{ props.helper }}
    </small>
  </div>
</template>

<style lang="scss">
.cf-choice {
  display: grid;
  grid-template-columns: 1rem 1fr;
  column-gap: 1rem;
  align-items: center;
  width: fit-content;

  small {
    grid-column-start: 2;
    font-size: 0.75rem;
    cursor: default;
  }

  input {
    border: 1px solid var(--cf-gray-5);
    border-radius: var(--border-radius);
    width: 1rem;
    height: 1rem;
    transition: border-color 0.2s ease 0s;
    appearance: none;
    cursor: pointer;

    &[type="checkbox"] {
      --border-radius: 0.3125rem;
      --icon: var(--cf-gray-4) url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="white"><path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z"/></svg>');
    }

    &[type="radio"] {
      --border-radius: 50%;
      --icon: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="8" height="8"><circle cx="50" cy="50" r="50" /></svg>');
    }

    &:checked {
      background: var(--icon) no-repeat center;
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
}

[inert] .cf-choice,
[disabled] .cf-choice {
  opacity: 0.5;
  cursor: default;
}
</style>