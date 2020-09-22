<template>
  <Wrapper
    :moveable="moveable"
    :title="store.title"
    @change="handleTitleChange"
    @up="$emit('up')"
    @down="$emit('down')"
    @del="$emit('del')"
  >
    <!-- <img :src="effect" width="80%" style="margin-left: 10%;" /> -->
    <CustomForm :datasource="formData" :auto="true" padding="0" @change="handleFormChange" />
    <el-tabs
      :type="cardType"
      style="margin-top: 20px;"
      v-model="activeTab"
      editable
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="({ category, formData, tableData }) in panelDatas"
        :key="category"
        :name="category"
        :label="category"
      >
        <Compose
          :initial="{ formData, tableData }"
          :auto="true"
          @change="handlePanelFormChange"
          @save="handlePanelTableSave"
          @append="handlePanelTableAppend"
          @del="handlePanelTableDelete"
          @up="handlePanelTableUp"
          @down="handlePanelTableDown"
        />
      </el-tab-pane>
    </el-tabs>
  </Wrapper>
</template>

<script>
import Wrapper from "./Wrapper";
import CustomForm from "@/components/Form";
import Compose from "./Compose";
import { extract } from "./helpers.js";

export default {
  name: "TableFormPanel",

  components: {
    Wrapper,
    CustomForm,
    Compose,
  },

  props: {
    moveable: {
      type: String,
      default: "updown",
    },
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
    return {
      store: this.initial,
      activeTab: this.initial.content[0] && this.initial.content[0].category,
      closable: false,
      canTabLeave: true,
    };
  },

  computed: {
    formData() {
      const form = this.store.extra.filter(
        (item) => item.field !== "title" && item.field !== "content"
      );
      return form.map((item) => {
        return { ...item, value: this.store[item.field] };
      });
    },
    panelDatas() {
      const panel = this.store.extra.find((item) => item.field == "content")
        .children;
      const form = panel.filter((item) => item.field !== "children");
      const table = panel.find((item) => item.field == "children");
      return this.store.content.map((panelData) => {
        return {
          category: panelData.category,
          formData: form.map((item) => {
            return { ...item, value: panelData[item.field] };
          }),
          tableData: {
            datasource: panelData.children || [],
            columns: table.children,
            operations: table.operations,
          },
        };
      });
    },
  },

  methods: {
    handleTabsEdit(targetName, action) {
      const tabs = this.store.content
      switch (action) {
        case "add":
          this.activeTab = `tab ${tabs.length + 1}`;
          tabs.push({
            category: this.activeTab
          })
          break;
        case "remove":
          console.log(targetName)
          if (confirm('确定删除该栏？')) {
            if (this.activeTab === targetName) {
              tabs.forEach((tab, index) => {
                for (let index = 0; index < tabs.length; index++) {
                  if (tabs[index].category === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                      this.activeTab = nextTab.category;
                    }
                    break
                  }
                }
              })
            }
            this.store.content = tabs.filter((tab) => tab.category !== targetName);
          }
          break;
        default:
          break;
      }
    },
    handleFormChange(formData) {
      this.formData = formData;
    },
    handleTitleChange(val) {
      this.store.title = val;
    },
    handlePanelTableSave({ index, value }) {
      this.store.content
        .find((panelData) => panelData.category == this.activeTab)
        .children.splice(index, 1, extract(value));
    },
    handlePanelTableAppend(formData) {
      this.store.content
        .find((panelData) => panelData.category == this.activeTab)
        .children.push(extract(formData));
    },
    handlePanelTableDelete(index) {
      this.store.content
        .find((panelData) => panelData.category == this.activeTab)
        .children.splice(index, 1);
    },
    handlePanelFormChange(formData) {
      const panelData = this.store.content.find(
        (panelData) => panelData.category == this.activeTab
      );
      formData.forEach(({ field, value }) => {
        panelData[field] = value;
        if (field == 'category') {
          this.activeTab = value
        }
      });
      // this.canTabLeave = formData.every(({ validation }) => validation.valid)
    },
    handlePanelTableUp(index) {
      const panelTable = this.store.content.find(
        (panelData) => panelData.category == this.activeTab
      ).children;
      panelTable.splice(index - 1, 2, panelTable[index], panelTable[index - 1]);
    },
    handlePanelTableDown(index) {
      const panelTable = this.store.content.find(
        (panelData) => panelData.category == this.activeTab
      ).children;
      panelTable.splice(index, 2, panelTable[index + 1], panelTable[index]);
    },
  },
  watch: {
    activeTab(tabName, old) {
      console.log(old)
      // this.activeTab = old
      // return old
      return false
    }
  }
};
</script>
