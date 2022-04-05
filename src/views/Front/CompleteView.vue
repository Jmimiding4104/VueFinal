<template>
  <div class="wrap">
      <div class="complete-view">
          <div class="text-view">
          <div class="text">
              購買成功!!
          </div>
          <div class="text">
              歡迎再次光臨
          </div>
          </div>
          <div class="complete-btn">
            <button class="btn btn-primary" @click.prevent="this.$router.push('/')">
            回到首頁
          </button>
          </div>
      </div>
  </div>
  <div class="footer">
    <p>此網站非實際運營之網站，僅為學習用途。</p>
  </div>
</template>

<style>
.complete-view {
  background: url('https://cdn.pixabay.com/photo/2018/10/22/22/18/steak-3766548_960_720.jpg') center center no-repeat;
  height: 600px;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.complete-view .text-view {
  padding: 10px 0px 10px 0px;
}

.complete-view .text {
  color: aliceblue;
  font-size: 40px;
  background-color: rgba(0,0,0,0.5);
  padding-left: 50px;
}

.complete-btn {
  height: 50px;
  margin-top: 10px;
  margin-left: 50px;
}
</style>
