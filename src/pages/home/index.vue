<template>
  <Layout :show="show">
    <Container v-for="(data, idx) in raws" :key="idx" :initial="data" />
  </Layout>
</template>


<script>
import Layout from "@/layouts/default";
import Container from "@/components/Container";

export default {
  name: "HomePage",
  components: {
    Layout,
    Container,
  },
  data() {
    return {
      show: false,
      raws: [],
    };
  },
  mounted() {
    fetch("/data/home/index.json")
      .then((res) => res.json())
      .then((data) => {
        this.raws = data;
        this.show = true;
      });
  },
};
</script>