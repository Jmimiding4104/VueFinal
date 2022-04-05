<template>
  <div class="wrap">
    <div class="fillin-view-title">
      <h2>填寫聯絡與寄送資料</h2>
    </div>
    <div class="fillin-view">
      <div class="information">
        <CartForm />
      </div>
      <div class="order-products">
        <h3>我的購物車</h3>
        <div class="order-item" v-for="item in cartData.carts" :key="item.id">
          <div
            class="order-img"
            :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
          ></div>
          <div class="order-item-descript">
            <div class="order-item-descript-1">
              <p>{{ item.product.title }}</p>
              <div class="order-item-descript-2">
                <p>x{{ item.qty }}{{ item.product.unit }}</p>
                <p>${{ item.final_total }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
