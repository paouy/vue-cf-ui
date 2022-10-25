<template>
  <div class="cf-spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style lang="scss">
.cf-spinner {
  width: 2rem;
  height: 2rem;

  div {
    border: 3px solid;
    border-radius: 100%;
    border-color: #92979b transparent transparent transparent;
    width: 2rem;
    height: 2rem;
    animation: cf-spinner 2.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    position: absolute;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }

  @keyframes cf-spinner {
    0% {
    transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
  }
}
</style>