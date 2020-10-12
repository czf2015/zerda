<template>
  <div class="search">
    <div
      class="search-choose"
      @mouseover="show = true"
      @mouseleave="show = false"
    >
      <div class="search-choose-current">
        <span>{{ currentType }}</span>
        <i class="icon-dropdown" />
      </div>
      <div
        class="search-choose-other"
        v-for="type in otherTypes"
        :key="type"
        v-show="show"
        @click="currentType = type"
      >
        <span>{{ type }}</span>
      </div>
    </div>
    <input
      class="search-input"
      type="text"
      v-model="inputText"
      placeholder="请输入关键词"
    />
    <ul class="search-tip">
      <li v-for="(tip, idx) in tips" :key="idx" @click="inputText = tip">
        {{ tip }}
      </li>
    </ul>
    <i class="icon-search" @click="search" />
  </div>
</template>


<script>
export default {
  props: {
    types: {
      type: Array,
      default: () => ["搜本产品", "搜全站"],
    },
  },
  data() {
    return {
      currentType: this.types[0],
      tips: [],
      show: false,
      inputText: "",
    };
  },
  computed: {
    otherTypes() {
      return this.types.filter((type) => type !== this.currentType);
    },
  },
  methods: {
    search() {
      this.$emit("search", this.inputText);
    },
  },
};
</script>


<style lang="less" scoped>
.icon-dropdown {
    background-image: url(/svg/conf.svg);
}
.icon-search {
    background-image: url(/svg/conf.svg);
}

.search {
  //   position: relative;
  display: flex;
  width: 360px;
  border: 1px solid #d7d8d9;
  .search-choose {
    position: absolute;
    width: 80px;
    text-align: center;
    .search-choose-current {
      line-height: 32px;
    }
    .search-choose-other {
      line-height: 30px;
      background-color: #f5f5f5;
    }
  }
  .search-input {
    margin-left: 80px;
    height: 32px;
    border: none;
    border-left: 1px solid #d7d8d9;
  }
  .search-tip {
  }
}
</style>