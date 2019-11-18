<template>
  <div class="zoom-navigation">
    <div class="tree-box radius-shadow">
      <el-input
        placeholder="请输入"
        v-model="searchText">
        <i class="el-icon-search" slot="suffix"></i>
      </el-input>
      <el-tree
        :data="floorList"
        :props="treeProps"
        node-key="floorId"
        show-checkbox
        :default-expanded-keys="[1]"
        :default-checked-keys="defaultCheckedKey"
        @check-change="handleCheckChange"
        @check="handleCheck"
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
    props:['floorList','defaultChecked'],
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
        if(this.activeIndex==1){
          let checkedNode = this.$refs.navTree.getCheckedNodes()
          this.$parent.handleNavCanCheck(checkedNode)
          checkedNode.map((item)=>{
            tmp.push({
              id:item.floorId,
              name:item.floor
            })
          })
          this.$store.commit('conditionSelect/checkedFloorList',tmp)
        }else{
          this.$refs.navTree.setCheckedNodes([val])
          tmp.push({
            id:val.floorId,
            name:val.floor
          })
          if(this.activeIndex==2){
            this.$store.commit('conditionSelect/tbhbCheckedFloorList',tmp)
          }else if(this.activeIndex==3){
            this.$store.commit('conditionSelect/typeCheckedFloorList',tmp)
          }else if(this.activeIndex==4){
            this.$store.commit('conditionSelect/timeCheckedFloorList',tmp)
          }
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
    input::-webkit-input-placeholder{
      padding-left: 30px;
    }

  }
</style>
