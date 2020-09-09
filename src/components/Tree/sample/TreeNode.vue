<template>
  <transition name="slide-up">
    <ul :class="classes">
      <li>
        <div :class="[prefixCls + '-item']">
          <i
            class="sp-icon sp-icon-arrow-right"
            :class="arrowClasses"
            @click.stop="toggleCollapseStatus()"
          ></i>
          <span :class="[prefixCls + '-title-wrap']" ref="dropTarget">
            <span :class="[dragClasses,dragOverClass]" ref="draggAbleDom" v-html="nodeData.title"></span>
          </span>
        </div>
        <Tree-Node
          v-for="item in nodeData.children"
          :key="item.title"
          :node-data="item"
          v-show="nodeData.children.length && nodeData.isExpand"
        ></Tree-Node>
      </li>
    </ul>
  </transition>
</template>


<script>
export default {
  name: "TreeNode",
  components: {},
  props: {
    nodeData: {
      type: Object,
      default() {
        return {
          title: "", //显示的标题
          isExpand: true, //是否展开
          noDrag: false, //此节点禁用拖拽
          noDrop: false, //此节点禁用放置
          children: [] //子项
        };
      }
    }
  },
  data() {
    return {
      prefixCls: "sp-tree",
      dragOverClass: "",
      root: null,
      parentNodeData: {},
      dragNodeHighlight: false //拖拽元素是否高亮
    };
  },
  computed: {
    classes() {
      return [this.prefixCls + "-node"];
    },
    arrowClasses() {
      return [
        this.prefixCls + "-arrow",
        {
          [this.prefixCls + "-arrow-open"]: this.nodeData.isExpand,
          [this.prefixCls + "-arrow-hidden"]: !(
            this.nodeData.children && this.nodeData.children.length
          )
        }
      ];
    },
    dragClasses() {
      return [
        this.prefixCls + "-node-title",
        {
          ["tree-draggable"]: this.root.draggable && !this.nodeData.noDrag,
          ["tree-drag-selected"]: this.dragNodeHighlight,
          ["tree-drag-disabled"]: this.nodeData.noDrag, //禁用该节点的拖拽
          ["tree-drop-disabled"]: this.nodeData.noDrop //该节点禁用放置
        }
      ];
    }
  },
  created() {
    const parent = this.$parent;
    if (parent.isTree) {
      this.root = parent;
    } else {
      this.root = parent.root;
    }
    this.parentNodeData = parent.nodeData;
    this.init();
  },
  mounted() {
    //绑定拖拽事件
    if (this.root.draggable) {
      this.$refs.draggAbleDom.draggable = !this.nodeData.noDrag;
      this.$refs.draggAbleDom.ondragstart = this.onDragStart;
      this.$refs.draggAbleDom.ondragend = this.onDragEnd;
      this.$refs.dropTarget.ondragenter = this.onDragEnter;
      this.$refs.dropTarget.ondragover = this.onDragOver;
      this.$refs.dropTarget.ondragleave = this.onDragLeave;
      this.$refs.dropTarget.ondrop = this.onDrop;
    }
  },
  methods: {
    init() {
      this.nodeData._hash = this.generateHash();
      this.setInitNodeValue();
    },
    setInitNodeValue() {
      this.setPropValue("isExpand", this.nodeData, true);
      this.setPropValue("noDrag", this.nodeData, false);
      this.setPropValue("noDrop", this.nodeData, false);
    },
    //设置默认值
    setPropValue(prop, Obj, initValue) {
      if (!(prop in Obj)) {
        this.$set(Obj, prop, initValue);
      }
    },
    //切换折叠状态
    toggleCollapseStatus() {
      var item = this.nodeData;
      if (
        item.children &&
        item.children.length === 0 &&
        !this.nodeData.isExpand
      ) {
        //异步请求子节点数据
        if (
          this.root.loadData &&
          "loading" in this.nodeData &&
          !this.nodeData.loading
        ) {
          this.$set(this.nodeData, "loading", true);
          this.root.loadData(item, children => {
            this.$set(this.nodeData, "loading", false);
            if (children.length) {
              this.$set(this.nodeData, "children", children);
              this.$nextTick(() => this.toggleCollapseStatus());
            }
          });
          return;
        }
      }
      //展开或收起节点
      if (
        (item.children && item.children.length) ||
        (item.children && !item.children.length && this.nodeData.isExpand)
      ) {
        this.nodeData.isExpand = !this.nodeData.isExpand;
      }
    },
    setDragOverClass() {
      var pos = this.root.dragOverStatus.dropPosition;
      if (this.root.dragOverStatus.overNodeKey !== this.nodeData._hash) {
        return;
      }
      if (pos === 0) {
        return "tree-drag-over";
      } else if (pos === -1) {
        return "tree-drag-over-top";
      } else if (pos === 1) {
        return "tree-drag-over-bottom";
      }
      return "";
    },
    //拖拽处理-huijuan
    //拖拽开始
    onDragStart(e) {
      e.stopPropagation();
      if (this.nodeData.noDrag) {
        return;
      }
      this.dragNodeHighlight = true;
      e.dataTransfer.effectAllowed = "move";
      this.nodeData.isExpand = false;
      this.root.onDragStart(e, this);
    },

    //进入目标节点
    onDragEnter(e) {
      e.preventDefault();
      e.stopPropagation();
      this.root.onDragEnter(e, this);
    },
    onDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      this.root.onDragOver(e, this);
      this.dragOverClass = this.setDragOverClass();
    },
    onDragLeave(e) {
      e.stopPropagation();
      this.dragOverClass = "";
      this.root.onDragLeave(e, this);
    },
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.dragOverClass = "";
      //当异步加载子节点时不允许放置
      if (this.showLoading) {
        return;
      }
      this.root.onDrop(e, this);
    },
    onDragEnd(e) {
      e.stopPropagation();
      e.preventDefault();
      this.dragNodeHighlight = false;
      this.root.onDragEnd(e, this);
    },
    generateHash(num = 6) {
      var collectStr = "abcdefghijklmnopqrstuvwxyz0123456789",
        i = 0,
        str = "";
      while (i < num) {
        str += collectStr[Math.round(Math.random() * 35)];
        i++;
      }
      return str;
    }
  }
};
</script>


<style lang="less" scoped>
@tree-prefix-cls: ~"sp-tree";
@node-prefix-cls: ~"sp-tree-node";

ul,
ol {
  list-style: none;
}

.@{tree-prefix-cls} {
  &-item {
    padding-left: 20px;
    position: relative;
  }

  &-title-wrap {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin: 5px 0;
    width: 100%;
    border-radius: 5px;
  }

  &-arrow {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -6px;
    transition: 0.5s all ease;
  }

  &-arrow-open {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }

  &-arrow-hidden {
    display: none !important;
  }

  &-node-title {
  }
}

.sp-tree-node-title {
  display: inline-block;
  width: 240px;
  height: 28px;
  line-height: 28px;
  border-radius: 2px;
  border: 2px solid transparent;
}

/*拖拽样式 开始*/
.tree-draggable {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* Required to make elements draggable in old WebKit */
  -khtml-user-drag: element;
  -webkit-user-drag: element;
  cursor: move;
  border-radius: 2px;
}

.tree-drag-over {
  background-color: #5295e7;
  color: white;
  border: 2px #5295e7 solid;
}

.tree-drag-over-top {
  border-top: 2px #5295e7 solid;
}

.tree-drag-over-bottom {
  border-bottom: 2px #5295e7 solid;
}

.tree-drag-over.tree-drop-disabled {
  background-color: #f6f6f6;
  color: #ccc;
  border: 2px #f6f6f6 solid;
}

.tree-drag-over-top.tree-drop-disabled {
  border-top: 2px #f6f6f6 solid;
}

.tree-drag-over-bottom.tree-drop-disabled {
  border-bottom: 2px #f6f6f6 solid;
}

.tree-drag-selected {
  background-color: #deeaf7;
}

.tree-drag-disabled {
  cursor: default;
}

.tree-drag-disabled :hover {
  color: #bbb;
}

.@{node-prefix-cls} {
  padding-left: 20px;
}
</style>