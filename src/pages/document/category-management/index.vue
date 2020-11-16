<template>
  <main class="main" v-if="!loading" :style="{ margin }">
    <SkinSelect
      class="top-right"
      :list="skins"
      @save="handleSkinModify"
      @append="handleSkinAppend"
      @del="handleSkinDel"
      @change="handleSkinChange"
    />
    <component
      v-for="(data, idx) in list"
      :key="data.id"
      :is="data.type"
      :initial="data"
      @up="handleUp(idx)"
      @down="handleDown(idx)"
      @del="handleDel(idx)"
      :moveable="moveable(idx)"
    />
    <Affix :pos="{ bottom: '60px', right: '20px' }">
      <SideBar :list="bars" @click="handleOperate" />
    </Affix>
  </main>
</template>


<script>
import Container from "@/components/TableForm/Container";
import Panel from "@/components/TableForm/Panel";
import SkinSelect from "@/components/SkinSelect";
import Affix from "@/components/Affix";
import SideBar from "@/components/SideBar";
import { StaticPage /* , StaticCategory */, HomePage } from "@/services";
import dragList from "./dragList";

export default {
  components: {
    Container,
    Panel,
    Affix,
    SideBar,
    SkinSelect,
  },

  props: {
    margin: {
      type: String,
    },
    top: {
      type: String,
    },
  },

  data() {
    return {
      loading: true,
      list: [],
      bars: [
        {
          // link: "wwww.baidu.com",
          icon: "/svg/save.svg",
          text: "保存",
          operate: "save",
        },
        {
          // link: "wwww.baidu.com",
          icon: "/svg/view.svg",
          text: "预览",
          operate: "preview",
        },
        {
          // link: "wwww.baidu.com",
          icon: "/svg/publish.svg",
          text: "发布",
          operate: "publish",
        },
      ],
      show: false,
      rawData: null,
      pageId: "",
      meta: {},
      options: [],
      skins: [],
    };
  },

  computed: {
    categoryId() {
      return this.$route.params.categoryId;
    },
  },

  watch: {
    categoryId() {
      this.fetchData(this.categoryId);
    },
  },

  methods: {
    fetchData(categoryId = "1322091185514217474") {
      this.loading = true;
      StaticPage.query(categoryId).then((res) => {
        if (res.result.pageId) {
          this.loading = false;
          this.pageId = res.result.pageId;
          const content = res.result.content || "{}";
          this.rawData = JSON.parse(content);
          const { data = dragList, ...meta } = JSON.parse(content);
          this.meta = meta;
          // this.list = data;
          this.list = dragList;
        }
      });
    },
    handleUp(idx) {
      if (this.value) {
        this.value.splice(idx - 1, 2, this.value[idx], this.value[idx - 1]);
      } else {
        this.list.splice(idx - 1, 2, this.list[idx], this.list[idx - 1]);
      }
    },
    handleDown(idx) {
      if (this.value) {
        this.value.splice(idx, 2, this.value[idx + 1], this.value[idx]);
      } else {
        this.list.splice(idx, 2, this.list[idx + 1], this.list[idx]);
      }
    },
    handleDel(idx) {
      if (confirm("确定删除？")) {
        if (this.value) {
          this.value.splice(idx, 1);
        } else {
          this.list.splice(idx, 1);
        }
      }
    },
    moveable(idx) {
      return idx == 0 ? "down" : idx == this.list.length - 1 ? "up" : "updown";
    },
    handleOperate(operate) {
      switch (operate) {
        case "save":
          const data = { ...this.meta, data: this.list };
          StaticPage.update({
            pageId: this.pageId,
            content: JSON.stringify(data),
          });
          break;
        case "preview":
          break;
        case "publish":
          break;
        default:
          break;
      }
    },
    handleMetaChange(meta) {
      this.meta = meta;
    },
    goTo(categoryIds = []) {
      const categoryId = categoryIds.slice(-1)[0];
      if (categoryId && categoryId !== this.categoryId) {
        this.$router.push(`/official/static/content/${categoryId}`);
      }
    },
    handleSkinAppend(formData) {
      const data = {
        plateKeywords: formData.find((item) => item.field == "slug").value,
        plateName: formData.find((item) => item.field == "theme").value,
      };
      const template = formData.find((item) => item.field == "template").value;
      if (template) {
        const skin = this.skins.find((item) => item.theme == template);
        Object.assign(data, {
          infoId: skin.id,
          templateCreated: true,
        });
      }
      HomePage.add(data).then((res) => {
        this.skins = res.result.map((item) => {
          return {
            id: item.infoId,
            theme: item.plateName,
            slug: item.plateKeywords,
          };
        });
      });
    },
    handleSkinDel(idx) {
      const { id } = this.skins[idx];
      HomePage.delete(id).then((res) => {
        this.skins = this.skins.filter((item) => item.id !== id);
      });
    },
    handleSkinChange(option) {
      this.infoId = this.skins.find((item) => item.theme == option).id;
      this.fetchData(this.infoId);
    },
  },
  mounted() {
    this.fetchData(this.categoryId);
    HomePage.list().then((res) => {
      this.skins = res.result.map((item) => {
        return {
          id: item.infoId,
          theme: item.plateName,
          slug: item.plateKeywords,
        };
      });
    });
  },
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
  min-height: 85vh;
  .top-right {
    position: absolute;
    top: -0px;
    right: 30px;
    z-index: 100000;
  }
}
</style>
