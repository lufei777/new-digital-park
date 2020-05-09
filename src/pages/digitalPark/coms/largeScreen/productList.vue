<template>
  <div class="product-list-coms">
    <div class="product-list">
      <div class="hover-pointer flex-align-center"
           :class="[isyd && !smallyd?'yd-fixed-pro-item':isyd && smallyd?'small-yd-fixed-pro-item':'fixed-pro-item',
                   item.clickFlag?'active-yd-fixed-pro-item':'']"
           v-for="(item) in showFixedProList" :key="item.id"
           @click="onClickItemFixPro(item)"
      >
        <i class="iconfont item-icon" :class="[smallyd?'small-item-icon':'',item.icon]"></i>
        <span>{{item.name}}</span>
      </div>
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
  import { mapState } from 'vuex'
  import DigitalParkApi from '@/service/api/digitalPark'
  import CommonFun from '@/utils/commonFun'
  import { IsCZClient } from '@/utils/auth';
  import { isYD } from "@/utils/project";
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
      isyd(){ //是否是伊甸城
        return isYD
      },
      ...mapState({
        largeScreenIframeSrc:state=>state.digitalPark.largeScreenIframeSrc
      }),
      smallyd(){
        return document.body.offsetWidth<2560?true:false
      }
    },
    watch:{
      largeScreenIframeSrc(){
        if(!this.largeScreenIframeSrc){
          this.fixedProList.map((item)=>{
            item.clickFlag=false
          })
        }
      }
    },
    methods: {
      async getProductList(){
        let res = await DigitalParkApi.getProductList({
          language:Cookies.get('lang')
        })
        // $(".fixed-pro-item").css({
        //   height:$(".product-list").height()/3
        // })
        // if(this.productId){
        //   this.clientMenu = res.find((item)=>item.id==this.productId)
        //   this.fixedProList= this.clientMenu.childNode
        //   this.headNames=this.clientMenu.name
        // }else{
        //   this.fixedProList=res
        // }
        res.map((item)=>{
          item.clickFlag=false
        })
        this.fixedProList=res
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
        this.fixedProList.map((item)=>{
          item.clickFlag=false
        })
        item.clickFlag=true
        if(item.level==2 && item.clientType==1){
          let tmpObj = item
          if(item.childNode[0].name=="概览"){
            tmpObj.childNode.splice(0,1)
          }
          let curNode = CommonFun.getLastItem(tmpObj)
          // console.log("curNode",curNode)
          if(IsCZClient()){
            // console.log("loaditem",item)
            window.goToClientPage(JSON.stringify(item), curNode.id + "")
            this.$store.commit("digitalPark/largeScreenIframeSrc","")
            this.fixedProList.map((item)=>{
              item.clickFlag=false
            })
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
  .product-list,.yd-product-list{
    flex-grow: 1;
    box-sizing: border-box;
    overflow: hidden;
    width:100%;
    /*padding:10px 20px;*/
    &:after{
      width:40%;
      content:''
    }
  }
  .fixed-pro-item{
    font-size: 28px;
    width:23%;
    height:75px;
    line-height: 75px;
    flex-shrink: 0;
    float:left;
    margin:1%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-image: url('../../../../../static/image/digitalPark/tag_large_bg.png') ;
    text-align: center;
  }
  .yd-fixed-pro-item{
    width:20%;
    float:left;
    margin:25px 2.5%;
    font-size: 14px;
    padding:15px 0;
    text-align: center;
    box-sizing: border-box;
    border:1px solid #A5FCFF;
    background:linear-gradient(0deg,rgba(0,180,255,0.15));
    border-radius:30px;
    color:#A5FCFF;
  }
  .small-yd-fixed-pro-item{
    width:31%;
    float:left;
    margin:10px 1%;
    font-size: 12px;
    padding:6px 0;
    text-align: center;
    box-sizing: border-box;
    border:1px solid #A5FCFF;
    background:linear-gradient(0deg,rgba(0,180,255,0.15));
    border-radius:30px;
    color:#A5FCFF;
  }
  .turn-page{
    margin-bottom:20px;
    span{
      width:40px;
      height:40px;
      border-radius: 5px;
      background:#4F89B2;
      color:#333;
      text-align: center;
      line-height: 40px;
      font-size: 24px;
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
  .item-icon{
    display: block;
    border:1px solid #A5FCFF;
    border-radius: 50%;
    /*padding:5px;*/
    width:25px;
    height:25px;
    text-align: center;
    line-height:25px;
    color:#A5FCFF;
    margin-right: 10px;
  }
  .small-item-icon{
    display: block;
    border:1px solid #A5FCFF;
    border-radius: 50%;
    /*padding:5px;*/
    width:15px;
    height:15px;
    text-align: center;
    line-height:15px;
    color:#A5FCFF;
    margin-right: 5px;
    font-size: 12px;
  }
  .active-yd-fixed-pro-item{
    color:#01EAFE;
    background: #012F46;
    border:1px solid #012F46;
  }
}
</style>
