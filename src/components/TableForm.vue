<template>
  <div class="table-form">
    <CustomTable
      :datasource="datasource"
      :columns="columns"
      :operations="operations"
      @check="checkTable"
      @edit="editTable"
      @add="addTable"
      @del="delTable"
    />
    <div class="mask" v-if="openDialog">
      <CustomForm
        class="dialog"
        :datasource="formData"
        :legend="legend"
        :width="width"
        @save="saveForm"
        @cancel="cancelForm"
      />
    </div>
  </div>
</template>

<script>
import CustomTable from "@/components/Table";
import CustomForm from "@/components/Form";
import { convertFormData } from "@/mock/table.js";

export default {
  components: {
    CustomTable,
    CustomForm,
  },
  props: {
    datasource: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    operations: {
      type: Array,
    },
    width: {
      type: String,
      default: '120'
    },
  },
  data() {
    return {
      openDialog: false,
      legend: "请填写内容",
      formData: [],
    };
  },
  methods: {
    checkTable(index) {
      console.log(index);
    },
    editTable(index) {
      this.openDialog = true;
      this.formData = convertFormData(this.columns, this.datasource[index]);
    },
    addTable() {},
    delTable(index) {
      if (confirm("确定要删除吗？")) {
        console.log(index);
      }
    },
    saveForm(formData) {
      this.openDialog = false;
      this.$emit("save", formData);
    },
    cancelForm() {
      this.openDialog = false;
    },
  },
};
</script>

<style lang="less" scoped>
.table-form {
  position: relative;
  .mask {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.5);
    .dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 auto;
      min-width: 720px;
      max-width: 960px;
      background-color: #fff;
    }
  }
}
</style>