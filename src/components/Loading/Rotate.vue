<template>
  <div class="rotate">
    <span></span>
  </div>
</template>


<style lang="less" scoped>
.rotate {
  position: relative;
  width: 80px;
  height: 80px;
  border: 4px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  > span {
    position: absolute;
    width: 80px;
    height: 80px;
    border: 4px solid transparent;
    border-top: 4px solid #fff;
    border-radius: 999px;
    top: -4px;
    left: -4px;
    animation: rotate 1s infinite linear;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>