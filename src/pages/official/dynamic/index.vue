<template>
  <main class="main" v-if="!loading" :style="{ margin }">
    <Cascader class="top-left" :options="options" @change="goTo" />
    <MetaInfo :meta="meta" @change="handleMetaChange" />
    <draggable
      v-bind="dragOptions"
      tag="div"
      class="item-container"
      :list="list"
      group="targets"
    >
      <transition-group
        type="transition"
        name="flip-list"
        class="drop-area-inner"
      >
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
      <i
        class="right-center-btn"
        @click="show = !show"
        :class="{ active: show }"
      />
      <div class="list" v-show="show" :style="{ top }">
        <draggable
          v-bind="dragOptions"
          :list="dragList"
          :sort="false"
          :group="{ name: 'targets', pull: 'clone', put: false }"
        >
          <div
            v-for="({ title }, idx) in dragList"
            class="list-item"
            :key="idx"
            @mousedown="handleDragCopy(idx)"
          >
            {{ title }}
          </div>
        </draggable>
      </div>
    </Affix>
    <Affix :pos="{ bottom: '60px', right: '20px' }">
      <SideBar :list="bars" @click="handleOperate" />
    </Affix>
  </main>
</template>


<script>
import draggable from "vuedraggable";
import Container from "@/components/TableForm/Container";
import Panel from "@/components/TableForm/Panel";
import Affix from "@/components/Affix";
import SideBar from "@/components/SideBar";
import { DynamicPage, DynamicCategory } from "@/services";
import MetaInfo from "@/components/MetaInfo";
import dragList from "./dragList";
import Cascader from "@/components/Cascader";
import { convert } from "./category/helpers";

export default {
  components: {
    draggable,
    Container,
    Panel,
    Affix,
    SideBar,
    MetaInfo,
    Cascader,
  },

  props: {
    margin: {
      type: String,
    },
    top: {
      type: String,
    },
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
          // link: "wwww.baidu.com",
          icon: "/svg/save.svg",
          text: "保存",
          operate: "save",
        },
        {
          // link: "wwww.baidu.com",
          icon: "/svg/view.svg",
          text: "预览",
          operate: "preview",
        },
        {
          // link: "wwww.baidu.com",
          icon: "/svg/publish.svg",
          text: "发布",
          operate: "publish",
        },
      ],
      show: false,
      rawData: null,
      pageId: "",
      meta: {},
      options: [],
    };
  },

  computed: {
    categoryId() {
      return this.$route.params.categoryId;
    },
  },

  watch: {
    categoryId() {
      this.fetchData(this.categoryId);
    },
  },

  methods: {
    fetchData(categoryId = "1322091185514217474") {
      this.loading = true;
      DynamicPage.query(categoryId).then((res) => {
        if (res.result.pageId) {
          this.loading = false;
          this.pageId = res.result.pageId;
          const content = res.result.content || "{}";
          this.rawData = JSON.parse(content);
          const { data = [], ...meta } = JSON.parse(content);
          this.meta = meta;
          this.list = data;
          this.dragList = dragList;
        }
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
      return idx == 0 ? "down" : idx == this.list.length - 1 ? "up" : "updown";
    },
    handleDragCopy(idx) {
      const ids = this.list.map((item) => item.id);
      this.dragList[idx] = {
        ...this.dragList[idx],
        id: `${Math.max(...ids) + 1}`,
      };
    },
    handleOperate(operate) {
      switch (operate) {
        case "save":
          const data = { ...this.meta, data: this.list };
          DynamicPage.update({
            pageId: this.pageId,
            content: JSON.stringify(data),
          });
          break;
        case "preview":
          break;
        case "publish":
          break;
        default:
          break;
      }
    },
    handleMetaChange(meta) {
      // console.log(formData)
      this.meta = meta;
    },
    goTo(categoryIds = []) {
      const categoryId = categoryIds.slice(-1)[0];
      if (categoryId && categoryId !== this.categoryId) {
        location.href = `/official/dynamic/content/${categoryId}`;
      }
    },
  },
  mounted() {
    this.fetchData(this.categoryId);
    DynamicCategory.query().then((res) => {
      this.options = convert(res.result);
    });
  },
};
</script>

<style lang="less" scoped>
.main {
  // width: 84%;
  position: relative;
  min-height: 85vh;
  .top-left {
    position: absolute;
    top: -100px;
    left: 40px;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .item-container {
    > .drop-area-inner {
      display: block;
      min-height: 84vh;
      > * {
        padding: 10px 0 0 10px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
      > :active {
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
