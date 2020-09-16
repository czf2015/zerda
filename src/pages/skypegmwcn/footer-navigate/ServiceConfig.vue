<template>
  <div>
    <p style="textAlign: right; marginBottom: 15px">
      <el-button type="primary">添加记录</el-button>
    </p>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="title"
        label="标题"
        width="180"
      />
      <el-table-column
        prop="imgLink"
        label="图片链接"
        width="180"
      />
      <el-table-column
        prop="link"
        label="链接"
        width="180"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <p>
            <el-link type="primary" :underline="false" @click="handleClick('edit', scope.row)">编辑</el-link>
            <span style="margin: 0 5px; color: #cccccc;">|</span>
            <el-link type="primary" :underline="false" @click="handleRemove(scope.row)">删除</el-link>
          </p>
          <p>
            <el-link 
              :type="!scope.$index ? 'info' : 'primary'" 
              :underline="false" 
              @click="handleMove(-1, scope.$index)" 
              :disabled="!scope.$index"
            >
              上移
            </el-link>
            <span style="margin: 0 5px; color: #cccccc;">|</span>
            <el-link 
              :type="scope.$index === (tableData.length - 1) ? 'info' : 'primary'" 
              :underline="false" 
              @click="handleMove(1, scope.$index)" 
              :disabled="scope.$index === (tableData.length - 1)"
            >
              下移
            </el-link>
          </p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ServiceConfig',
  components: {  },
  props: {
    // actionType: {
    //   type: String,
    //   default: 'add'
    // }
  },
  data() {
    return {
      tableData: [
        {
          title: '123',
          imgLink: '100',
          link: '王小虎',
        },
        {
          title: '234',
          imgLink: '100',
          link: '王小虎',
        },
        {
          title: '345',
          imgLink: '100',
          link: '王小虎',
        },
        {
          title: '456',
          imgLink: '100',
          link: '王小虎',
        },
        {
          title: '567',
          imgLink: '100',
          link: '王小虎',
        },
      ],
    }
  },
  computed: {
    ...mapGetters([
      'ServiceConfig'
    ]),
  },
  methods: {
    handleRemove(row) {
      console.log(row)
    },
    handleMove(type, index) {
      if(this.timer) return;
      const tableRows = document.getElementsByClassName('el-table__row');
      if(type === 1) {
        tableRows[index].className += ' transform-down'
        tableRows[index + type].className += ' transform-up'
      } else {
        tableRows[index].className += ' transform-up'
        tableRows[index + type].className += ' transform-down'
      }
        this.timer = setTimeout(() => {
        tableRows[index + type].className = tableRows[index].className = 'el-table__row'
        const tableData = [ ...this.tableData ]
        const targetItem = tableData[index]
        tableData[index] = tableData[index + type]
        tableData[index + type] = targetItem
        this.tableData = tableData
        clearTimeout(this.timer)
        this.timer = null
      }, 1000)
    },
  }
}
</script>

<style lang="less" scoped>
p{
  margin: 0;
}
</style>
<style>
.transform-up{
  transform: translateY(-100%);
  transition: 1s;
}
.transform-down{
  transform: translateY(100%);
  transition: 1s;
}
</style>
