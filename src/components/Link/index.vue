<template>
  <a :href="href" :style="{...styles, color, backgroundColor: bgColor}">{{title}}</a>
</template>


<script>
import styles from "./styles";
import { filter } from "@/utils/object.js";

export default {
  props: {
    theme: {
      type: String,
      default: "theme1",
    },
    href: {
      type: String,
      default: "javascript:;",
    },
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "inherit",
    },
    bgColor: {
      type: String,
      default: "transparent",


      
    },
    separator: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      styles: filter(styles, this),
    };
  },
};
</script>

<style scoped>
</style>