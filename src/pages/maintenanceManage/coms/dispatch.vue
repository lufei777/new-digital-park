<template>
  <div class="condition-box radius-shadow flex-align-wrap">
    <el-dialog
      v-dialogDrag
      title="派单"
      :visible.sync="dialogFormShow"
      width="30%"
      custom-class="popup-style"
      :before-close="dialogClose"
    >
      <z-form :ref="formConfig.ref" :options="formConfig" v-model="formModel" @submit="submit">
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="goBack(scope)">取消</el-button>
        </template>
      </z-form>
    </el-dialog>
  </div>
</template>

<script>
import { MaintenanceManageDic, TaskManageDic } from "@/utils/dictionary.js";
export default {
  name: "CommonSearch",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='less' scoped>
.condition-box {
}
</style>