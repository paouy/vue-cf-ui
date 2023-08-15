<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['close'])

const props = defineProps({
  title: String,
  description: String
})

const dialog = ref()

onMounted(() => {
  dialog.value.showModal()

  dialog.value.addEventListener('close', () => emit('close'))
})
</script>

<template>
  <dialog class="cf-dialog" ref="dialog" @keydown.esc.prevent>
    <div class="cf-dialog-header">
      <div class="cf-dialog__title">{{ props.title }}</div>
      <div v-if="props.description">{{ props.description }}</div>
    </div>
    <div class="cf-dialog-body">
      <slot name="body"></slot>
    </div>
    <div class="cf-dialog-footer">
      <slot name="footer"></slot>
    </div>
    <button class="cf-dialog-close" @click="emit('close')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
        <path d="M14.34 13.605L8.696 8.023l5.582-5.645-.71-.703-5.583 5.644L2.34 1.737l-.703.711L7.282 8.03 1.7 13.675l.71.703 5.583-5.645 5.644 5.583.703-.711z"></path>
      </svg>
    </button>
  </dialog>
</template>

<style lang="scss">
.cf-dialog {
  color: var(--cf-gray-1);
  padding: 0;
  border-radius: 0.125rem;
  width: calc(100% - 3rem);
  max-width: 40rem;
  box-shadow: rgb(0 0 0 / 0.75) 0.125rem 0.25rem 1.25rem 0;
  position: fixed;
  user-select: none;

  &-close {
    display: grid;
    place-content: center;
    height: 1.5rem;
    width: 1.5rem;
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
  }

  &-header {
    display: grid;
    gap: 0.5rem;
    padding: 1rem 3rem 0 2rem;
  }

  &__title {
    font-size: 1.5rem;
    line-height: 1.875rem;
  }

  &-body {
    padding: 1rem 2rem 2rem;
  }

  &-footer {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    gap: 0.5rem;
    background: var(--cf-gray-8);

    &:not(:empty) {
      padding: 1rem 2rem;
    }
  }

  &::backdrop {
    background: rgb(0 0 0 / 0.7);
  }
}
</style>