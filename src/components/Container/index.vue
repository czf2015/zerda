<template>
  <div class="container">
    <img :src="effect" width="70%" style="margin-left: 15%;" />
    <CustomForm :datasource="formData" :auto="true" />
    <TableForm :datasource="table.content" :columns="table.columns" :operations="table.operations" />
  </div>
</template>


<script>
import CustomForm from "@/components/Form";
import TableForm from "@/components/TableForm";
import { convert } from "./helpers.js";

export default {
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
    const ret = convert(this.initial)
    console.log(JSON.stringify(ret))
    return ret;
  },
};
</script>


<style scoped>
.container {
  margin-top: 40px;
}
</style>