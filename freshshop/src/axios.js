import axios from 'axios';
import store from './store/index';

const myAxios = axios.create({
  baseURL: 'https://mallapi.duyiedu.com',
});
// 学到了 不能修改config 并且返回的不能是其他的对象 只能是config的扩展 否则报错的
// appKey不同人登录是不同的 所以我们要动态的设置而不是绑死
myAxios.interceptors.request.use((config) => {
  console.log(config.url.includes('passport'));
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appKey: JSON.parse(store.state.userInfo.appKey),
    },
  };
}, (err) => Promise.reject(err));

myAxios.interceptors.response.use((response) => {
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
}, (err) => Promise.reject(err));
export default {
  myAxios,
};
