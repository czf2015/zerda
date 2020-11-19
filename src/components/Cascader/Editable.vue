<template>
  <div class="cascader-wrapper">
    <h4 class="header">{{ title }}</h4>
    <!-- 头部按钮 -->
    <el-row class="top">
      <el-button
        v-for="(item, idx) in topList"
        :key="idx"
        class="top-btn"
        :icon="getIcon(idx)"
        @click="handleAddMenu(idx)"
      />
    </el-row>
    <!-- 级联面板 -->
    <el-cascader-panel
      class="panel"
      ref="cascader"
      :props="{ expandTrigger, multiple, lazy, lazyLoad }"
      :options="options"
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
      :menus="menus"
      @operate="handleOperate"
    />
    <!-- 编辑弹窗 -->
    <div class="mask" v-if="openDialog">
      <div class="dialog">
        <i class="close-icon" @click="openDialog = false" />
        <CustomForm
          :datasource="
            state == 'appending' ? formData : formData.filter(filter)
          "
          :width="width"
          @save="handleFormSave"
          @cancel="handleFormCancel"
        />
      </div>
    </div>
  </div>
</template>


<script>
import CustomForm from "@/components/Form";
import CustomContextmenu from "@/components/Contextmenu";
import { contextmenu, convertToFormData } from "./helpers";

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
    title: {
      type: String,
      default: "配置菜单",
    },
    contextmenu: {
      type: Array,
      default: () => contextmenu,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      pos: {
        top: 0,
        left: 0,
      },
      showContextmenu: false,
      expand: [],
      value: [],
      node: null,
      openDialog: false,
      isRevised: false,
      state: "saved",
      level: 0,
      hasChildren: false,
    };
  },

  computed: {
    topList() {
      return ["root", ...this.expand];
    },
    menus() {
      return this.hasChildren
        ? this.contextmenu.filter((item) => item.value !== "delete")
        : this.contextmenu;
    },
  },

  methods: {
    handleChange(value) {
      this.showContextmenu = false;
      this.value = value;
      this.$emit("change", value);
    },
    handleExpandChange(expand) {
      this.showContextmenu = false;
      this.expand = expand;
      console.log(expand);
    },
    handleContextMenu(node, event) {
      this.node = node;
      this.pos = { left: `${event.clientX}px`, top: `${event.clientY}px` };
      this.showContextmenu = true;
      console.log(node);
      this.hasChildren = node.hasChildren && node.children.length > 0;
    },
    handleOperate(value) {
      this.showContextmenu = false;
      switch (value) {
        case "update":
          this.isRevised = true;
          this.formData = convertToFormData(this.columns, this.node.data);
          this.openDialog = true;
          break;
        case "delete":
          this.$emit("delete", this.node);
          if (this.node.hasChildren) {
              this.expand.pop()
          }
          break;
        default:
          break;
      }
    },
    handleFormSave(formData) {
      this.openDialog = false;
      const data = {};
      formData.forEach(({ field, value }) => {
        data[field] = value;
      });
      if (this.isRevised) {
        Object.assign(this.node.data, data);
        this.$emit("update", this.node.data);
        this.isRevised = false;
      } else {
        const pid = this.level > 0 ? this.expand[this.level - 1] : '0'
        this.$emit("add", { pid, ...data });
      }
      this.state = "saved";
    },
    handleFormCancel() {
      this.openDialog = false;
      this.isRevised = false;
    },
    handleAddMenu(level) {
      this.openDialog = true;
      this.formData = this.columns;
      this.level = level;
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
.header {
  // text-align: center;
  text-indent: 2em;
  line-height: 2;
}
.top {
  & > .top-btn {
    margin-left: 0;
    margin-right: 0;
    padding-left: 83px;
    padding-right: 83px;
    border: none;
    border-radius: 0;
    &:not(:last-child),
    &:first-child {
      border-right: 1px solid #e4e7ed;
    }
    &:first-child {
    }
  }
}

.panel {
  border-top: none;
  /deep/ .el-cascader-menu__wrap {
      min-height: 600px;
  }

}

.menu-item {
  width: 100%;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  > .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-left: 8%;
    padding: 20px;
    width: 640px;
    border-radius: 5px;
    background-color: #fff;
    border-radius: 5px;
    > .close-icon {
      position: absolute;
      top: -12px;
      right: -12px;
      display: inline-block;
      width: 24px;
      height: 24px;
      background-image: url(/svg/close-active.svg);
      background-size: cover;
    }
  }
}
</style>