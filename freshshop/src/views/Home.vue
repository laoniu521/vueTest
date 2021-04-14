<template>
  <div class="home">
    <div class="menu">
      <Menu :collapsed = collapsed></Menu>
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
            {{ $router.currentRoute.matched[0].meta.title}}
            </a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href="">{{ $router.currentRoute.matched[1].meta.title }}
            </a>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <!-- 用户信息 -->
        <div class="userInfo">
          <ul>
            <li>欢迎{{ JSON.parse($store.state.userInfo).username }}先生</li>
            <li>退出</li>
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

export default {
  data() {
    return {
      // 标记收缩状态 利用这个标记实现右侧随之收缩
      collapsed: false,
    };
  },
  created() {
    console.log(this.$store.state.userInfo);
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
  components: {
    Menu,
  },
};
</script>
<style lang="less" scoped>
@import url('~@/assets/reset.less');
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
      .userInfo ul{
        position: absolute;
        top: 0;
        right: 22px;
        text-align: center;
         z-index: 100;
        li:nth-of-type(2){
          display: none;
        }
        &:hover li{
          display: block;
        }
        li:nth-of-type(2):hover{
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
