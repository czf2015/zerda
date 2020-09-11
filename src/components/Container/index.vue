<template>
  <div class="container">
    <!-- <img :src="effect" width="80%" style="margin-left: 10%;" />
    <CustomForm :datasource="formData" :auto="true" /> -->
    <div class="title">
      <h3 v-if="!editTitle" @click="editTitle = true">{{title}}</h3>
      <input v-else type="text" @blur="editTitle = false" v-model="title" />
    </div>
    <div class="desc">
      <label>描述：</label>
      <span v-if="!editDesc" @click="editDesc = true">{{desc}}</span>
      <input v-else type="text" @blur="editDesc = false" v-model="desc" />
    </div>
    <CustomForm :datasource="formData" :auto="true" v-show="false" />
    <TableForm :datasource="table.content" :columns="table.columns" :operations="table.operations" />
  </div>
</template>


<script>
import CustomForm from "@/components/Form";
import TableForm from "@/components/TableForm";
import { convert } from "./helpers.js";

export default {
  name: "Container",
  components: {
    CustomForm,
    TableForm,
  },
  props: {
    initial: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ...convert(this.initial),
      editTitle: false,
      title: this.initial.title || "标题",
      editDesc: false,
      desc: this.initial.desc,
    };
  },
};
</script>


<style lang="less" scoped>
.container {
  margin: 20px 40px;
  // padding: 60px 60px;
  // border: 1px solid #ebeef5;
  // border-radius: 4px;
  // box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.5);
  > .title {
    padding-left: 10px;
    font-size: 24px;
    line-height: 48px;
    font-weight: bold;
    border-left: 5px solid green;
  }

  > .desc {
    margin: 10px 0;
    line-height: 36px;
    & > label {
      color: #409eff;
    }
    & > input,
    & > p {
      color: #333;
    }
  }

  > img {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.5);
  }
}
</style>