<template>
  <IsLoading style="z-index: 1000" :active="isLoading"></IsLoading>
    <div class="container">
        <div class="text-end mt-4">
            <button class="btn btn-primary" @click="openModal('new')">
                建立新的折扣券
            </button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th>折扣百分比</th>
                    <th>到期日</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in coupons" :key="item.id">
                    <td>{{item.code}}</td>
                    <td>{{item.percent}}%</td>
                    <td>{{new Date(item.due_date * 1000).toLocaleDateString()}}</td>
                    <td>
                        <span
                        :class="{'text-success' : item.is_enabled , 'text-danger' : !item.is_enabled}"
                        >
                        {{item.is_enabled?'啟用':'未啟用'}}
                        </span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button
                                type="button"
                                class="btn btn-outline-primary btn-sm"
                                @click="openModal('edit', item)"
                            >
                                編輯
                            </button>
                            <button
                                type="button"
                                class="btn btn-outline-danger btn-sm"
                                @click="openModal('del', item)"
                            >
                                刪除
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
<CouponModal :coupons="tempCoupons" @update-coupon="updateCoupon" :isNew="isNew" :temp-coupons="tempCoupons" ref="CouponModal"/>
<delCouponModal :temp-coupons="tempCoupons" ref="delCouponModal"/>
<PaginationComponent :pagination="pagination" @getData="getData"/>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import delCouponModal from '@/components/delCouponModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      coupons: [],
      tempCoupons: {},
      couponId: '',
      isNew: '',
      isLoading: false,
      pagination: {}
    }
  },
  components: {
    CouponModal,
    delCouponModal,
    PaginationComponent
  },
  methods: {
    getData (page = 1) {
      this.isLoading = true
      const Url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http
        .get(Url)
        .then((res) => {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.response, '取得資料')
        })
    },
    updateCoupon (item) {
      this.isLoading = true
      let Url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      if (!this.isNew) {
        Url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
        httpMethod = 'put'
      } this.$http[httpMethod](Url, { data: item })
        .then((res) => {
          this.$httpMessageState(res, '更新狀態')
          this.$refs.CouponModal.hideModal()
          this.getData()
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '更新狀態')
          this.isLoading = false
        })
    },
    openModal (status, item) {
      if (status === 'new') {
        this.tempCoupons = {}
        this.isNew = true
        this.$refs.CouponModal.openModal()
      } else if (status === 'edit') {
        this.tempCoupons = JSON.parse(JSON.stringify(item))
        this.isNew = false
        this.$refs.CouponModal.openModal()
        this.couponId = item.id
      } else if (status === 'del') {
        this.tempCoupons = JSON.parse(JSON.stringify(item))
        this.$refs.delCouponModal.openModal()
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
