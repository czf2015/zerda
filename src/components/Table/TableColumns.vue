<template>
  <div is="template">
    <el-table-column
      v-for="({ fixed, field, label, validation, width, children }) in columns"
      :fixed="fixed"
      :prop="field"
      :label="label"
      :width="width"
      :key="field"
    >
      <template slot-scope="scope">
        <div v-if="validation && validation.type == 'image'">
          <img :src="scope.row[field]" height="48" />
        </div>
        <span v-else>{{ scope.row[field] }}</span>
      </template>
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