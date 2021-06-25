<template>
  <h1 class="my-5">你目前在後台列表</h1>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-light bg-light my-5">
    <div class="container-fluid">
      <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
      aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <router-link to="/" class="nav-link">回到前台</router-link>
        </div>
        <div class="navbar-nav">
            <router-link to="/admin/products" class="nav-link">後台商品列表</router-link>
        </div>
          <div class="navbar-nav">
            <router-link to="/admin/orders" class="nav-link">後台訂單</router-link>
      </div>
          <div class="navbar-nav">
            <router-link to="/admin/coupons" class="nav-link">優惠卷</router-link>
      </div>
          <div class="navbar-nav">
            <router-link to="/" class="nav-link" @click.prevent="signout">登出</router-link>
          </div>
      </div>
    </div>
    </div>
    </nav>
  </div>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Admin',
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        // Axios 預設值
        this.$http.defaults.headers.common.Authorization = `${token}`;
        const url = `${process.env.VUE_APP_API}api/user/check`;
        this.$http.post(url, { api_token: this.token }).then((res) => {
          if (res.data.success) {
            this.checkSuccess = true;
          } else {
            alert(res.data.message);
            this.$router.push('/login');
          }
        });
      } else {
        alert('您尚未登入');
        this.$router.push('/login');
      }
    },
    signout() {
      document.cookie = 'hexToken=;expires=;';
      alert('token 已清除');
      this.$router.push('/login');
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>
