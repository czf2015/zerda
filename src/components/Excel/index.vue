<template>
 <div id="excel" />
</template>

<script>
import Excel from "handsontable";
import "handsontable/dist/handsontable.full.css";

export default {
  name: "Excel",
  props: {
    initData: {
      type: Array,
      required: true,
    },
    rowHeaders: {
        type: Boolean,
        default: true
    },
    colHeaders: {
        type: Boolean,
        default: true
    },
  },
  data() {
    return {
      currData: this.initData,
    };
  },
  mounted() {
      const container = document.getElementById('excel')
      const excel = new Excel(container, {
          data: this.currData,
          rowHeaders: this.rowHeaders,
          colHeaders: this.colHeaders,
      })
  }
};
</script>