<template>
  <div class="large-screen-center-show">
    <iframe ref="irm" name="largeScreen"
            :src="largeScreenIframeSrc"
            v-if="iframeRender"
            frameborder="0" width="100%" height="100%"
    ></iframe>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import DigitalParkApi from '@/service/api/digitalPark'
  export default {
    name: 'largeScreenCenterShow',
    components: {
    },
    props:['largeScreenCenterShow'],
    data () {
      return {
        fixedProList:[],
        showFixedProList:[],
        activeBtnIndex:2,
        iframeRender:true
      }
    },
    computed:{
      ...mapState({
        largeScreenIframeSrc:state=>state.digitalPark.largeScreenIframeSrc
      })
    },
    watch:{
      largeScreenIframeSrc(){
        // this.iframeRender = false;
        // this.$nextTick(() => {
        //   this.iframeRender = true;
        //   console.dir(this.$refs['irm'].contentWindow);
        // })
        console.log(this.largeScreenIframeSrc)
        if(this.largeScreenIframeSrc.indexOf('vibe-web')!=-1){
          this.iframeRender=false
          this.$nextTick(() => {
            this.iframeRender = true;
          })
        }
      }
    },
    methods: {
    },
    mounted(){
    }
  }
</script>

<style lang="less">
</style>
