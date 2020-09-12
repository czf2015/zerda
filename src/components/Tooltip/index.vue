<template>
  <div class="wrapper">
    <div @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
      <slot>
        <el-button>Light</el-button>
      </slot>
    </div>
    <div class="tooltip" v-show="isHover">
      <span class="out" />
      <span class="iner" />
      <pre v-html="content" />
    </div>
  </div>
</template>


<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    placement: {
      type: String,
      default: "top",
    },
    effect: {
      type: String,
    },
  },
  data() {
    return {
      isHover: false,
    };
  },
  methods: {
    handleMouseOver() {
      this.isHover = true;
    },
    handleMouseLeave() {
      this.isHover = false;
    },
  },
};
</script>


<style lang="less" scoped>
.wrapper {
  position: relative;
  margin-top: 100px;
  .tooltip {
    position: absolute;
    margin-top: 20px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 9999;
    > span {
      position: absolute;
      left: 15px;
      height: 0px;
      width: 0px;
      &.out {
        top: -20px;
        line-height: 0;
        border-width: 10px;
        border-color: transparent transparent #ccc transparent;
        border-style: dashed dashed solid dashed;
      }
      &.iner {
        top: -19px;
        line-height: 0;
        border-width: 10px;
        border-color: #fff transparent #fff transparent;
        border-style: dashed dashed solid dashed;
      }
    }
    > pre {
      padding: 5px 10px;
    }
  }
}
</style>