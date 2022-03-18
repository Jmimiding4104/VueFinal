<template>
<div id="delProductModal" ref="modal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 id="delProductModalLabel" class="modal-title">
                    <span>刪除訂單</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            是否刪除
                <strong class="text-danger"></strong> {{ tempOrder.title }}(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
                </button>
                <button type="button" class="btn btn-danger" @click="delOrder()">
                確認刪除
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ModalView from '@/libs/ModalView'

export default {
  mixins: [ModalView],
  props: ['id', 'tempOrder'],
  data () {
    return {
    }
  },
  methods: {
    delOrder () {
      const Url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.id}`
      this.$http.delete(Url)
        .then((res) => {
          this.hideModal()
          this.$httpMessageState(res, '刪除訂單')
          this.getData()
        })
        .catch((err) => {
          this.$httpMessageState(err, '刪除訂單')
        })
    },
    getData () {
      this.$emit('getData')
    }
  }
}
</script>
