<template>
  <header class="cf-app-bar">
    <div>
      <slot name="left"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </header>
</template>

<style lang="scss">
.cf-app-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--cf-gray-8);
  padding-left: 4.5rem;
  padding-right: 1rem;
  background: #fff;
  width: 100%;
  height: 3.875rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: var(--z-index-app-bar);

  > div {
    display: flex;

    &:last-child {
      flex-direction: row-reverse;
    }
  }
}

@media (min-width: 880px) {
  .cf-app-bar {
    grid-column: span 2;
    padding-left: 1rem;
  }
}
</style>