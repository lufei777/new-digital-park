<template>
  <div class="norbu-center">
    <div class="module-item-top-name flex-align tmp-hidden">
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
  import CommonFun from '@/utils/commonFun'
  import {mapState} from 'vuex'
  export default {
    name: 'norbulingkaCenter',
    components: {},
    props: ['moduleItem'],
    data() {
      return {
        fixedProList: [],
        activeIndex: -1
      }
    },
    computed: {
      ...mapState({
        userInfo:state => state.user.userInfo
      })
    },
    watch: {},
    methods: {
      async getProductList() {
        let res = await DigitalParkApi.getProductList({
          language: Cookies.get('lang'),
          userId: this.userInfo.id
        })
        res.map((item) => {
          item.clickFlag = false
        })
        this.fixedProList = res
      },
      onClickItemFixPro(item, index) {
        this.$store.commit('digitalPark/menuList', item)
        localStorage.setItem('shortcutList',JSON.stringify(this.fixedProList))
        CommonFun.loadPage(item)
      }
    },
    mounted() {
      this.getProductList()
    }
  }
</script>

<style lang="less">
  .norbu-center {
    font-size: 14px;
    /*background-image:url('../../../../../static/image/digitalPark/nor_module_bg_big.png');*/
    /*background-repeat: no-repeat;*/
    /*background-size: 100% 100%;*/
    position: relative;
    box-sizing: border-box;

    .module-item-top-name {
      margin-left: 20px;
    }

    .product-list {
      /*margin-top: 10px;*/
      overflow: hidden;
      flex-shrink: 0;
    }

    .item-product {
      width: 15%;
      padding: 10px;
      float: left;
      margin: 10px 0.7%;
      box-sizing: border-box;
      border: 1px solid #0462BA;
      background: #012F46;
      border-radius: 30px;
      color: #A5FCFF;
    }

    .item-product:hover, .active-product {
      color: @white;
      background: #0462BA;
    }

    .img-box {
      margin-top: 20px;
      width: 100%;
      flex-grow: 1;
      box-sizing: border-box;
      text-align: center;

      /*margin-bottom: 20px;*/
      /*position: absolute;*/
      /*bottom:20px;*/
      /*margin:auto;*/

      img {
        border: 20px solid #2C3C71;
        width: 95%;
        height: 90%;
      }
    }

    .my-chart {
      overflow: hidden;
    }
  }
</style>
