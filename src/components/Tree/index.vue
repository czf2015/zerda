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
export default {
  // Todo: 控制可拖拽区域
  props: {
    tree: {
      // type: Object | Array,
      required: true,
    },
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
  },
  data() {
    return {
      filterText: "",
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
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
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
      const newChild = {
        id: new Date().getTime(),
        label: prompt(`菜单项:`) || 'new',
        children: [],
      };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    modify(node, data) {
      // console.log(data)
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      data.label = prompt(`菜单项:`) || data.label;
      children.splice(index, 1, data);
    },
    remove(node, data) {
      if (confirm(`确认删除菜单项  "${data.label}"`)) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex((d) => d.id === data.id);
        children.splice(index, 1);
      }
    },
    handleCheck() {
      console.log("check");
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
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
</style>