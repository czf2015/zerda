<template>
  <div class="staticpage-content">
    <el-card>
      <div slot="header">
        <h3>官网静态页面内容管理</h3>
      </div>
      <el-container style="backgroundColor: #fafafa">
      <el-aside width="200px" style="padding: 20px 10px 20px 20px">
        <el-card shadow="hover">
          <!-- <div slot="header" class="card-header">
          </div> -->
          <div class="card-body-left">
            <!-- <draggable v-model="modelData" :options="{group:{name: 'staticPage',pull:'clone'},sort: true}" animation="300" @end="originTEdit">
              <transition-group> -->
                <div v-for="(componentData, index) in modelData" :key="componentData.componentId + index">{{componentData.title}}</div>
              <!-- </transition-group>
            </draggable> -->
          </div>
        </el-card>
      </el-aside>

      <el-main>
        <draggable v-model="contentData" group="staticPage" animation="300" @end="editTOrigin" @start="onMove">
          <transition-group>
            <div class="component-container" v-for="(componentData, index) in contentData" :key="componentData.componentId + index">
              <component 
                :componentData="componentData"
                :index="index"
                :is="componentData.componentId"
                :upDateContentData="upDateContentData"
              />
            </div>
          </transition-group>
        </draggable>
      </el-main>
    </el-container>
    </el-card>
    <div class="model-container">
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
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import BcsicInfo from './BcsicInfo'
import Banner from './Banner'
import HTML from './HTML'


export default {
  name: 'StaticPageContent',
  components: { draggable, BcsicInfo, Banner, HTML },
  data() {
    return {
      moveId: -1,
      contentData: [
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
      showModel: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    handleExpandChange(expandArr) {
      this.expandArr = expandArr
    },
    handleadd(index) {
      this.actionType = 'add'
      this.$refs['NavigateDialog'].showDialog(this.actionType, { expandArr: this.expandArr, index })
    },
    handleEdit(node) {
      this.actionType = 'edit'
      this.$refs['NavigateDialog'].showDialog(this.actionType, node)
      this.visible = ''
    },
    handleRemove(node) {
      this.$refs['NavigateRemove'].showDialog(node)
      this.visible = ''
    },
    showMenu(e, node, data) {
      if (e.which === 1) {
        this.visible = ''
        return
      }
      this.visible = node.label
    },
    originTEdit(e) {
      return
      // console.log(e)
      // var that=this;
      // var  items=this.contentData.filter(function(m){
      //   return  m.componentId==that.moveId
      // })
      //如果模板到编辑
      // if(items.length<2) return;
      // this.contentData.splice(e.newDraggableIndex, 1)
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
    upDateContentData(actionType, index, newData) {
      switch(actionType) {
        case 'add':
          break
        case 'edit':
          this.contentData.splice(index, 1, newData)
          break
        case 'remove':
          this.contentData.splice(index, 1)
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.staticpage-content{
  /deep/ .el-container{
    .el-aside{
      .el-card__body{
        min-height: 500px;
      }
    }
    .el-main{}
  }
}
.model-container{
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
