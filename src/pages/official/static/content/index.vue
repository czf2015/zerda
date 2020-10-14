<template>
  <div class="staticpage-content">
    <el-card>
      <div slot="header">
        <!-- <h3> -->
        <el-cascader
          placeholder="请选择或搜素要编辑的页面"
          :options="options"
          size="mini"
          @change="goToNewPage"
          filterable>
          <p slot="reference" slot-scope="{ node }" style="display: block">
            {{node.label}}
          </p>
        </el-cascader>
        <!-- </h3> -->
      </div>
      <el-container style="backgroundColor: #fafafa">
      <!-- <el-aside width="200px" style="padding: 20px 10px 20px 20px; display: none">
        <el-card shadow="hover">
          <div slot="header" class="card-header">
          </div>
          <div class="card-body-left">
            <draggable v-model="modelData" :options="{group:{name: 'staticPage',pull:'clone'},sort: true}" animation="300" @end="originTEdit">
              <transition-group>
            <div v-for="(componentData, index) in modelData" :key="componentData.componentId + index">{{componentData.title}}</div>
              </transition-group>
            </draggable>
          </div>
        </el-card>
      </el-aside> -->

        <el-main>
          <!-- <draggable v-model="contentData" group="staticPage" animation="300" @end="editTOrigin" @start="onMove">
            <transition-group> -->
              <div class="component-container" v-for="(componentData, index) in contentData" :key="componentData.componentId + index">
                <component 
                  :componentData="componentData"
                  :index="index"
                  :is="componentData.componentId"
                  :upDateContentData="upDateContentData"
                />
              </div>
            <!-- </transition-group>
          </draggable> -->
        </el-main>
      </el-container>
    </el-card>
    <!-- <div class="model-container">
      <p @click="showModel = !showModel">
        <i class="el-icon-star-on"/>
      </p>
      <div :class="showModel ? 'showModel' : ''">
        <draggable v-model="modelData" :options="{group:{name: 'staticPage',pull:'clone'},sort: true}" animation="300" @end="originTEdit">
          <transition-group>
            <div class="model" v-for="(componentData, index) in modelData" :key="componentData.componentId + index">{{componentData.title}}</div>
          </transition-group>
        </draggable>
      </div>
    </div> -->
  </div>
</template>

<script>
// import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import BcsicInfo from './BcsicInfo'
import Banner from './Banner'
import HTML from './HTML'


export default {
  name: 'StaticPageContent',
  components: { BcsicInfo, Banner, HTML },
  data() {
    return {
      moveId: -1,
      contentData: [
        {
          componentId: 'BcsicInfo',
          title: '页面元信息',
          pageTitle: '',
          SEOKeyWords: '',
          SEOKeyDescription: '',
          definitionCSS: '',
          definitionJS: '',
        },
        {
          componentId: 'Banner',
          title: 'Banner',
          buttonList: [
            {
              buttonName: '123',
              buttonLink: '123',
              buttonType: '111'
            },
          ]
        },
        {
          componentId: 'HTML',
          title: 'HTML内容'
        }
      ],
      modelData: [
        {
          componentId: 'BcsicInfo',
          title: '页面元信息'
        },
        {
          componentId: 'Banner',
          title: 'Banner'
        },
        {
          componentId: 'HTML',
          title: 'HTML内容'
        }
      ],
       options: [{
          value: 'zhinan',
          label: '指南',
          type: 'node',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            type: 'leaf',
            status: 'on'
          }, {
            value: 'daohang',
            label: '导航',
            type: 'leaf',
            status: 'off'
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            type: 'leaf',
            status: 'on'
          }, {
            value: 'form',
            label: 'Form',
            type: 'leaf',
            status: 'off'
          }, {
            value: 'data',
            label: 'Data',
            type: 'leaf',
            status: 'on'
          }, {
            value: 'notice',
            label: 'Notice',
            type: 'leaf',
            status: 'on'
          }, {
            value: 'navigation',
            label: 'Navigation',
            type: 'leaf',
            status: 'on'
          }, {
            value: 'others',
            label: 'Others',
            type: 'leaf',
            status: 'on'
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components',
            type: 'leaf',
            status: 'on'
          }, {
            value: 'sketch',
            label: 'Sketch Templates',
            type: 'leaf',
            status: 'off'
          }, {
            value: 'jiaohu',
            label: '组件交互文档',
            type: 'leaf',
            status: 'on'
          }]
        }], 
      showModel: false,
      pageId: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.pageId = this.$route.params.pageId
    if(this.pageId) {
      this.getPageData()
    }
    console.log(this.$route.params)
  },
  beforeDestroy() {
  },
  methods: {
    handleExpandChange(expandArr) {
      this.expandArr = expandArr
    },
    originTEdit(e) {
      return
    },
    editTOrigin(e) {
      const that = this
      const items = this.modelData.filter((m) => {
        return m.componentId === that.moveId
      })
      // //如果编辑到模板
      if(items.length<2) return;
      this.modelData.splice(e.newDraggableIndex, 1)
    },
    onMove(e,originalEvent) {
      console.log(e.oldDraggableIndex)
      this.moveId=this.contentData[e.oldDraggableIndex].componentId;
    },
    upDateContentData(dataType, newData) {
      let index = -1
      switch(dataType) {
        case 'BcsicInfo':
          index = 0
          break
        case 'Banner':
          index = 1
          break
        case 'HTML':
          index = 2
          break
        default :
          return
      }
      this.contentData.splice(index, 1, newData)
    },
    goToNewPage(idList) {
      if(this.pageId === idList[1]) return;
      this.pageId = idList[1]
      this.$router.push({ path: '/official/static/content/' + idList[1]});
    },
    getPageData() {
      console.log(this.pageId)
    }
  }
}
</script>

<style lang="less" scoped>
.staticpage-content{
  /deep/ .el-card{
    input{
      min-width: 120px; 
    }
  }
}
.model-container{
  display: none;
  position: fixed;
  top: 100px;
  right: 0;
  width: 50px;
  height: 50px;
  background-color: #fff;
  cursor: pointer;
  >p{
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
  >div{
    position: absolute;
    width: 150px;
    height: auto;
    top: 50px;
    right: -150px;
    padding: 20px;
    line-height: 20px;
    background-color: #fff;
    border: 1px solid #EBEEF5;
    box-sizing: border-box;
    transform: translateX(0);
    transition: 1s all;
    .model{
      text-align: center;
      height: 35px;
      line-height: 35px;
      border: 1px solid #EBEEF5;
      margin-bottom: 20px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
  .showModel{
    transform: translateX(-150px);
    // transition: 1s all;
  }
}
.component-container{
  margin-bottom: 20px;
}
</style>
