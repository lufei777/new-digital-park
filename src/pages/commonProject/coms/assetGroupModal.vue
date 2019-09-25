<template>
  <div class="asset-group-modal">
    <el-dialog title="选择资产组" :visible.sync="showGroup" width="30%" :show-close="false">
      <el-tree
        :data="groupTree"
        :props="treeProps"
        node-key="id"
        @node-click="handleTreeClick"
        :highlight-current="true"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onShowGroup">取 消</el-button>
        <el-button type="primary" @click="onClickSureBtn">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  export default {
    name: 'AssetGroupModal',
    components: {
    },
    props:['showGroup','sureCallback','cancelCallback'],
    data () {
      return {
        groupTree:{},
        treeProps:{
          label:'name',
          children: 'childNode',
        },
        curGroup:''
      }
    },
    methods: {
      goBack(){
        this.$router.replace('/assetMaintenance')
      },
      async getAssetGroupTree(){
        let res = await CommonApi.getAssetGroupTree()
        this.groupTree = res
      },
      handleTreeClick(val){
          this.curGroup=val
      },
      onShowGroup(){
        this.cancelCallback && this.cancelCallback(-1)
      },
      onClickSureBtn(){
        this.sureCallback && this.sureCallback(this.curGroup)
      }

     },
    mounted(){
      this.getAssetGroupTree()
    }
  }
</script>

<style lang="less">
  .asset-group-modal{
    .go-back{
      margin-left:30%;
    }
  }
</style>
