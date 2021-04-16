<template>
  <a-menu
    :default-selected-keys="[$router.currentRoute.matched[1].meta.title]"
    :default-open-keys="[$router.currentRoute.matched[0].meta.title]"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    class="menuLists"
  >
    <a-sub-menu :key="mainTitle.meta.title" v-for="mainTitle in routeInfo">
      <span slot="title"
        ><a-icon :type="mainTitle.meta.icon" /><span>
          {{ mainTitle.meta.title }}</span
        ></span
      >
      <template v-if="mainTitle.children">
        <a-menu-item
          :key="suTitle.meta.title"
          v-for="suTitle in mainTitle.children"
        >
          <router-link
            tag="div"
            :to="{ name: suTitle.name }"
            style="width: 100%"
          >
            <a-icon :type="suTitle.meta.icon" />

            {{ suTitle.meta.title }}
          </router-link>
        </a-menu-item>
      </template>
    </a-sub-menu>
  </a-menu>
</template>
<script>
export default {
  props: ['collapsed'],
  computed: {
    routeInfo() {
      // 从路由中筛选出要显示的文本字段
      const reuslts = this.$store.state.routeInfo.filter(
        (ele) => ele.meta.hidden === false,
      );
      const sss = reuslts.map((ele) => ({
        ...ele,
        children: ele.children.filter((elem) => elem.meta.hidden === false),
      }));
      return sss;
    },
  },
};
</script>
<style lang="less" scoped>
.menuLists {
  height: 100%;
}
</style>
