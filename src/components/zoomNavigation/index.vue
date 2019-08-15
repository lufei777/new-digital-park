<template>
  <div class="zoom-navigation">
    <div class="zoom-title">空间导航</div>
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

</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name:'ZoomNavigation',
    components: {
    },
    props:['floorList','defaultChecked'],
    data () {
      return {
        treeProps:{
          label:'floor',
          children: 'nodes',
        },
      }
    },
    computed: {
      ...mapState({
        activeIndex:state => state.conditionSelect.activeIndex,
      }),
      defaultCheckedKey(){
        return this.defaultChecked.map((item)=>item.id)
      }
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
          }else{
            this.$store.commit('conditionSelect/typeCheckedFloorList',tmp)
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
    background: @mainBg;
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
    .el-tree{
      background: @mainBg;
      font-size: 16px;
      color:@white;
      /*font-weight: 600;*/
    }
    .el-tree-node__content{
       padding:12px 0;
    }
    .el-tree-node__content:hover{
      color:#22dbfc;
    }
    .el-tree-node:focus>.el-tree-node__content{
      color:#22dbfc;
    }
  }
</style>
