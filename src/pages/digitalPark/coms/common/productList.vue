<template>
  <div class="product-list-coms">
    <div class="product-list">
      <div class="fixed-pro-item hover-pointer"
           v-for="(item) in showFixedProList" :key="item.id"
           @click="onClickItemFixPro(item)"
      >{{item.name}}</div>
    </div>
    <div v-if="fixedProList.length>16" class="flex-align-center turn-page">
            <span class="left-btn hover-pointer iconfont iconzuo"
                  :class="activeBtnIndex==1?'active-btn':''"
                  @click="onClickTurnPageBtn(1)"
            ></span>
      <span class="right-btn hover-pointer iconfont iconyou" :class="activeBtnIndex==2?'active-btn':''"
            @click="onClickTurnPageBtn(2)"></span>
    </div>
  </div>
</template>

<script>
  import DigitalParkApi from '@/service/api/digitalPark'
  export default {
    name: 'productList',
    components: {
    },
    props:['moduleItem'],
    data () {
      return {
        fixedProList:[],
        showFixedProList:[],
        activeBtnIndex:2,
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {
      async getProductList(){
        let res = await DigitalParkApi.getProductList({
          language:Cookies.get('lang')
        })
        if(this.productId){
          this.clientMenu = res.find((item)=>item.id==this.productId)
          this.fixedProList= this.clientMenu.childNode
          this.headNames=this.clientMenu.name
        }else{
          this.fixedProList=res
        }
        this.showFixedProList=this.fixedProList.length>16?this.fixedProList.slice(0,16):this.fixedProList
      },
    },
    mounted(){
      this.getProductList()
    }
  }
</script>

<style lang="less">
.product-list-coms{
  .product-list{
    flex-grow: 1;
    box-sizing: border-box;
    padding-top:10px;
    overflow: hidden;
    &:after{
      width:40%;
      content:''
    }
  }
  .fixed-pro-item{
    width:23%;
    font-size: 12px;
    padding:10px 0;
    flex-shrink: 0;
    float:left;
    margin:15px 1% 1%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-image: url('../../../../../static/image/digitalPark/tag_large_bg.png') ;
  }
  .turn-page{
    margin-bottom: 10px;
    span{
      width:20px;
      height:20px;
      border-radius: 5px;
      background:#4F89B2;
      color:#333;
      text-align: center;
      line-height: 20px;
      font-size: 5px;
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
      width:10px;
      height:10px;
    }
  }
}
</style>
