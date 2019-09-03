<template>
  <div class="zoom-modal">
    <el-dialog
      title="请选择"
      :visible.sync="showDialog"
      :show-close="false"
      width="30%"
    >
      <el-tree
        :data="zoomTree"
        :props="treeProps"
        node-key="id"
        :default-expanded-keys="[1]"
        ref="navTree"
        highlight-current
        @node-click="onClickTree"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="onClickCancelBtn">取 消</el-button>
    <el-button type="primary" @click="onClickSureBtn">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import CommonApi from '../../service/api/commonApi'
  export default {
    name: 'ZoomModal',
    props:["showDialog"],
    components: {
    },
    data () {
      return {
        zoomTree:{},
        treeProps:{
          label:'text',
          children: 'nodes',
          isLeaf: 'leaf'
        },
        curNode:{},
      }
    },
    computed:{
    },
    methods: {
      async getAssetAllTree(){
        let res =  await CommonApi.getAssetAllTree({
          flag: "space",
          locationRoot: 1
        })
        this.zoomTree=res
      },
      onClickSureBtn(){
        let val = this.curNode
        this.$router.replace({
          path:this.$route.path,
          query:{
            id:val.id,
            name:val.text
          }
        })
        this.$parent.showDialog=false
      },
      onClickCancelBtn(){
        this.$parent.showDialog=false
      },
      onClickTree(val){
        this.curNode=val
      },
      loadNode(node, resolve) {
        console.log(node,resolve)
        if (node.level === 0) {
          return resolve(this.zoomTree);
        }
        if (node.level > 1){

          return resolve(node.data.id);
        }
      },
    },
    mounted(){
      this.getAssetAllTree()
    }
  }
</script>

<style lang="less">
  .zoom-modal{
    .el-dialog__body{
      height:400px;
      overflow: auto;
    }
    .el-tree-node__content:hover{
      background: #e6e6e6;
    }

  }

</style>
