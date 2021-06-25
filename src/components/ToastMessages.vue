<template>
  <div
    class="toast-container position-absolute pe-3 top-0 end-0"
    style="z-index: 1500"
  >
    <div
      v-for="(msg, key) in messages"
      :key="key"
      class="toast show"
      :class="`toast${key}`"
      role="alert"
    >
      <div class="toast-header">
        <span
          :class="`bg-${msg.style}`"
          class="p-2 rounded me-2 d-inline-block"
        ></span>
        <strong class="me-auto">{{ msg.title }}</strong>
        <button
          type="button"
          class="btn-close"
          @click="clearToast(key)"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body" v-if="msg.content">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  methods: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 6000);
    },
    clearToast(index) {
      this.messages.splice(index, 1);
    },
  },
  //  ""監聽"""
  // 我們""接收""監聽push-message這個訊息，如果有訊息將資料取出推到這個原件到messages裡面，v-for如果有messages資料就會運作
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      this.toastShow();
    });
  },
};
</script>
