<template>
  <div class="home">
    <div class="menu">
      <Menu :collapsed="collapsed" :key="curTime"></Menu>
    </div>
    <div :class="{ content: true, menuUnFold: collapsed }">
      <!-- 头部固定部分 -->
      <div class="header">
        <!-- 按钮功能 -->
        <a-button
          type="primary"
          style="margin-bottom: 16px"
          @click="toggleCollapsed"
        >
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
        <!-- 面包屑导航 -->
        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item>
            {{ $router.currentRoute.matched[0].meta.title }}
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link :to="$router.currentRoute.matched[1].path">
              {{ $router.currentRoute.matched[1].meta.title }}
            </router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <!-- 用户信息 -->
        <div class="userInfo">
          <ul>
            <li>欢迎{{ JSON.parse($store.state.userInfo).username }}先生</li>
            <li @click="handleClick">退出</li>
          </ul>
        </div>
      </div>
      <!-- 主要内容区域 -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Menu from '../components/menu.vue';
import cookie from '../api/cookie';

export default {
  data() {
    return {
      // 标记收缩状态 利用这个标记实现右侧随之收缩
      collapsed: false,
      curTime: new Date().getTime(),
    };
  },
  created() {
    console.log(this.$store.state.userInfo);
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    handleClick() {
      this.$store.dispatch('changeUserInfoAction', '').then(() => {
        cookie.remove('userInfo');
        console.log(this.$router);
        this.$router.go('/login');
      });
    },
  },
  components: {
    Menu,
  },
  watch: {
    $route() {
      // 对路由变化作出响应... 使左侧的菜单跟随路由动态变化
      // .log(to, from);
      this.curTime = new Date().getTime();
    },
  },
};
</script>
<style lang="less" scoped>
@import url("~@/assets/reset.less");
.home {
  .menu {
    position: fixed;
    left: 0;
    top: 0;
    width: 180px;
    height: 100vh;
  }
  .content {
    margin-left: 180px;
    transition: all 0.3s;
    .header {
      position: relative;
      padding-left: 20px;
      height: 52px;
      line-height: 52px;
      .breadcrumb {
        margin-left: 10px;
        display: inline-block;
      }
      .userInfo ul {
        position: absolute;
        top: 0;
        right: 22px;
        text-align: center;
        z-index: 100;
        li:nth-of-type(2) {
          display: none;
        }
        &:hover li {
          display: block;
        }
        li:nth-of-type(2):hover {
          background-color: #eee;
          cursor: pointer;
        }
      }
    }
    &.menuUnFold {
      margin-left: 80px;
    }
  }
}
</style>
