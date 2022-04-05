<template>
  <div class="wrap">
    <div class="fillin-view-title" v-show="orderStatus === false">
      <h2>填寫聯絡與寄送資料</h2>
    </div>
    <div class="finish-title" v-show="orderStatus === true">
      <h2>謝謝您的訂購，歡迎下次再次光臨。</h2>
    </div>
    {{email}}
    <div class="fillin-view">
      <div class="information">
        <div class="row justify-content-center" v-show="orderStatus === false">
          <VForm ref="form" v-slot="{ errors }">
            <div class="mb-3">
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

            <div class="mb-3">
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

            <div class="mb-3">
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

            <div class="mb-3">
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

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea
                id="message"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
          </VForm>
        </div>
        <div class="order-finish-describe" v-show="orderStatus === true">
        <table>
          <thead>
            <tr>
              <th colspan="2">
                以下是您的訂購資訊，請再次確認。
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
             <td>訂購姓名</td>
             <td>{{form.user.name}}</td>
            </tr>
            <tr>
              <td>聯絡信箱</td>
              <td>{{form.user.email}}</td>
            </tr>
            <tr>
             <td>寄送地址</td>
             <td>{{form.user.address}}</td>
            </tr>
            <tr>
             <td>聯絡電話</td>
             <td>{{form.user.tel}}</td>
            </tr>
            <tr>
             <td>付款情況</td>
             <td>{{is_paid?'已付款':'未付款'}}</td>
            </tr>
            <tr>
             <td>您的留言</td>
             <td>{{form.message}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div class="order-products">
        <h3>我的購物車</h3>
        <div class="order-item" v-for="item in cartData.carts" :key="item.id">
          <div
            class="order-img"
            :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
          ></div>
          <div class="order-item-descript">
            <div class="order-item-descript-1">
              <p>{{ item.product.title }}</p>
              <div class="order-item-descript-2">
                <p>x{{ item.qty }}{{ item.product.unit }}</p>
                <p>${{ item.final_total }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="order-price">
          <div class="order-price-total">
            <p>原價</p>NT${{cartData.total}}
          </div>
          <div class="order-price-total">
            <p>售價(應付金額)</p>NT${{cartData.final_total}}
          </div>
        </div>
        <div class="payorder-next">
          <button
           type="submit"
           class="btn btn-outline-primary"
           @click.prevent="this.$router.push('/Products')"
           v-show="orderStatus === false"
          >
            繼續購物
          </button>
          <button
           class="btn btn-primary"
           @click.prevent="sendOrder()"
           v-show="orderStatus === false"
          >
            結帳
          </button>
          <button
           type="submit"
           class="btn btn-outline-primary"
           @click.prevent="payOrder()"
           v-show="orderStatus === true"
          >
            繼續購物
          </button>
          <button
           class="btn btn-primary"
           @click.prevent="payOrder()"
           v-show="orderStatus === true"
          >
            前往付款
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <p>此網站非實際運營之網站，僅為學習用途。</p>
  </div>
</template>

<style>
.fillin-view-title {
  padding-left: 10px;
  margin-left: 50px;
  border-left: 5px solid brown;
  color: brown;
}

.fillin-view-title h2 {
  font-weight: bold;
}

.fillin-view {
  display: flex;
  flex-direction: space-around;
  padding-left: 60px;
  padding-right: 10px;
}

.information {
  width: 60%;
}

.order-products {
  width: 40%;
  margin: 10px 100px auto 100px;
  padding: 10px 10px 10px 10px;
  border: 1px solid brown;
}

.order-item {
  display: flex;
  padding-top: 10px;
}

.order-item .order-img {
  width: 50px;
  background-size: cover;
  background-position: center;
}

.order-item-descript {
  padding-left: 10px;
  width: 80%;
}

.order-item-descript-2 {
  display: flex;
  justify-content: space-between;
}

.order-price {
  display: flex;
  flex-direction: column;
  border-top: 1px solid gray;
  margin-top: 20px;
  padding-top: 20px;
}

.order-price-total {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}

.payorder-next {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.order-finish-describe table {
  width: 100%;
}

.order-finish-describe thead {
  background-color: brown;
  color: white;
}

.finish-title {
  display: flex;
  justify-content: center;
  border: 0px;
}

.finish-title h2 {
  color: brown;
  font-weight: bold;
}

.order-finish-describe th {
  padding: 5px 0px 5px 0px;
  text-align: center;
}

.order-finish-describe tr {
  border-top: 1px solid brown;
  border-bottom: 1px solid brown;
}

.order-finish-describe td {
  padding: 5px 0px 5px 0px;
}

@media(max-width:780px) {
  .fillin-view {
    padding-left: 10px;
  }
  .information {
    margin: 0px auto;
  }
  .fillin-view {
    flex-direction: column;
  }
  .order-products {
    width: 60%;
    margin: 0px auto;
  }
}
</style>

<script>
export default {
  data () {
    return {
      cartData: '',
      orderId: '',
      orderStatus: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      is_paid: ''
    }
  },
  methods: {
    getCarts () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
          console.log(this.cartData)
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    sendOrder () {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      const data = {
        user: this.form.user,
        message: this.form.message
      }
      this.$http
        .post(apiUrl, { data })
        .then((res) => {
          this.orderId = res.data.orderId
          alert(res.data.message)
          this.orderStatus = true
          this.getOrder()
          // this.$refs.form.resetForm()
          // this.$router.push(`/Finish/${this.orderId}`)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getOrder () {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http
        .get(apiUrl)
        .then((res) => {
          this.is_paid = res.order.is_paid
        })
    },
    payOrder () {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http
        .post(apiUrl)
        .then((res) => {
          this.$router.push('/Complete')
        })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
