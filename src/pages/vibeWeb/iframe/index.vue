<template>
  <div>
    <iframe id="myIframe" :src="computedSrc" frameborder="0" width="100%"></iframe>
  </div>
</template>
<script>
// http://localhost:8090/vibe-web/html/deviceMeter/deviceMeter_index.html
import {mapState} from 'vuex'
export default {
  props: {
    // iframeConfig: {
    //   type: Object,
    //   reqiured: true
    // }
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
      mobsf.style.height = Number(deviceHeight) - 113 + "px";
    }
  },
  computed: {
    ...mapState({
      activeMenuIndex: state => state.digitalPark.activeMenuIndex
    }),
    iframeConfig(){
      return {
        src: this.activeMenuIndex.split("@")[1]
      }
    },
    computedSrc() {
      if (this.iframeConfig.src === "digitalPark/defaultPage") {
        return `${window.top.location.host}/#/${this.iframeConfig.src}`;
      }
      return `${window.top.location.origin}/vibe${this.iframeConfig.src}`;
    },
  }
};
</script>
<style lang='less' scoped>
#myIframe {
  overflow: auto;
}
</style>
