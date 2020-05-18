<template>
  <div class="asset-operator-record">
    <div class="record-tip">{{recordTip}}</div>
    <div class=" flex search-box">
      <div class="item-group">
        <label for="">领用人：</label>
        <el-input type="text" v-model="searchParams.name"/>
      </div>
      <div class="item-group">
        <label for="">领用时间：</label>
        <el-date-picker
          v-model="searchParams.time"
          type="date"
          placeholder="选择时间">
        </el-date-picker>
      </div>
      <div class="item-group">
        <label for="">领用资产：</label>
        <el-input type="text" v-model="searchParams.asset"/>
      </div>
      <div class="item-group operator-btn-box">
        <el-button type="primary" class="">搜索</el-button>
        <el-button class="">重置</el-button>
      </div>
    </div>
    <el-button type="primary" class="export-btn">导出</el-button>
    <zTable
      :ref="tableConfig.ref"
      :options="tableConfig"
    >
    </zTable>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "AssetOperatorRecord",
    components: {
    },
    props:['fromFlag'],   //fromFlag 1:资产领用
    data() {
      return {
        tableConfig:{
          ref:'tableRef',
          columnConfig: [{
            label: '领用人',
            prop: 'collarUser',
          }, {
            label: '领用时间',
            prop: 'applyUser'
          }, {
            label: '领用资产',
            prop: 'name'
          },{
            label: '领用数量',
            prop: 'num'
          }]
        },
        uiConfig: {
          height: "auto",
          selection: true,
        },
        searchParams:{
          name:'',
          time:'',
          asset:''
        }
      };
    },
    computed:{
      recordTip(){
        return this.fromFlag==1?'领用记录':''
      }
    },
    watch:{

    },
    methods: {
    },
    mounted() {
    }
  };
</script>

<style lang="less">
  .asset-operator-record{
    .record-tip{
      text-align: center;
      font-weight: bold;
      font-size: 16px;
    }
    .export-btn{
      float: right;
      margin:20px 0;
    }
    .search-box{
      padding:20px;
      margin-top: 20px;
    }
  }
</style>
