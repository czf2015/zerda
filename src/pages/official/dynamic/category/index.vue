<template>
  <CategoryManage
    :options="options"
    :columns="columns"
    @change="goTo"
    @add="handleAdd"
    @delete="handleDelete"
    @update="handleUpdate"
  />
</template>


<script>
import CategoryManage from "@/components/Cascader/Editable";
import { options } from "@/mock/cascader";
import { DynamicCategory } from "@/services";
import { convert, columns } from "./helpers";

export default {
  components: {
    CategoryManage,
  },
  data() {
    return {
      options: [],
      columns,
    };
  },
  methods: {
    loadData() {
      DynamicCategory.query().then((res) => {
        this.options = convert(res.result);
        console.log(this.options);
      });
    },
    handleDelete(node) {
      DynamicCategory.delete(node.data.categoryId).then(() => {
        this.loadData();
      });
    },
    handleAdd(data) {
      Object.assign(data, {
        categoryType: data.categoryType == "菜单组" ? "directory" : "item",
      });
      DynamicCategory.add(data).then(() => {
        this.loadData();
      });
    },
    handleUpdate({ categoryId, categoryKeywords, categoryName, categoryType, pid }) {
        const data = { categoryId, categoryKeywords, categoryName, categoryType: categoryType == '菜单组' ? 'directory' : 'item', pid }
        DynamicCategory.update(data).then(() => {
            this.loadData()
        })
    },
    goTo(link) {
      console.log(link);
      this.$router.push("/official/dynamic/content/1");
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>