<template>
  <div class="common-com-dialog">
    <el-dialog
      :title="dialogConfig.title"
      :visible.sync="dialogConfig.shown"
      width="30%"
    >
      <slot v-bind="dialogConfig.slotConfig"></slot>

      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    };
  },
  methods: {
    confirm() {
      this.close();
    },
    cancel() {
      this.close();
    },
    close() {
      this.dialogConfig.shown = false;
    }
  },
  computed: {}
};
</script>
<style lang='less' scoped>
</style>