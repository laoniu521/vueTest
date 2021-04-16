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
            <a-select
              placeholder="请添加子类目"
              v-model="form.c_items"
              mode="multiple"
            >
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
            <a-select mode="tags" v-model="form.tags">
              <a-select-option key="post"> 包邮最晚次日到达 </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit"> 下一步 </a-button>
            <a-button style="margin-left: 10px" @click="resetForm">
              重置
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </template>
      <template v-else>
        <a-form-model
          ref="ruleForm2"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="price" label="商品售价" prop="price">
            <a-input v-model="form.price" />
          </a-form-model-item>
          <a-form-model-item
            ref="price_off"
            label="商品折扣价"
            prop="price_off"
          >
            <a-input v-model="form.price_off" />
          </a-form-model-item>
          <a-form-model-item ref="inventory" label="商品库存" prop="inventory">
            <a-input v-model="form.inventory" />
          </a-form-model-item>
          <a-form-model-item ref="unit" label="计量单位" prop="unit">
            <a-input v-model="form.unit" />
          </a-form-model-item>
          <a-form-model-item ref="images" label="商品相册">
            <a-upload
              :action="
                'https://mallapi.duyiedu.com/upload/images?appkey=' +
                $store.state.userInfo.appkey
              "
              list-type="picture-card"
              :file-list="fileList"
              @preview="handlePreview"
              @change="handleChange2"
              name="avatar"
            >
              <div v-if="fileList.length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">选择图片</div>
              </div>
            </a-upload>
            <a-modal
              :visible="previewVisible"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-model-item>
          <p :style="{ marginBottom: '20px' }">
            <a-checkbox v-model="form.status"> 是否上架 </a-checkbox>
          </p>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="handlePrev"> 上一步 </a-button>
            <a-button style="margin-left: 10px" @click="handleCompluted">
              完成
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </template>
    </div>
  </div>
</template>

<script>
import production from '../../api/production';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
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
        tags: ['包邮最晚次日到达'],
        category: '',
        c_items: [],
        price: 19.9,
        price_off: '',
        inventory: 100,
        unit: 'g',
        images: '',
        status: true,
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
            message: '请选择商品所属标签',
            trigger: 'blur',
          },
        ],
        price: [
          {
            required: true,
            message: '请输入商品价格',
            trigger: 'blur',
          },
        ],
        price_off: [
          {
            required: true,
            message: '请输入商品折扣价',
            trigger: 'blur',
          },
        ],
        inventory: [
          {
            required: true,
            message: '请输入商品库存',
            trigger: 'blur',
          },
        ],
        unit: [
          {
            required: true,
            message: '请输入计量单位',
            trigger: 'blur',
          },
        ],
      },
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url:
            'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=480935618,4063120568&fm=26&gp=0.jpg',
        },
      ],
    };
  },
  created() {
    production.getCategoryLists().then((res) => {
      this.categoryLists = res.data;
    });
    /* 如果是商品编辑页就获取信息 */
    if (this.$route.params.id) {
      const { id } = this.$route.params;
      production.getProductionDesc(id).then((res) => {
        const state = res.status === 1;
        // console.log(this.categoryLists, res.category);
        // console.log(this.form);
        this.form = {
          ...res,
          category: this.categoryLists[res.category].name,
          status: state,
          c_items: [],
        };
        // console.log(res.c_items);
        this.form.c_items.push(res.c_item);
        this.fileList = res.images.map((ele, index) => ({
          url: ele,
          status: 'done',
          name: `image${index}.jpg`,
          uid: index,
        }));
        // console.log(res);
      });
    }
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
      // console.log(this.form);
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleChange(value) {
      const result = this.categoryLists.filter((ele) => ele.name.includes(value));
      this.subCategoryLists = result[0].c_items;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const newFile = file;
      if (!file.url && !file.preview) {
        newFile.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange2({ fileList }) {
      this.fileList = fileList;
    },
    handlePrev() {
      this.curIndex -= 1;
    },
    handleCompluted() {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          const categoryNameLists = this.categoryLists.map((ele) => ele.name);
          const newStatus = this.form.status === true ? 1 : 0;
          const params = {
            ...this.form,
            category: categoryNameLists.indexOf(this.form.category),
            status: newStatus,
            images: this.fileList,
          };
          /* 商品编辑页面提交信息 */
          if (this.$route.params.id) {
            // params = { ...params, id: this.$route.params.id };
            production.productionEdit(params).then((res) => {
              this.$router.push('/production/productionList');
              if (res.data.ok) {
                this.$message.success('编辑成功');
              } else {
                this.$message.error('编辑失败!请稍后重试');
              }
            });
            return true;
          }
          /* 商品新增页面提交信息 */
          production.productionAdd(params).then(() => {
            this.$message.success('新增商品成功');
            // console.log(res);
            this.$router.push('/production/productionList');
            // console.log(this.$route);
          });
          return true;
        }
        this.$message.error('表单信息不完整');
        return false;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.productionAdd {
  width: 50%;
  margin: 25px auto 20px;
  .progress {
    margin-bottom: 60px;
  }
  .content {
    text-align: center;
  }
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
