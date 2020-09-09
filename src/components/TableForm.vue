<template>
  <div class="table-form">
    <CustomTable
      :datasource="datasource"
      :columns="columns"
      :operations="operations"
      @operate="operateTable"
    />
    <div class="mask" v-if="openDialog">
      <CustomForm
        class="dialog"
        :datasource="formData"
        :legend="legend"
        :width="width"
        @operate="operateForm"
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
    operateTable({ operate, index }) {
      switch (operate) {
        case "check":
          break;
        case "edit":
          this.openDialog = true;
          this.formData = convertFormData(this.columns, this.datasource[index]);
          break;
        case "add":
          break;
        case "delete":
          break;
        default:
          break;
      }
    },
    operateForm({ operate, data }) {
      switch (operate) {
        case "save":
          this.openDialog = false;
          this.$emit("save", data);
          break;
        case "cancel":
          this.openDialog = false;
          this.$emit("cancel");
          break;
        default:
          break;
      }
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
      margin: 80px auto;
      min-width: 720px;
      max-width: 960px;
      background-color: #fff;
      //   z-index: 999;
    }
  }
}
</style>