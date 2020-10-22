<template>
  <div class="card">
    <ul>
      <li v-for="(item, idx) in menu" :key="item.id || idx">
        <div class="left">
          <i class="icon" :style="{ backgroundImage: item.icon }"></i>
          <span>{{ item.text }}</span>
        </div>
        <div class="right">
          <button>...</button>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },
};
</script>