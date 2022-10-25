<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: [Number, String],
  type: String,
  label: String,
  options: Array,
  list: String,
  helper: String,
  disabled: Boolean,
  required: Boolean
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
  <div class="cf-field">
    <select
      class="cf-field__input"
      v-model="computedValue"
      :required="props.required"
      :disabled="props.disabled"
      v-if="props.type === 'select'"
    >
      <option
        v-for="option in props.options"
        :key="option.value || option"
        :value="option.value || option"
      >
        {{ option.label || option}}
      </option>
    </select>

    <textarea
      class="cf-field__input"
      v-model="computedValue"
      :required="props.required"
      :disabled="props.disabled"
      v-else-if="props.type === 'textarea'"
    ></textarea>

    <input
      class="cf-field__input"
      v-model="computedValue"
      :type="props.type"
      :list="props.list"
      :required="props.required"
      :disabled="props.disabled"
      v-else
    >

    <label v-if="props.label">{{ props.label }}</label>
    <small v-if="props.helper">{{ props.helper }}</small>
  </div>
</template>

<style lang="scss">
.cf-field {
  display: grid;
  gap: 0.25rem;
  width: 100%;

  label {
    order: 1;
    font-size: 0.875rem;
  }

  small {
    order: 3;
    font-size: 0.75rem;
  }

  &__input {
    order: 2;
    font-size: 0.875rem;
    line-height: normal;
    padding: 0.5rem;
    border: 1px solid var(--cf-gray-5);
    border-radius: 0.3125rem;
    min-width: 0;
    transition: border-color 0.2s ease 0s;

    &:not(:disabled) {
      &:hover {
        border-color: var(--cf-blue-4);
      }

      &:focus {
        border-color: var(--cf-blue-4);
        outline: 2px solid var(--cf-blue-4);
        outline-offset: 3px;
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;

      ~ * {
        opacity: 0.5;
      }
    }
  }

  select {
    padding-left: 2rem;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 16 16" fill="%23595959"><path d="M14.15 4.492H1.85l-.354.854 6.15 6.15h.707l6.15-6.15-.353-.854z"></path></svg>') calc(100% - 0.625rem) center no-repeat;
  }
}

[inert] .cf-field,
[disabled] .cf-field {
  opacity: 0.5;
  cursor: default;
}
</style>