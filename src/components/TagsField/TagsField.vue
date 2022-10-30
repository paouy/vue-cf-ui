<script setup>
import { ref } from 'vue'
import CfField from '../Field/Field.vue'
import CfTag from '../Tag/Tag.vue'
import { CfOutlinedButton } from '..';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: Array,
  label: String,
  buttonText: {
    type: String,
    default: 'Add'
  },
  prefix: String,
  helper: String,
  disabled: Boolean
})

const toggled = ref(false)
const tag = ref('')

const addTag = () => {
  const tags = props.modelValue

  tags.push(tag.value)

  emit('update:modelValue', tags)

  tag.value = ''
  toggled.value = false
}

const removeTag = (index) => {
  const tags = props.modelValue

  tags.splice(index, 1)

  emit('update:modelValue', tags)
}
</script>

<template>
  <div class="tags-field">
    <label v-if="props.label">{{ props.label }}</label>
    <cf-outlined-button
      color="blue"
      :disabled="props.disabled"
      @click="toggled = true"
      v-if="!toggled"
    >
      {{ props.buttonText }}
    </cf-outlined-button>
    <cf-field
      v-model="tag"
      type="text"
      :prefix="props.prefix"
      @keydown.enter="addTag"
      v-else
    />
    <div class="tags-field__tags">
      <cf-tag
        v-for="(tag, index) in props.modelValue"
        :key="tag"
        :removable="!props.disabled"
        @remove="removeTag(index)"
      >
        {{ props.prefix }} {{ tag }}
      </cf-tag>
    </div>
    <small v-if="props.helper">{{ props.helper }}</small>
  </div>
</template>

<style lang="scss">
.tags-field {
  label {
    font-size: 0.875rem;
  }

  small {
    font-size: 0.75rem;
  }

  &__tags {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &:not(:empty) {
      margin: 0.5rem 0 0.25rem;
    }
  }
}
</style>