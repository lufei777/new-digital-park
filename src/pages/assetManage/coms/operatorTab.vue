<template>
  <el-tabs type="border-card" @tab-click="onClickTab" v-model="activeTab">
    <el-tab-pane :label="labelList[0]">
      <AssetOperator />
    </el-tab-pane>
    <el-tab-pane :label="labelList[1]">
      <AssetOperatorRecord :from-flag="fromFlag"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import { mapState } from 'vuex'
  import AssetOperator from './assetOperator'
  import AssetOperatorRecord from './operatorRecord'
  export default {
    name: "assetUseIndex",
    components: {
      AssetOperator,
      AssetOperatorRecord
    },
    props:['labelList','fromFlag'], //fromFlag 1:资产领用
    data() {
      return {
        activeTab:'0'
      };
    },
    computed:{

    },
    watch:{

    },
    methods: {
      onClickTab(){}
    },
    mounted() {
    }
  };
</script>

<style lang="less">
  .el-tabs{
    height:100%;
  }
</style>
