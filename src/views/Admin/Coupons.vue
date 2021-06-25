<template>
<Loading :active="isLoading"></Loading>
 <div class="container">
      <div class="text-end my-4">
        <button class="btn btn-primary btn" @click="couponModal('new')">建立優惠卷</button>
      </div>
      <table class="table">
      <thead>
      <tr>
            <th scope="col">名稱</th>
            <th scope="col">折扣百分比</th>
            <th scope="col">到期日</th>
            <th scope="col">是否啟用</th>
            <th scope="col">編輯</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(coupon,key) in coupons" :key="coupons+key">
            <tr :class="{'text-secondary':!coupon.is_paid}">
            <td>{{coupon.title}}</td>
            <td>{{coupon.percent}}%</td>
            <td>{{$filters.date(coupon.due_date)}}</td>
            <td>
              <div v-if="coupon.is_enabled === 1">啟用</div>
              <div v-else>不啟用</div>
            </td>
            <td><button type="button"
            class="btn btn-outline-primary mr-1"
            @click="couponModal('edit',coupon)">編輯</button>
            <button type="button"
            class="btn btn-outline-danger" @click="delModal(coupon)">刪除</button>
            </td>
            </tr>
      </template>
      </tbody>
      </table>
    </div>
    <del-modal ref="delModal" :tempProduct="tempCoupon" @emit-del-product="delCoupon"></del-modal>
    <coupon-modal
    ref="couponModal"
    :coupon="tempCoupon"  :is-new="isNew"
    @emit-update-coupon ="updateCoupon"></coupon-modal>
</template>
<script>

import delModal from '@/components/DelModal.vue';
import couponModal from '@/components/CouponModal.vue';

export default {
  data() {
    return {
      coupons: {},
      isNew: false,
      tempCoupon: {},
      isLoading: false,
    };
  },
  components: { delModal, couponModal },
  methods: {
    getCouponsData(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          console.log(res);
          this.coupons = res.data.coupons;
        });
    },
    delModal(coupon) {
      this.$refs.delModal.openModal();
      this.coupon = { ...coupon };
    },
    couponModal(state, coupon) {
      if (state === 'new') {
        this.isNew = true;
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
        this.$refs.couponModal.openModal();
      } else if (state === 'edit') {
        this.isNew = false;
        this.tempCoupon = { ...coupon };
        this.$refs.couponModal.openModal();
      }
    },
    updateCoupon(tempCoupon) {
      if (this.isNew === true) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http.post(url, { data: tempCoupon })
          .then((res) => {
            this.$httpMessageState(res, '優惠劵新增');
            this.$refs.couponModal.closeModal();
            this.getCouponsData();
          });
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${tempCoupon.id}`;
        this.$http.put(url, { data: tempCoupon })
          .then((res) => {
            this.$httpMessageState(res, '優惠劵修改');
            this.$refs.couponModal.closeModal();
            this.getCouponsData();
          });
      }
    },
    delCoupon(tempProduct) {
      console.log(tempProduct);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${tempProduct.id}`;
      this.$http.delete(url)
        .then((res) => {
          alert(res.data.message);
          this.$httpMessageState(res, '優惠劵刪除');
          this.$refs.delModal.closeModal();
          this.getCouponsData();
        });
    },
  },
  mounted() {
    this.getCouponsData();
  },
};
</script>
