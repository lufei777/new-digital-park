<template>
  <div class="client-over-view">
    <div class="client-module-list">
      <div v-for="item in moduleList" :key="item.id" class="item-client-module">
        <ItemProModule
          :moduleData="item"
          :type="1"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import comsImport from '../coms/js/comsImport'
  import draggable from 'vuedraggable'
  import ItemProModule from '../coms/itemProModule'
  import DigitalParkApi from '@/service/api/digitalPark'
  export default {
    name: "ClientOverView",
    components: {
      ...comsImport.exportComsList,
      draggable,
      ItemProModule
    },
    props: [],
    data() {
      return {
        moduleList:[{id:1},{id:2},{id:3}]
      };
    },
    computed:{
      productId(){
        return this.$route.query.productId
      }
    },
    methods: {
      async getModulesByType(){
        let res = await DigitalParkApi.getModulesByType({
          type:1,
          language:Cookies.get('lang'),
          menuId:this.productId
        })
        this.moduleList = res.slice(0,3)
      },
    },
    mounted() {
      this.getModulesByType()
    }
  };
</script>

<style lang="less">
  .client-over-view {
    height:100%;
    .client-module-list{
      width:25%;
      height:95%;
      margin-top: 2.5%;
      margin-right: 10px;
      float: right;
      /*background: pink;*/
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color:@white;
    }
    .item-client-module{
      height:32%;
      width: 100%;
      /*margin-bottom: 1%;*/
      box-sizing: border-box;
      background: rgba(52,67,99,.8);
      border-radius: 8px;
    }
    .item-product-coms .single-module-name{
      text-align: center;
      font-weight: bold;
      margin-top: 10px;
      background:linear-gradient(0deg,rgba(184,237,249,1) 0%, rgba(255,255,255,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
    .item-product-coms{
      height:100%;
    }
  }
</style>
