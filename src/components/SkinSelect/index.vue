<template>
  <div class="skin-select">
    <el-select v-model="currentTheme" filterable placeholder="请选择">
      <el-option v-for="({ label, value }) in options" :key="value" :label="label" :value="value" />
    </el-select>
    <el-button type="primary" @click="openDialog = true">编辑</el-button>

    <div class="mask" v-if="openDialog">
      <div class="dialog">
        <i class="close-icon" @click="openDialog = false"></i>
        <TableForm
          v-bind="tableData"
          @edit="handleTableEdit"
          @save="handleTableSave"
          @append="handleTableAppend"
          @del="handleTableDelete"
        />
      </div>
    </div>
  </div>
</template>


<script>
import TableForm from "@/components/TableForm";
import { themes, convertSelectOptions, convertTableFormData } from "./helpers";

export default {
  components: {
    TableForm,
  },

  props: {
    themes: {
      type: Array,
      default: () => themes,
    },
    selected: {
      type: String,
    },
  },

  data() {
    return {
      currentTheme: this.selected || this.themes[0],
      openDialog: false,
      editIndex: -1,
    };
  },

  computed: {
    options() {
      return convertSelectOptions(this.themes);
    },
    tableData() {
      return convertTableFormData(this.themes);
    },
  },

  methods: {
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
      console.log(formData)
      this.$emit("append", formData);
    },
    handleTableDelete(index) {
      this.$emit("del", index);
    },
  },
};
</script>


<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  > .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-left: 8%;
    padding: 60px;
    width: 70%;
    background-color: #fff;
    > .close-icon {
      position: absolute;
      top: -12px;
      right: -12px;
      display: inline-block;
      width: 24px;
      height: 24px;
      background-image: url(/svg/close-active.svg);
      background-size: cover;
    }
  }
}
</style>