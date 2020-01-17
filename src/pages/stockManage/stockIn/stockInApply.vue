<template>
  <div class="stock-in-apply panel-container">
    <el-tabs type="border-card" @tab-click="onClickTab" v-model="activeTab">
      <el-tab-pane label="入库申请">
        <Apply />
      </el-tab-pane>
      <el-tab-pane label="申请记录">
        <ApplyRecord fromFlag="1"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Apply from '../coms/apply'
import ApplyRecord from '../coms/record'
export default {
  name: "stockInApply",
  components: {
    Apply,
    ApplyRecord
  },
  data() {
    return {
      activeTab:'0'
    };
  },
  computed:{
    ...mapState({
      stockInApplyTab:state=>state.digitalPark.stockInApplyTab,
      stockInReApplyId:state=>state.digitalPark.stockInReApplyId
    }),
  },
  watch:{
    stockInApplyTab(){
      this.activeTab = this.stockInApplyTab
    }
  },
  methods: {
    onClickTab(val){
      this.$store.commit('digitalPark/stockInReApplyId','')
      this.$store.commit('digitalPark/stockInApplyTab',val.index)
    },
  },
  mounted() {
  }
};
</script>

<style lang="less">
.stock-in-apply {
  .el-tabs{
    height:100%;
  }
}
</style>
