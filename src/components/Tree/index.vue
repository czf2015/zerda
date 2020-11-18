<template>
  <div class="tree">
    <el-input
      v-if="filter"
      placeholder="输入关键字进行过滤"
      v-model="filterText"
    />
    <el-tree
      :node-key="nodeKey"
      ref="tree"
      :data="tree"
      :props="defaultProps"
      :default-expand-all="expand"
      :accordion="accordion"
      :draggable="draggable"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      @check="handleCheck"
      @node-click="handleNodeClick"
      @node-contextmenu="handleNodeContextmenu"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      :render-content="renderContent"
      :show-checkbox="showCheckbox"
      :indent="indent"
      :lazy="lazy"
      :highlight-current="highlight"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { tree } from "@/mock/tree";

export default {
  // Todo: 控制可拖拽区域
  name: "Tree",
  props: {
    nodeKey: {
      type: String,
      required: true,
    },
    defaultProps: {
      type: Object,
    },
    accordion: {
      type: Boolean,
    },
    draggable: {
      type: Boolean,
    },
    filter: {
      type: Boolean,
    },
    showCheckbox: {
      type: Boolean,
    },
    indent: {
      type: Number,
      default: 16,
    },
    lazy: {
      type: Boolean,
    },
    highlight: {
      type: Boolean,
      default: true,
    },
    expand: {
      type: Boolean,
    },
    tree: {
      type: Array,
      default: () => tree,
    },
  },
  data() {
    return {
      filterText: "",
      currIdx: -1,
    };
  },
  methods: {
    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    handleNodeClick(data, node, self)  {
      console.log({ data, node, self })
    },
    handleNodeContextmenu(event, data, node, self) {
      console.log({event, data, node, self})
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 2-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return true; // draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    append(data) {
      this.$prompt("添加子菜单：", `父级——${data.label}`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\S{1,20}$/,
        inputErrorMessage: "格式不正确",
      })
        .then(({ value }) => {
          if (!data.children) {
            this.$set(data, "children", []);
          }
          data.children.push({
            id: new Date().getTime(),
            label: value || "new",
            children: [],
          });
          this.$message({
            type: "success",
            message: "添加成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    modify(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      this.$prompt("修改为：", `菜单——${data.label}`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\S{1,20}$/,
        inputErrorMessage: "格式不正确",
      })
        .then(({ value }) => {
          data.label = value;
          children.splice(index, 1, data);
          this.$message({
            type: "success",
            message: "修改成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    remove(node, data) {
      this.$confirm(`菜单项——${data.label}`, "是否删除？", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex((d) => d.id === data.id);
          children.splice(index, 1);
          this.$message({
            type: "info",
            message: "删除成功",
          });
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "取消删除" : "关闭窗口",
          });
        });
    },
    handleCheck() {
      console.log("check");
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <i
            class={node.isLeaf ? "el-icon-document" : "el-icon-folder-opened"}
            style="marginRight: 5px"
          />
          <span>{node.label}</span>
          <span class="tree-node-operate">
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
              style="color: green"
            >
              增添
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
              style="color: red"
            >
              删除
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.modify(node, data)}
            >
              修改
            </el-button>
          </span>
        </span>
      );
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
};
</script>


<style lang="less" scoped>
.tree {
  position: relative;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.5);
    .dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 auto;
      min-width: 720px;
      max-width: 960px;
      background-color: #fff;
    }
  }
}
</style>