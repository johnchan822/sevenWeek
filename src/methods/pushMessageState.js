import eventBus from '@/methods/eventBus';

export default function (response, title = '更新') {
  if (response.data.success) {
    //  定義資料名稱push-message並傳"遞資料"到ToastMessages    風格跟title 並在ToastMessages持續監聽
    eventBus.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
    });
  } else {
    // 有些訊息是字串，有些則是陣列，在此統一格式
    const message = typeof response.data.message === 'string'
      ? [response.data.message] : response.data.message;
    eventBus.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、'),
    });
  }
}

// 這邊主要是將資料彙整，並推到ToastMessages.vue這支的資料
//
