<script setup>
const props = defineProps({
  title: String,
  simple: Boolean
})
</script>

<template>
  <div class="cf-action-card" v-if="!props.simple">
    <div class="cf-action-card__body">
      <div class="cf-action-card__title">
        {{ props.title }}
      </div>
      <div class="cf-action-card__body__slot">
        <slot name="body"></slot>
      </div>
    </div>
    <div class="cf-action-card__action">
      <slot name="action"></slot>
    </div>
  </div>

  <div class="cf-simple-action-card" v-else>
    <div>
      <slot name="body"></slot>
    </div>
    <div>
      <slot name="action"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.cf-simple-action-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border: 1px solid var(--cf-gray-7);
  border-radius: 0.3125rem;
  margin: 1rem 0;
}

.cf-action-card {
  border: 1px solid var(--cf-gray-7);
  border-radius: 0.3125rem;
  margin: 1rem 0;
  overflow: hidden;

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  &__body {
    padding: 1rem;
    border-bottom: 1px solid var(--cf-gray-7);
  }

  &__action {
    display: grid;
    place-content: center;
    padding: 2rem;
    background: var(--cf-gray-9);
  }
}

@media (min-width: 755px) {
  .cf-action-card {
    display: grid;
    grid-template-columns: 7fr 3fr;

    &__body {
      padding: 2rem;
      border-right: 1px solid var(--cf-gray-7);
      border-bottom: none;
    }
  }
}
</style>