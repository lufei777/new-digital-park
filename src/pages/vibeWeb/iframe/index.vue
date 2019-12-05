<template>
  <div>
    <iframe id="myIframe" :src="computedSrc" frameborder="0" scrolling="no" width="100%"></iframe>
  </div>
</template>
<script>
// http://localhost:8090/vibe-web/html/deviceMeter/deviceMeter_index.html
export default {
  props: {
    iframeConfig: {
      type: Object,
      reqiured: true
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.changeMobsfIframe();
  },
  methods: {
    changeMobsfIframe() {
      const mobsf = document.getElementById("myIframe");
      const deviceWidth = document.body.clientWidth;
      const deviceHeight = document.body.clientHeight;
      mobsf.style.height = Number(deviceHeight) - 85 + "px"; //数字是页面布局高度差
    }
  },
  computed: {
    computedSrc() {
      if (this.iframeConfig.src === "digitalPark/defaultPage") {
        return `${window.top.location.host}/#/${this.iframeConfig.src}`;
      }
      return vibeWebUrl + "/" + this.iframeConfig.src;
    }
  }
};
</script>
<style lang='less' scoped>
</style>