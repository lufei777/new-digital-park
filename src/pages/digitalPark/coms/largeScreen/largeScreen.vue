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
  .product-list-coms{
    .product-list{
      flex-grow: 1;
      box-sizing: border-box;
      overflow: hidden;
      width:100%;
      padding:10px 20px;
      &:after{
        width:40%;
        content:''
      }
    }
    .fixed-pro-item{
      width:23%;
      height:80px;
      line-height: 80px;
      flex-shrink: 0;
      float:left;
      margin:15px 1% 1%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-image: url('../../../../../static/image/digitalPark/tag_large_bg.png') ;
      text-align: center;
    }
    .turn-page{
      margin-bottom:20px;
      span{
        width:50px;
        height:50px;
        border-radius: 5px;
        background:#4F89B2;
        color:#333;
        text-align: center;
        line-height: 50px;
        font-size: 30px;
      }
      .active-btn{
        color:#00bfee;
        background:#012f46;
        border:1px solid #00bfee;
        box-sizing: border-box;
      }
      .left-btn{
        margin-right:20px;
      }
      img{
        width:50px;
        height:50px;
      }
    }
  }
</style>
