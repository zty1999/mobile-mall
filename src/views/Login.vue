<template>
  <div id="login">
    <nav-bar class="login-nav">
      <div slot="left" @click="back">
        <img class="back-icon" src="~/assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center">登录</div>
    </nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        type="username"
        required
        placeholder="随便填"
        label="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        required
        placeholder="随便填"
        label="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <div style="margin: 16px;">
        <van-button round block color="var(--color-tint)" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "Login",
  components: {
    NavBar,
  },
  data() {
    return {
      user: {
        username: "",
      password: "",
      }
    };
  },
  methods: {
    back() {
this.$router.back();
    },
    onSubmit() {
if(this.account!=="" && this.password!=="") {
        this.$toast('登录成功,存储token,跳转网页');
        this.$store.commit('CHANGE_TOKEN',1);
      }else {
        Toast('账号密码不能为空');
      }
 
       setTimeout(()=>{
         this.$router.push('/profile')
      },1000);
      // 登录成
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  position: relative;
  height: 100vh;
  .login-nav {
    border-bottom: 1px solid #ccc;
    .back-icon {
      margin-top: 11px;
    }
  }
}
</style>
