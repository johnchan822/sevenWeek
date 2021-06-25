<template>
<div class="container">
  <Loading :active="isLoading"></Loading>
          <table class="table align-middle">
            <thead>
              <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td style="width: 200px">
                  <!-- 注意這邊樣式的屬性 -->
                  <div style="height: 100px; background-size: cover; background-position: center"
                    :style="{ 'background-image': `url(${product.imageUrl})`}"
                  ></div>
                </td>
                <td>
                  {{product.title}}
                </td>
                <td>
                  <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
                  <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                  <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <!-- 這邊打開openModal後將個別資料帶進去 -->
                    <button type="button" class="btn btn-outline-secondary"
                    :disabled="loadingStatus === product.id"
                    @click="openModal(product)">
                      <div class="spinner-grow spinner-grow-sm" role="status"
                      v-if=" loadingStatus === product.id">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger"
                    :disabled="loadingStatus === product.id"
                      @click="addCart(product)">
                      <div class="spinner-grow spinner-grow-sm" role="status"
                      v-if=" loadingStatus === product.id">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      加到購物車
                    </button>
                      <router-link type="button"
                      class= "btn btn-outline-primary"
                      :to="`/product/${product.id}`">
                        進入單一頁面
                      </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
<modal ref="modal" :product="product" @emit-add-cart="addCart"></modal>
</template>

<script >
import modal from '@/components/Modal.vue';

export default {
  components: { modal },
  data() {
    return {
      products: [],
      carts: {},
      product: {},
      isLoading: false,
    };
  },
  methods: {
    getData() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.$http.get(url)
        .then((res) => {
          console.log(res);
          this.products = res.data.products;
          this.isLoading = false;
        });
    },
    addCart(product, qty = 1) {
      this.isLoading = true;
      const cart = {
        product_id: product.id,
        qty,
      };
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.post(url, { data: cart })
        .then((res) => {
          console.log(res);
          if (res.data.success === true) {
            this.$httpMessageState(res, '訂單加入');
            this.$refs.modal.closeModal();
            this.isLoading = false;
          } else {
            this.$httpMessageState(res, '訂單加入');
          }
        });
    },
    // 取得單一產品細節
    openModal(product) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${product.id}`;
      this.$http.get(url)
        .then((res) => {
          this.product = res.data.product;
          this.$refs.modal.openModal();
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
};
</script>
