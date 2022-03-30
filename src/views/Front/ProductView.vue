<template>
<div class="product-track">
  <div class="product-track-text">
  <a href="/">首頁</a>
  >
  <a href="/#/Products">產品</a>
  >
  {{product.title}}
  </div>
</div>
<div class="wrap">
  <div class="product-container">
    <div class="product-img">
    <img :src="product.imageUrl" class="card-img-top" alt="...">
    </div>
    <div class="product-text">
    <div class="product-category">
      <span>
      {{product.category}}
      </span>
    </div>
    <div class="preproduct-text one">
      <h3>產品名稱</h3>
    <div class="product-title">
      {{product.title}}
    </div>
    </div>
    <div class="preproduct-text">
      <h3>產品售價</h3>
    <div class="product-price">
      {{product.price}}元
    </div>
    </div>
    <div class="text-container">
    <div class="preproduct-text">
      <h3>產品介紹</h3>
    <div class="product-description">
      {{product.description}}
    </div>
    </div>
    <div class="preproduct-text">
      <h3>產品內容</h3>
    <div>
      {{product.content}}
    </div>
    </div>
    </div>
    </div>
  </div>
  </div>
</template>

<style>
.product-track {
  background-color: red;
  height: 30px;
}

.product-track a {
  color: white;
}

.product-track-text {
  display: flex;
  align-items: center;
  height: 30px;
  color: white;
  max-width: 1000px;
  margin: 0px auto;
}

.product-container {
  display: flex;
}

.product-text {
  margin-left: 30px;
}

.product-category span{
  font-size: 10px;
  background-color: brown;
  color: white;
  padding: 2px;
  border-radius: 5px;
}

.preproduct-text {
  margin: 10px 0px;
}

.preproduct-text h3 {
  color: brown;
  border-bottom: 3px solid brown;
}

.one {
  margin-top: 0px;
}

</style>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
