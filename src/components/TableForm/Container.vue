<template>
  <Wrapper
    :moveable="moveable"
    :title="store.title"
    @change="handleTitleChange"
    @up="$emit('up')"
    @down="$emit('down')"
    @del="$emit('del')"
  >
    <Compose
      :auto="true"
      :initial="{ formData, tableData }"
      @change="handleFormChange"
      @save="handleTableSave"
      @append="handleTableAppend"
      @del="handleTableDelete"
      @up="handleTableUp"
      @down="handleTableDown"
    />
  </Wrapper>
</template>


<script>
import Wrapper from "./Wrapper";
import Compose from "./Compose";
import { extract } from "./helpers";

export default {
  name: "TableFormContainer",

  components: {
    Wrapper,
    Compose,
  },

  props: {
    moveable: {
      type: String,
      default: "updown",
    },
    initial: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      store: this.initial,
    };
  },

  computed: {
    formData() {
      const form = this.store.extra.filter(
        (item) => item.field !== "title" && item.mode !== "multiple"
      );
      return form.map((item) => {
        return { ...item, value: this.store[item.field] };
      });
    },
    tableData() {
      const table = this.store.extra.find((item) => item.mode == "multiple");
      if (table) {
        return {
          datasource: this.store[table.field],
          columns: table.children,
          operations: table.operations,
        };
      } else {
        return undefined
      }
    },
  },

  methods: {
    handleTitleChange(val) {
      this.store.title = val;
    },
    handleTableSave({ index, value }) {
      this.store.content.splice(index, 1, extract(value));
    },
    handleTableAppend(formData) {
      this.store.content.push(extract(formData));
    },
    handleTableDelete(index) {
      this.store.content.splice(index, 1);
    },
    handleTableUp(index) {
      console.log('------')
      this.store.content.splice(index - 1, 2, this.store.content[index], this.store.content[index - 1])
    },
    handleTableDown(index) {
      this.store.content.splice(index, 2, this.store.content[index + 1], this.store.content[index])
    },
    handleFormChange(formData) {
      console.log(JSON.stringify(formData));
      Object.assign(this.store, formData)
    },
  },
};
</script>