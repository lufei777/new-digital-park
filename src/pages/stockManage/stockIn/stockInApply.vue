<template>
  <div class="stock-in-apply panel-container">
    <el-tabs type="border-card" @tab-click="onClickTab" v-model="activeTab">
      <el-tab-pane label="入库申请">
        <Apply />
      </el-tab-pane>
      <el-tab-pane label="申请记录">
        <ApplyRecord fromFlag="1" :reApplyCallBack="reApplyCallBack"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
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
      activeTab:'0',
      reApply:false
    };
  },
  methods: {
    onClickTab(val){
      this.$store.commit('digitalPark/stockTabChange',val.index)
    },
    async reApplyCallBack(row){
      this.activeTab='0'
      // this.reApply=true
      // this.$store.commit('digitalPark/stockTabChange',0)
    }
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
