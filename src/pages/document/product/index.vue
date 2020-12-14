<template>
  <div class="product-management">
    <div>
      <el-card shadow="hover" class="product-management-header">
        <span>请选择：</span>
        <el-select v-model="platform" placeholder="请选择">
          <el-option
            v-for="item in platforms"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="catalogId" placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" @click="handleAdd">新增产品</el-button>
      </el-card>
      <el-card shadow="hover" class="product-management-body">
        <TableForm
          ref="table"
          :columns="columns"
          :datasource="datasource"
          :operations="operations"
          :hasAppendRow="false"
          @edit="handleEdit"
          @save="handleSave"
          @del="handleDelete"
          @append="handleAppend"
        />
        <Pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="100"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import TableForm from "@/components/TableForm";
import { Document } from "@/services";
import { platforms, columns, operations, extract } from "./helpers";

export default {
  name: "CategoryManagement",
  components: { Pagination, TableForm },
  data() {
    return {
      platform: "1",
      platforms,
      categories: [],
      catalogId: "",
      columns,
      datasource: [],
      operations,
      editIndex: -1,
    };
  },
  methods: {
    handleCurrentChange() {},
    handleSizeChange() {},
    queryCategory() {
      Document.queryCategory({
        pageNum: 1,
        pageSize: 100,
        platform: this.platform,
      }).then((res) => {
        this.categories = res.result.map((item) => {
          return {
            label: item.cnName,
            value: item.catalogId,
          };
        });
        this.catalogId = this.categories[0].value;
      });
    },
    queryProduct(catalogId) {
      Document.queryProduct({
        pid: catalogId,
        pageNum: 1,
        pageSize: 100,
      }).then((res) => {
        // console.log(res);
        this.datasource = res.result;
      });
    },
    handleEdit(index) {
      this.editIndex = index;
    },
    handleSave(val) {
      const newVal = { ...this.datasource[this.editIndex], ...extract(val) };
      Document.updateProduct(newVal).then((res) => {
        this.datasource.splice(this.editIndex, 1, newVal);
      });
    },
    handleDelete(index) {
      console.log("delete");
      console.log(index);
      const { catalogId } = this.datasource[index]
      Document.deleteProduct(catalogId).then(res => {
        this.datasource.splice(index, 1)
      })
    },
    handleAdd() {
      this.$refs.table.handleTableAppend();
    },
    handleAppend(val) {
      console.log("append");
      const newVal = {
        platform: this.platform,
        pid: this.catalogId,
        ...extract(val),
      };
      console.log(newVal)
      Document.addProduct(newVal).then((res) => {
        this.queryCategory()
      });
    },
  },
  watch: {
    platform() {
      this.queryCategory();
    },
    catalogId() {
      this.queryProduct(this.catalogId);
    },
  },
  mounted() {
    this.queryCategory();
  },
};
</script>

<style lang="scss" scoped>
.product-management {
  padding: 15px;
  &-header {
    margin-bottom: 30px;
    .el-select {
      margin-right: 20px;
    }
  }
  &-body {
    a {
      color: #66b1ff;
    }
    .pagination-container {
      text-align: right;
      margin: 20px 0;
    }
  }
}
</style>
