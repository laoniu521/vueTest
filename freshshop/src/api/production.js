import axios from '../axios';

const {
  myAxios,
} = axios;
export default {
  getProductionLists() {
    return myAxios.get('/products/all');
  },
  getCategoryLists() {
    return myAxios.get('/category/all');
  },
};
