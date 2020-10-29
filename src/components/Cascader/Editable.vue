<template>
  <div class="cascader-wrapper">
    <!-- 头部按钮 -->
    <el-row class="top">
      <el-button
        v-for="(item, idx) in topList"
        :key="idx"
        class="top-btn"
        :icon="getIcon(idx)"
        @click="handleAddMenu(item, idx)"
      />
    </el-row>
    <!-- 级联面板 -->
    <el-cascader-panel
      ref="cascader"
      :props="{ expandTrigger, multiple, lazy, lazyLoad }"
      :options="list"
      @change="handleChange"
      :value="value"
      @expand-change="handleExpandChange"
    >
      <template slot-scope="{ node, data }">
        <p class="menu-item" @contextmenu="handleContextMenu(node, $event)">
          <span>{{ data.label }}</span>
          <!-- <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span> -->
        </p>
      </template>
    </el-cascader-panel>
    <!-- 右键菜单 -->
    <CustomContextmenu
      :show="showContextmenu"
      :pos="pos"
      :menus="contextmenu"
      @context="handleContextmenu"
    />
    <!-- 编辑弹窗 -->
    <div class="mask" v-if="openDialog">
      <CustomForm
        class="dialog"
        :datasource="state == 'appending' ? formData : formData.filter(filter)"
        :legend="legend"
        :width="width"
        @save="handleFormSave"
        @cancel="handleFormCancel"
      />
    </div>
  </div>
</template>


<script>
import CustomContextmenu from "./Contextmenu";
import { contextmenu, formData } from "./helpers";
import CustomForm from "@/components/Form";

export default {
  components: {
    CustomContextmenu,
    CustomForm,
  },

  props: {
    options: {
      type: Array,
      required: true,
    },
    expandTrigger: {
      type: String,
      default: "click",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    lazyLoad: {
      type: Function,
      default: () => {},
    },
    width: {
      type: String,
    },
    filter: {
      type: Function,
      default: () => true,
    },
  },

  data() {
    return {
      list: this.options,
      pos: {
        top: 0,
        left: 0,
      },
      showContextmenu: false,
      expand: [],
      value: [],
      node: null,
      contextmenu,
      openDialog: false,
      legend: "请填写内容",
      formData /* : [] */,
      isRevised: false,
      state: "saved",
    };
  },

  computed: {
    topList() {
      return ["root", ...this.expand];
    },
  },

  methods: {
    handleChange(value) {
      this.showContextmenu = false;
      this.value = value;
    },
    handleExpandChange(expand) {
      this.showContextmenu = false;
      this.expand = expand;
    },
    handleContextMenu(node, event) {
      console.log(node);
      console.log(event);
      this.node = node;
      this.pos = { left: `${event.clientX}px`, top: `${event.clientY}px` };
      this.showContextmenu = true;
    },
    handleContextmenu(value) {
      switch (value) {
        case "update":
          break;
        case "delete":
          break;
        default:
          break;
      }
    },
    handleFormSave(formData) {
      this.openDialog = false;
      if (this.isRevised) {
        this.$emit("save", formData);
        this.isRevised = false;
      } else {
        this.$emit("append", formData);
      }
      this.state = "saved";
    },
    handleFormCancel() {
      this.openDialog = false;
      this.isRevised = false;
    },
    handleAddMenu(item, level) {
      //   alert(item);
      //   alert(level);
      this.openDialog = true;
    },
    getIcon(level) {
      const type = level < 2 ? "folder" : "document";
      return `el-icon-${type}-add`;
    },
  },
  mounted() {
    document.querySelector(".cascader-wrapper").oncontextmenu = (e) => {
      e.preventDefault();
    };
  },
};
</script>


<style lang="less" scoped>
.top {
  & > .top-btn {
    margin-left: 55px;
    margin-right: 65px;
  }
}

.menu-item {
  width: 100%;
}

.mask {
  position: fixed;
  left: 20vw;
  top: 20vh;
  //   width: 480px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #222;
  z-index: 99;
}
</style>