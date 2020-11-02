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
import { DynamicCategory, DynamicPage } from "@/services";
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
      const { categoryId, categoryType } = node.data
      console.log(node.data)
      DynamicCategory.delete(categoryId).then(() => {
        this.loadData();
        if (categoryType == 'item' || categoryType == '菜单链接') {
          DynamicPage.delete(categoryId).catch(err => {
            alert(err)
          })
        }
      });
    },
    handleAdd(data) {
      const { categoryType } = data
      Object.assign(data, {
        categoryType: categoryType == "菜单组" ? "directory" : "item",
      });
      DynamicCategory.add(data).then(({ categoryId }) => {
        this.loadData();
        if (data.categoryType == 'item' || categoryType == '菜单链接') {
          DynamicPage.add({ categoryId, content: '' }).catch(err => {
            alert(err)
          })
        }
      });
    },
    handleUpdate({ categoryId, categoryKeywords, categoryName, categoryType, pid }) {
        const data = { categoryId, categoryKeywords, categoryName, categoryType: categoryType == '菜单组' ? 'directory' : 'item', pid }
        DynamicCategory.update(data).then(() => {
            this.loadData()
        })
    },
    goTo(categoryIds) {
      this.$router.push(`/official/dynamic/content/${categoryIds.pop()}`);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>