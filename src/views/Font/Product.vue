<template>
<div>
    <h1>個別產品頁面</h1>
    <h3 class="mt-5">產品編號</h3>
    <h2>{{ product.id }}</h2>
</div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
    };
  },
  mounted() {
    console.log(this.$route.params.id); // 路由屬性 1
    const { id } = this.$route.params;
    console.log(id);
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
    this.$http.get(url)
      .then((res) => {
        console.log(res);
        this.product = res.data.product;
      });
  },
};
</script>
