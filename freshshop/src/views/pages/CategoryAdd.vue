<template>
  <a-form-model
    layout="inline"
    :model="formInline"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item>
      <a-input v-model="formInline.id" placeholder="商品类目id"> </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-input v-model="formInline.name" type="text" placeholder="商品类目名称">
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-select mode="tags" style="width: 200px" @change="handleChange">
        <a-select-option key="苹果"> 苹果 </a-select-option>
        <a-select-option key="香蕉"> 香蕉 </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="
          formInline.id === '' ||
          formInline.name === '' ||
          formInline.c_items.length === 0
        "
      >
        添加
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import production from '../../api/production';

export default {
  data() {
    return {
      formInline: {
        id: '',
        name: '',
        c_items: [],
      },
    };
  },
  methods: {
    handleChange(value) {
      this.formInline.c_items = value;
    },
    handleSubmit() {
      console.log(this.formInline);
      this.formInline.role = 'admin';
      production.categoryAdd(this.formInline).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        },
      );
    },
  },
};
</script>
