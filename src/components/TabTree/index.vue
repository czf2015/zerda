<template>
  <el-tabs
    :type="cardType"
    style="margin: 20px 20px 0 20px"
    v-model="activeTab"
    :before-leave="handleTabLeave"
    editable
    @edit="handleTabsEdit"
  >
    <el-tab-pane
      v-for="({ category, tableData }, idx) in panelDatas"
      :key="idx"
      :name="String(idx)"
      :label="category"
    >
      <TableTree :tableData="tableData" @update="handleUpdate" :index="idx" />
    </el-tab-pane>
  </el-tabs>
</template>


<script>
import TableTree from "@/components/Table/TableTree";

export default {
  components: {
    TableTree,
  },

  props: {
    cardType: {
      type: String,
      default: "card",
    },
    panelDatas: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      store: [], //this.initial,
      activeTab: "0",
      closable: false,
      canTabLeave: true,
    };
  },

  // computed: {
  //   panelDatas() {
  //     return ["服务配置", "导航配置", "推荐配置"].map((category) => {
  //       return {
  //         category,
  //         tableData: JSON.parse(JSON.stringify(tableData)),
  //       };
  //     });
  //   },
  // },

  methods: {
    handleTabsEdit(targetName, action) {
      const tabs = this.store.content;
      switch (action) {
        case "add":
          this.activeTab = `${tabs.length}`;
          tabs.push({
            category: `tab ${tabs.length + 1}`,
            children: [],
          });
          break;
        case "remove":
          if (confirm("确定删除该栏？")) {
            if (this.activeTab == targetName) {
              if (targetName < tabs.length - 1) {
                this.activeTab = targetName;
              } else {
                this.activeTab = `${targetName - 1}`;
              }
            }
            tabs.splice(Number(targetName), 1);
          }
          break;
        default:
          break;
      }
    },
    handleTabLeave() {
      if (!this.canTabLeave) {
        alert("当前填写内容不符合格式要求，请您进行修改!");
      }
      return this.canTabLeave;
    },
    handlePanelFormChange(formData) {
      const panelData = this.store.content[this.activeTab];
      formData.forEach(({ field, value }) => {
        panelData[field] = value;
      });
      this.canTabLeave = formData.every(({ validation }) => validation.valid);
    },
    handlePanelTableUp(index) {
      const panelTable = this.store.content[this.activeTab].children;
      panelTable.splice(index - 1, 2, panelTable[index], panelTable[index - 1]);
    },
    handlePanelTableDown(index) {
      const panelTable = this.store.content[this.activeTab].children;
      panelTable.splice(index, 2, panelTable[index + 1], panelTable[index]);
    },
    handleUpdate(idx, store) {
      // this.tableData = store
      console.log('9999999999')
      // console.log(this.tableData)
      this.$emit('update', idx, store)
    }
  },
};
</script>