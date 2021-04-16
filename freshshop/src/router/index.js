import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';
import getAsyncRoute from '../utils/getAsyncRoute';

Vue.use(VueRouter);
const asyncRoute = {
  path: '/production',
  name: 'Production',
  meta: {
    title: '商品管理',
    hidden: false,
    icon: 'hdd',
  },
  component: Home,
  redirect: 'production/productionList',
  children: [{
    path: 'productionList',
    name: 'ProductionList',
    meta: {
      title: '商品列表',
      hidden: false,
      id: 1,
      icon: 'unordered-list',
    },
    component: () => import('../views/pages/ProductionList.vue'),
  }, {
    path: 'productionAdd',
    name: 'ProductionAdd',
    meta: {
      title: '新增商品',
      hidden: false,
      id: 2,
      icon: 'plus',
    },
    component: () => import('../views/pages/ProductionAdd.vue'),
  }, {
    path: 'productionEdit/:id',
    name: 'ProductionEdit',
    meta: {
      title: '商品编辑',
      hidden: true,
      id: 3,
      icon: 'edit',
    },
    component: () => import('../views/pages/ProductionAdd.vue'),
  }, {
    path: 'categoryAdd',
    name: 'CategoryAdd',
    meta: {
      title: '新增类目',
      hidden: false,
      id: 4,
      icon: 'plus',
    },
    component: () => import('../views/pages/CategoryAdd.vue'),
  }],
};

const routes = [{
  path: '/',
  name: 'Home',
  meta: {
    title: '首页',
    hidden: false,
    icon: 'home',
  },
  component: Home,
  redirect: '/index',
  children: [{
    path: 'index',
    name: 'Index',
    meta: {
      title: '统计',
      hidden: false,
      id: 0,
      icon: 'line-chart',
    },

    component: () => import('../views/pages/Index'),
  }],
},
{
  path: '/login',
  name: 'Login',
  meta: {
    hidden: true,
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),

},
{
  path: '/register',
  name: 'Register',
  meta: {
    hidden: true,
  },
  component: () => import('../views/Register.vue'),
}, {
  path: '/notFount',
  name: 'NotFount',
  meta: {
    hidden: true,
  },
  component: () => import('../views/NotFount.vue'),
},

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    return next('/notFount');
  }
  if (to.path === '/login') {
    if (store.state.userInfo) {
      // router.options.routes[3].children.push(...asyncComponent[role]);
      // console.log(router.options);
      return next('/index');
      // this.$store.dispatch('changeRouteInfoAction',[...newProductionRouter,])
    }
    return next();
  }
  if (store.state.userInfo) {
    // 学习到的。。 这么用啊
    // 确定是否已经添加完了新的路由配置 如果添加了那么就不要继续添加
    // 如果没有添加 那么添加 然后跳转页面
    if (!isAddRoutes) {
      const {
        role,
      } = JSON.parse(store.state.userInfo);
      // console.log(role);
      const asyncRouteResult = getAsyncRoute(role, asyncRoute);
      store.dispatch('changeRouteInfoAction', routes.concat(asyncRouteResult)).then(() => {
        router.addRoute(asyncRouteResult);
        next();
      });
      isAddRoutes = true;
    }
    return next();
  }
  if (to.path === '/register') {
    return next();
  }
  return next('/login');
});
export default router;
