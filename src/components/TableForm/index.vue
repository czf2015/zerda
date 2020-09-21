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
      @up="upTable"
      @down="downTable"
      @append="appendTable"
    />
    <div class="mask" v-if="openDialog">
      <CustomForm
        class="dialog"
        :style="{ transform }"
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
import { convertFormData } from "./helpers.js";

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
    },
    transform: {
      type: String
    }
  },
  data() {
    return {
      openDialog: false,
      legend: "请填写内容",
      formData: [],
      isRevised: false,
    };
  },
  methods: {
    checkTable(index) {
      console.log(index);
    },
    editTable(index) {
      this.formData = convertFormData(this.columns, this.datasource[index]);
      this.openDialog = true;
      this.isRevised = true
      this.$emit('edit', index)
    },
    addTable() {},
    delTable(index) {
      if (confirm("确定要删除吗？")) {
        this.datasource.splice(index, 1)
      }
    },
    upTable(index) {
      this.datasource.splice(index - 1, 2, this.datasource[index], this.datasource[index -1])
    },
    downTable(index) {
      this.datasource.splice(index, 2, this.datasource[index + 1], this.datasource[index])
    },
    appendTable() {
      this.formData = JSON.parse(JSON.stringify(this.columns))
      this.openDialog = true;
    },
    saveForm(formData) {
      this.openDialog = false;
      if (this.isRevised) {
        this.$emit("save", formData);
      } else {
        this.$emit("append", formData)
      }
    },
    cancelForm() {
      this.openDialog = false;
      this.isRevised = false
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
    left: 0;
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