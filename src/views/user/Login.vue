<template>
<div class="login-container">

   <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

     <div class="title-container">
       <h3 class="title">欢迎光临</h3>
     </div>

     <el-form-item prop="username">
       <!-- <span class="svg-container">
         <svg-icon icon-class="user" />
       </span> -->
       <el-input
         ref="username"
         v-model="loginForm.username"
         placeholder="Username"
         name="username"
         type="text"
         tabindex="1"
         autocomplete="on"
       />
     </el-form-item>

     <el-form-item prop="password">
       <!-- <span class="svg-container">
         <svg-icon icon-class="password" />
       </span> -->
       <el-input
         ref="password"
         v-model="loginForm.password"
         placeholder="Password"
         name="password"
         tabindex="2"
         autocomplete="on"
       />
     </el-form-item>

     <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
   </el-form>
</div>
</template>

<script>
export default {
  data: function() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
    }
  },
  created() {
    let token = localStorage.getItem('token')
    if(token) this.$router.replace('/')
  },
  methods: {
    handleLogin() {
      console.log('登录', this.loginForm)
      // 密码几乎都是在这里完成加密，推荐使用 md5
      this.$api.fetchLogin(this.loginForm).then(res=>{
        // 把token存储到localStorage
        localStorage.setItem('token', res.token)
        // 弹框提示登录成功，然后跳转到系统内部
        this.$router.replace('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
