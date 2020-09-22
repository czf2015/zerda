<template>
  <div class="table-form">
    <CustomTable
      :datasource="datasource"
      :columns="columns"
      :operations="operations"
      @check="handleTableCheck"
      @edit="handleTableEdit"
      @del="handleTableDel"
      @up="handleTableUp"
      @down="handleTableDown"
      @append="handleTableAppend"
    />
    <div class="mask" v-if="openDialog">
      <CustomForm
        class="dialog"
        :style="{ transform }"
        :datasource="formData"
        :legend="legend"
        :width="width"
        @save="handleFormSave"
        @cancel="handleFormCancel"
      />
    </div>
  </div>
</template>

<script>
import CustomTable from "@/components/Table";
import CustomForm from "@/components/Form";
import { combine } from "./helpers.js";

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
    handleTableCheck(index) {
      console.log(index);
    },
    handleTableEdit(index) {
      this.formData = combine(this.columns, this.datasource[index]);
      this.openDialog = true;
      this.isRevised = true
      this.$emit('edit', index)
    },
    handleTableDel(index) {
      if (confirm("确定要删除吗？")) {
        this.$emit('del', index)
      }
    },
    handleTableUp(index) {
      this.$emit('up', index)
    },
    handleTableDown(index) {
      this.$emit('down', index)
    },
    handleTableAppend() {
      this.formData = JSON.parse(JSON.stringify(this.columns))
      this.openDialog = true;
    },
    handleFormSave(formData) {
      this.openDialog = false;
      if (this.isRevised) {
        this.$emit("save", formData);
        this.isRevised = false
      } else {
        this.$emit("append", formData)
      }
    },
    handleFormCancel() {
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