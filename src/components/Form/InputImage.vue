<template>
  <div class="input-image">
    <input
      type="text"
      placeholder="未设置"
      v-model="inputText"
      @blur="handleInput"
      hidden
    />
    <div class="picture" :style="{ display: isUploaded ? 'inline-block' : 'none' }">
      <img
        :src="inputText"
        class="upload_img"
      />
      <span class="close_icon" @click="handleDelete">X</span>
    </div>
    <el-upload
      class="upload"
      :action="uploadAPI"
      :limit="limit"
      @success="handleSuccess"
      @error="handleError"
    >
      <el-button
        size="small"
        type="primary"
        :class="{ upload_hidden: isUploaded }"
        >点击上传</el-button
      >
    </el-upload>
    <p :class="valid ? 'none' : 'warning'">{{ message }}</p>
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
      default: "/upload",
    },
  },
  data() {
    return {
      inputText: this.value,
      valid: this.validation.valid || true,
      message: this.validation.message || "",
    };
  },
  computed: {
    isUploaded() {
      const retVal = this.inputText && this.valid;
      console.log(this.inputText)
      console.log(retVal)
      return retVal
    },
  },
  methods: {
    handleInput() {
      const { valid, message } = validate({
        value: this.inputText,
        validation: this.validation,
        required: this.required,
      });
      this.valid = valid;
      this.message = message;
      this.$emit(this.validation.trigger || "change", {
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
    handleDelete() {
      this.inputText = ''
    }
  },
};
</script>


<style lang="less" scoped>
.input-image {
  position: relative;
  display: flex;
  > input[type="text"]:first-child {
    margin-right: 20px;
  }
  .none {
    display: none;
  }
  .picture {
    position: relative;
    & > .upload_img {
      margin-top: -8px;
      width: 48px;
      height: 48px;
    }
    & > .close_icon {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      color: #fff;
      background: red;
      border-radius: 50%;
    }
    &:not(:hover) .close_icon {
      display: none;
    }
  }

  .upload_hidden {
    display: none;
  }

  .warning {
    position: absolute;
    bottom: -16px;
    font-size: 12px;
    color: red;
  }
}
</style>