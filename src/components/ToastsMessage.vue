<template>
  <div class="toast-container position-fixed pe-3 top-0 end-0" style="z-index: 1500">
    <div class="toast show" role="alert" v-for="(msg, key) in message" :key="key">
      <div class="toast-header">
        <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
        <strong class="me-auto">{{msg.title}}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" @click="clearToast(i)"></button>
      </div>
      <div class="toast-body" v-if="msg.content">
        {{msg.content}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['emitter'],
  data () {
    return {
      message: []
    }
  },
  methods: {
    toastShow () {
      setTimeout(() => {
        this.message.shift()
      }, 5000)
    },
    clearToast (i) {
      this.message.splice(i, 1)
    }
  },
  mounted () {
    this.emitter.on('toast-msg', (msg) => {
      const { style, title, content } = msg
      this.message.push({ style, title, content })
      this.toastShow()
    })
  }
}
</script>
