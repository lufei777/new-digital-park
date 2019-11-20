<template>
  <div :class="menuIsCollapse?'collapse-left-zoom-nav':'unload-left-zoom-nav'" class="zoom-navigation">
    <div class="tree-box radius-shadow">
      <el-input
        placeholder="请输入"
        v-model="searchText">
        <i class="iconfont iconsousuo search-icon" slot="suffix"></i>
      </el-input>
      <el-tree
        :data="floorList"
        :props="treeProps"
        node-key="floorId"
        :show-checkbox="isMultiple"
        :default-expanded-keys="[1]"
        :highlight-current="true"
        :default-checked-keys="defaultCheckedKey"
        @check-change="handleCheckChange"
        @check="handleCheck"
        @node-click="onClickNode"
        ref="navTree"
      >
      </el-tree>
    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  import ModuleTip from '../../pages/commonProject/coms/moduleTip'
  export default {
    name:'ZoomNavigation',
    components: {
      ModuleTip
    },
    props:['floorList','defaultChecked','isMultiple','fromFlag','selectCallBack'],
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
      ...mapState({
        activeIndex:state => state.conditionSelect.activeIndex,
        curModule:state => state.conditionSelect.curModule,
        menuIsCollapse:state=> state.digitalPark.menuIsCollapse
      }),
      defaultCheckedKey(){
        return this.defaultChecked.map((item)=>item.id)
      },
    },
    watch:{},
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
          // if(this.activeIndex==2){
          //   this.$store.commit('conditionSelect/tbhbCheckedFloorList',tmp)
          // }else if(this.activeIndex==3){
          //   this.$store.commit('conditionSelect/typeCheckedFloorList',tmp)
          // }else if(this.activeIndex==4){
          //   this.$store.commit('conditionSelect/timeCheckedFloorList',tmp)
          // }
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
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .zoom-navigation{
  /*  background: @mainBg;*/
    color:@white;
    text-align: left;
    overflow: hidden;
    height: 100%;
   .zoom-title{
     font-size: 20px;
     font-weight: 700;
     height:40px;
     text-align: left;
     line-height: 40px;
     margin: 20px 0 0 20px;
   }
    .tree-box{
      padding:20px 0;
      background: @white;
    }
    .el-tree{
      font-size: 16px;
      /*font-weight: 600;*/
    }
    .el-tree-node__content{
       padding:12px 0;
    }
    .el-tree-node__label{
      font-size: 16px;
    }
    .el-tree-node__content:hover{
      color:@white;
      background: @mainHoverColor;
    }
    .el-tree-node:focus>.el-tree-node__content{
      color:@white;
      background: @mainBgColor;
    }
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
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
      background: @mainBgColor;
      color:@white;
    }
  }
</style>
