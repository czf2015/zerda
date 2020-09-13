<template>
  <div class="ripple">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>


<style lang="less" scoped>
.ripple {
  position: relative;
  & > span {
    position: absolute;
    width: 50px;
    height: 50px;
    border: 5px solid #fff;
    border-radius: 999px;
    opacity: 0;
    animation: ripple 2s infinite linear;
    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.66s;
    }
    &:nth-child(3) {
      animation-delay: 1.33s;
    }
  }
  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    25% {
      transform: scale(0);
      opacity: 0.5;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    75% {
      transform: scale(1.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
}
</style>