<template>
  <div class="spin">
    <span></span>
    <span></span>
  </div>
</template>

<style lang="less" scoped>
.spin {
  position: relative;
  & > span {
    position: absolute;
    border: 8px solid #fff;
    border-top: 8px solid transparent;
    border-radius: 999px;
    &:nth-child(1) {
      width: 80px;
      height: 80px;
      animation: spin-1 2s infinite linear;
    }
    &:nth-child(2) {
      top: 20px;
      left: 20px;
      width: 40px;
      height: 40px;
      animation: spin-2 1s infinite linear;
    }
  }

  @keyframes spin-1 {
    0% {
      transform: rotate(360deg);
      opacity: 1;
    }
    50% {
      transform: rotate(180deg);
      opacity: 0.5;
    }
    100% {
      transform: rotate(0deg);
      opacity: 0;
    }
  }

  @keyframes spin-2 {
    0% {
      transform: rotate(0deg);
      opacity: 0.5;
    }
    50% {
      transform: rotate(180deg);
      opacity: 1;
    }
    100% {
      transform: rotate(360deg);
      opacity: 0.5;
    }
  }
}
</style>