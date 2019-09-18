<template>
  <div class="asset-maintenance">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>资产管理</el-breadcrumb-item>
      <el-breadcrumb-item>资产信息维护</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="choose-box flex-align">
      <div class="block flex-align-center">
        <span>编号</span>
        <el-input v-model="coding" />
      </div>
      <div class="block flex-align-center">
        <span>名称</span>
        <el-input v-model="name" />
      </div>
      <div class="block flex-align-center">
        <span>资产组</span>
        <el-input v-model="mail" />
      </div>
      <el-button type="primary" icon="el-icon-search" @click="onClickSearchBtn">搜索</el-button>
      <el-button type="primary"  @click="onClickResetBtn">重置</el-button>
    </div>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  export default {
    name: 'AssetMaintenance',
    components: {
    },
    data () {
      return {
        coding:'',
        name:''
      }
    },
    methods:{
      async getAssetList(){
       await CommonApi.getAssetList()
      },
      onClickSearchBtn(){},
      onClickResetBtn(){}
    },
    mounted(){
      this.getAssetList()
    }
  }
</script>

<style lang="less">
  .asset-maintenance{
    height: 100%;
    padding:20px;
  }
</style>
