import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Home',
  meta: {
    title: '首页',
  },
  component: Home,
  children: [{
    path: 'index',
    name: 'Index',
    meta: {
      title: '统计',
    },
    component: () => import('../views/pages/Index'),
  }],
},
{
  path: '/login',
  name: 'Login',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
},
{
  path: '/register',
  name: 'Register',
  component: () => import('../views/Register.vue'),
},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  console.log(store.state);
  if (store.state.userInfo) {
    if (to.path === '/login') {
      router.replace('/index');
    } else {
      next();
    }
  } else if (to.path === '/login') {
    next();
  } else {
    const result = window.confirm('当前未登录无法访问本页，是否要登录?');
    if (result) {
      router.push('/login');
    } else {
      next(false);
    }
  }
});
export default router;
