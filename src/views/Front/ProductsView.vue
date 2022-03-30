<template>
<div class="wrap">
  <div class="product-container">
    <div class="list">
        <h2>產品列表</h2>
      <ul>
        <li><a href="#">所有產品區</a></li>
        <li><a href="#">生鮮肉品區</a></li>
        <li><a href="#">熟食冷凍包</a></li>
      </ul>
    </div>
    <div class="row row-cols-xs-1 row-cols-md-2 row-cols-lg-3">
      <div class="col" v-for="item in products" :key="item.id">
        <div class="card h-100" style="width: 18rem;">
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
}

.list ul li a {
  display: block;
  text-decoration: none;
  text-align: center;
  padding: 10px 0px;
  color: brown;
  font-weight:bold;
}

.list ul li a:hover{
  background-color: brown;
  color: white;
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
