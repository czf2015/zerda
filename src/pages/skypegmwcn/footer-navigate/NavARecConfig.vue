<template>
  <div>
    导航配置和推荐配制
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavARecConfig',
  components: {  },
  props: {
    // actionType: {
    //   type: String,
    //   default: 'add'
    // }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'NavARecConfig'
    ]),
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

</style>
