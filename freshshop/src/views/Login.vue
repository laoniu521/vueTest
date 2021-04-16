<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'email',
          {
            rules: [
              {
                required: true,
                pattern: /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/,
                message: '请输入正确的邮箱',
              },
            ],
          },
        ]"
        placeholder="邮箱"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入你的密码!' }] },
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
      >
        记住我
      </a-checkbox>
      <a class="login-form-forgot" href=""> 忘记密码? </a>
      <a-button type="primary" html-type="submit" class="login-form-button">
        登录
      </a-button>
      或者
      <router-link to="/register"> 现在注册 </router-link>
    </a-form-item>
  </a-form>
</template>

<script>
import user from '../api/user';
import cookie from '../api/cookie';

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
    // console.log(this.form.name);
  },
  data() {
    return {
      forData: {},
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          this.forData = values;
          // console.log(this.forData);
          user.userLogin(this.forData).then(
            (res) => {
              this.$store
                .dispatch('changeUserInfoAction', JSON.stringify(res))
                .then(() => {
                  // 跳转页面
                  this.$router.go({ name: 'Index' });
                  cookie.set('userInfo', res);
                  // console.log(cookie.get('userInfo'));
                  this.$message.success('登录成功');
                });
            },
            (error) => {
              this.$message.error(error);
            },
          );
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
#components-form-demo-normal-login.login-form {
  max-width: 300px;
  margin: 150px auto;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
