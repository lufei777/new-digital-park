<template>
  <div class="asset-use panel-container panel">
    <div v-if="!showAdd" class="asset-use-table-panel">
      <div class="operator-btn-box flex-row-reverse">
        <el-button type="primary">批量删除</el-button>
        <el-button type="primary" @click="onClickAddBtn">添加</el-button>
      </div>
      <zTable :ref="tableConfig.ref" :options="tableConfig" >
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="editRow($index)">编辑</el-button>
          <el-button type="text" @click="deleteRow($index)">删除</el-button>
        </template>
      </zTable>
      <div class="submit-btn">
        <el-button type="primary">提交</el-button>
      </div>
    </div>
    <AddAssetUse v-if="showAdd" :curDetail="curDetail" :goBack="goBack"/>
  </div>
</template>

<script>
  import AssetManageApi from '@/service/api/assetManage'
  import AddAssetUse from '../coms/addAssetUse'
  export default {
    name: 'AssetUse',
    components: {
      AddAssetUse
    },
    data () {
      return {
        tableConfig:{
          ref:'tableRef',
          data:[],
          columnConfig:[{
            label:'申请日期',
            prop:'date'
          },{
            label:'申请人',
            prop:'applyUser'
          },{
            label:'领用的资产',
            prop:'name'
          },{
            label:'领用人',
            prop:'buyId'
          },{
            label:'规格型号',
            prop:'specification'
          },{
            label:'库存数量',
            prop:'quantity'
          },{
            label:'领用数量',
            prop:'num2'
          },{
            label:'备注',
            prop:'description'
          }],
          customTop: true,
          operation: true,
          uiConfig:{
            height: "auto",
            selection: true,
          }
        },
        showAdd:false,
        curDetail:{},
        curRowIndex:0,
        isEdit:false
      }
    },
    methods: {
      onClickAddBtn(){
        this.showAdd=true
        this.isEdit=false
      },
      goBack(){
        this.showAdd=false
      },
      addAssetUseDetail(obj){
        console.log("obj",obj)
        this.showAdd=false
        if(this.isEdit){
          this.tableConfig.data[this.curRowIndex] =obj
        }else{
          this.tableConfig.data.push(obj)
        }
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .asset-use{
    .asset-use-table-panel{
      overflow: hidden;
    }
    .submit-btn{
      margin:20px 0;
      text-align: center;
    }
  }

</style>

