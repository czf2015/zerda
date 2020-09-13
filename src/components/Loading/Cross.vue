<template>
  <div class="cross">
    <span></span>
    <span></span>
  </div>
</template>


<style lang="less" scoped>
.cross {
  position: relative;
  & > span {
    position: absolute;
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 999px;
    &:nth-child(1) {
      animation: cross-1 1.5s infinite linear;
    }
    &:nth-child(2) {
      animation: cross-2 1.5s infinite linear;
    }
  }
  @keyframes cross-1 {
    0% {
      transform: translateX(0);
      opacity: 0.5;
    }
    50% {
      transform: translateX(80px);
      opacity: 1;
    }
    100% {
      transform: translateX(0);
      opacity: 0.5;
    }
  }
  @keyframes cross-2 {
    0% {
      transform: translateX(80px);
      opacity: 0.5;
    }
    50% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(80px);
      opacity: 0.5;
    }
  }
}
</style>