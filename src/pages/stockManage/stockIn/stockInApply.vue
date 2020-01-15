<template>
  <div class="stock-in-apply panel-container">
    <el-tabs type="border-card">
      <el-tab-pane label="入库申请">
        <Apply />
      </el-tab-pane>
      <el-tab-pane label="申请记录">
        <ApplyRecord />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Apply from '../coms/apply'
import ApplyRecord from '../coms/applyRecord'
export default {
  name: "stockInApply",
  components: {
    Apply,
    ApplyRecord
  },
  data() {
    return {
    };
  },
  methods: {
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
