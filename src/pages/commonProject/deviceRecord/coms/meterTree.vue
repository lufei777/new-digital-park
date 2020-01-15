<template>
  <el-dialog
    title="请选择"
    :visible.sync="showModal"
    :show-close="false"
    width="30%"
    custom-class="meter-tree-dialog"
  >
    <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
      <el-tree
        :data="meterList"
        :props="treeProps"
        :accordion="true"
        :highlight-current="true"
        node-key="id"
        ref="navTree"
        @node-click="onClickItemTree"
      >
      </el-tree>
    </el-scrollbar>
    <span slot="footer" class="dialog-footer">
        <el-button @click="onClickCancelBtn">取 消</el-button>
        <el-button type="primary" @click="onClickSureBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import CommonApi from '../../../../service/api/common'
  export default {
    name: 'MeterTree',
    props:['showDialog','enegyId'],
    components: {
    },
    data () {
      return {
        meterList:[],
        treeProps:{
          label:'text',
          children: 'nodes',
        },
        params:{},
        curMeter:''
      }
    },
    computed:{
      showModal:{
        get(){
          return this.showDialog
        },
        set(){
          this.onClickCancelBtn()
        }
      }
    },
    watch:{
      enegyId(){
        this.getMeterTree()
      }
    },
    methods: {
      async getMeterTree(){
        this.meterList = await CommonApi.getMeterTree({
          parentMeter: 0,
          catalogId:this.enegyId
        })
      },
      onClickItemTree(val,val2){
        this.curMeter = val
        // this.$parent.onClickItemMeterTree && this.$parent.onClickItemMeterTree(val)
      },
      onClickSureBtn(){
        this.$parent.onClickItemMeterTree && this.$parent.onClickItemMeterTree(this.curMeter)
        this.$parent.showMonitor=false
      },
      onClickCancelBtn(){
        this.$parent.showMonitor=false
      },
    },
    async mounted(){
      this.getMeterTree()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .meter-tree-dialog{
    .el-dialog__body{
      height:400px;
      overflow: auto;
    }
  }
</style>
