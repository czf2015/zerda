<template>
  <div class="container">
    <img :src="effect" width="80%" style="margin-left: 10%;" />
    <CustomForm :datasource="formData" :auto="true" />
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
    return convert(this.initial);
  },
};
</script>


<style lang="less" scoped>
.container {
  margin: 80px 40px;
  padding: 40px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.5);
  > img {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.5);
  }
}
</style>