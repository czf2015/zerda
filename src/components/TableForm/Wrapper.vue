<template>
  <div class="wrapper" @mouseover="hover = true" @mouseleave="hover = false">
    <span v-show="hover" class="top-right">
      <i class="icon_up" @click="$emit('up')" v-show="moveable != 'down'" />
      <i class="icon_down" @click="$emit('down')" v-show="moveable != 'up'" />
      <i class="icon_close" @click="$emit('del')" />
    </span>
    <h3 class="title" @mouseover="editable = true" @mouseleave="editable = false">
      <input type="text" v-if="editable" :value="title" @change="handleChange" maxlength="10" />
      <span v-else>{{title}}</span>
    </h3>
    <slot />
  </div>
</template>


<script>
export default {
  name: "Wrapper",
  props: {
    moveable: {
      type: String,
      default: "updown",
    },
    title: {
      type: String,
      default: "标题",
    },
  },
  data() {
    return {
      editable: false,
      hover: false,
    };
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e.target.value);
    },
  },
};
</script>


<style lang="less" scoped>
.wrapper {
  position: relative;
  margin: 40px 40px;
  > .top-right {
    position: absolute;
    top: 24px;
    right: 0;
    > .icon_up,
    > .icon_down,
    > .icon_close {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-size: cover;
    }
    > .icon_up {
      background-image: url(/svg/up.svg);
      &:hover {
        background-image: url(/svg/up-active.svg);
      }
    }
    > .icon_down {
      background-image: url(/svg/down.svg);
      &:hover {
        background-image: url(/svg/down-active.svg);
      }
    }
    > .icon_close {
      background-image: url(/svg/close.svg);
      &:hover {
        background-image: url(/svg/close-active.svg);
      }
    }
  }
  > .title {
    padding-left: 10px;
    font-size: 24px;
    line-height: 48px;
    font-weight: bold;
    border-left: 4px solid green;
  }

  > .desc {
    margin: 10px 0;
    line-height: 36px;
    > input[type="text"] {
      min-width: 556px;
    }
  }

  > img {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.5);
  }
}
</style>