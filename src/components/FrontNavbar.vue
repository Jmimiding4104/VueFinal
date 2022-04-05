<template>
  <div class="front-navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">
            和饗
            </router-link>
            <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" id="link" to="/Products">
                        產品列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" id="link" to="/login">
                        登入後台
                        </router-link>
                    </li>
                </ul>
                <router-link
                to="/Cart"
                type="button"
                class="btn btn-primary position-relative"
                style="border: 1px solid black"
                >
                    結帳
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {{cartData.carts?.length}}
                        </span>
                </router-link>
            </div>
        </div>
    </nav>
  </div>
</template>

<style>
.front-navbar .navbar {
  padding: 0px;
}

.front-navbar .navbar .container-fluid {
  padding: 20px 50px 10px 50px;
  background-color: rgb(104,22,22);
}

.navbar-collapse {
  justify-content: flex-end;
}

#link{
  color: white;
}
</style>

<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      cartData: {}
    }
  },
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => this.getCart())
  }
}
</script>
