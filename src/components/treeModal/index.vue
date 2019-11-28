<template>
  <div class="common-tree-modal">
    <el-dialog
      title="请选择"
      :visible.sync="showModal"
      :show-close="false"
      width="30%"
    >
      <Tree :tree-list="treeList" :tree-config="modalTreeConfig"/>
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
    name: 'ZoomModal',
    props:["showDialog","treeList",'treeConfig','onClickSureBtnCallback','onClickCancelBtnCallback'],
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
          return this.showDialog
        },
        set(){
          this.onClickCancelBtn()
        }
      },
      modalTreeConfig(){
        return{...this.treeConfig,...{
            onClickTreeNodeCallBack:this.onClickTreeNodeCallBack
        }}
      }
    },
    methods: {
      onClickSureBtn(){
        this.onClickSureBtnCallback && this.onClickSureBtnCallback(this.curNode)
      },
      onClickCancelBtn(){
        this.onClickCancelBtnCallback && this.onClickCancelBtnCallback()
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
    }
  }

</style>
