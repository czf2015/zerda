<template>
  <div class="select-wrapper">
    <el-select v-model="value" filterable placeholder="请选择">
      <el-option v-for="({ label, value }) in options" :key="value" :label="label" :value="value" />
    </el-select>
    <el-button type="primary" @click="edit">编辑</el-button>
    <div class="mask" v-if="openDialog">
      <div class="dialog">
        <TableForm v-bind="tableProps" />
        <footer>
          <Submit
            class="btn_save"
            label="确定"
            @click="save"
            :disabled="!canSave"
            :class="{ disabled: !canSave }"
          />
          <Submit class="btn_cancel" label="取消" @click="cancel" />
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import TableForm from "@/components/TableForm";
import Submit from "@/components/Form/Submit";
import * as tableProps from "@/mock/table";
import { defaultOptions } from "./mock";

export default {
  components: {
    TableForm,
    Submit,
  },
  props: {
    options: {
      type: Array,
      //   required: true,
      default: defaultOptions,
    },
    selected: {
      type: String,
    },
  },
  data() {
    return {
      value: this.selected || (this.options[0] && this.options[0].value),
      tableProps,
      openDialog: false,
      canSave: false,
    };
  },
  methods: {
    edit() {
      this.openDialog = true;
      this.$emit("edit");
    },
    save() {
      // console.log(this.formData);
      //   this.$emit("save", this.formData);
    },
    cancel() {
      if (confirm("放弃修改？")) {
        this.openDialog = false
        this.$emit("cancel");
      }
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
    > footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
      .btn_save {
        margin-right: 24px;
        width: 60px;
      }
      .btn_save.disabled {
        background: #c0c4cc;
        width: 60px;
      }
      .btn_cancel {
        margin-right: 40px;
        background: red;
      }
    }
  }
}
</style>