<template>
  <section class="meta">
    <h3 class="title">
      <input
        type="text"
        :value="title"
        @change="handleChange"
        maxlength="10"
        disabled
      />
    </h3>
    <CustomForm
      class="content"
      :datasource="formData"
      @change="handleFormChange"
      :auto="true"
    />
  </section>
</template>


<script>
import CustomForm from "@/components/Form";
import { convertToFormData } from "./helpers";

export default {
  name: "MetaInfo",

  components: {
    CustomForm,
  },

  props: {
    title: {
      type: String,
      default: "页面元信息",
    },
    meta: {
      type: Object,
      required: true,
    },
  },

  computed: {
    formData() {
      return convertToFormData(this.meta);
    },
  },

  methods: {
    handleChange(e) {
      //   this.$emit("change", e.target.value);
    },
    handleFormChange(formData) {
      const meta = {};
      formData.forEach(({ field, value }) => {
        meta[field] = value;
      });
      this.$emit("change", meta);
    },
  },
};
</script>


<style lang="less" scoped>
.meta {
  margin: 0.2rem;
  padding: 0.1rem;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
  .title {
    font-size: 24px;
    line-height: 48px;
    border-left: 4px solid green;
    & > input {
      padding: 0 10px;
      line-height: 36px;
      font-weight: bold;
      border: none;
      &:disabled {
        // color: black;
        background: transparent;
      }
    }
  }
  .content {
    margin-top: -0.4rem;
  }
}
</style>