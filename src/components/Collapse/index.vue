<template>
  <ul class="collapse">
    <li v-for="({ summary, content }, idx) in list" :key="idx" @click="current = idx">
      <details :open="current === idx ? true : false">
        <summary class="collapse-summary">
          <slot name="summary" :data="summary" />
        </summary>
        <div class="collapse-content">
          <slot name="content" :data="content" />
        </div>
      </details>
    </li>
  </ul>
</template>


<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      current: 0
    };
  }
};
</script>


<style lang="less" scoped>
.collapse {
  ::-webkit-details-marker {
    display: none;
  }

  ::-moz-list-bullet {
    font-size: 0;
  }

  details {
    .collapse-summary {
    }

    .collapse-content {
    }
  }
}
</style>