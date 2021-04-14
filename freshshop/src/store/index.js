import Vue from 'vue';
import Vuex from 'vuex';
import cookie from '../api/cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: cookie.get('userInfo'),
  },
  mutations: {
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    changeUserInfoAction(context, userInfo) {
      context.commit('changeUserInfo', userInfo);
    },
  },
  modules: {},
});
