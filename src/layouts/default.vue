<template>
  <main class="main" v-show="!loading" :style="{margin}">
    <SkinSelect class="top-right" />
    <draggable
      v-bind="dragOptions"
      tag="div"
      class="item-container"
      :list="list"
      :value="value"
      @input="emitter"
    >
      <component v-for="(data) in currentValue" :key="data.id" :is="data.type" :initial="data" />
    </draggable>
    <Affix :pos="{ top: '42%', right: '20px' }">
      <div class="right-center-btn">悬浮</div>
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
import SkinSelect from "@/components/Select";

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
      value: null,
      bars: [
        {
          link: "wwww.baidu.com",
          // icon: 'https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=3997521572,425720479&fm=74&app=80&f=JPEG&size=f121,90?sec=1880279984&t=24d78aa497d23ca09084ff40ac52bde0',
          text: "保存",
        },
        {
          link: "wwww.baidu.com",
          // icon: 'https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=3997521572,425720479&fm=74&app=80&f=JPEG&size=f121,90?sec=1880279984&t=24d78aa497d23ca09084ff40ac52bde0',
          text: "预览",
        },
        {
          link: "wwww.baidu.com",
          // icon: 'https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=3997521572,425720479&fm=74&app=80&f=JPEG&size=f121,90?sec=1880279984&t=24d78aa497d23ca09084ff40ac52bde0',
          text: "发布",
        },
      ],
    };
  },
  computed: {
    currentValue() {
      return this.value ? this.value : this.list;
    },
  },
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
    fetchData(page) {
      this.loading = true;
      fetch(`/data/${page}/index.json`)
        .then((res) => res.json())
        .then((data) => {
          this.list = data;
          this.loading = false;
        });
    },
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
  .item-container {
    cursor: ns-resize;
  }
  .right-center-btn {
    width: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background: #66b1ff;
    border-radius: 50%;
  }
}
</style>
