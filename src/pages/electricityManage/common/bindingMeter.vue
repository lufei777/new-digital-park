<template>
  <div>
    <el-container :style="{height:'600px'}">
      <el-aside :style="{height:'550px'}" v-loading="asideLoad" class="panel common-aside">
        <el-scrollbar wrap-class="scrollbar-wrapper" :native="true">
          <z-tree
            :ref="treeOptions.ref"
            :options="treeOptions"
            :data="treeData"
            @node-click="nodeClick"
          >
            <template #menu="{Tree}">
              <div class="zvue-tree_item" @click="clearTreeSelect(Tree)">清空选择</div>
            </template>
          </z-tree>
        </el-scrollbar>
      </el-aside>
      <el-container class="common-container">
        <el-main style="padding:0px;">
          <div class="panel">
            <z-table :load="load" :ref="tableOptions.ref" :options="tableOptions">
              <!-- <template slot="custom-top" slot-scope="{size,selectedData}">
                <el-button
                  :disabled="!selectedData.length"
                  :size="size"
                  type="primary"
                  @click="binding(selectedData)"
                >绑定</el-button>
              </template>-->

              <template #custom-top="{size,selectedData}">
                <el-button
                  :disabled="!selectedData.length"
                  :size="size"
                  type="primary"
                  @click="binding(selectedData)"
                >绑定</el-button>
              </template>
            </z-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import commonApi from 'api/common';
import electricityManageApi from 'api/electricityManage';

export default {
  props: {
    tenantId: Number
  },
  data() {
    return {
      load: false,
      asideLoad: false,
      // 主页设备树
      treeOptions: {
        ref: 'tree',
        highlightCurrent: true,
        accordion: true,
        props: {
          label: 'floor',
          nodeKey: 'floorId',
          value: 'floorId',
          children: 'nodes'
        }
      },
      treeData: [],
      tableOptions: {
        ref: 'table',
        data: [],
        columnConfig: [
          {
            label: '编号',
            prop: 'id',
            hide: true
          },
          {
            label: '电表名称',
            prop: 'caption'
          },
          {
            label: '电表编号',
            prop: 'name'
          },
          {
            label: '楼层',
            prop: 'scaption'
          }
        ],
        uiConfig: {
          selection: true,
          height: 'auto'
        }
      },
    }
  },
  computed: {
    Tree() {
      return this.$refs[this.treeOptions.ref];
    },
    Table() {
      return this.$refs[this.tableOptions.ref];
    }
  },
  mounted() {
    this.fetchTree();
  },
  methods: {
    // 加载树数据
    fetchTree() {
      this.asideLoad = true;
      commonApi.getAllFloorOfA3().then(res => {
        this.treeData = res;
        this.Tree.setCurrentKey(res[0][this.treeOptions.props.value]);
      }).finally(() => {
        this.asideLoad = false;
      })
    },
    // 加载设备列表
    fetchDeviceList({ spaceId }) {
      this.load = true;
      electricityManageApi.getElecMeter({
        spaceId
      }).then(res => {
        this.Table.setData(res.rows);
        this.Table.setTotal(res.total);
      }).finally(() => {
        this.load = false;
      })
    },
    // 设备树取消选择
    clearTreeSelect(Tree) {
      this.catalogs = [];
      Tree.setCurrentKey(null);
      this.fetchDeviceList();
    },
    // 左侧设备树点击
    nodeClick(data, node) {
      this.catalogs = [];
      this.fetchDeviceList({ spaceId: data.floorId });
    },
    // 点表绑定
    binding(selectedData) {
      electricityManageApi.bindingTenantOfElec({
        id: this.tenantId,
        monitors: selectedData.map(item => item.id)
      }).then(res => {

      })
    }
  }
}
</script>
<style lang="less" scoped>
.common-aside {
  position: fixed;
  width: @menuWidth;
  margin-bottom: 0;
}
.common-container {
  // margin-left: 20px;
  margin-left: @menuWidth - 10px + (4 * @contentMarginLeft);
}
</style>