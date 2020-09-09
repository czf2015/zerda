

<template>
  <el-table :data="datasource" style="width: 100%;">
    <TableColumns :columns="columns" />
    <el-table-column fixed="right" label="操作" width="160">
      <template slot-scope="scope">
        <el-button
          v-for="operation in operations"
          :key="operation.field"
          @click="operate(operation, scope.$index)"
          type="text"
          size="small"
        >{{operation.label}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import TableColumns from "./TableColumns.vue";

export default {
  components: {
    TableColumns,
  },
  props: {
    datasource: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    operations: {
      type: Array,
    },
  },
  methods: {
    operate(operation, index) {
      this.$emit("operate", { operate: operation.field, index });
    },
  },
};
</script>

<style scoped>
.el-table th > .cell {
  text-align: center;
}
</style>