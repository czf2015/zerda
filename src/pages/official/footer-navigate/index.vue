<template>
  <main class="main" v-if="!loading">
    <TabTree ref="navigate" :panelDatas="panelDatas" @update="handleUpdate" />
    <Affix :pos="{ bottom: '60px', right: '20px' }">
      <SideBar :list="bars" @click="handleOperate" />
    </Affix>
  </main>
</template>


<script>
import TabTree from "@/components/TabTree";
import Affix from "@/components/Affix";
import SideBar from "@/components/SideBar";
import { FooterInfo } from "@/services";
import { tableColumns, tableColumns_1 } from "@/components/Table/mock";

export default {
  name: "FooterNavigate",

  components: {
    TabTree,
    Affix,
    SideBar,
  },

  data() {
    return {
      loading: true,
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
      // panelDatas: ["服务配置", "导航配置", "推荐配置"].map((category) => {
      //   return {
      //     category,
      //     tableData: JSON.parse(JSON.stringify(tableData)),
      //   };
      // }),
      panelDatas: [],
      id: '',
    };
  },

  methods: {
    handleOperate(operate) {
      switch (operate) {
        case "save":
          FooterInfo.update({
            id: this.id,
            content: JSON.stringify(this.panelDatas),
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
    handleUpdate(idx, store) {
      this.panelDatas.splice(idx, store);
    },
  },

  mounted() {
    FooterInfo.query().then((res) => {
      this.loading = false;
      const {
        result: { id, content },
      } = res;
      this.id = id
      this.panelDatas = JSON.parse(content).map(item => {
        return {
          ...item,
          columns: item.category == '服务配置' ? tableColumns_1 : tableColumns,
        }
      });
    });
  },
};
</script>