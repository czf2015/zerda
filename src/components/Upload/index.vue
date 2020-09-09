
<template>
  <el-upload
    class="upload"
    :drag="drag"
    :action="uploadAPI"
    :multiple="multiple"
    :list-type="listType"
    :file-list="fileList"
  >
    <template v-if="drag">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </template>
    <el-button v-else size="small" type="primary">点击上传</el-button>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>


<script>
export default {
  props: {
    uploadAPI: {
      type: String,
      required: true,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    listType: {
      type: String,
    },
  },
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
};
</script>


<style lang="less" scoped>
.upload {
}
</style>