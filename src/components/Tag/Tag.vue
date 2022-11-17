<script setup>
const emit = defineEmits(['remove'])

const props = defineProps({
  removable: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="cf-tag">
    <span>
      <slot></slot>
    </span>
    <button v-if="props.removable" @click="emit('remove')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
        <path d="M14.34 13.605L8.696 8.023l5.582-5.645-.71-.703-5.583 5.644L2.34 1.737l-.703.711L7.282 8.03 1.7 13.675l.71.703 5.583-5.645 5.644 5.583.703-.711z"></path>
      </svg>
    </button>
  </div>
</template>

<style lang="scss">
.cf-tag {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  border: 1px solid var(--cf-gray-7);
  border-radius: 0.3125rem;
  padding: 0 0.5rem;
  width: fit-content;
  height: 1.9375rem;
  transition: border-color 120ms ease-out 0s;
  cursor: pointer;

  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 12rem;
    overflow: hidden;
  }

  button {
    display: flex;
    margin-left: 0.5rem;

    svg {
      fill: var(--cf-gray-4);
    }
  }

  &:hover {
    border-color: var(--cf-gray-4);
  }
}
</style>