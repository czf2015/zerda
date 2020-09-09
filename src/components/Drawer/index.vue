<template>
  <div class="wrapper">
    <slot name="control">
      <el-button @click="visible = true" type="primary" style="margin-left: 16px;">点我打开</el-button>
    </slot>

    <el-drawer
      :title="title"
      :visible.sync="visible"
      :append-to-body="true"
      :before-close="handleClose"
      :size="size"
    >
      <slot>
        <Drawer :initial="{ visible: false, title: '我是里面的 Drawer', size: '25%' }" />
      </slot>
    </el-drawer>
  </div>
</template>


<script>
export default {
  name: "Drawer",
  props: {
    initial: {
      type: Object,
    },
  },
  data() {
    const { title = '', visible = false, size = "50%" } = this.initial;
    return { title, visible, size };
  },
  methods: {
    handleClose(done) {
      this.$confirm("还有未保存的工作哦确定关闭吗？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>