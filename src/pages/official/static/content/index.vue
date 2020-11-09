<template>
  <div class="staticpage-content">
    <el-card>
      <div slot="header">
        <el-cascader
          placeholder="请选择或搜素要编辑的页面"
          :options="options"
          size="mini"
          @change="goToNewPage"
          filterable
        >
          <p slot="reference" slot-scope="{ node }" style="display: block">
            {{ node.label }}
          </p>
        </el-cascader>
      </div>
      <el-container style="backgroundcolor: #fafafa">
        <el-main>
          <div
            class="component-container"
            v-for="(componentData, index) in contentData"
            :key="componentData.componentId + index"
          >
            <component
              :componentData="componentData"
              :index="index"
              :is="componentData.componentId"
              :updateContentData="updateContentData"
            />
          </div>
        </el-main>
      </el-container>
    </el-card>
    <Affix :pos="{ bottom: '60px', right: '20px' }">
      <SideBar :list="bars" @click="handleOperate" />
    </Affix>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BasicInfo from "./BasicInfo";
import Banner from "./Banner";
import HTML from "./HTML";
import Affix from "@/components/Affix";
import SideBar from "@/components/SideBar";
import { StaticPage } from "@/services";

export default {
  name: "StaticPageContent",

  components: { BasicInfo, Banner, HTML, Affix, SideBar },

  data() {
    return {
      moveId: -1,
      contentData: [
        {
          componentId: "BasicInfo",
          title: "页面元信息",
          pageTitle: "",
          SEOKeyWords: "",
          SEOKeyDescription: "",
          definitionCSS: "",
          definitionJS: "",
        },
        {
          componentId: "Banner",
          title: "Banner",
          buttonList: [
            {
              buttonName: "123",
              buttonLink: "123",
              buttonType: "111",
            },
          ],
        },
        {
          componentId: "HTML",
          title: "HTML内容",
        },
      ],
      modelData: [
        {
          componentId: "BasicInfo",
          title: "页面元信息",
        },
        {
          componentId: "Banner",
          title: "Banner",
        },
        {
          componentId: "HTML",
          title: "HTML内容",
        },
      ],
      options: [
        {
          value: "zhinan",
          label: "指南",
          type: "node",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              type: "leaf",
              status: "on",
            },
            {
              value: "daohang",
              label: "导航",
              type: "leaf",
              status: "off",
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              type: "leaf",
              status: "on",
            },
            {
              value: "form",
              label: "Form",
              type: "leaf",
              status: "off",
            },
            {
              value: "data",
              label: "Data",
              type: "leaf",
              status: "on",
            },
            {
              value: "notice",
              label: "Notice",
              type: "leaf",
              status: "on",
            },
            {
              value: "navigation",
              label: "Navigation",
              type: "leaf",
              status: "on",
            },
            {
              value: "others",
              label: "Others",
              type: "leaf",
              status: "on",
            },
          ],
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
              type: "leaf",
              status: "on",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
              type: "leaf",
              status: "off",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
              type: "leaf",
              status: "on",
            },
          ],
        },
      ],
      showModel: false,
      pageId: "",
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
      loading: true,
    };
  },

  computed: {
    ...mapGetters(["name"]),
    categoryId() {
      return this.$route.params.categoryId;
    },
  },

  methods: {
    handleExpandChange(expandArr) {
      this.expandArr = expandArr;
    },
    originTEdit(e) {
      return;
    },
    editTOrigin(e) {
      const that = this;
      const items = this.modelData.filter((m) => {
        return m.componentId === that.moveId;
      });
      // //如果编辑到模板
      if (items.length < 2) return;
      this.modelData.splice(e.newDraggableIndex, 1);
    },
    onMove(e, originalEvent) {
      console.log(e.oldDraggableIndex);
      this.moveId = this.contentData[e.oldDraggableIndex].componentId;
    },
    updateContentData(dataType, newData) {
      let index = -1;
      switch (dataType) {
        case "BasicInfo":
          index = 0;
          break;
        case "Banner":
          index = 1;
          break;
        case "HTML":
          index = 2;
          break;
        default:
          return;
      }
      // console.log(newData);
      this.contentData.splice(index, 1, newData);
    console.log(this.contentData)
    },
    goToNewPage(idList) {
      if (this.pageId === idList[1]) return;
      this.pageId = idList[1];
      this.$router.push({ path: "/official/static/content/" + idList[1] });
    },
    getPageData() {
      console.log(this.pageId);
    },
    fetchData(categoryId = "1322091185514217474") {
      this.loading = true;
      StaticPage.query(categoryId).then((res) => {
        if (res.result.pageId) {
          this.loading = false;
          this.pageId = res.result.pageId;
          const content = res.result.content || "{}";
          this.rawData = JSON.parse(content);
          // this.list = JSON.parse(content).data || [];
          // this.dragList = JSON.parse(JSON.stringify(this.list));
        }
      });
    },
    handleOperate(operate) {
      switch (operate) {
        case "save":
          const data = { ...this.rawData, data: this.list };
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
  },

  mounted() {
    // this.pageId = this.$route.params.pageId;
    // if (this.pageId) {
    //   this.getPageData();
    // }
    // console.log(this.$route.params);
    this.fetchData(this.categoryId);
  },

  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
.staticpage-content {
  /deep/ .el-card {
    input {
      min-width: 120px;
    }
  }
}
.model-container {
  display: none;
  position: fixed;
  top: 100px;
  right: 0;
  width: 50px;
  height: 50px;
  background-color: #fff;
  cursor: pointer;
  > p {
    width: 30px;
    height: 30px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    line-height: 30px;
    background-color: blue;
    border-radius: 30px;
    font-size: 30px;
    color: #fff;
  }
  > div {
    position: absolute;
    width: 150px;
    height: auto;
    top: 50px;
    right: -150px;
    padding: 20px;
    line-height: 20px;
    background-color: #fff;
    border: 1px solid #ebeef5;
    box-sizing: border-box;
    transform: translateX(0);
    transition: 1s all;
    .model {
      text-align: center;
      height: 35px;
      line-height: 35px;
      border: 1px solid #ebeef5;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .showModel {
    transform: translateX(-150px);
    // transition: 1s all;
  }
}
.component-container {
  margin-bottom: 20px;
}
</style>
