<template>
  <div class="table-form-container" @mouseover="hover = true" @mouseleave="hover = false">
    <span v-show="hover" class="top-right">
      <i class="icon_up" />
      <i class="icon_down" />
      <i class="icon_close" @click="handleRemove" />
    </span>
    <h3 class="title" @mouseover="editTitle = true" @mouseleave="editTitle = false">
      <input type="text" v-if="editTitle" v-model="title" />
      <span v-else>{{title}}</span>
    </h3>
    <!-- <img :src="effect" width="80%" style="margin-left: 10%;" /> -->
    <CustomForm :datasource="formData" :auto="true" padding="0" />
    <!-- <label class="desc">
      描述：
      <input type="text" v-model="desc" />
    </label>-->
    <CustomForm :datasource="formData" :auto="true" v-show="false" />
    <TableForm
      style="margin-top: 20px;"
      :datasource="table.content"
      :columns="table.columns"
      :operations="table.operations"
    />
  </div>
</template>


<script>
import CustomForm from "@/components/Form";
import TableForm from "@/components/TableForm";
import { convert } from "./helpers.js";

export default {
  name: "Container",
  components: {
    CustomForm,
    TableForm,
  },
  props: {
    initial: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ...convert(this.initial),
      editTitle: false,
      title: this.initial.title || "标题",
      hover: false,
    };
  },
  methods: {
    handleRemove() {
      console.log("remove");
    },
  },
};
</script>


<style lang="less" scoped>
.table-form-container {
  position: relative;
  margin: 40px 40px;
  // padding: 60px 60px;
  // border: 1px solid #ebeef5;
  // border-radius: 4px;
  // box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.5);
  > .top-right {
    position: absolute;
    top: 24px;
    right: 0;
    > .icon_up,
    > .icon_down,
    > .icon_close {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-size: cover;
    }
    > .icon_up {
      background-image: url(/svg/up.svg);
      &:hover {
        background-image: url(/svg/up-active.svg);
      }
    }
    > .icon_down {
      background-image: url(/svg/down.svg);
      &:hover {
        background-image: url(/svg/down-active.svg);
      }
    }
    > .icon_close {
      background-image: url(/svg/close.svg);
      &:hover {
        background-image: url(/svg/close-active.svg);
      }
    }
  }
  > .title {
    padding-left: 10px;
    font-size: 24px;
    line-height: 48px;
    font-weight: bold;
    border-left: 4px solid green;
  }

  > .desc {
    margin: 10px 0;
    line-height: 36px;
    > input[type="text"] {
      min-width: 556px;
    }
  }

  > img {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.5);
  }
}
</style>