<template>
<div class="wrap">
  <div class="product-container">
    <div class="list">
        <h2>產品列表</h2>
      <ul>
        <li><button type="button" class="btn btn-outline-primary" @click.prevent="this.$router.push('/Products')">所有產品區</button></li>
        <!--<li><button type="button" class="btn btn-outline-primary">生鮮肉品區</button></li>
        <li><button type="button" class="btn btn-outline-primary">熟食冷凍包</button></li>-->
      </ul>
    </div>
    <div class="productslist">
    <div class="row row-cols-xs-1 row-cols-md-3 row-cols-lg-3">
      <div class="col" v-for="item in products" :key="item.id">
        <div class="card h-100" style="width: 16rem;">
          <div class="card-header">
            <img :src="item.imageUrl" class="card-img-top" alt="...">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text">
              {{item.description}}
            </p>
          </div>
          <div class="card-footer">
            <router-link class="btn btn-primary" :to="`/product/${item.id}`">查看詳情</router-link>
          </div>
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
.product-container {
  display: flex;
  margin-top: 20px;
}

.list h2 {
  text-align: center;
}

.list ul {
  padding-left: 0px;
  margin-right: 10px;
  width: 150px;
}

.list ul li {
  list-style-type: none;
  display: flex;
  justify-content: center;
}

.list ul li button {
  display: block;
  text-decoration: none;
  text-align: center;
  color: brown;
  font-weight:bold;
  margin-bottom: 10px;
}

.list ul li a:hover{
  background-color: brown;
  color: white;
}

.productslist .row {
  margin: 0px;
}

.productslist .row .col {
  padding: 0px;
  margin: 0px;
  width: 280px;
}

@media(max-width:690px){
  .product-container {
    display: flex;
    flex-direction: column;
  }

  .list {
    display: flex;
    justify-content: center;
  }

  .list ul{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 450px;
  }

  .list ul li button {
    padding: 5px;
    margin: 10px;
    background-color: rgb(206, 53, 53);
    color: white;
    border-radius: 5px;
  }

  .list h2{
  display: none;
}

  .productslist .row .col{
    display: flex;
    justify-content: center;
  }
}
</style>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
