<template>
  <div class="loginbox">
    <form action>
      <h2>登录</h2>
      <el-input v-model="user.username" placeholder="请输入用户名" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
      <el-button type="primary" @click="login()">登录</el-button>
    </form>
  </div>
</template>
<script>
import {requestLogin} from '../../util/request'
import {mapActions} from 'vuex'

import {successAlert,warningAlert} from '../../util/alert'

export default {
  components: {},
  data() {
    return {
      user:{
        username:"",
        password:""
      }
    };
  },
  methods: {
     ...mapActions({
       'changeUser':'changeUser'
     }),
     login(){

        requestLogin(this.user).then(res=>{
         if(res.data.code===200){
              //登录成功
              successAlert("登录成功")
              //vuex保存了用户信息 //请求数据后把信息存在user里面（=list）
              this.changeUser(res.data.list)
              //跳转页面
              this.$router.push("/home")
            }else{
              warningAlert(res.data.msg)
            }

       })
          //  this.$router.push("/index")
     }
  },
  mounted() {
    this.changeUser()
  }
};
</script>
<style scoped>
.loginbox{
    width: 100vw;
    height: 100vh;
      background: linear-gradient(to right, #553444, #303d60);
}
form{
    width: 400px;
    padding: 20px;
  background: #fff;
  border-radius: 20px;
    position:fixed;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
}
h2 {
  line-height: 60px;
  font-size: 30px;
  text-align: center;
}
.el-input{
    margin-top: 20px;
}
.el-button{
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
     margin-top: 20px;
}
</style>