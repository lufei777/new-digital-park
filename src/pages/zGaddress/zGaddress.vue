<template>
  <div class="face-recognition">
    <span
      v-show="back"
      class="nav-right-item long-text face-recognition-back"
      @click="onClickGoBack"
    >
      <span style="color:#008DEA">
        <i class="iconfont iconshouye"></i>&nbsp;返回首页
      </span>
    </span>
    <iframe
      src="http://localhost:2019/"
      id="iframe"
      frameborder="0"
      width="100%"
      height="100%"
      style="display:block;border-width:0px;"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "ZGaddress",
  data() {
    return {
      back: false,
      zGadress:window.zGadress 
    };
  },
  mounted() {
    const iframe =  document.querySelector("#iframe");
    iframe.style.height = `${document.body.clientHeight}px`;
    iframe.onload = () => {
      this.back = true;
      /* let iWin = iframe.contentWindow;
      console.log(iWin); */
    };
  },
  methods: {
    onClickGoBack() {
      if (Cookies.get("moduleType") == 2) {
        this.$router.push("/digitalPark/homePage");
      } else {
        this.$router.push("/digitalPark/dashboardHomePage");
      }
      Cookies.remove("activeMenuIndex");
    }
  }
};
</script>

<style lang="less">
.face-recognition {
  width: 100%;
  height: 100%;
  #iframe {
    position: relative;
  }
  .face-recognition-back {
    position: absolute;
    left: 80%;
    top: 25px;
    z-index: 555555555555;
  }
  .nav-right-item {
    span {
      // width:90px;
      display: inline-block;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>