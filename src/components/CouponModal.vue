<template>
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempCoupons.title">
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input type="text" class="form-control" id="coupon_code" placeholder="請輸入優惠碼"  v-model="tempCoupons.code">
          </div>
          <div class="mb-3">
            <label for="due_date">到期日{{due_date}}</label>
            <input type="date" class="form-control" id="due_date" v-model="due_date">
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input type="number" class="form-control" id="price" min="0" placeholder="請輸入折扣百分比" v-model.number="tempCoupons.percent">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                     :true-value="1"
                     :false-value="0"
                     id="is_enabled"
                     v-model="tempCoupons.is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"
                  @click="updateCoupon"> {{ isNew ? '新增優惠卷' : '更新優惠券' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalView from '@/libs/ModalView.vue'
export default {
  props: ['coupons', 'isNew', 'temp-coupons'],
  data () {
    return {
      due_date: ''
    }
  },
  methods: {
    updateCoupon () {
      this.$emit('update-coupon', this.tempCoupons)
    }
  },
  watch: {
    tempCoupons () {
      const date = new Date(this.tempCoupons.due_date * 1000)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      if (month.toString().length === 1) {
        month = '0' + month
      }
      let day = date.getDate()
      if (day.toString().length === 1) {
        day = '0' + day
      }
      this.due_date = `${year}-${month}-${day}`
    },
    due_date () {
      this.tempCoupons.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  mixins: [ModalView]
}
</script>
