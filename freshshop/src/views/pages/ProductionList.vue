<template>
  <div class="productionList">
    <a-input
      placeholder="请输入关键字"
      style="width: 200px; margin-left: 10px"
      @input="onInput"
    />
    <a-select
      placeholder="Select a category"
      style="width: 200px; margin-left: 15px; margin-right: 10px"
      @change="handleChange"
    >
      <a-select-option v-for="c in categoryLists" :key="c.id" :value="c.name">
        {{ c.name }}
      </a-select-option>
    </a-select>
    <a-button type="default" @click="handleClick"> 确定 </a-button>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      style="margin-top: 12px"
    >
      <template
        v-for="col in [
          'id',
          '标题',
          '描述',
          '类目',
          '预售价格',
          '折扣价格',
          '标签',
          '限制购买数量',
          '上架状态',
          '操作',
        ]"
        :slot="col"
        slot-scope="text"
      >
        <div :key="col">
          {{ text }}
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span>
            <a-button
              type="primary"
              :disabled="editingKey !== ''"
              @click="() => edit(record.key)"
            >
              编辑
            </a-button>
          </span>
          <span style="margin-left: 10px">
            <a-button
              type="danger"
              :disabled="editingKey !== ''"
              @click="() => handleDelete(record.key)"
              >删除</a-button
            >
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import production from '../../api/production';

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: '5%',
    scopedSlots: { customRender: 'id' },
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: '10%',
    scopedSlots: { customRender: 'title' },
  },
  {
    title: '描述',
    dataIndex: 'desc',
    width: '10%',
    scopedSlots: { customRender: 'desc' },
  },
  {
    title: '类目',
    dataIndex: 'category',
    width: '10%',
    scopedSlots: { customRender: 'category' },
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    width: '8%',
    scopedSlots: { customRender: 'price' },
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    width: '10%',
    scopedSlots: { customRender: 'price_off' },
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: '10%',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    width: '10%',
    scopedSlots: { customRender: 'inventory' },
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    width: '10%',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '17%',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  data() {
    // this.cacheData = data.map((item) => ({ ...item }));
    return {
      data: [],
      columns,
      editingKey: '',
      categoryLists: [],
      category: '',
      inputValue: '',
      // 由于存在搜索功能 便拿allData做了个中转 防止只能搜索一种类型的水果
      allData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 点击编辑按钮
    edit(key) {
      this.$router.push(`/production/productionEdit/${key}`);
    },
    // 点击删除按钮
    handleDelete(key) {
      production.productionRemove(key).then((res) => {
        // console.log(res);
        if (res.data.ok) {
          this.$message.success('删除成功');
          this.getData();
        } else {
          this.$message.error('删除失败,请重试！');
        }
      });
    },
    // 输入搜索内容
    onInput(e) {
      this.inputValue = e.target.value;
    },
    // 更换类别时触发
    handleChange(value) {
      this.category = value;
    },
    // 确认搜索
    handleClick() {
      this.data = [...this.allData];
      this.data = this.data.filter((ele) => ele.category === this.category);
      // console.log(this.data);
    },
    getData() {
      // 获取所有的类别
      production.getCategoryLists().then((res) => {
        this.categoryLists = res.data;
        // 获取列表数据
        production.getProductionLists().then((res2) => {
          this.data = res2.data.map((ele) => {
            // console.log(ele, this.categoryLists);
            if (ele.status === 1) {
              return {
                ...ele,
                key: ele.id,
                status: '上架',
                category: this.categoryLists[ele.category].name,
              };
            }
            return {
              ...ele,
              key: ele.id,
              status: '下架',
            };
          });
          this.allData = [...this.data];
        });
      });
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
