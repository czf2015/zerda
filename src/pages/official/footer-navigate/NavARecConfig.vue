<template>
  <div :id="componentId">
    <p style="textAlign: right; marginBottom: 15px">
      <el-button type="primary" @click="handleAdd">添加记录</el-button>
    </p>
    <el-table
      :data="tableData"
      style="width: 100%"
      @expand-change="handleExpandChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props" v-if="!ifMoving">
          <el-table :data="props.row.children">
            <el-table-column
              width="48"
            />
            <el-table-column
              prop="title"
              label="标题"
              width="180"
              align="left"
            />
            <el-table-column
              prop="slug"
              label="标识"
              width="180"
              align="left"
            />
            <el-table-column
              prop="link"
              label="链接"
              width="300"
              align="left"
            />
            <el-table-column />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180"
        align="left"
      />
      <el-table-column
        prop="slug"
        label="标识"
        width="180"
        align="left"
      />
      <el-table-column
        label="操作"
        align="left"
      >
        <template slot-scope="scope">
          <p>
            <el-link type="primary" :underline="false" @click="handleEdit(scope.$index)">编辑</el-link>
            <span style="margin: 0 5px; color: #cccccc;">|</span>
            <el-link type="primary" :underline="false" @click="handleRemove(scope.$index)">删除</el-link>
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
    <NavARecDialog ref="NavARecDialog" :handelTableData="handelTableData" />
    <RemoveDialog ref="RemoveDialog" :removeConfirm="handelTableData" :propData="{ title:'删除服务', content: '您确认删除此服务吗' }"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavARecDialog from './NavARecDialog'
import RemoveDialog from './RemoveDialog'

export default {
  name: 'NavARecConfig',
  components: { NavARecDialog, RemoveDialog },
  props: {
    acitveName: {
      type: String,
      default: 'nav'
    },
    list: {
      type: Array,
      // required: true
      default: () => []
    }
  },
  data() {
    return {
      tableData: this.list,
      componentId: Date.now(),
      ifMoving: false
    }
  },
  computed: {
    ...mapGetters([
      'NavARecConfig'
    ]),
  },
  mounted() {
    // this.$nextTick(() => {
    //   const expandedRows = document.getElementById(this.componentId).getElementsByClassName('el-table__row--level-1');
    //   [].forEach.call(expandedRows, (expandedRow => {
    //     expandedRow.className += ' transform-left'
    //   }))
    // })
    
  },
  methods: {
    handleAdd() {
      this.actionType = 'add'
      this.$refs['NavARecDialog'].showDialog('add')
    },
    handleEdit(index) {
      this.actionType = 'edit'
      this.selectIndex = index
      this.$refs['NavARecDialog'].showDialog('edit', this.tableData[index])
    },
    handleRemove(index) {
      this.actionType = 'remove'
      this.selectIndex = index
      this.$refs['RemoveDialog'].showDialog()
    },
    handleMove(type, index) {
      if(this.timer) return;
      this.ifMoving = true
      this.$nextTick(() => {
        let tableRows = document.getElementById(this.componentId).getElementsByClassName('el-table__row');
        if(type === 1) {
          tableRows[index].className += ' transform-down'
          tableRows[index + type].className += ' transform-up'
        } else {
          tableRows[index].className += ' transform-up'
          tableRows[index + type].className += ' transform-down'
        }
          this.timer = setTimeout(() => {
          tableRows[index + type].className = tableRows[index].className = 'el-table__row el-table__row--level-0'
          const tableData = [ ...this.tableData ]
          const targetItem = tableData[index]
          tableData[index] = tableData[index + type]
          tableData[index + type] = targetItem
          this.tableData = tableData
          clearTimeout(this.timer)
          this.timer = null
          this.ifMoving = false
        }, 1000)
      })
    },
    handleExpandChange(row, expanded) {
      // console.log(row, expanded)
      // const expandedRows = document.getElementById(this.componentId).getElementsByClassName('el-table__expanded-cell');
      // debugger
      // if(expanded.length) {
      //   [].forEach.call(expandedRows, (expandedRow => {
      //     expandedRow.className = 'el-table__expanded-cell transform-left'
      //   }))
      // } else {
      //   [].forEach.call(expandedRows, (expandedRow => {
      //     expandedRow.className = 'el-table__expanded-cell'
      //   }))
      // }
    },
    handelTableData(actionType, newData) {
      switch(actionType) {
        case 'add':
          this.tableData.push(newData)
          break
        case 'edit':
          this.tableData.splice(this.selectIndex, 1, newData)
          break
        case 'remove':
          this.tableData.splice(this.selectIndex, 1)
          break
        default: 
          break
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1111)
        }, 1000)
      })
    }
  }
}
</script>

<style lang="less" scoped>
p{
  margin: 0;
}
@keyframes leftmove
  {
    from {opacity: 0;}
    to {opacity: 1;}
  }
/deep/ .el-table__expanded-cell{
  animation:leftmove 1s ;
  padding: 0;
  td{
    background-color: rgba(27,31,35,.05);
  }  
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
