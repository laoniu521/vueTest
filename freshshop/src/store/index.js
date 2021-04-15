import Vue from 'vue';
import Vuex from 'vuex';
import cookie from '../api/cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: cookie.get('userInfo'),
    routeInfo: [],
  },
  mutations: {
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    changeRouteInfo(state, routeInfo) {
      state.routeInfo = routeInfo;
    },
  },
  actions: {
    changeUserInfoAction(context, userInfo) {
      context.commit('changeUserInfo', userInfo);
    },
    changeRouteInfoAction({ commit }, routeInfo) {
      commit('changeRouteInfo', routeInfo);
    },
  },
  modules: {},
});
