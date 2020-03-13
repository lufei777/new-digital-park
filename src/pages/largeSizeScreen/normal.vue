<template>
  <div class="large-size-screen-normal">
    <Header fromFlag="2"/>
    <div class="content">
      <draggable  class="flex"
                  :list="list"
                  v-bind="getOptions()"
      >
        <div class="basic-panel left-panel">
          <draggable v-for="(item,index) in leftList"
                     class="out-drag-product"
                     :key="item.id"
                     :list="[item]"
                     :id="index"
                     v-bind="getInnerOptions()"
          >
            {{item.id}}
          </draggable>
        </div>
        <div class="basic-panel center-panel">
          <draggable v-for="(item,index) in centerList"
                     class="out-drag-product"
                     :key="item.id"
                     :list="[item]"
                     :class="item.flag?'center-show':''"
                     v-bind="getInnerOptions()"
          >
            {{item.id}}
          </draggable>
        </div>
        <div class="basic-panel right-panel">
          <draggable v-for="(item,index) in rightList"
                     class="out-drag-product"
                     :key="item.id"
                     :list="[item]"
                     v-bind="getInnerOptions()"
          >
            {{item.id}}
          </draggable>
        </div>
        </draggable>
    </div>
  </div>
</template>

<script>
  import Header from '../digitalPark/coms/header'
  import draggable from 'vuedraggable'
  let list = [{id:1},{id:2},{id:3},{id:7,flag:'true'},{id:6},{id:3},{id:4},{id:5},{id:8}]
  export default {
    name: 'LargeSizeScreenNormal',
    components: {
      Header,
      draggable
    },
    data () {
      return {
        list:list,
        leftList:list.slice(0,3),
        centerList:list.slice(3,6),
        rightList:list.slice(6,9)
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {
      getOptions(){
        return {draggable:'.out-drag-product',group:"out-product"}
      },
      getInnerOptions(){
        return {draggable:'.inner-drag-content',group:'inner-product'}
      },
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .large-size-screen-normal{
    .out-drag-product{
      background: pink;
      width:600px;
      height:380px;
      float: left;
      font-size: 48px;
      text-align: center;
      line-height: 380px;
    }
    .center-panel{
      width:1920px;
      padding:0 20px;
      box-sizing: border-box;
    }
    .center-show{
      width:1920px;
      height:1080px;
      line-height: 1080px;
    }
    /*.basic-panel{*/

    /*}*/
  }
</style>
