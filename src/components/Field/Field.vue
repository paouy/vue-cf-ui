<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: [Number, String],
  type: String,
  label: String,
  placeholder: String,
  prefix: String,
  suffix: String,
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
        :value="null"
        v-if="!props.required && props.options.length"
      ></option>
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
      :placeholder="props.placeholder"
      :list="props.list"
      :required="props.required"
      :disabled="props.disabled"
      v-else
    >
    <div
      class="cf-field__prefix"
      v-if="props.prefix && !['select', 'textarea'].includes(props.type)"
    >
      {{ props.prefix }}
    </div>
    <div
      class="cf-field__suffix"
      v-if="props.suffix && !['select', 'textarea'].includes(props.type)"
    >
      {{ props.suffix }}
    </div>

    <label v-if="props.label">{{ props.label }}</label>
    <small v-if="props.helper">{{ props.helper }}</small>
    <div class="cf-field__outline"></div>
  </div>
</template>

<style lang="scss">
.cf-field {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  align-items: center;
  row-gap: 0.25rem;
  height: fit-content;
  position: relative;

  label {
    order: 1;
    font-size: 0.875rem;
    width: 100%;

    ~ div:last-child {
      top: 1.5625rem;
    }
  }

  &__prefix {
    order: 2;
    padding-left: 0.5rem;
  }

  &__suffix {
    order: 4;
    padding-right: 0.5rem;
  }

  &__prefix,
  &__suffix {
    font-size: 0.875rem;
    line-height: normal;
    width: fit-content;
  }

  &__input {
    order: 3;
    font-size: 0.875rem;
    line-height: normal;
    padding: 0.5rem;
    height: 2.125rem;
    flex-grow: 1;

    &:is(select) {
      padding-right: 2rem;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 16 16" fill="%23595959"><path d="M14.15 4.492H1.85l-.354.854 6.15 6.15h.707l6.15-6.15-.353-.854z"></path></svg>') calc(100% - 0.625rem) center no-repeat;
      cursor: pointer;
    }

    &:is(textarea) {
      height: 4.5rem;
      resize: none;

      ~ div:last-child {
        height: 4.5rem;
      }
    }

    &:focus:not(:disabled) {
      outline: none;

      ~ div:last-child {
        border-color: var(--cf-blue-4);
        outline: 2px solid var(--cf-blue-4);
        outline-offset: 3px;
      }
    }

    &:hover:not(:disabled) {
      ~ div:last-child {
        border-color: var(--cf-blue-4);
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: default;

      ~ * {
        opacity: 0.5;
      }
    }
  }

  small {
    order: 5;
    font-size: 0.75rem;
    width: 100%;
  }

  &__outline {
    border: 1px solid var(--cf-gray-5);
    border-radius: 0.3125rem;
    width: 100%;
    height: 2.125rem;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
}

[inert] .cf-field,
[disabled] .cf-field {
  opacity: 0.5;
  cursor: default;
}
</style>