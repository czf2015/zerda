<template>
  <div is="template">
    <el-table-column
      v-for="({ fixed, field, label, width, children }) in columns"
      :fixed="fixed"
      :prop="field"
      :label="label"
      :width="width"
      :key="field"
    >
      <TableColumns v-if="children && children.length > 0" :columns="children" />
    </el-table-column>
  </div>
</template>

<script>
export default {
  name: "TableColumns",
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
};
</script>