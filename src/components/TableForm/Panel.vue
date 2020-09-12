<template>
  <div class="container">
    <h3 class="title" @mouseover="editTitle = true" @mouseleave="editTitle = false">
      <input type="text" v-if="editTitle" v-model="title" />
      <span v-else>{{title}}</span>
    </h3>
    <!-- <img :src="effect" width="80%" style="margin-left: 10%;" /> -->
    <CustomForm :datasource="formData" :auto="true" padding="0" />
    <!-- <label class="desc">
      描述：
      <input type="text" v-model="desc" />
    </label> -->
    <el-tabs
      :type="cardType"
      style="margin-top: 20px;"
      v-model="activeTab"
      editable
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="({ children, ...chief }) in content"
        :key="chief.category"
        :name="chief.category"
        :label="chief.category"
      >
        <CustomForm
          style="margin-top: -40px;"
          :datasource="convertPanelData(children, chief).formData"
          :auto="true"
        />
        <TableForm
          :datasource="convertPanelData(children, chief).table.content"
          :columns="convertPanelData(children, chief).table.columns"
          :operations="convertPanelData(children, chief).table.operations"
        />
      </el-tab-pane>
      <!-- <el-tab-pane name="add" label="+" /> -->
    </el-tabs>
  </div>
</template>

<script>
import CustomForm from "@/components/Form";
import TableForm from "@/components/TableForm";
import { convert } from "./helpers.js";

export default {
  name: "TableFormPanel",
  components: {
    CustomForm,
    TableForm,
  },
  props: {
    initial: {
      type: Object,
      required: true,
    },
    cardType: {
      type: String,
      default: "card",
    },
  },
  data() {
    const { content, title } = this.initial;
    const { formData, effect } = convert(this.initial);
    return {
      effect,
      formData,
      content,
      activeTab: content[0] && content[0].category,
      closable: false,
      editTitle: false,
      title: title || "标题",
      // desc,
    };
  },
  methods: {
    convertPanelData(content, chief) {
      const { columns, children } = this.initial.extra;
      return {
        formData: columns
          ? columns.map((item) => {
              return {
                ...item,
                value: chief[item.field],
              };
            })
          : [],
        table: {
          content,
          columns: children.columns,
          operations: children.operations,
        },
      };
    },
    removeTab(targetName) {
      console.log(targetName);
    },
    handleTabsEdit(targetName, action) {
      console.log({ targetName, action });
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.content.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content",
        });
        this.activeTab = newTabName;
      }
      if (action === "remove") {
        let tabs = this.content;
        let activeName = this.activeTab;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.activeTab = activeName;
        this.content = tabs.filter((tab) => tab.name !== targetName);
      }
    },
  },
  watch: {
    activeTab() {
      console.log("-------------");
      console.log(this.activeTab);
      if (this.activeTab == "+") {
        this.closable = false;
      }
    },
    tabIndex() {
      return this.content.length;
    },
  },
};
</script>


<style lang="less" scoped>
.container {
  margin: 40px 40px;
  // padding: 60px 60px;
  // border: 1px solid #ebeef5;
  // border-radius: 4px;
  // box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.5);
  > .title {
    padding-left: 10px;
    font-size: 24px;
    line-height: 48px;
    font-weight: bold;
    border-left: 4px solid green;
  }

  > .desc {
    margin: 10px 0;
    line-height: 36px;
    > input[type="text"] {
      min-width: 556px;
    }
  }

  > img {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.5);
  }
}
</style>