<template>
<div class="wrap">
    <div class="finish">
        <h2 class="finish-title">已完成購物</h2>
    <div class="item">
    <h2>您的訂單編號：</h2>
    {{order.id}}
    </div>
    <div class="item">
    <h2>您的付款狀態：</h2>
    {{order.is_paid?'付款':'未付款'}}
    </div>
    <br>
    <div class="btn btn-primary" type="button" @click.prevent="this.$router.push('/')">回到首頁</div>
    </div>
</div>
</template>

<style>
.finish-title {
    margin-top: 50px;
    color: brown;
    border-bottom: 3px solid brown;
    border-left: 3px solid brown;
    font-weight: bold;
    padding-left: 3px;
}

.finish .item {
  margin: 20px 0px;
}
</style>

<script>
export default {
  data () {
    return {
      order: '',
      user: {}
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
          console.log(this.order)
        })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
