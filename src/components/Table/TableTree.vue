<template>
  <div class="wrapper">
    <div class="mask" v-if="openDialog">
      <CustomForm
        class="dialog"
        :datasource="formData"
        @save="handleFormSave"
        @cancel="handleFormCancel"
      />
    </div>
    <el-table
      class="table"
      :data="tableData"
      :border="border"
      :indent="indent"
      :lazy="lazy"
      :load="load"
    >
      <!-- 层级展开 -->
      <el-table-column type="expand" v-if="canExpand">
        <template slot-scope="props">
          <TableTree
            :tableData="props.row.children"
            :tableColumns="getTableColumnsChildren(tableColumns)"
            :border="border"
            :indent="indent"
            :lazy="lazy"
            :index="props.$index"
            :operations="operations"
            @update="handleUpdate"
          />
        </template>
      </el-table-column>
      <!-- 本级内容 -->
      <el-table-column
        v-for="{ field, label } in filterTableColumns(tableColumns)"
        :key="field"
        :prop="field"
        :label="label"
        width="180"
      />
      <!-- 本级操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-for="operation in operations"
            :key="operation.field"
            @click="operate(operation, scope.$index)"
            :type="
              operation.field == 'del'
                ? 'danger'
                : operation.field == 'edit'
                ? 'primary'
                : 'text'
            "
            size="mini"
            :disabled="isDisabled(operation.field, scope.$index)"
            >{{ operation.label }}</el-button
          >
        </template>
      </el-table-column>
      <template slot="append">
        <div class="append-row" @click="append">+</div>
      </template>
    </el-table>
  </div>
</template>


<script>
import { tableColumns, tableData, operations } from "./mock";
import CustomForm from "@/components/Form";
import { convertToFormData } from "./helpers";

export default {
  name: "TableTree",

  components: {
    CustomForm,
  },

  props: {
    border: {
      type: Boolean,
      default: false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    indent: {
      type: Number,
      default: 32,
    },
    tableColumns: {
      type: Array,
      default: () => tableColumns,
    },
    tableData: {
      type: Array,
      default: () => tableData,
    },
    operations: {
      type: Array,
      default: () => operations,
    },
    index: {
      type: Number,
    }
  },

  data() {
    return {
      formData: [],
      openDialog: false,
      currIndex: -1,
      store: this.tableData,
      isRevised: false,
    };
  },

  computed: {
    canExpand() {
      return (
        this.tableColumns.findIndex((item) => item.mode === "multiple") !== -1
      );
    },
  },

  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      }, 1000);
    },
    filterTableColumns(arr) {
      return arr.filter((item) => item.mode == "single");
    },
    getTableColumnsChildren(arr) {
      const item = this.tableColumns.find((item) => item.mode === "multiple");
      return item.children;
    },
    handleFormSave(formData) {
      const msg = {};
      formData.forEach(({ field, value }) => {
        msg[field] = value;
      });
      this.$emit("save", msg);
      console.log({ formData, msg })
      if (this.isRevised) {
        const item = this.store[this.currIndex]
        Object.assign(item, msg)
        this.store.splice(this.currIndex, 1, item)
        this.isRevised = false
      } else {
        if (this.canExpand) {
          Object.assign(msg, { children: [] })
        }
        this.store.push(msg)
      }
      this.openDialog = false;
      this.$emit('update', this.index, this.store)
    },
    handleFormCancel(formData) {
      this.isRevised = false
      this.openDialog = false;
    },
    operate(operation, index) {
      switch (operation.field) {
        case "edit":
          this.currIndex = index
          this.formData = convertToFormData(
            this.tableColumns,
            this.store[index]
          );
          this.isRevised = true
          this.openDialog = true;
          return
        case "del":
          this.store.splice(index, 1);
          break;
        case "up":
          this.store.splice(
            index - 1,
            2,
            this.store[index],
            this.store[index - 1]
          );
          break;
        case "down":
          this.store.splice(
            index,
            2,
            this.store[index + 1],
            this.store[index]
          );
          break;
        default:
          break;
      }
      this.$emit('update', this.index, this.store)
    },
    append() {
      this.formData = convertToFormData(this.tableColumns);
      this.openDialog = true
      this.$emit("append");
    },
    isDisabled(field, index) {
      return (
        (field == "up" && index == 0) ||
        (field == "down" && index == this.store.length - 1)
      );
    },
    handleUpdate(index, store) {
      console.log('handleUpdate')
      console.log(index)
      console.log(store)
      if (typeof index !== 'undefined') {
        Object(this.store[index], { children: store })
        this.$emit('update', this.store)
      }
    }
  },
};
</script>


<style lang="less" scoped>
.wrapper {
  position: relative;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.5);
    .dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 auto;
      min-width: 720px;
      max-width: 960px;
      background-color: #fff;
    }
  }
  .table {
    width: 100%;
  }
  .append-row {
    font-weight: lighter;
    font-size: 24px;
    line-height: 48px;
    text-align: center;
    color: #409eff;
    border: 1px dashed #ebeef5;
  }
}
</style>