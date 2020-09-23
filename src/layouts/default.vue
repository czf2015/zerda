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
      group="targets"
    >
      <transition-group type="transition" name="flip-list" class="drop-area-inner">
        <component
          v-for="(data, idx) in currentValue"
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
    <Affix :pos="{ top: '42%', right: '20px' }">
      <div class="right-center-btn" @click="show = !show">添加</div>
      <div class="list" v-show="show" :style="{ top }">
        <draggable
          v-bind="dragOptions"
          :list="dragList"
          :sort="false"
          :group="{ name: 'targets', pull: 'clone', put: false }"
        >
          <div v-for="({ id, title }) in dragList" class="list-item" :key="id">{{title}}</div>
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
      show: false,
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
      // fetch(`/api?name=${page}`)
        .then((res) => res.json())
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
        : idx == this.currentValue.length - 1
        ? "up"
        : "updown";
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
    }
  }
  .item-container:active {
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
  .list {
    position: absolute;
    top: -60px;
    right: 50px;
    .list-item {
      width: 120px;
      text-align: center;
      line-height: 2;
      color: green;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }
}
</style>
