<script setup>
import CfTag from '../Tag/Tag.vue'

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
  modelValue: File,
  label: String,
  action: {
    type: String,
    default: 'Choose file'
  },
  required: Boolean
})

const onChange = (event) => {
  emit('update:modelValue', event.target.files[0])
  emit('change', event)
}

const onRemove = () => {
  emit('update:modelValue', null)
}
</script>

<template>
  <div class="cf-file-picker">
    <div class="cf-file-picker-label" v-if="props.label">
      {{ props.label }}
    </div>
    <label class="cf-button cf-file-picker-button" v-if="!props.modelValue">
      {{ props.action }}
      <input type="file" @change="onChange" :required="required">
    </label>
    <cf-tag @remove="onRemove" v-else>{{ props.modelValue?.name }}</cf-tag>
  </div>
</template>

<style lang="scss">
.cf-file-picker {
  display: grid;
  height: fit-content;

  input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  &-label {
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }

  &-button {
    border: 1px solid var(--color);

    --default-color: var(--cf-blue-3);
    --default-background: none;
    --hover-color: #fff;
    --hover-background: var(--cf-blue-2);
    --active-color: #fff;
    --active-background: var(--cf-blue-4);
  }
}
</style>