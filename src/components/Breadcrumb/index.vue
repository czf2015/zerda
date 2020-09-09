<template>
  <ul class="breadcrumb">
    <li
      v-for="level in current.length"
      :key="level"
      @mouseover="handleMouseOver(level)"
      @mouseleave="handleMouseLeave"
    >
      <a
        :href="getRoute(level).link"
        :class=" { slug: level < current.length }"
      >{{getRoute(level).name}}</a>
      <ul v-if="hoverLevel == level" class="dropdown">
        <span class="out" />
        <span class="iner" />
        <li
          v-for="({ id, name, link }) in getRoutes(level)"
          v-show="id != getRoute(level).id"
          :key="id"
        >
          <a :href="link" :class="{ slug: level < current.length }">{{name}}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>


<script>
export default {
  name: "Breadcrumb",
  props: {
    routes: {
      type: Object,
      required: true,
    },
    current: {
      type: Array,
    },
  },
  data() {
    return {
      hoverLevel: -1,
    };
  },
  methods: {
    getRoute(level) {
      let route;
      let root = this.routes;
      for (let i = 0; i < level; i++) {
        route = root[this.current[i]];
        if (route.next) {
          root = route.next;
        }
      }
      return route;
    },
    getRoutes(level) {
      let root = this.routes;
      for (let i = 0; i < level - 1; i++) {
        root = root[this.current[i]].next;
      }
      return Object.values(root);
    },
    handleMouseOver(level) {
      this.hoverLevel = level;
    },
    handleMouseLeave() {
      this.hoverLevel = -1;
    },
  },
};
</script>


<style lang="less" scoped>
.breadcrumb {
  display: inline-block;
  margin-top: 10px;
  margin-left: 20px;
  padding: 0;

  > li {
    position: relative;
    display: inline-block;
    & > .slug {
      font-weight: bold;
      color: black;
      text-decoration: none;
      &:after {
        content: "/";
        padding: 0 5px;
      }
    }

    .dropdown {
      position: absolute;
      left: -10px;
      top: 40px;
      display: flex;
      flex-direction: column;
      padding: 5px 0 5px 10px;
      width: 120px;
      background: #fff;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);

      span {
        position: absolute;
        left: 15px;
        height: 0px;
        width: 0px;
        &.out {
          line-height: 0;
          border-width: 10px;
          border-color: transparent transparent #ccc transparent;
          border-style: dashed dashed solid dashed;
          top: -20px;
        }
        &.iner {
          border-width: 10px;
          border-color: #fff transparent #fff transparent;
          border-style: dashed dashed solid dashed;
          top: -19px;
          line-height: 0;
        }
      }

      > li {
        display: inline-block;
        & > .slug {
          font-weight: bold;
          color: black;
          text-decoration: none;
          &:after {
            content: "/";
            padding: 0 5px;
          }
        }
      }
    }
  }
}
</style>