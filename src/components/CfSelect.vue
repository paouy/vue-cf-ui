<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: [Number, String],
  label: String,
  helper: String,
  required: Boolean,
  disabled: Boolean
})
</script>

<template>
  <div class="cf-select">
    <select
      class="cf-select__field"
      :value="props.modelValue"
      :required="props.required"
      :disabled="props.disabled"
      @input="event => emit('update:modelValue', event.target.value)"
    >
      <slot></slot>
    </select>
    <label class="cf-select__label">
      {{ props.label }}
    </label>
    <div class="cf-select__helper" v-if="props.helper">
      {{ props.helper }}
    </div>
  </div>
</template>

<style lang="scss">
.cf-select {
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
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    border: 1px solid var(--cf-gray-5);
    border-radius: 0.3125rem;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 16 16" fill="%23595959"><path d="M14.15 4.492H1.85l-.354.854 6.15 6.15h.707l6.15-6.15-.353-.854z"></path></svg>') calc(100% - 0.625rem) center no-repeat;
    min-width: 0;
    transition: border-color 0.2s ease 0s;
    cursor: pointer;

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
</style>