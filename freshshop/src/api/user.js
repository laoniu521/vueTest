import axios from '../axios';

const { myAxios } = axios;
export default {
  userLogin(params) {
    return myAxios({
      method: 'post',
      url: '/passport/login',
      data: params,
    });
  },
};
