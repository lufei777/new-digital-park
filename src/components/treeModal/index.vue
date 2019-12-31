<template>
  <div class="common-tree-modal">
    <el-dialog
      :title="treeModalConfig.modalTip || '请选择'"
      :visible.sync="showModal"
      :show-close="false"
      width="30%"
    >
      <Tree :tree-list="treeModalConfig.treeList" :tree-config="treeConfig"/>
      <span slot="footer" class="dialog-footer">
          <el-button @click="onClickCancelBtn">取 消</el-button>
          <el-button type="primary" @click="onClickSureBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Tree from '../tree/index'
  export default {
    name: 'TreeModal',
    props:['treeModalConfig'],
    components: {
      Tree
    },
    data () {
      return {
        curNode:{}
      }
    },
    computed:{
      showModal:{
        get(){
          return this.treeModalConfig.showModal
        },
        set(){
          this.onClickCancelBtn()
        }
      },
      treeConfig(){
        return{...this.treeModalConfig.treeConfig,...{
            onClickTreeNodeCallBack:this.onClickTreeNodeCallBack
        }}
      }
    },
    methods: {
      onClickSureBtn(){
        this.treeModalConfig.onClickSureBtnCallback &&
        this.treeModalConfig.onClickSureBtnCallback(this.curNode)
      },
      onClickCancelBtn(){
        this.treeModalConfig.onClickCancelBtnCallback &&
        this.treeModalConfig.onClickCancelBtnCallback()
      },
      onClickTreeNodeCallBack(val){
         this.curNode=val

      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .common-tree-modal{
    .el-dialog__body{
      height:500px;
      padding-bottom: 64px;
    }
    .el-dialog__footer{
      position: relative;
      z-index: 999999;
    }
  }
</style>
