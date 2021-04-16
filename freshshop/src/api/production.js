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
  productionAdd(params) {
    return myAxios.post('/products/add', params);
  },
  getProductionDesc(id) {
    return myAxios.get(`/products/${id}`);
  },
  productionEdit(params) {
    return myAxios.put('/products/edit', params);
  },
  productionRemove(id) {
    return myAxios.delete(`/products/${id}`);
  },
  categoryAdd(params) {
    return myAxios.get('/category/add', params);
  },
};
