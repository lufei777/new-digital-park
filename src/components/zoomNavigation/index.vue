<template>
  <!--<div :class="menuIsCollapse?'collapse-left-zoom-nav':'unload-left-zoom-nav'"-->
       <!--class="zoom-navigation radius-shadow">-->
    <div class="tree-box radius-shadow zoom-navigation">
      <el-input placeholder="请输入" v-model="searchText">
        <i class="iconfont iconsousuo search-icon" slot="suffix"></i>
      </el-input>
      <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
        <el-tree
          :data="floorList"
          :props="treeProps"
           node-key="floorId"
          :show-checkbox="isMultiple"
          :default-expanded-keys="defaultExpandedKeys|| [1]"
          :highlight-current="true"
          :default-checked-keys="defaultCheckedKey"
          @check-change="handleCheckChange"
          @check="handleCheck"
          @node-click="onClickNode"
          :filter-node-method="filterNode"
          ref="navTree"
        >
        </el-tree>
      </el-scrollbar>
    </div>
  <!--</div>-->

</template>

<script>
  import { mapState } from 'vuex'
  import ModuleTip from '../../pages/commonProject/coms/moduleTip'
  export default {
    name:'ZoomNavigation',
    components: {
      ModuleTip
    },
    props:['floorList','defaultChecked','isMultiple','fromFlag','selectCallBack','defaultExpandedKeys'],
    data () {
      return {
        treeProps:{
          label:'floor',
          children: 'nodes',
        },
        searchText:''
      }
    },
    computed: {
      defaultCheckedKey(){
        return this.defaultChecked && this.defaultChecked.map((item)=>item.id)
      },
      ...mapState({
        menuIsCollapse:state=>state.digitalPark.menuIsCollapse
      })
    },
    watch:{
      searchText(val) {
        this.$refs.navTree.filter(val);
      },
      defaultChecked(){
        this.$refs.navTree.setCurrentKey(this.defaultChecked[0].id)
      }
    },
    methods: {
      handleCheckChange(val){

      },
      handleCheck(val){
        let tmp=[]
        if(this.fromFlag==1){
          let checkedNode = this.$refs.navTree.getCheckedNodes()
          this.$parent.handleFloorCanCheck(checkedNode)
          checkedNode.map((item)=>{
            tmp.push({
               id:item.floorId,
               name:item.floor
            })
          })
        }else{
          this.$refs.navTree.setCheckedNodes([val])
          tmp.push({
            id:val.floorId,
            name:val.floor
          })
        }
        console.log("tmp",tmp)
        this.selectCallBack &&  this.selectCallBack(tmp)
      },
      onClickNode(node,value){
        if(value.disabled){
          return ;
        }
        // console.log(this.$refs.navTree.getCheckedNodes(),node,value)
        let arr=this.$refs.navTree.getCheckedNodes()
        if(this.fromFlag==1){
          if(!value.checked){
            arr.push(node)
          }else{
            arr.pop()
          }
          this.$refs.navTree.setCheckedNodes(arr)
          this.handleCheck()
        }else{
          this.handleCheck(node)
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.floor.indexOf(value) !== -1;
      },
      fixTree(){
        $(".tree-box").css({
          height:($(document).height()-110)+'px'
        })
      }
    },
    mounted(){
      this.fixTree()
      $(window).resize(()=>{
        this.fixTree()
      })
    }
  }
</script>

<style lang="less">
  .zoom-navigation{
      padding:20px 0;
      background: @white;
      /*height:100%;*/
      width:250px;
      position: fixed;
      top:90px;
      bottom:20px;
      box-sizing: border-box;
      overflow: hidden;
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
