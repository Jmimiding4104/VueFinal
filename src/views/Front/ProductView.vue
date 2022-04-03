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
      <h3>產品內容</h3>
    <div>
      {{product.content}}
    </div>
    </div>
    </div>
    </div>
  </div>
  <div class="product-introduct">
      <h3>產品介紹</h3>
    <div class="product-description">
      {{product.description}}
    </div>
    <div class="paybuttom">
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
    </div>
  </div>
  <div class="product-footer">
      <p>此網站非實際運營之網站，僅為學習用途。</p>
  </div>
</template>

<style>
.wrap {
  position: relative;
}

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

.product-img {
  max-width: 500px;
}

.product-text {
  max-width: 500px;
  margin-left: 30px;
  display: block;
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

.product-introduct h3 {
  color: brown;
  border-bottom: 3px solid brown;
}

.paybuttom {
  display: flex;
  justify-content: end;
}

.one {
  margin-top: 0px;
}

.product-footer {
  position: relative;
  top: 171px;
  width: 100%;
  position: ;
  bottom: 0px;
  background-color: rgb(114,38,38);
  color: white;
  padding: 10px;
  text-align: center;
  margin-top: 20px;
}

@media(max-width:690px){
  .product-container {
    display: flex;
  }
  .product-text {
    max-width: 500px;
  }
  .product-introduct {
    max-width: 500px;
    margin-left: 30px;
  }
}
</style>

<script>
import emitter from '@/libs/emitter'
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
    },
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
          // this.$refs.productsModal.closeModal()
          this.isLoading = ''
          emitter.emit('get-cart')
          alert('成功加入購物車')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
