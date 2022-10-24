<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: [Number, String],
  value: [Number, String],
  label: String,
  placeholder: String,
  helper: String,
  required: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  type: {
    type: String,
    default: 'text'
  }
})
</script>

<template>
  <div class="cf-input">
    <input
      class="cf-input__field"
      :value="props.modelValue || props.value"
      :type="props.type"
      :placeholder="props.placeholder"
      :required="props.required"
      :disabled="props.disabled"
      :readonly="props.readonly"
      @input="event => emit('update:modelValue', event.target.value)"
    >
    <label class="cf-input__label">
      {{ props.label }}
    </label>
    <div class="cf-input__helper" v-if="props.helper">
      {{ props.helper }}
    </div>
  </div>
</template>

<style lang="scss">
.cf-input {
  display: grid;
  gap: 0.25rem;
  width: 100%;

  &__label {
    order: 1;
    font-size: 0.875rem;
  }

  &__field {
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

  &__helper {
    order: 3;
    font-size: 0.75rem;
  }
}

[inert] .cf-input,
[disabled] .cf-input {
  opacity: 0.5;
  cursor: default;
}
</style>