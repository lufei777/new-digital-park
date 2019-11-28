<template>
  <div :class="menuIsCollapse?'collapse-left-zoom-nav':'unload-left-zoom-nav'"
       class="energy-tree-box radius-shadow">
    <el-select  v-model="curEnergy" placeholder="请选择" @change="onEnergyChange">
      <el-option label="电" value="1002"></el-option>
      <el-option label="水" value="4000"></el-option>
    </el-select>
    <!--<el-scrollbar wrap-class="scrollbar-wrapper" :native="false">-->
      <!--<el-tree-->
        <!--:data="meterList"-->
        <!--:props="treeProps"-->
        <!--:accordion="true"-->
        <!--:highlight-current="true"-->
        <!--node-key="id"-->
        <!--ref="navTree"-->
        <!--@node-click="onClickItemTree"-->
      <!--&gt;-->
      <!--</el-tree>-->
    <!--</el-scrollbar>-->
    <Tree :tree-list="meterList" :tree-config="meterTreeConfig"></Tree>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import CommonApi from '../../../../service/api/commonApi'
  import Tree from '../../../../components/tree'
  export default {
    name: 'EnergyTree',
    components: {
      Tree
    },
    data () {
      return {
        meterList:[],
        treeProps:{
          label:'text',
          children: 'nodes',
        },
        curEnergy:'1002',
        params:{},
        meterTreeConfig:{
           nodeKey:'id'
        }
      }
    },
    computed:{
      ...mapState({
        menuIsCollapse:state=>state.digitalPark.menuIsCollapse
      })
    },
    watch:{
    },
    methods: {
      async getMeterTree(){

        this.meterList = await CommonApi.getMeterTree({
          parentMeter: 0,
          catalogId:this.curEnergy
        })
      },
      fixTree(){
        $(".energy-tree-box").css({
          height:($(document).height()-110)+'px'
        })
      },
      onClickItemTree(val,val2){
        if(val2.level==1) return;
        this.$parent.onClickItemTree && this.$parent.onClickItemTree(val)
      },
      onEnergyChange(){
        this.$parent.curEnergy=this.curEnergy
        this.getMeterTree()
      }
    },
    async mounted(){
      this.fixTree()
      $(window).resize(()=>{
        this.fixTree()
      })
      await this.getMeterTree()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .energy-tree-box{
    height: 100%;
    padding:20px 0;
    background: @white;
    bottom:20px;
    .el-select{
      width:120px;
      margin:0 0 20px 65px;
    }
  }
</style>
