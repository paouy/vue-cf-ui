<script setup>
import CfDropdown from '../Dropdown/Dropdown.vue'

const props = defineProps({
  dropdown: Boolean
})
</script>

<template>
  <div class="cf-app-bar-link" v-if="dropdown">
    <cf-dropdown>
      <template v-slot:toggle>
        <div class="cf-app-bar-link__label">
          <slot></slot>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16">
            <path d="M14.15 4.492H1.85l-.354.854 6.15 6.15h.707l6.15-6.15-.353-.854z"></path>
          </svg>
        </div>
      </template>
      <template v-slot:body>
        <slot name="dropdown"></slot>
      </template>
    </cf-dropdown>
  </div>
  
  <button class="cf-app-bar-link" v-else>
    <div class="cf-app-bar-link__label">
      <slot></slot>
    </div>
  </button>
</template>

<style lang="scss">
.cf-app-bar-link {
  flex-shrink: 0;

  &__label {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.9375rem;
    line-height: 1rem;
    padding: 0 1rem;
    background-color: #fff;
    height: calc(3.875rem - 1px);
    transition: background-color 0.15s ease 0s;
    cursor: pointer;

    svg {
      fill: var(--cf-gray-3);
    }

    &:hover:not(:active) {
      background-color: var(--cf-gray-9);
    }
  }
}

@media (hover: none) and (pointer: coarse) {
  .cf-app-bar-link__label {
    &:hover:not(:active) {
      background-color: #fff;
    }

    &:active {
      background-color: var(--cf-gray-9);
    }
  }
}
</style>