<template>
  <el-pagination
    :layout="layout"
    :total="total"
    :page-size="pageSize"
    :current-page.sync="currentPage"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>


<script>
export default {
  props: {
    layout: {
      type: String,
      default: "total, prev, pager, next, jumper",
    },
    total: {
      type: Number,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>