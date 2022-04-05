<template>
  <div class="wrap">
    <div class="home-img">
      <div class="home-text">
        <div class="title">
          <p>和牛饗宴</p>
        </div>
        <div class="title">
          <p>和你分享</p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="item1">
        <h2>生食</h2>
        <div class="item1-container">
          <div class="item1-img"></div>
          <div class="item1-text">
          <div class="item1-describe">
            <h3>生鮮肉品</h3>
            <p>
              適合喜愛烹調的您，
              我們提供各式生鮮和牛肉品，
              可依據不同肉品進行各式調理方式，
              能充分展現其美味，
              為您提供昇華的生活享受。
            </p>
          </div>
          </div>
        </div>
      </div>
      <div class="item2">
        <h2>熟食</h2>
          <div class="item2-container">
          <div class="item2-text">
          <div class="item2-describe">
            <h3>熟食冷凍包</h3>
            <p>
              若您不擅烹煮，
              亦或環境不須可進行烹調，
              我們也有提供熟食冷凍包供您選擇，
              加熱後仍能享受不一樣的生活。
            </p>
          </div>
          </div>
          <div class="item2-img"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <p>此網站非實際運營之網站，僅為學習用途。</p>
  </div>
</template>

<style>
.wrap {
  max-width: 1000px;
  margin: 0px auto;
  margin-top: 10px;
  margin-top: 10px;
  position: relative;
}

.home-img {
  height: 400px;
  background-image: url(../../../image/home1.jpg);
  background-position: 0px -100px;
  display: flex;
  justify-content: end;
  align-items: center;
}

.home-text {
  color: white;
  font-size: 40px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0,0,0,0.5);
  margin-right: 80px;
  padding: 30px;
  border-radius: 10px;
}

@media(max-width:768px) {
  .home-img {
    display: flex;
  }
  .home-text {
    width: 768px;
    margin-right: 0px;
    border-radius: 0px;
    display: flex;
    align-items: end;
    padding-right: 50px;
  }
}

p {
  margin: 0px;
}

.container {
  padding: 50px 30px 50px 30px;

}

.item1 h2 {
  color: brown;
  font-weight:bold;
  padding-left: 10px;
  border-left: 5px solid brown;
  border-bottom: 5px solid brown;
}

.item1-container {
  display: flex;
}

.item1-img {
  background-image: url(../../../image/item1.jpg);
  background-repeat: no-repeat;
  width: 100%;
  height: 400px;
  background-position: center;
}

.item1-describe {
  position: relative;
  left: -30px;
  bottom: -100px;
  max-width: 300px;
  max-height: ;
  padding: 20px;
  color: black;
  font-weight:bold;
  background-color: rgba(255,182,193,0.5);
}

@media(max-width:1200px){
  .item1-describe {
  position: relative;
  left: -10px;
  bottom: -100px;
  max-width: 300px;
  max-height: ;
  padding: 20px;
  color: black;
  font-weight:bold;
  background-color: rgba(255,182,193,0.5);
}
}

@media(max-width:390px){
  .item1-describe {
  position: relative;
  left: -10px;
  bottom: -50px;
  max-width: 300px;
  max-height: ;
  padding: 20px;
  color: black;
  font-weight:bold;
  background-color: rgba(255,182,193,0.5);
}
}

.item2 {
  margin-top: 50px;
}

.item2-container {
  display: flex;
}

.item2 h2 {
  color: brown;
  font-weight:bold;
  padding-left: 10px;
  border-left: 5px solid brown;
  border-bottom: 5px solid brown;
}

.item2-img {
  background: url(../../../image/item2.jpg);
  background-repeat: no-repeat;
  width: 100%;
  height: 400px;
  background-position: center;
}

.item2-describe {
  position: relative;
  left: 50px;
  bottom: -100px;
  max-width: 300px;
  max-height: ;
  padding: 20px;
  color: black;
  font-weight:bold;
  background-color: rgba(255,182,193,0.5);
}

@media(max-width:1200px){
  .item2-describe {
  position: relative;
  left: 30px;
  bottom: -100px;
  max-width: 300px;
  max-height: ;
  padding: 20px;
  color: black;
  font-weight:bold;
  background-color: rgba(255,182,193,0.5);
}
}

@media(max-width:990px){
  .item2-describe {
  position: relative;
  left: 20px;
  bottom: -100px;
  max-width: 300px;
  max-height: ;
  padding: 20px;
  color: black;
  font-weight:bold;
  background-color: rgba(255,182,193,0.5);
}
}

.footer {
  width: 100%;
  position: ;
  bottom: 0px;
  background-color: rgb(114,38,38);
  color: white;
  padding: 10px;
  text-align: center;
  margin-top: 20px;
}

</style>

<script>

</script>
