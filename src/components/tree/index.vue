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
          :show-checkbox="treeConfig.showCheckbox"
          :default-checked-keys="treeConfig.defaultCheckedKeys"
          :filter-node-method="filterNode"
          @node-click="onClickNode"
          @check="handleCheck"
          highlight-current
        >
        </el-tree>
      </el-scrollbar>
  </div>

</template>

<script>
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
      nodeKey(){
        return this.treeConfig.nodeKey || 'id'
      },
    },
    watch:{
      searchText(val) {
        this.$refs[this.treeConfig.ref ||'treeRef'].filter(val);
      }
    },
    methods: {
      handleCheck(){
        let checkedNode = this.$refs[this.treeConfig.ref ||'treeRef'].getCheckedNodes()
        this.treeConfig.onCheckTreeNodeCallBack && this.treeConfig.onCheckTreeNodeCallBack(checkedNode)
      },
      onClickNode(node,value){
        if(value.disabled){
          return ;
        }
        if(this.treeConfig.showCheckbox){
          //如果显示复选框则点击节点也同步复选框
          let arr= this.$refs[this.treeConfig.ref ||'treeRef'].getCheckedNodes()
          // console.log(arr,node)
          if(!value.checked){
            arr.push(node)
          }else{
            let index= arr.findIndex((item)=> item[this.nodeKey]==node[this.nodeKey])
            arr.splice(index,1)
          }
          this.$refs[this.treeConfig.ref ||'treeRef'].setCheckedNodes(arr)
          this.treeConfig.onCheckTreeNodeCallBack && this.treeConfig.onCheckTreeNodeCallBack(arr)
        }else{
          this.treeConfig.onClickTreeNodeCallBack && this.treeConfig.onClickTreeNodeCallBack(node)
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data[this.treeConfig.treeProps.label].indexOf(value) !== -1;
      },
    },
    mounted(){
      // setTimeout(()=>{
      //   this.$refs[this.treeConfig.ref ||'treeRef'].setCurrentKey(this.treeConfig.currentKey)
      // },500)

    }
  }
</script>

<style lang="less">
  .common-tree{
      /*padding:20px 0;*/
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
