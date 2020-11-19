<template>
  <div class="compose">
    <CustomForm
      v-bind="{ datasource: formData, auto }"
      @change="handleFormChange"
      padding="0"
    />
    <TableForm
      v-if="tableData"
      style="margin-top: 20px"
      v-bind="tableData"
      @edit="handleTableEdit"
      @save="handleTableSave"
      @append="handleTableAppend"
      @del="handleTableDelete"
      @up="handleTableUp"
      @down="handleTableDown"
    />
  </div>
</template>


<script>
import CustomForm from "@/components/Form";
import TableForm from "@/components/TableForm";

export default {
  name: "Compose",
  components: {
    CustomForm,
    TableForm,
  },
  props: {
    initial: {
      type: Object,
      required: true,
    },
    auto: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const { formData, tableData } = this.initial;
    return {
      formData,
      tableData,
      editIndex: -1,
    };
  },
  methods: {
    handleFormChange(formData) {
      const msg = {};
      formData.forEach(({ field, value }) => {
        msg[field] = value;
      });
      this.$emit("change", msg);
    },
    handleTableEdit(idx) {
      this.editIndex = idx;
    },
    handleTableSave(formData) {
      this.$emit("save", {
        index: this.editIndex,
        value: formData,
      });
    },
    handleTableAppend(formData) {
      this.$emit("append", formData);
    },
    handleTableDelete(index) {
      this.$emit("del", index);
    },
    handleTableUp(index) {
      this.$emit("up", index);
    },
    handleTableDown(index) {
      this.$emit("down", index);
    },
  },
};
</script>

<style lang="less" scoped>
.compose {
  // margin-top: -15px;
  padding: 0 10px 10px 0;
}
</style>
