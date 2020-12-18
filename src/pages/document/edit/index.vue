<template>
  <div class="document-editing">
    <div class="document-editing-header">
      <el-button size="small" @click="handleRefresh($event)"
        >刷新 <i class="el-icon-refresh-right"
      /></el-button>
    </div>
    <el-card class="document-editing-body" shadow="hover">
      <el-container style="backgroundcolor: #fafafa">
        <el-aside
          v-loading="treeLoading"
          width="400px"
          style="padding: 20px 10px 20px 20px"
        >
          <el-card shadow="hover">
            <div slot="header" class="card-header">
              <el-select
                v-model="platform"
                size="mini"
                placeholder="请选择"
                style="width: 31%"
              >
                <el-option
                  v-for="item in platforms"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select
                v-model="category"
                size="mini"
                placeholder="请选择"
                style="width: 31%"
              >
                <el-option
                  v-for="item in categories"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select
                v-model="product"
                size="mini"
                placeholder="请选择"
                style="width: 31%"
              >
                <el-option
                  v-for="item in products"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="card-body-left" id="cancleDefultMenu" ref="catalogue">
              <el-tree :data="treeData">
                <el-popover
                  slot-scope="{ node, data }"
                  :value="visible === node.label"
                  placement="bottom"
                  trigger="manual"
                  :visible-arrow="false"
                  style="display: block; width: 100%"
                >
                  <ul class="menu-container">
                    <li v-if="node.data.type !== 'document'">
                      <i class="el-icon-folder" />
                      <span style="fontweight: bold">{{ node.label }}</span>
                    </li>
                    <li @click="handleRightComponents('HandleFolder', node)">
                      <i class="el-icon-circle-plus-outline" />
                      <a href="javascript:;">新增菜单</a>
                    </li>
                    <li @click="handleRightComponents('HandleDocument', node)">
                      <i class="el-icon-document-add" />
                      <a href="javascript:;">新增文章</a>
                    </li>
                    <li>
                      <i class="el-icon-delete" />
                      <a href="javascript:;">删除节点</a>
                    </li>
                  </ul>
                  <div
                    slot="reference"
                    class="custom-tree-node"
                    @mousedown="showMenu($event, node, data)"
                  >
                    <i
                      :class="
                        node.data.type === 'document'
                          ? 'el-icon-document'
                          : 'el-icon-folder-opened'
                      "
                      style="marginright: 5px"
                    />
                    <span>{{ node.label }}</span>
                  </div>
                </el-popover>
              </el-tree>
            </div>
          </el-card>
        </el-aside>
        <el-main style="padding: 20px 20px 20px 10px">
          <component
            :is="rightComponent"
            :action-type="actionType"
            :exit-edit="exitEdit"
          />
          <!-- <NoticeInfo v-if="actionType === 'defult'"/> -->
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NoticeInfo from "./NoticeInfo";
import HandleDocument from "./HandleDocument";
import HandleFolder from "./HandleFolder";
import { Document } from "@/services";
import {
  platforms,
  treeData,
  convertToOptions,
  convertToTree,
} from "./helpers";
import CustomSelect from "@/components/Form/Select";

let id = 1000;
export default {
  name: "DocumentEdit",
  components: { NoticeInfo, HandleFolder, HandleDocument, CustomSelect },
  data() {
    return {
      visible: "",
      value2: "",
      treeLoading: false, //true,
      actionType: "add",
      rightComponent: "NoticeInfo",
      options2: [
        {
          value: "1",
          label: "计算",
        },
        {
          value: "2",
          label: "存储",
        },
        {
          value: "3",
          label: "网络",
        },
        {
          value: "4",
          label: "安全",
        },
        {
          value: "5",
          label: "数据库",
        },
      ],
      treeData: [],
      platforms,
      platform: "1",
      categories: [],
      category: "",
      products: [],
      product: "",
      selectedNode: null
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  methods: {
    getTreeData() {
      setTimeout(() => {
        this.treeData = treeData;
        this.treeLoading = false;
      }, 2000);
    },
    handleRefresh() {
      this.exitEdit();
    },
    exitEdit() {
      this.rightComponent = "NoticeInfo";
    },
    handleRightComponents(rightComponent, node) {
      this.rightComponent = rightComponent;
      this.actionType = "add";
      this.visible = "";
      this.selectedNode = node
      console.log('pages/document/edit/index.vue::handleRightComponents:selectedNode')
      console.log(this.selectedNode)
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
    showMenu(e, node, data) {
      if (e.which === 1) {
        this.actionType = "edit";
        this.rightComponent =
          node.data.type === "document" ? "HandleDocument" : "HandleFolder";
        this.activeNode = node;
        return;
      }
      this.visible = node.label;
    },

    getCatalogue() {
      Document.queryCategory({
        pageNum: 1,
        pageSize: 100,
        platform: this.platform,
      }).then((res) => {
        this.categories = convertToOptions(res.result);
        this.category = this.categories[0].value;
        Document.queryProduct({
          pid: this.category,
          pageNum: 1,
          pageSize: 100,
        }).then((res) => {
          console.log("00000000");
          console.log(res);
          this.products = convertToOptions(res.result);
          this.product = this.products[0].value;
          console.log(this.product);
          // Document.add({
          //   pid: "0", //根目录下pid为0
          //   catalogId: this.product, //产品的catalogId
          //   title: "nysqleeee", //标题
          //   enKey: "nysql-guidance666",
          //   weight: 160, //权重
          //   content: "内容是；；；；；；；；；；；",    //新增菜单的情况下没有此项
          //   nodeType: "0"           // 0为菜单   1为文章
          // }).then((res) => {
          //   console.log(".......");
          //   console.log(res);
            Document.query({ catalogId: this.product }).then((res) => {
              // console.log("---------");
              // // console.log(res)
              // console.log(res.result);
              // const tmp = [
              //   {
              //     docId: "1111",
              //     pid: "0",
              //     catalogId: "4444",
              //     title: "nysql使用手册",
              //     nodeType: "0",
              //     children: [
              //       {
              //         docId: "2222",
              //         pid: "1111",
              //         catalogId: "4444",
              //         title: "nysql使用手册1",
              //         nodeType: "0",
              //         children: [
              //           {
              //             docId: "4444",
              //             pid: "1111",
              //             catalogId: "5555",
              //             title: "nysql使用手册3",
              //             nodeType: "0",
              //             children: [],
              //           },
              //         ],
              //       },
              //       {
              //         docId: "3333",
              //         pid: "1111",
              //         catalogId: "4444",
              //         title: "nysql使用手册2",
              //         nodeType: "1",
              //         children: [],
              //       },
              //     ],
              //   },
              // ];

              this.treeData = convertToTree(res.result);
            });
          // });
        });
      });
    },
  },
  mounted() {
    /* document.getElementById("cancleDefultMenu") */ this.$refs.catalogue.oncontextmenu = function (
      e
    ) {
      return false;
    };
    document.onclick = () => {
      this.visible = "";
    };
    this.getCatalogue();
  },
  beforeDestroy() {
    document.onclick = null;
  },
};
</script>

<style lang="scss" scoped>
.document-editing {
  padding: 15px;
  &-header {
    margin-bottom: 20px;
  }
  &-body {
    min-height: 500px;
    .card-header {
      display: flex;
      justify-content: space-between;
    }
    .card-body-left {
      padding: 18px 20px;
      min-height: 400px;
      height: 100%;
      .custom-tree-node {
        width: 100%;
      }
    }
  }
}
.menu-container {
  padding: 0;
  margin: 0;
  list-style: none;
  > li {
    padding: 0;
    margin: 10px 0;
    list-style: none;
    cursor: pointer;
    i {
      margin-right: 10px;
    }
  }
}
::v-deep .el-card {
  // height: 100%;
  .el-card__body {
    padding: 0;
  }
  .el-select .el-input__inner {
    min-width: unset;
  }
}
</style>
