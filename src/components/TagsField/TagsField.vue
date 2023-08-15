<script setup>
import { ref, computed } from 'vue'
import Input from '../FormControls/Input.vue'
import Select from '../FormControls/Select.vue'
import OutlinedButton from '../Button/OutlinedButton.vue'
import Tag from '../Tag/Tag.vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: Array,
  label: String,
  buttonText: {
    type: String,
    default: 'Add'
  },
  prefix: String,
  options: Array,
  helper: String,
  disabled: Boolean,
  required: Boolean
})

const toggled = ref(false)

const tag = ref('')

const options = computed(() => {
  return props.options?.map(option => ({
    label: option.label || option,
    value: option.value || option
  }))
})

const allowedOptions = computed(() => options.value?.filter(
  option => !props.modelValue.includes(option.value)
))

const getTagLabel = (tag) => {
  return options.value.find(option => option.value === tag).label
}

const addTag = () => {
  if (!tag.value || props.disabled) {
    return false
  }

  const tags = props.modelValue

  tags.push(tag.value)

  emit('update:modelValue', tags)

  tag.value = ''
  toggled.value = false
}

const removeTag = (index) => {
  if (props.disabled) {
    return false
  }

  const tags = props.modelValue

  tags.splice(index, 1)

  emit('update:modelValue', tags)
}
</script>

<template>
  <div class="cf-tags-field" :inert="props.disabled">
    <label v-if="props.label">{{ props.label }}</label>
    <div class="cf-tags-field__input">
      <Input
        v-model="tag"
        :prefix="props.prefix"
        @keydown.enter="addTag"
        @change="addTag"
        required
        v-if="!props.options && toggled"
      />
      <Select
        v-model="tag"
        :options="allowedOptions"
        @keydown.enter="addTag"
        @change="addTag"
        required
        v-if="props.options && toggled"
      />
      <OutlinedButton
        color="blue"
        @click="toggled = true"
        v-if="!toggled"
      >
        {{ props.buttonText }}
      </OutlinedButton>
      <input
        class="cf-tags-field__input__faux"
        type="text"
        :required="props.required && !props.modelValue.length"
      >
    </div>
    <div class="cf-tags-field__tags">
      <Tag
        v-for="(tag, index) in props.modelValue"
        :key="tag"
        @remove="removeTag(index)"
      >
        {{ props.prefix }} {{ props.options ? getTagLabel(tag) : tag }}
      </Tag>
    </div>
    <small v-if="props.helper">{{ props.helper }}</small>
  </div>
</template>

<style lang="scss">
.cf-tags-field {
  display: grid;
  height: fit-content;

  &[inert] {
    opacity: 0.5;
    pointer-events: none;
  }

  label {
    font-size: 0.875rem;
  }

  small {
    font-size: 0.75rem;
  }

  &__input {
    margin: 0.25rem 0;
    min-height: 2.125rem;
    position: relative;

    &__faux {
      opacity: 0;
      width: 1px;
      height: 1px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
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

[inert] .cf-tags-field,
[disabled] .cf-tags-field {
  opacity: 0.5;
}
</style>