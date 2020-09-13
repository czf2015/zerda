<template>
  <div class="bounce">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style lang="less" scoped>
.bounce {
  position: relative;
  & > span {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background: #fff;
    animation: bounce 1s infinite linear;
    &:nth-child(1) {
      left: 0;
      animation-delay: 0s;
    }
    &:nth-child(2) {
      left: 20px;
      animation-delay: 0.25s;
    }
    &:nth-child(3) {
      left: 40px;
      animation-delay: 0.5s;
    }
    &:nth-child(4) {
      left: 60px;
      animation-delay: 0.75s;
    }
    &:nth-child(5) {
      left: 80px;
      animation-delay: 1s;
    }
  }

  @keyframes bounce {
    0% {
      transform: translateY(0px);
      opacity: 0.5;
    }
    50% {
      transform: translateY(-30px);
      opacity: 1;
    }
    100% {
      transform: translateY(0px);
      opacity: 0.5;
    }
  }
}
</style>

