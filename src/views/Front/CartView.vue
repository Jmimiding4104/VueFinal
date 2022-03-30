<template>
<div class="wrap">
  <div class="container">
    <div class="mt-4">
      <!-- 產品Modal -->
      <CartModal ref="CartModal" :id="productId" @add-to-cart="addToCart"></CartModal>
      <!-- 產品Modal -->
      <table class="table align-middle" v-show="orderStatus === false">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td style="width: 200px">
              <div
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
                style="
                  height: 100px;
                  background-size: cover;
                  background-position: center;
                "
              ></div>
            </td>
            <td>{{ product.title }}</td>
            <td>
              <div class="h5" v-if="product.price === product.origin_price">
                {{ product.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.price }} 元</div>
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="openModal(product.id)"
                >
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="addToCart(product.id)"
                  :disabled="isLoading === product.id"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    v-show="isLoading === product.id"
                  ></span>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <h3 v-show="orderStatus === true" class="order-list">購買清單與確認購買人資料</h3>
                  <div class="user" v-show="orderStatus === true">
              <div class="item">
              <h3>Email：</h3>
              {{form.user.email}}
              </div>
              <div class="item">
              <h3>收件人姓名：</h3>
              {{form.user.name}}
              </div>
              <div class="item">
              <h3>收件人手機：</h3>
              {{form.user.tel}}
              </div>
              <div class="item">
              <h3>地址：</h3>
              {{form.user.address}}
              </div>
              <div class="item">
              <h3>留言：</h3>
              {{form.message}}
              </div>
              </div>
      <!-- 購物車列表 -->
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="delCarts()"
          v-show="orderStatus === false"
        >
          清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cartData.carts">
            <tr v-for="item in cartData.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="delCartItem(item.id)"
                  :disabled="isLoading === item.id"
                >
                  <!--<span
                          class="spinner-grow spinner-grow-sm"
                          v-show="isLoading ===item.id"
                        ></span>-->
                  x
                </button>
              </td>
              <td>{{ item.product.title }}</td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <!--<input
                          min="1"
                          type="number"
                          class="form-control"
                          v-model.number="item.qty"
                        />-->
                    <select
                      id=""
                      class="form-select"
                      v-model="item.qty"
                      @change="updateCarts(item)"
                      :disabled="isLoading === item.id"
                    >
                      <option
                        :value="num"
                        v-for="num in 100"
                        :key="`${num}${item.id}`"
                      >
                        {{ num }}
                      </option>
                    </select>
                    <span class="input-group-text" id="basic-addon2">{{
                      item.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">{{ item.final_total }}</td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cartData.total }}</td>
          </tr>
            <tr v-if="couponMoney.length != 0">
            <td colspan="3" class="text-end">折扣後價格</td>
            <td class="text-end">{{ couponMoney }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="coupon" v-show="orderStatus === false">
        <label for="coupon">請輸入優惠券</label>
        <input type="text" id="coupon" v-model="couponCode">
        <button
          class="btn btn-danger"
          type="button"
          @click="useCoupon()"
        >
          優惠券折抵
        </button>
      </div>
    </div>
<div class="my-5 row justify-content-center">
          <VForm ref="form" class="col-md-6 " v-slot="{ errors }" >
            <div class="mb-3" v-show="orderStatus === false">
              <label for="email" class="form-label">Email</label>
              <VField
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                v-model="form.user.email"
              ></VField>
              <error-message
                name="email"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3" v-show="orderStatus === false">
              <label for="name" class="form-label">收件人姓名</label>
              <VField
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="form.user.name"
              ></VField>
              <error-message
                name="姓名"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3" v-show="orderStatus === false">
              <label for="phone" class="form-label">收件人手機</label>
              <VField
                id="phone"
                name="手機"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['手機'] }"
                placeholder="請輸入手機"
                :rules="isPhone"
                v-model="form.user.tel"
              ></VField>
              <error-message
                name="手機"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3" v-show="orderStatus === false">
              <label for="address" class="form-label">收件人地址</label>
              <VField
                id="address"
                name="地址"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
                rules="required"
                v-model="form.user.address"
              ></VField>
              <error-message
                name="地址"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3" v-show="orderStatus === false">
              <label for="message" class="form-label">留言</label>
              <textarea
                id="message"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-danger" @click.prevent="chageStatus()" v-show="orderStatus === false">
                下一步
              </button>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-danger" @click.prevent="sendOrder()" v-show="orderStatus === true">
                送出訂單並付款
              </button>
            </div>
          </VForm>
        </div>
  </div>
  {{orderStatus}}
</div>
</template>

<style>
.order-list {
  font-weight: bold;
  padding-left: 3px;
  color: brown;
  border-bottom: 3px solid brown;
  border-left: 3px solid brown;
}

.coupon {
  display: flex;
  justify-content: end;
  align-items: center;
}

.user .item {
  margin: 10px 0px;
}
</style>

<script>
import CartModal from '@/components/CartModal'
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {},
      products: [],
      product: {},
      deleteAllCarts: {},
      cart: {},
      productId: '',
      isLoading: '',
      form: {
        user: {
          email: '',
          name: '',
          address: '',
          tel: ''
        },
        message: ''
      },
      couponCode: '',
      couponMoney: '',
      orderStatus: false,
      orderId: ''
    }
  },
  components: {
    CartModal
  },
  methods: {
    getProducts () {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    getCarts () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    // qty = 1 參數預設值
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      this.isLoading = id
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data }
        )
        .then((res) => {
          this.getCarts()
          // this.$refs.productsModal.closeModal()
          this.isLoading = ''
          emitter.emit('get-cart')
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    delCartItem (id) {
      this.isLoading = id
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then((res) => {
          this.getCarts()
          this.isLoading = ''
          emitter.emit('get-cart')
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    delCarts () {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
        )
        .then((res) => {
          alert('已成功清除購物車')
          this.getCarts()
          emitter.emit('get-cart')
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    updateCarts (item) {
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      this.isLoading = item.id
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          { data }
        )
        .then((res) => {
          this.getCarts()

          this.isLoading = ''
          // console.log(item);
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    useCoupon () {
      const Url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`
      const code = this.couponCode
      this.$http.post(Url, { data: { code } })
        .then((res) => {
          console.log(res)
          this.couponMoney = res.data.data.final_total
        })
    },
    chageStatus () {
      this.orderStatus = true
    },
    goPay () {
      const { id } = this.$route.params
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}`)
        .then((res) => {
          alert(res.data.message)
          console.log(res)
          this.$router.push(`/Finish/${this.orderId}`)
        })
    },
    sendOrder () {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      const data = {
        user: this.form.user,
        message: this.form.message
      }
      console.log(data)
      this.$http
        .post(apiUrl, { data })
        .then((res) => {
          this.orderId = res.data.orderId
          console.log(this.orderId)
          alert(res.data.message)
          this.$refs.form.resetForm()
          this.goPay()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    openModal (id) {
      this.$refs.CartModal.openModal()
      this.productId = id
      this.$refs.CartModal.getProduct()
    }
  },
  mounted () {
    this.getProducts()
    this.getCarts()
  }
}
</script>
