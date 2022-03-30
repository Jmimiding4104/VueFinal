<template>
    <div class="wrap">
        <div class="title">
            <h1>
                確認訂單
            </h1>
        </div>
        <div class="order-product">
          <table>
            <tr>
              <th>商品</th>
              <th>數量</th>
            </tr>
            <tr v-for="item in items" :key="item.id">
              <td>{{item.id}}</td>
            </tr>
          </table>
        </div>
        <div class="information">
            <div class="address">
                <p>訂單地址:</p>
                {{user.address}}
            </div>
            <br/>
            <div class="email">
                <p>訂單信箱:</p>
                {{user.email}}
            </div>
            <br/>
            <div class="name">
                <p>訂單姓名:</p>
                {{user.name}}
            </div>
            <br/>
            <div class="user">
                <p>訂單電話:</p>
                {{user.tel}}
            </div>
            <br/>
            <div class="pay">
                {{order.is_paid?'付款':'未付款'}}
            </div>
            <div class="btn btn-primary" type="button" @click.prevent="goPay()">前往付款</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      order: '',
      user: {},
      items: [],
      ooo: '-MzQn2hEA0i3j2N1m3OO'
    }
  },
  methods: {
    getData () {
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`)
        .then((res) => {
          console.log(res)
          this.order = res.data.order
          this.user = res.data.order.user
          this.items = res.data.order.products.MzQn2hEA0i3j2N1m3OO
          console.log(this.items)
        })
    },
    goPay () {
      const { id } = this.$route.params
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}`)
        .then((res) => {
          alert(res.data.message)
          console.log(res)
          this.$router.push('/Finish')
        })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
