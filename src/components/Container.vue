<template>
  <div class="container">
    <img :src="effect" />
    <!-- <CustomForm /> -->
    <TableForm :datasource="datasource" :columns="columns" />
  </div>
</template>


<script>
import CustomForm from "@/components/Form";
import TableForm from "@/components/TableForm";

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
    const {
      id,
      type,
      usage,
      content,
      columns,
      effect,
      ...chief
    } = this.initial;
    return {
      id,
      type,
      usage,
      content,
      effect,
      chief,
    };
  },
};
</script>