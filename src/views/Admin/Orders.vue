<template>
   <Loading :active="isLoading"></Loading>
            <div class="container">
      <table class="table">
      <thead>
      <tr>
            <th scope="col">購買時間</th>
            <th scope="col">Email</th>
            <th scope="col">購買款項</th>
            <th scope="col">應付金額</th>
            <th scope="col">是否付款</th>
            <th scope="col">編輯</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(order,key) in orders" :key="orders+key">
            <tr :class="{'text-secondary':!order.is_paid}">
            <td>{{$filters.date(order.create_at)}}</td>
            <td>{{order.user.email}}</td>
            <td>
            <div v-for="(product, key) in order.products" :key="product+key">
                  {{ product.product.title}} x  {{ product.qty}}
            </div>
            </td>
            <td>{{order.total}}</td>
            <td>
                  <span class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input"
                  :id ="order+key"
                  v-model="order.is_paid" checked>
                        <label class="custom-control-label"
                  :for="order+key"></label>
                  <span v-if="order.is_paid">已付款</span>
                  <span v-else>未付款</span>
                        </span>
            </td>
            <td><button type="button"
            class="btn btn-outline-primary mr-1"
            @click="openModal(order)">檢視</button>
            <button type="button"
            class="btn btn-outline-danger" @click="openDelModal(order)">刪除</button>
            </td>
            </tr>
      </template>
      </tbody>
      </table>
      </div>
      <del-modal ref="delModal"
      :tempProduct="order"
      @emit-del-product="delOrderData">
      </del-modal>
       <order-modal ref="orderModal"
       :order="order"
      @emit-paid ="updateOrderData">
       </order-modal>
       <pagination :page="pagination"></pagination>
</template>

<script>
import orderModal from '@/components/OrderModal.vue';
import delModal from '@/components/DelModal.vue';
import pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      orders: {},
      order: {},
      pagination: '',
      isLoading: false,
    };
  },
  components: {
    delModal, orderModal, pagination,
  },
  methods: {
    getOrderData(page = 1) {
      this.isLoading = true;
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          // console.log(res);
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        });
    },
    delOrderData(tempProduct) {
      console.log(tempProduct);
      // const { id } = tempProduct.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${tempProduct.id}`;
      this.$http.delete(url)
        .then((res) => {
          this.$httpMessageState(res, '訂單刪除');
          this.getOrderData();
          this.$refs.delModal.closeModal();
        });
    },
    updateOrderData(tempOrder) {
      console.log(tempOrder.is_paid);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${tempOrder.id}`;
      this.$http.put(url, { data: tempOrder })
        .then((res) => {
          console.log(res);
          this.$refs.orderModal.closeModal();
          this.$httpMessageState(res, '訂單修改');
          this.getOrderData();
        });
    },
    openDelModal(order) {
      this.$refs.delModal.openModal();
      this.order = { ...order };
    },
    openModal(order) {
      this.$refs.orderModal.openModal();
      this.order = { ...order };
    },
  },
  mounted() {
    this.getOrderData();
  },
};
</script>
