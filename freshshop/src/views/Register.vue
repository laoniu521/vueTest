<template>
  <div class="register">
    <h2 class="title">用户注册</h2>
    <a-form-model
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="ruleForm.email" type="text" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="用户名" prop="username">
        <a-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password1">
        <a-input v-model="ruleForm.password1" type="password" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码确认" prop="password2">
        <a-input v-model="ruleForm.password2" type="password" />
      </a-form-model-item>
      <a-form-model-item label="验证码">
        <a-input v-model="ruleForm.code" type="text" autocomplete="off" />
        <a-button type="primary" :loading="loading" @click="enterLoading">
          发送验证码
        </a-button>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          注册
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import user from '../api/user';

export default {
  data() {
    const checkEmail = (rule, value, callback) => {
      const emailRules = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (!emailRules.test(value)) {
        return callback(new Error('请输入正确的邮箱'));
      }
      return callback();
    };
    const checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'));
      }
      return callback();
    };
    const validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('password2');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password1) {
        callback(new Error('两次输入密码不同!'));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      ruleForm: {
        email: '',
        username: '',
        password1: '',
        password2: '',
        password: '',
        code: '',
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        username: [{ validator: checkUsername, trigger: 'change' }],
        password1: [{ validator: validatePass1, trigger: 'change' }],
        password2: [{ validator: validatePass2, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    enterLoading() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
      user.getUserCode({ email: this.ruleForm.email }).then(
        () => {},
        (err) => {
          this.$message.error(err);
        },
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.password = this.ruleForm.password1;
          this.ruleForm.role = 'admin';
          user.userRegister(this.ruleForm).then(
            (res) => {
              console.log(res);
              this.$message.success('注册成功！');
              this.$router.push('/login');
            },
            (err) => {
              this.$message.error(err);
            },
          );
          return true;
        }
        this.$message.error('信息填写错误！');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.register {
  position: absolute;
  width: 40%;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  text-align: center;
  .title {
    margin-left: -60px;
    margin-bottom: 10px;
  }
}
</style>
