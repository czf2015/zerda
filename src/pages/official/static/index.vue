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
import { StaticPage, StaticCategory } from "@/services";
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
      StaticPage.query(categoryId).then((res) => {
        if (res.result.pageId) {
          this.loading = false;
          this.pageId = res.result.pageId;
          const content = res.result.content || "{}";
          this.rawData = JSON.parse(content);
          const { data = dragList, ...meta } = JSON.parse(content);
          this.meta = meta;
          this.list = data;
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
    handleOperate(operate) {
      switch (operate) {
        case "save":
          const data = { ...this.meta, data: this.list };
          StaticPage.update({
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
      this.meta = meta;
    },
    goTo(categoryIds = []) {
      const categoryId = categoryIds.slice(-1)[0];
      if (categoryId && categoryId !== this.categoryId) {
        this.$router.push(`/official/static/content/${categoryId}`);
      }
    },
  },
    mounted() {
      this.fetchData(this.categoryId);
      StaticCategory.query().then((res) => {
        this.options = convert(res.result);
      });
    },
};
</script>

<style lang="less" scoped>
.main {
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
}
</style>
