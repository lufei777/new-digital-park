<template>
  <div class="device-record">
    <div class="left-zoom-nav">
      <el-select  v-model="curEnergy" placeholder="请选择" @change="getMeterTree">
        <el-option label="电" value="1002"></el-option>
        <el-option label="水" value="4000"></el-option>
      </el-select>
      <el-tree
        :data="meterList"
        :props="treeProps"
        node-key="floorId"
        :default-expanded-keys="[1]"
        ref="navTree"
      >
      </el-tree>
    </div>
    <div class="right-content"></div>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  export default {
    name: 'DeviceRecord',
    components: {

    },
    data () {
      return {
        curEnergy:'1002',
        meterList:[],
        treeProps:{
          label:'text',
          children: 'nodes',
        },
      }
    },
    methods: {
      async getMeterTree(){
        this.meterList = await CommonApi.getMeterTree({
          parentMeter: 0,
          catalogId:this.curEnergy
        })
      },
    },
    mounted(){
      this.getMeterTree()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .device-record{
    margin-top: 85px;
    .left-zoom-nav{
      width:17%;
      float: left;
      position: fixed;
      height: 100%;
      overflow: auto;
      background: var(--mainBg);
      padding: 10px 0;
    }
    .right-content{
      width:83%;
      background: #f2f2f2;
      padding:10px;
      float: right;
      box-sizing: border-box;
    }
    .el-tree{
      background: var(--mainBg);
      font-size: 16px;
    }
    .el-tree-node__content{
        color:@white;
        padding:5px 0;
    }
    .el-tree-node__content:hover{
      color:#22dbfc;
    }
    .el-tree-node:focus>.el-tree-node__content{
      color:#22dbfc;
    }
    .el-select{
      width:120px;
      margin:0 0 20px 25%;
    }
  }
</style>
