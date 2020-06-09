<template>
  <div class="norbu-center">
    <div class="module-item-top-name flex-align">
      <i class="module-item-top-icon"></i>
      <span>{{moduleItem.moduleName}}</span>
    </div>
    <div class="my-chart flex-column">
      <div class="product-list">
        <div class="hover-pointer flex-align-center item-product"
             v-for="(item,index) in fixedProList" :key="item.id"
             :class="activeIndex==index?'active-product':''"
             @click="onClickItemFixPro(item,index)"
        >
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="img-box">
        <img src="../../../../../static/image/digitalPark/nor_model.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import DigitalParkApi from '@/service/api/digitalPark'
export default {
    name: 'norbulingkaCenter',
    components: {},
    props: ['moduleItem'],
    data() {
        return {
          fixedProList:[],
          activeIndex:-1
        }
    },
    computed: {},
    watch: {},
    methods: {
      async getProductList(){
        let res = await DigitalParkApi.getProductList({
          language:Cookies.get('lang')
        })
        res.map((item)=>{
          item.clickFlag=false
        })
        this.fixedProList=res
      },
      onClickItemFixPro(item,index){
        this.activeIndex=index
      }
    },
    mounted() {
      this.getProductList()
    }
}
</script>

<style lang="less">
  .norbu-center{
    font-size: 14px;
    background-image:url('../../../../../static/image/digitalPark/nor_module_bg_big.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    box-sizing: border-box;
    .module-item-top-name{
      margin-left: 20px;
    }
    .product-list{
      margin-top: 20px;
      overflow: hidden;
    }
    .item-product{
      width:12%;
      padding:10px;
      float: left;
      margin:0 1.1%;
      box-sizing: border-box;
      border: 1px solid #0462BA;
      background: #012F46;
      border-radius: 30px;
      color: #A5FCFF;
    }
    .item-product:hover,.active-product{
      color:@white;
      background:#0462BA;
    }
    .img-box{
      margin-top: 70px;
      width:100%;
      flex-grow: 1;
      box-sizing: border-box;
      text-align: center;
      border:30px solid #2C3C71;
      margin-bottom: 20px;
      /*position: absolute;*/
      /*bottom:20px;*/
      /*margin:auto;*/
      img{
        width:100%;
        height:100%;
      }
    }
  }
</style>
