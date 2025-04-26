<script setup>
import { userLoginStore } from '@/stores/login-store.js'
import { useRouter } from 'vue-router';
import { requestLogin } from '@/http/api_define.js'
import CryptoJS from 'crypto-js';
import {onMounted} from "vue";
import Loading from '@/components/loadings/loading-time.vue'

const router = useRouter();
const store = userLoginStore()
//是否登录中
const is_Logging = ref(false)

const formData = ref({
  account:'',
  pwd:'',
  is_auto_login: false
})

onMounted(()=>{
  read_login_info()
})

const submit_login = () => {
  console.log("登录信息",formData.value)
  const sec_pwd = CryptoJS.MD5(formData.value.pwd).toString()
  const ac = formData.value.account
  save_login_info(ac, formData.value.pwd)
  const body = {
    account: ac,
    secPwd: sec_pwd,
  }

  is_Logging.value = true
  requestLogin(body).then((res)=>{
    setTimeout(() => {
      is_Logging.value = false

      store.setLoginFlag(true)
      store.setLoginToken("oyiewqjkrewqookrewqooiurq90889")
      router.push({name:"Home"})
    }, 5000);

  }).catch(err=>{
    setTimeout(() => {
      is_Logging.value = false

      store.setLoginFlag(true)
      store.setLoginToken("oyiewqjkrewqookrewqooiurq90889")
      router.push({name:"Home"})
    }, 5000);
  })
}

const save_login_info = (ac,pwd) => {
  if (formData.value.is_auto_login) {
    localStorage.setItem('username', ac)
    localStorage.setItem('password', encryptPassword(pwd))
  } else {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
  }
}

const read_login_info = () => {
  const savedUsername = localStorage.getItem('username')
  const savedPassword = localStorage.getItem('password')
  if (savedUsername && savedPassword) {
    formData.value.account = savedUsername
    formData.value.pwd = decryptPassword(savedPassword)
    formData.value.is_auto_login = true
  }
}

const encryptPassword= (password) => {
  const secretKey = import.meta.env.VITE_API_URL
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}

const decryptPassword = (encryptedPassword) => {
  const secretKey = import.meta.env.VITE_API_URL
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}



</script>

<template>
  <div class="container">
    <div class="login-view">
      <div class="title">
        <el-image class="logo" src="statics/logo.svg" />
        <h2>Admin Pro</h2>
      </div>
      <div class="subtitle">管理后台脚手架</div>
      <el-form ref="form" :model="formData">
        <el-input :disabled="is_Logging" v-model="formData.account" placeholder="用户名" />
        <el-input :disabled="is_Logging" v-model="formData.pwd" show-password placeholder="密码" type="password" />
        <el-checkbox :disabled="is_Logging" v-model="formData.is_auto_login">自动登录</el-checkbox>
        <div class="login_btn">
          <div class="loading_btn" v-if="is_Logging">
            <Loading :size="22"/>
            <div class="loading_text">登录中...</div>
          </div>
          <div v-else class="custom-login-button" @click="submit_login">登录</div>
        </div>
        <a href="#" class="forget-password">忘记密码</a>
        <div class="other-login-methods">
          <div class="other">
            <div>其他登录方式：</div>
            <el-image class="login_style" src="statics/github.png"/>
            <el-image class="login_style" src="statics/QQ.svg"/>
            <el-image class="login_style" src="statics/weixin.svg"/>
          </div>
          <router-link class="forget-password" to="/register">注册账号</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 500px;
}

.el-form {
  padding: 0 30px;
  width: 80%;
}

.el-form .el-input {
  margin: 8px 0;
}

.logo {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.subtitle {
  margin: 4px 0;
  color: 	#C2C2C2;
}

.login_btn {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.custom-login-button {
  background-color: #409EFF; /* Element Plus 主色调 */
  border-color: #409EFF;
  color: #FFFFFF;
  width: 90%;
  padding: 6px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin: 4px 0 10px 0;
  text-align: center;
  transition: background-color 0.3s, border-color 0.3s;
}

.custom-login-button:hover {
  background-color: #66b1ff; /* 鼠标悬停时的背景颜色 */
  border-color: #66b1ff;
}

.forget-password {
  color: #409EFF;
  font-size: 14px;
  text-decoration: none;
}

.forget-password:hover {
  color: #66b1ff;
}

.other-login-methods {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #525252;
}

.login_style {
  width: 30px;
  height: 30px;
  margin: 0 5px;
}

.other {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.loading_btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #409EFF;
  opacity: 0.5;
  width: 90%;
  padding: 6px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin: 4px 0 10px 0;
}

.loading_text {
  color: #fff;
}

</style>