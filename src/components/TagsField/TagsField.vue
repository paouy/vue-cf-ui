<script setup>
import { ref } from 'vue'
import CfField from '../Field/Field.vue'
import CfOutlinedButton from '../Button/OutlinedButton.vue';
import CfTag from '../Tag/Tag.vue'

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
  if (!tag.value) {
    return false
  }

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
  <div class="cf-tags-field">
    <label v-if="props.label">{{ props.label }}</label>
    <div class="cf-tags-field__input">
      <cf-field
        v-model="tag"
        type="text"
        :prefix="props.prefix"
        @keydown.enter="addTag"
        v-if="toggled"
      />
      <cf-outlined-button color="blue" @click="toggled = true" v-else>{{ props.buttonText }}</cf-outlined-button>
    </div>
    <div class="cf-tags-field__tags">
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
.cf-tags-field {
  display: grid;

  label {
    font-size: 0.875rem;
  }

  small {
    font-size: 0.75rem;
  }

  &__input {
    margin: 0.25rem 0;
    min-height: 2.125rem;
  }

  &__tags {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-wrap: wrap;
    
    &:not(:empty) {
      margin: 0.25rem 0;
    }
  }
}
</style>