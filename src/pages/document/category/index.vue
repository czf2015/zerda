<template>
  <main class="main">
    <Select
      class="top-right"
      :list="skins"
      :editable="false"
      @change="handleSelectChange"
    />
    <TableForm
      v-if="!loading"
      :datasource="datasource"
      :columns="columns"
      :operations="operations"
      @edit="handleTableEdit"
      @save="handleTableSave"
      @append="handleTableAppend"
      @del="handleTableDelete"
    />
    <Affix :pos="{ bottom: '60px', right: '20px' }">
      <SideBar :list="bars" @click="handleOperate" />
    </Affix>
  </main>
</template>


<script>
import TableForm from "@/components/TableForm";
import Select from "@/components/SkinSelect";
import Affix from "@/components/Affix";
import SideBar from "@/components/SideBar";
import { Document } from "@/services";
import { columns, operations, bars, skins, extract } from "./helpers";

export default {
  components: {
    TableForm,
    Affix,
    SideBar,
    Select,
  },

  data() {
    return {
      loading: true,
      datasource: [],
      columns,
      operations,
      bars,
      skins,
      platform: "1",
      editIndex: -1,
    };
  },

  methods: {
    fetchData(params = { pageNum: 1, pageSize: 10, platform: "1" }) {
      this.loading = true;
      Document.queryCategory(params).then((res) => {
        this.loading = false;
        this.datasource = res.result;
      });
    },
    handleSelectChange(platformName) {
      switch (platformName) {
        case "租户端":
          this.platform = "1";
          this.fetchData();
          break;
        case "用户端":
          this.platform = "2";
          this.fetchData({ pageNum: 1, pageSize: 10, platform: "2" });
          break;
        default:
          break;
      }
    },
    handleTableEdit(index) {
      this.editIndex = index;
    },
    handleTableSave(val) {
      const newVal = { ...this.datasource[this.editIndex], ...extract(val) };
      Document.updateCategory(newVal).then((res) => {
        this.datasource.splice(this.editIndex, 1, newVal);
      });
    },
    handleTableAppend(val) {
      const newVal = { platform: this.platform, ...extract(val) }
      Document.addCategory(newVal).then((res) => {
        this.fetchData({ platform: this.platform, pageNum: 1, pageSize: 10, })
      });
    },
    handleTableDelete(index) {
      const { catalogId } = this.datasource[index];
      Document.deleteCategory(catalogId).then((res) => {
        this.datasource.splice(index, 1);
      });
    },
    handleOperate(operate) {
      switch (operate) {
        case "preview":
          break;
        case "publish":
          break;
        default:
          break;
      }
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
  min-height: 85vh;
  .top-right {
    position: absolute;
    top: -80px;
    right: 30px;
    z-index: 100000;
  }
}
</style>
