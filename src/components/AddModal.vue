<template>
<div id="productModal"
ref="modal"
class="modal fade"
tabindex="-1"
aria-labelledby="productModalLabel"
      aria-hidden="true">
      <Loading :active=isLoading></Loading>
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title" v-if="isNew">
              <span>新增產品</span>
            </h5>
              <h5 id="productModalLabel" class="modal-title" v-else>
              <span>編輯產品</span>
            </h5>
            <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-1">
                  <div class="form-group">
                    <label for="imageUrl">輸入圖片網址</label>
                    <input type="text" class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl">
                  </div>
                  <img class="img-fluid"  alt=""
                  :src="tempProduct.imageUrl">
                </div>
                  <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或上傳圖片
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="status.fileUploading"
                  ></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile"
                />
              </div>
              <!-- 新增多圖技巧 -->
              <div class="mt-5" v-if="tempProduct.imagesUrl">
                <div
                  v-for="(image, key) in tempProduct.imagesUrl"
                  class="mb-3"
                  :key="key"
                >
                  <input
                    type="url"
                    class="form-control form-control"
                    v-model="tempProduct.imagesUrl[key]"
                    placeholder="請輸入連結"
                  />
                  <div>
                    <img class="img-fluid" :src="image"/>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="tempProduct.imagesUrl.splice(key, 1)"
                  >
                    移除
                  </button>
                </div>
                <div
                  v-if="
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] ||
                    !tempProduct.imagesUrl.length
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input id="title" type="text" class="form-control"
                  placeholder="請輸入標題" v-model="tempProduct.title">
                </div>
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input id="category" type="text" class="form-control"
                    placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input id="unit" type="text" class="form-control"
                    placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input id="origin_price" type="number" min="0"
                  class="form-control" placeholder="請輸入原價"
                  v-model.number="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input id="price" type="number" min="0"
                    class="form-control" placeholder="請輸入售價" v-model.number="tempProduct.price">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea id="description" type="text"
                  class="form-control" placeholder="請輸入產品描述"  v-model="tempProduct.description">
                    </textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea id="description" type="text"
                  class="form-control" placeholder="請輸入說明內容" v-model="tempProduct.content">
                    </textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input id="is_enabled" class="form-check-input"
                    type="checkbox" :true-value="1" :false-value="0"
                    v-model="tempProduct.is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="update(tempProduct)">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      status: {},
      tempProduct: {},
      isLoading: false,
    };
  },
  inject: ['emitter'],
  props: ['tempProducts', 'isNew'],
  methods: {
    createImages() {
      this.tempProduct.imagesUrl = [''];
    },
    update(tempProduct) {
      this.$emit('emit-update', tempProduct);
    },
    uploadFile() {
      this.isLoading = true;
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        this.isLoading = false;
        this.status.fileUploading = false;
        if (response.data.success) {
          this.tempProduct.imageUrl = response.data.imageUrl;
          this.$refs.fileInput.value = '';
          this.emitter.emit('push-message', {
            style: 'success',
            title: '圖片上傳成功',
            content: response.data.message,
          });
        } else {
          this.$refs.fileInput.value = '';
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '圖片上傳失敗',
            content: response.data.message,
          });
        }
      });
    },
  },
  watch: {
    tempProducts() {
      this.tempProduct = this.tempProducts;
      // 讓編輯狀態下能夠繼續新增圖片
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = '';
      }
    },
  },
  mixins: [modalMixin],
};
</script>
