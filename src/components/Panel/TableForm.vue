<template>
  <div class="container">
    <img :src="effect" width="80%" style="margin-left: 10%;" />
    <CustomForm :datasource="formData" :auto="true" />
    <slot name="control">
      <el-button
        style="margin-bottom: 20px;"
        size="small"
        @click="addTab(editableTabsValue)"
      >add tab</el-button>
    </slot>

    <el-tabs type="card" v-model="editableTab" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="({ category, children }) in initial.content"
        :key="category"
        :name="category"
        :label="category"
      >
        <CustomForm :datasource="convertPanelData(children).formData" :auto="true" />
        <TableForm
          :datasource="convertPanelData(children).table.content"
          :columns="convertPanelData(children).table.columns"
          :operations="convertPanelData(children).table.operations"
        />
      </el-tab-pane>
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
    // Container,
    CustomForm,
    TableForm,
  },
  props: {
    initial: {
      type: Object,
      required: true,
    },
  },
  data() {
    // console.log()
    return {
      ...convert(this.initial),
      editableTab: this.initial.content[0].category,
    };
  },
  methods: {
    convertPanelData(content) {
      const { columns, children } = this.initial.extra; /* .children; */
      const ret = {
        formData: columns
          ? columns.map((item) => {
              return {
                ...item,
                value: content[item.field],
              };
            })
          : [],
        table: {
          content,
          columns: children.columns,
        },
      };
      console.log(ret);
      return ret;
    },
    removeTab() {},
  },
};
</script>


<style lang="less" scoped>
.container {
  margin: 80px 40px;
  padding: 60px 60px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.5);
  > img {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.5);
  }
}
</style>