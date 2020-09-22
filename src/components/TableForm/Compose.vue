<template>
  <div class="wrapper">
    <CustomForm :datasource="formData" :auto="auto" @change="handleFormChange" padding="0" />
    <TableForm
      style="margin-top: 20px;"
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
      this.$emit("change", formData);
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
