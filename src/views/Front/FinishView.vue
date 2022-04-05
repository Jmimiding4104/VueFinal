<template>
  <div class="wrap">
    <div class="order-finish-title">
      <h2>謝謝您的訂購，歡迎下次再次光臨。</h2>
    </div>
    <div class="order-finish-content">
      <div class="order-finish-describe">
        <table>
          <thead>
            <tr>
              <th>
                以下是您的訂購資訊，請再次確認。
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
             <td>姓名</td>
             <td>{{orderData.user?.name}}</td>
            </tr>
            <tr>
              <td>信箱</td>
              <td>{{orderData.user?.email}}</td>
            </tr>
            <tr>
             <td>地址</td>
             <td>{{orderData.user?.address}}</td>
            </tr>
            <tr>
             <td>電話</td>
             <td>{{orderData.user?.tel}}</td>
            </tr>
            <tr>
             <td>您的留言</td>
             <td>{{orderData.message}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="order-finish-product">
        <h2>我的購物車</h2>
      </div>
      <div class="order-finish-product"></div>
    </div>
  </div>
</template>

<style>
.order-finish-title {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-finish-title h2 {
  font-weight: bold;
}
</style>

<script>
export default {
  data () {
    return {
      orderData: ''
    }
  },
  methods: {
    getData () {
      const { id } = this.$route.params
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`)
        .then((res) => {
          this.orderData = res.data.order
          console.log(this.orderData)
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
