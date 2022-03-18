<template>
  <DashboardNavbar />
  <ToastsMessage />
  <router-view v-if="checksuccess"></router-view>
</template>

<script>
import DashboardNavbar from '@/components/DashboardNavbar'
import ToastsMessage from '@/components/ToastsMessage.vue'
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      checksuccess: false
    }
  },
  provide () {
    return {
      emitter
    }
  },
  components: {
    DashboardNavbar,
    ToastsMessage
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.$http.defaults.headers.common.Authorization = token
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/user/check`
        )
        .then((res) => {
          this.checksuccess = true
          this.$httpMessageState(res, '登入')
        })
        .catch((err) => {
          this.$router.push('/login')
          this.$httpMessageState(err.response, '登入')
        })
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
