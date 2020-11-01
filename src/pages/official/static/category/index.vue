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
import { StaticCategory } from "@/services";
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
      StaticCategory.query().then((res) => {
        this.options = convert(res.result);
        console.log(this.options);
      });
    },
    handleDelete(node) {
      StaticCategory.delete(node.data.categoryId).then(() => {
        this.loadData();
      });
    },
    handleAdd(data) {
      Object.assign(data, {
        categoryType: data.categoryType == "菜单组" ? "directory" : "item",
      });
      StaticCategory.add(data).then(() => {
        this.loadData();
      });
    },
    handleUpdate({ categoryId, categoryKeywords, categoryName, categoryType, pid }) {
        const data = { categoryId, categoryKeywords, categoryName, categoryType: categoryType == '菜单组' ? 'directory' : 'item', pid }
        StaticCategory.update(data).then(() => {
            this.loadData()
        })
    },
    goTo(link) {
      console.log(link);
      this.$router.push("/official/static/content/1");
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>