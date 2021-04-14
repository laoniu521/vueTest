import Cookies from 'js-cookie';

export default {
  set(name, value) {
    // 默认cookie存放10天
    return Cookies.set(name, value, { expires: 10 });
  },
  get(name) {
    return Cookies.get(name);
  },
  remove(name) {
    return Cookies.remove(name);
  },
};
