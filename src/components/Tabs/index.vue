<template>
  <div class="wrapper">
    <slot name="control">
      <el-button
        style="margin-bottom: 20px;"
        size="small"
        @click="addTab(editableTabsValue)"
      >add tab</el-button>
    </slot>

    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="({ name, label, content }) in editableTabs"
        :key="name"
        :name="name"
        :label="label"
      >
        <pre v-html="content" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    initial: {
      type: Object,
      required: true,
    },
  },
  data() {
    const { editableTabsValue, editableTabs = [] } = this.initial;
    return {
      editableTabsValue:
        editableTabsValue || (editableTabs[0] && editableTabs[0].name),
      editableTabs,
      tabIndex: editableTabs.length,
    };
  },
  methods: {
    addTab(targetName) {
      console.log(targetName);
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content",
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
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

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
  },
};
</script>