<template>
  <div class="user-info">
    <img class="avatar" src="~/assets/img/profile/avatar.svg" alt="" />
    <div class="middle">
      <p>登录/注册</p>
      <div class="middle-info">
        <img class="phone-icon" src="~/assets/img/profile/phone.svg" alt="" />
        暂无绑定手机号
      </div>
    </div>
    <img class="arrow-icon" src="~/assets/img/common/arrow-left.svg" alt="" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.user-info {
  display: flex;
  align-items: center;
  padding: 15px 10px;
  background: var(--color-tint);
  color: #fff;
  .avatar {
    width: 60px;
  }
  .middle {
    flex: 1;
    padding-left: 10px;
    .middle-info {
      display: flex;
      align-items: center;
      font-size: 13px;
      .phone-icon {
        width: 20px;
      }
    }
  }
  .arrow-icon {
    width: 20px;
  }
}
</style>
