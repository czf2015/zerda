<template>
  <main class="main" v-show="!loading" :style="{margin}">
    <SkinSelect class="top-right" />
    <draggable
      v-bind="dragOptions"
      tag="div"
      class="item-container"
      :list="list"
      @input="emitter"
      group="targets"
    >
      <transition-group type="transition" name="flip-list" class="drop-area-inner">
        <component
          v-for="(data, idx) in list"
          :key="data.id"
          :is="data.type"
          :initial="data"
          @up="handleUp(idx)"
          @down="handleDown(idx)"
          @del="handleDel(idx)"
          :moveable="moveable(idx)"
        />
      </transition-group>
    </draggable>
    <Affix :pos="{ top: '42%', right: '16px' }">
      <i class="right-center-btn" @click="show = !show" :class="{ active: show }" />
      <div class="list" v-show="show" :style="{ top }">
        <draggable
          v-bind="dragOptions"
          :list="dragList"
          :sort="false"
          :group="{ name: 'targets', pull: 'clone', put: false }"
        >
          <div v-for="({ title }, idx) in dragList" class="list-item" :key="idx" @mousedown="handleDragCopy(idx)">{{title}}</div>
        </draggable>
      </div>
    </Affix>
    <Affix :pos="{ bottom: '60px', right: '20px' }">
      <SideBar :list="bars" />
    </Affix>
  </main>
</template>


<script>
import draggable from "vuedraggable";
import Container from "@/components/TableForm/Container";
import Panel from "@/components/TableForm/Panel";
import Affix from "@/components/Affix";
import SideBar from "@/components/SideBar";
import SkinSelect from "@/components/SkinSelect";
import { isDev } from '@/config/env'
import request from '@/utils/request'

export default {
  components: {
    draggable,
    Container,
    Panel,
    Affix,
    SkinSelect,
    SideBar,
  },

  props: {
    margin: {
      type: String,
    },
    top: {
      type: String,
    }
  },
  
  data() {
    return {
      loading: true,
      dragOptions: {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      },
      list: [],
      dragList: [],
      bars: [
        {
          link: "wwww.baidu.com",
          icon: '/svg/save.svg',
          text: "保存",
        },
        {
          link: "wwww.baidu.com",
          icon: '/svg/view.svg',
          text: "预览",
        },
        {
          link: "wwww.baidu.com",
          icon: '/svg/publish.svg',
          text: "发布",
        },
      ],
      show: false,
    };
  },
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
    fetchData(page) {
      this.loading = true;
      // Todo
      const api = isDev ? `/data/${page}/index.json` : `/api?name=${page}`
      request(api)
        .then(({ data }) => {
          this.list = data
          this.dragList = JSON.parse(JSON.stringify(data))
          this.loading = false;
        });
    },
    handleUp(idx) {
      if (this.value) {
        this.value.splice(idx - 1, 2, this.value[idx], this.value[idx - 1]);
      } else {
        this.list.splice(idx - 1, 2, this.list[idx], this.list[idx - 1]);
      }
    },
    handleDown(idx) {
      if (this.value) {
        this.value.splice(idx, 2, this.value[idx + 1], this.value[idx]);
      } else {
        this.list.splice(idx, 2, this.list[idx + 1], this.list[idx]);
      }
    },
    handleDel(idx) {
      if (confirm("确定删除？")) {
        if (this.value) {
          this.value.splice(idx, 1);
        } else {
          this.list.splice(idx, 1);
        }
      }
    },
    moveable(idx) {
      return idx == 0
        ? "down"
        : idx == this.list.length - 1
        ? "up"
        : "updown";
    },
    handleDragCopy(idx) {
      const ids = this.list.map(item => item.id)
      this.dragList[idx] = { ...this.dragList[idx], id: `${Math.max(...ids) + 1}` }
    }
  },
  mounted() {
    this.fetchData(this.$route.name);
  },
};
</script>

<style lang="less" scoped>
.main {
  // width: 84%;
  position: relative;
  min-height: 85vh;
  .top-right {
    position: absolute;
    top: -100px;
    right: 40px;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .item-container {
    >.drop-area-inner {
      display: block;
      min-height: 84vh;
      >* {
        padding: 10px 0 0 10px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
      >:active {
        cursor: move;
      }
    }
  }
  .right-center-btn {
    display: inline-block;
    width: 24px;
    height: 24px;
    // line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: #409eff;
    border-radius: 50%;
    background-image: url(/svg/conf.svg);
    background-size: 60% 60%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    transition: 200ms;
    &.active {
      transform: rotate(45deg);
    }
  }
  .list {
    position: absolute;
    top: -60px;
    right: 24px;
    .list-item {
      width: 120px;
      text-align: center;
      line-height: 2;
      color: #409eff;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: #bfbfbf;
        cursor: move;
      }
    }
  }
}
</style>
