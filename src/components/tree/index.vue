<template>
    <div class="common-tree">
      <el-input
        v-if="treeConfig.showSearch"
        placeholder="请输入"
        v-model="searchText">
        <i class="iconfont iconsousuo search-icon" slot="suffix"></i>
      </el-input>
      <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
        <el-tree
          :data="treeList"
          :props="treeConfig.treeProps || treeProps"
          :node-key="treeConfig.nodeKey || 'id'"
          :default-expanded-keys="treeConfig.defaultExpandedkeys"
          :ref="treeConfig.ref || 'treeRef'"
          highlight-current
          @node-click="onClickNode"
          :filter-node-method="filterNode"
        >
        </el-tree>
      </el-scrollbar>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name:'Tree',
    components: {
    },
    props:['treeList','treeConfig','onClickTreeNodeCallBack'],
    data () {
      return {
        treeProps:{
          label:'text',
          children: 'nodes',
        },
        searchText:''
      }
    },
    computed: {
      ...mapState({
        menuIsCollapse:state=>state.digitalPark.menuIsCollapse
      })
    },
    watch:{
      searchText(val) {
        this.$refs[this.treeConfig.ref ||'treeRef'].filter(val);
      }
    },
    methods: {
      handleCheckChange(val){

      },
      handleCheck(val){
      },
      onClickNode(node){
        this.treeConfig.onClickTreeNodeCallBack && this.treeConfig.onClickTreeNodeCallBack(node)
      },
      filterNode(value, data) {
        if (!value) return true;
        let tmp = data.floor || data.text || data.name  //兼容后端不同名称
        return tmp.indexOf(value) !== -1;
      },
    },
    mounted(){

    }
  }
</script>

<style lang="less">
  .common-tree{
      padding:20px 0;
      background: @white;
      height:100%;
      box-sizing: border-box;
    .el-input__inner{
      border:none;
      background: #F4F5F7;
      padding:0 50px;
    }
    .el-input{
      width:90%;
      margin:0 0 20px 15px;
    }
    .el-input__suffix{
      right:unset;
      left:15px;
      color:@mainBgColor;
      line-height: 40px;
      font-size: 18px;
      font-weight: bold;
    }
  }
</style>
