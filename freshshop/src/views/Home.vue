<template>
  <div class="home">
    <div class="menu">
      <a-menu
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        class="menuLists"
      >
        <a-menu-item key="1">
          <a-icon type="pie-chart" />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="desktop" />
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="inbox" />
          <span>Option 3</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"
            ><a-icon type="mail" /><span>Navigation One</span></span
          >
          <a-menu-item key="5"> Option 5 </a-menu-item>
          <a-menu-item key="6"> Option 6 </a-menu-item>
          <a-menu-item key="7"> Option 7 </a-menu-item>
          <a-menu-item key="8"> Option 8 </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"
            ><a-icon type="appstore" /><span>Navigation Two</span></span
          >
          <a-menu-item key="9"> Option 9 </a-menu-item>
          <a-menu-item key="10"> Option 10 </a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="11"> Option 11 </a-menu-item>
            <a-menu-item key="12"> Option 12 </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </div>
    <div :class="{ content: true, menuUnFold: collapsed }">
      <div class="header">
        <a-button
          type="primary"
          style="margin-bottom: 16px"
          @click="toggleCollapsed"
        >
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>

        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
        </a-breadcrumb>
        <div class="userInfo">
          <ul>
            <li>欢迎刘桂银先生</li>
            <li>退出</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 标记收缩状态 利用这个标记实现右侧随之收缩
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
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
    .menuLists {
      height: 100%;
    }
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
      .userInfo{
        position: absolute;
        top: 0;
        right: 22px;
        text-align: center;
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
