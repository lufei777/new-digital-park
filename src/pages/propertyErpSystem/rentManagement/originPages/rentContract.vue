<template>
  <!-- 遗产要素 -->
  <div class='panel-container'>
    <!-- 藏品档案 -->
    <div class="panel">
      <!-- 表单部分 -->
      <z-form
        v-model="model"
        :ref="formData.ref"
        :options='formData'
        @submit="submit"
      >
        <template
          slot="btn"
          slot-scope="obj"
        >
          <div>
            <el-button
              type='primary'
              @click="search(obj)"
            >搜索</el-button>
            <el-button @click="clearData(obj)">清除</el-button>
          </div>
        </template>
      </z-form>
    </div>
    <div class="panel">
      <!-- 表单部分 -->
      <z-table
        :load='loading'
        :ref="tableData.ref"
        :options="tableData"
      >
        <template
          slot='custom-top'
          slot-scope="obj"
        >
          <div>
            <!-- 添加、删除 -->
            <el-button
              @click="addHeritage"
              type='primary'
            >添加</el-button>
            <el-button
              @click="del(obj)"
              :disabled='!obj.selectedData.length'
            >批量删除</el-button>
          </div>
        </template>
        <template
          slot="operation"
          slot-scope="obj"
        >
          <div>
            <el-button
              type="text"
              @click="propertyEdit(obj)"
            >编辑</el-button>
            <el-button
              type="text"
              @click="propertyDel(obj)"
            >删除</el-button>
            <el-button
              type="text"
              @click="propertyDetail(obj)"
            >详情</el-button>
          </div>
        </template>
      </z-table>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询条件
      condition: null,
      loading: false,
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,
        forms: [
        // 合同编号
        {
            label:'合同编号',
            type:'input',
            prop:'contractSerial',
            span:6,
            // offset:1,
        },
        // 合同名称
        {
            label:'合同名称',
            type:'input',
            prop:'contractName',
            span:6,
            // offset:1,
        },
        // 租户名称
        {
            label:'租户名称',
            type:'input',
            prop:'rentName',
            span:6,
            // offset:1,
        },

          // 搜素按钮
          {
            prop: "btn",
            formslot: true,
            span: 6
          }
        ]
      },
      tableData: {
        ref: "tabel",
        customTop: true,
        customTopPosition: "right",
        data: [],
        columnConfig: [],
        operation: {
          label: "操作"
        },
        uiConfig: {
          height: "auto",
          selection: true,
          showIndex: true,
          pagination: {
            handler: (pageSize, currentPage, table) => {
              //翻页的时候需要携带查询添加
              this.getTableData({
                page: currentPage,
                rows: pageSize,
                ...this.condition
              });
            }
          }
        }
      }
    };
  },
  computed: {},
  methods: {
    // 表格配置项
    tablePropList() {
      // 配置表格的列名称和属性
      var list = [
        // 序号
        // 合同名称
        // 合同编号
        // 合同状态
        // 租户
        // 合同总面积
        // 租金月单价(元/月*平米)
        // 租金付费周(月)
        // 物业费单价 (元/月*平米)
        // 保洁月单价 (元/月*平米)
        // 租户类型
        { label: "合同名称", prop: "contractName" },
        { label: "合同编号", prop: "contractSerial" },
        { label: "合同状态", prop: "contractState" },
        { label: "租户", prop: "rentName" },
        { label: "合同总面积", prop: "contractArea" },
        { label: "租金月单价(元/月*平米)", prop: "monthPrice" },
        { label: "租金付费周(月)", prop: "payWeeks" },
        { label: "物业费单价(元/月*平米)", prop: "propertyFee" },
        { label: "保洁月单价 (元/月*平米)", prop: "gamblePrice" },
        { label: "租户类型", prop: " tenantType" },
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
    },
    // 表格中的数据
    getTableData(pageParams = { page: 1, rows: 10 }) {
      this.loading = true;
    }
  },
  created() {},
  mounted() {
      this.tablePropList()
  }
};
</script>

<style  scoped lang="less">
</style>
