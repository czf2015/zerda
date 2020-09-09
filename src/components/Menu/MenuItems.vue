<template>
  <ul>
    <li v-for="(menuItem, idx) in list" @click="() => current = idx" :key="idx">
      <details
        v-if="menuItem.children && menuItem.children.length > 0"
        :open="current === idx ? 'open' : false"
      >
        <summary>
          <a :href="menuItem.link || 'javascript:;'">{{menuItem.title}}</a>
          <i class="icon-arrow" />
        </summary>
        <MenuItems :list="menuItem.children" />
      </details>
      <a v-else :href="menuItem.link || 'javascript:;'">{{menuItem.title}}</a>
    </li>
  </ul>
</template>


<script>
export default {
  name: "MenuItems",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      current: -1,
    };
  },
};
</script>


<style lang="less" scoped>
ul li {
  border-top: 1px solid rgb(43, 43, 46);

  > a {
    margin-left: 0.32rem;
  }

  ::-webkit-details-marker {
    display: none;
  }

  ::-moz-list-bullet {
    font-size: 0;
  }

  details[open] > summary > .icon-arrow {
    transform: rotate(180deg);
  }

  details {
    summary {
      display: flex;
      justify-content: space-between;
      padding: 0 0.64rem 0 0.32rem;
      outline: none;

      > .icon-arrow {
        width: 0.5rem;
        line-height: 0.5rem;
        background-image: url(/icons/arrow-down.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        transition: transform 0.2s;
      }
    }

    ul > li {
      background-color: #202124;

      > a {
        margin-left: 0.64rem;
      }
    }
  }
}
</style>