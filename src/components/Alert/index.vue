  <template>
  <el-alert
    :type="type"
    :title="title"
    :description="description"
    :show-icon="showIcon"
    @close="handleClose"
  />
</template>


<script>
export default {
  props: {
    type: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>