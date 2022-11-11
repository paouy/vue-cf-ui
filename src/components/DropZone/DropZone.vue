<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['update:modelValue', 'add', 'cancel'])

const props = defineProps({
  modelValue: File,
  label: {
    type: String,
    default: 'Add your file here.'
  },
  max: {
    type: [Number, String],
    default: 0
  },
  accept: String,
  required: Boolean
})

const input = ref(null)

const isRequired = computed(() => {
  return props.required && !props.modelValue ? true : false
})

const readableFileSize = computed(() => {
  if (props.modelValue) {
    const sizeInBytes = props.modelValue.size
    const sizeInMB = (sizeInBytes / 1048576).toFixed(0)
    const sizeInGB = (sizeInMB / 1000).toFixed(1)

    if (sizeInMB < 100) {
      return `${sizeInMB} MB`
    } else {
      return `${sizeInGB} GB`
    }
  } else {
    return '0 MB'
  }
})

const pickFile = (event) => {
  const file = event.target.files[0]

  emitFile(file)
}

const dropFile = (event) => {
  const file = event.dataTransfer.files[0]

  emitFile(file)
}

const emitFile = (file) => {
  const MAX_SIZE = parseInt(props.max) * 1048576

  if (MAX_SIZE && MAX_SIZE < file.size){
    input.value.value = ''
    alert(`File cannot exceed ${props.max} MB`)
  } else {
    emit('update:modelValue', file)
    emit('add', file)
  }
}

const cancelSelection = () => {
  emit('update:modelValue', null)
  emit('cancel')
}
</script>

<template>
  <div class="cf-drop-zone">
    <div class="cf-drop-zone-box"
      @drop.prevent="dropFile"
      @dragenter.prevent
      @dragover.prevent
      @dragleave.prevent
      v-if="!modelValue"
    >
      <div class="cf-drop-zone-box__label">{{ props.label }}</div>
      <label class="cf-drop-zone-box__action">
        Drag and drop or <span>select from device</span>
        <input type="file" ref="input" :required="isRequired" @change="pickFile">
      </label>
      <div class="cf-drop-zone-box__helper" v-if="props.max">
        Files larger than {{ props.max }} MB cannot be uploaded
      </div>
    </div>
    <div class="cf-drop-zone-list" v-else>
      <div class="cf-drop-zone-list__header"></div>
      <div class="cf-drop-zone-list__item">
        <div>{{ props.modelValue.name }}</div>
        <div>{{ readableFileSize }}</div>
        <button @click="cancelSelection">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="12" height="12">
            <path d="M14.34 13.605L8.696 8.023l5.582-5.645-.71-.703-5.583 5.644L2.34 1.737l-.703.711L7.282 8.03 1.7 13.675l.71.703 5.583-5.645 5.644 5.583.703-.711z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cf-drop-zone {
  &-box {
    display: grid;
    place-content: center;
    gap: 1rem;
    border: 1px dashed var(--cf-gray-7);
    width: 100%;
    height: 15.625rem;

    &__label {
      font-weight: 600;
    }

    &__action {
      display: block;
      position: relative;
      cursor: pointer;

      span {
        color: var(--cf-blue-4);
      }

      input {
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
      }
    }

    &__helper {
      font-size: 0.75rem;
    }
  }

  &-list {
    &__header {
      display: grid;
      grid-template-columns: 1fr 5rem 1.5rem;
      gap: 1rem;
      color: var(--cf-gray-3);
      font-size: 0.75rem;
      font-weight: 700;
      margin-bottom: 0.25rem;

      &::before {
        content: 'File name';
      }

      &::after {
        content: 'Size';
        text-align: center;
      }
    }

    &__item {
      display: grid;
      grid-template-columns: 1fr 5rem 1.5rem;
      align-items: center;
      gap: 1rem;
      font-family: monospace;

      :first-child {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      :nth-child(2) {
        text-align: center;
      }

      button {
        display: grid;
        place-content: center;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
}
</style>