<template>
  <div class="wrap">
    <div class="order-container">
      <div>
        <div class="orderpage">
          <div class="orderhead">
            <h2>您的購物車</h2>
            <div class="clear-cart">
              <button
                class="btn btn-outline-danger"
                type="button"
                @click="delCarts()"
              >
                刪除所有產品
              </button>
            </div>
          </div>
          <table class="table align-middle">
            <thead>
              <tr>
                <th style="width: 240px"></th>
                <th style="width: 240px" class="text-center">品項</th>
                <th style="width: 240px" class="text-center">數量/單位</th>
                <th style="width: 240px" class="text-center">單價</th>
                <th style="width: 40px"></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cartData.carts">
                <tr v-for="item in cartData.carts" :key="item.id">
                  <td class="order-img">
                    <img
                      :src="item.product.imageUrl"
                      class="card-img-top"
                      alt="..."
                    />
                  </td>
                  <td class="text-center">{{ item.product.title }}</td>
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
                  <td class="text-center">{{ item.final_total }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="delCartItem(item.id)"
                      :disabled="isLoading === item.id"
                    >
                      x
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot class="order-tfooter">
              <tr>
                <td colspan="3">
            <div class="ordercoupn">
            <input
              type="text"
              id="coupon"
              v-model="couponCode"
              placeholder="請輸入優惠碼"
            />
            <button class="btn btn-primary" type="button" @click="useCoupon()">
              折抵GO
            </button>
          </div>
                </td>
                <td colspan="1" class="text-end">總計</td>
                <td class="text-end">{{ cartData.total }}</td>
              </tr>
              <tr v-if="couponMoney.length != 0">
                <td colspan="4" class="text-end">折扣後價格</td>
                <td class="text-end">{{ couponMoney }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="order-footer">
            <div class="order-next">
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="this.$router.push('/Products')"
              >
                繼續購物
              </button>
            </div>
            <div class="order-next">
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="nextView()"
              >
                下一步
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <p>此網站非實際運營之網站，僅為學習用途。</p>
  </div>
</template>

<style>
.order-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px 0px 10px;
}

.orderpage {
  width: 100%;
  margin-bottom: 100px;
}

.orderhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-cart {
  max-height: 36px;
}

.orderpage h2 {
  margin-top: 10px;
  font-weight: bold;
  color: brown;
  border-left: 5px solid brown;
  padding-left: 10px;
}

.orderpage table {
  color: brown;
}

.orderpage tbody td {
  color: black;
}

.order-img {
  max-width: 100px;
}

.order-list {
  font-weight: bold;
  padding-left: 3px;
  color: brown;
  border-bottom: 3px solid brown;
  border-left: 3px solid brown;
}

.clear-cart {
  display: flex;
}

.order-footer {
  display: flex;
  justify-content: end;
  align-items: center;
}

.order-next {
  margin: 10px;
}

.ordercoupn {
  display: flex;
  align-items: center;
}

.ordercoupn button {
  max-height: 30px;
  display: flex;
  align-items: center;
}

@media(max-width:600px) {
  .order-footer {
    justify-content: center;
  }
}

@media(max-width:426px) {
  .ordercoupn button {
    max-height: none;
  }
}

.user .item {
  margin: 10px 0px;
}
</style>

<script>
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
      this.$http.post(Url, { data: { code } }).then((res) => {
        console.log(res)
        this.couponMoney = res.data.data.final_total
      })
    },
    nextView () {
      this.$router.push('/FillIn')
    },
    goPay () {
      const { id } = this.$route.params
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}`
        )
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
