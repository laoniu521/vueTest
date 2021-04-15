<template>
  <div class="productionAdd">
    <div class="progress">
      <a-steps :current="curIndex">
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template slot="title">填写商品基本信息</template>
        </a-step>
        <a-step title="填写商品销售信息" />
      </a-steps>
    </div>
    <div class="content">
      <template v-if="curIndex == 0">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="title" label="标题" prop="title">
            <a-input v-model="form.title" />
          </a-form-model-item>
          <a-form-model-item ref="desc" label="商品描述" prop="desc">
            <a-input v-model="form.desc" />
          </a-form-model-item>
          <a-form-model-item ref="category" label="商品类目" prop="category">
            <a-select v-model="form.category" @change="handleChange">
              <a-select-option
                v-for="c in categoryLists"
                :key="c.id"
                :value="c.name"
                >{{ c.name }}
              </a-select-option>
            </a-select>
            <a-select placeholder="请添加子类目" v-model="form.subCategory">
              <a-select-option
                v-for="c in subCategoryLists"
                :key="c"
                :value="c"
              >
                {{ c }}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item ref="tags" label="商品标签" prop="tags">
            <a-input v-model="form.tags" />
          </a-form-model-item>

          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit"> 下一步 </a-button>
            <a-button style="margin-left: 10px" @click="resetForm">
              重置
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </template>
    </div>
  </div>
</template>

<script>
import production from '../../api/production';

export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      curIndex: 0,
      form: {
        title: '',
        desc: '',
        tags: '',
        category: '',
        subCategory: '',
      },
      categoryLists: [],
      subCategoryLists: [],
      rules: {
        tags: [
          {
            required: true,
            message: '请添加标签',
            trigger: 'blur',
          },
        ],
        category: [
          {
            required: true,
            message: '请添加类目',
            trigger: 'blur',
          },
        ],
        title: [
          {
            required: true,
            message: '请添加标题',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  created() {
    production.getCategoryLists().then((res) => {
      this.categoryLists = res.data;
      console.log(this.categoryLists);
    });
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.curIndex += 1;
          return true;
        }
        console.log('error submit!!');
        return false;
      });
      console.log(this.form);
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleChange(value) {
      const result = this.categoryLists.filter((ele) => ele.name.includes(value));
      this.subCategoryLists = result[0].c_items;
    },
  },
};
</script>
<style lang="less" scoped>
.productionAdd {
  width: 50%;
  margin: 25px auto 20px;
  .progress {
    margin-bottom: 100px;
  }
  .content {
    text-align: center;
  }
}
</style>
