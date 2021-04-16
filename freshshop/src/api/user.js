import axios from '../axios';

const {
  myAxios,
} = axios;
export default {
  userLogin(params) {
    return myAxios({
      method: 'post',
      url: '/passport/login',
      data: params,
    });
  },
  userRegister(params) {
    return myAxios.post('/passport/logon', params);
  },
  getUserCode(params) {
    return myAxios.post('/passport/getCode', params);
  },
};
