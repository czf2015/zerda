<template>
  <div class="table-form-container" @mouseover="hover = true" @mouseleave="hover = false">
    <span v-show="hover" class="top-right">
      <i class="icon_up" @click="$emit('up')" v-show="moveable != 'down'" />
      <i class="icon_down" @click="$emit('down')" v-show="moveable != 'up'" />
      <i class="icon_close" @click="$emit('del')" />
    </span>
    <h3 class="title" @mouseover="editTitle = true" @mouseleave="editTitle = false">
      <input type="text" v-if="editTitle" v-model="title" maxlength="10" />
      <span v-else>{{title}}</span>
    </h3>
    <!-- <img :src="effect" width="80%" style="margin-left: 10%;" /> -->
    <CustomForm :datasource="formData" :auto="true" padding="0" @change="handleChange" />
    <TableForm
      style="margin-top: 20px;"
      :datasource="content"
      :columns="columns"
      :operations="operations"
      @edit="handleEdit"
      @save="saveTable"
      @append="appendTable"
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
    moveable: {
      type: String,
      default: 'updown'
    },
    initial: {
      type: Object,
      required: true,
    },
  },
  data() {
    const { table, formData } = convert(this.initial)
    return {
      formData,
      ...table,
      editTitle: false,
      title: this.initial.title || "标题",
      hover: false,
      editIndex: -1,
    };
  },
  methods: {
    saveTable(formData) {
      const data = {}
      formData.forEach(({ field, value }) => {
        data[field] = value
      })
      this.content.splice(this.editIndex, 1, data)
    },
    appendTable(formData) {
      const data = {}
      formData.forEach(({ field, value }) => {
        data[field] = value
      })
      this.content.push(data)
    },
    handleEdit(idx) {
      this.editIndex = idx
    },
    handleChange(formData) {
      this.formData = formData
    }
  }
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