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
import { StaticCategory, StaticPage } from "@/services";
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
      const { categoryId, categoryType } = node.data
      StaticCategory.delete(categoryId).then(() => {
        this.loadData();
        if (categoryType == 'item' || categoryType == '菜单链接') {
          StaticPage.delete(categoryId).catch(err => {
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
      StaticCategory.add(data).then(({ categoryId }) => {
        this.loadData();
        if (data.categoryType == 'item' || categoryType == '菜单链接') {
          StaticPage.add({ categoryId, content: '' }).catch(err => {
            alert(err)
          })
        }
      });
    },
    handleUpdate({ categoryId, categoryKeywords, categoryName, categoryType, pid }) {
        const data = { categoryId, categoryKeywords, categoryName, categoryType: categoryType == '菜单组' ? 'directory' : 'item', pid }
        StaticCategory.update(data).then(() => {
            this.loadData()
        })
    },
    goTo(categoryIds) {
      this.$router.push(`/official/static/content/${categoryIds.pop()}`);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>