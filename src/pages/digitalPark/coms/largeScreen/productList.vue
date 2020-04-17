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
                  @click.stop="onClickTurnPageBtn(1)"
            ></span>
      <span class="right-btn hover-pointer iconfont iconyou" :class="activeBtnIndex==2?'active-btn':''"
            @click.stop="onClickTurnPageBtn(2)"></span>
    </div>
  </div>
</template>

<script>
  import DigitalParkApi from '@/service/api/digitalPark'
  import CommonFun from '@/utils/commonFun'
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
        this.showFixedProList=this.fixedProList.length>12?this.fixedProList.slice(0,12):this.fixedProList
      },
      onClickTurnPageBtn(flag){
        if(flag==1){
          this.showFixedProList=this.fixedProList.slice(0,12)
          this.activeBtnIndex=2
        }else{
          this.showFixedProList=this.fixedProList.slice(12)
          this.activeBtnIndex=1
        }
      },
      onClickItemFixPro(item){
        if(item.level==2 && item.clientType==1){
          let tmpObj = item
          tmpObj.childNode.splice(0,1)
          let curNode = CommonFun.getLastItem(tmpObj)
          console.log("curNode",curNode)
          if(localStorage.isCZClient=="true"){
            window.goToClientPage(JSON.stringify(item), curNode.id + "")
          }else{
            this.$message({
              type:'warning',
              message:'请在客户端中访问'
            })
          }
          return ;
        }
        this.$store.commit("digitalPark/menuList",item)
        this.$store.commit('digitalPark/activeMenuIndex',CommonFun.setMenuIndex(item))
        if(item.routeAddress.indexOf('@')!=-1){
          console.log(window.top.location.origin+'/#/vibe-web')
          this.$store.commit("digitalPark/largeScreenIframeSrc",
                             window.top.location.origin+'/#/vibe-web?updateId='+_.uniqueId())
        }else{
          console.log(window.top.location.origin+item.routeAddress)
          this.$store.commit("digitalPark/largeScreenIframeSrc",window.top.location.origin+'/#'+item.routeAddress)
        }
      }
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
