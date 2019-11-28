<template>
  <div class="choose-asset-type">
      <el-dialog :title="tip" :visible.sync="childShowTree" width="30%" :show-close="false">
        <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
        <el-tree
          :data="treeList"
          :props="treeProps"
          node-key="id"
          @node-click="handleTreeClick"
          ref="treeList"
          :highlight-current="true"
          :close-on-click-modal="false"
        ></el-tree>
        </el-scrollbar>
        <span slot="footer" class="dialog-footer">
          <el-button @click="goBack">取 消</el-button>
          <el-button type="primary" @click="onClickSureBtn">确定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
export default {
  name: "TreeModal",
  components: {},
  props: {
    showTree: Boolean,
    treeList: Array,
    cancelCallback: {
      type: Function,
      required: true
    },
    sureCallback: {
      type: Function,
      required: true
    },
    tip: String
  },
  data() {
    return {
      typeList: [],
      treeProps: {
        label: "name",
        children: "childNode"
      },
      curSelect: ""
    };
  },
  computed: {
    childShowTree: {
      get() {
        return this.showTree;
      },
      set() {
        this.goBack();
      }
    }
  },
  methods: {
    handleTreeClick(val) {
      this.curSelect = val;
    },
    goBack() {
      this.cancelCallback && this.cancelCallback();
    },
    onClickSureBtn() {
      this.sureCallback && this.sureCallback(this.curSelect);
    }
  },
  mounted() {},
};
</script>

<style lang="less">
.choose-asset-type {
  .el-dialog__body{
    height:500px;
    overflow: auto;
  }
}
</style>
