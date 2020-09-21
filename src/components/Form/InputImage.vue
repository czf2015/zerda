<template>
  <div class="input-image">
    <input type="text" v-model="inputText" @blur="handleInput" />
    <el-upload
      class="upload"
      :action="uploadAPI"
      :limit="limit"
      @success="handleSuccess"
      @error="handleError"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <p :class="valid ? 'none' : 'warning'">{{message}}</p>
  </div>
</template>


<script>
import { validate } from "@/utils/validate.js";

export default {
  name: "InputText",
  props: {
    field: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    validation: {
      type: Object,
      required: true,
    },
    limit: {
      type: Number,
      default: 1,
    },
    uploadAPI: {
      type: String,
      default: '/upload'
    },
  },
  data() {
    return {
      inputText: this.value,
      valid: this.validation.valid || true,
      message: this.validation.message || "",
    };
  },
  methods: {
    handleInput() {
      //   console.log(this.inputText);
      const { valid, message } = validate({
        value: this.inputText,
        validation: this.validation,
        required: this.required,
      });
      this.valid = valid;
      this.message = message;
      this.$emit("blur", {
        field: this.field,
        value: this.inputText,
        valid,
        message,
      });
    },
    handleSuccess(res) {
      console.log(res);
    },
    handleError(err) {
      console.log(err);
    },
  },
};
</script>


<style lang="less" scoped>
.input-image {
  position: relative;
  display: flex;
  >input[type="text"]:first-child {
      margin-right: 20px;
  }
  .none {
    display: none;
  }

  .warning {
    position: absolute;
    bottom: -28px;
    font-size: 12px;
    color: red;
  }
}
</style>