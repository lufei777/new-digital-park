<template>
  <!-- 监测报告 -->
  <div class='panel-container'>
    <!-- 遗产评估 -->
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
          <div id="slot">
            <!-- 上传、删除 -->
            <el-button @click="openUpload" type='primary'>上传</el-button>
            <!-- <el-upload
              action="/oaApi/image/upload"
            >
              <el-button
                type="primary"
              >点击上传</el-button>
            </el-upload> -->
            <el-button
              @click="del(obj)"
              :disabled='!obj.selectedData.length'
            >删除</el-button>
          </div>
        </template>
        <template
          slot="operation"
          slot-scope="obj"
        >
          <div>
            <el-button
              type="text"
              @click="downLoad()"
            >下载</el-button>
            <el-button
              type="text"
              @click="propertyDetail(obj)"
            >查看</el-button>
          </div>
        </template>
      </z-table>
    </div>

    <el-dialog
      :visible.sync="centerDialogVisible"
      width="30%"
      :modal='false'
      :show-close='false'
    >
      <el-upload
        class="upload-demo"
        drag
        action="/oaApi/image/upload"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div
          class="el-upload__tip"
          slot="tip"
        >只能上传word文件</div>
      </el-upload>
      <!-- <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="centerDialogVisible = false"
      >确 定</el-button> -->

    </el-dialog>
    

  </div>
</template>

<script>
// 导入接口
import norbulingka from "@/service/api/norbulingka";
// ../../../utils/commonFun
import CommonFun from "../../../utils/commonFun";
export default {
  data() {
    return {
      centerDialogVisible: false,
      loading: false,
      condition: null,
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,
        group: [
          {
            label: "遗产评估",
            prop: "group",
            forms: [
              //文件名称 originName
              {
                type: "input",
                prop: "originName",
                placeholder: "",
                label: "文件名称",
                span: 6
              },

              // 搜素按钮
              {
                prop: "btn",
                formslot: true,
                span: 10
              }
            ]
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
          prop: "operation",
          label: "操作",
          fixed: "right",
          width: 200
        },
        uiConfig: {
          height: "auto",
          selection: true,
          showIndex: {
            label: "编号",
            width: 100
          }
        }
      }
    };
  },

  methods: {
    openUpload() {
        this.centerDialogVisible = true
    },
    // 表格配置项
    tablePropList() {
      // 配置表格的列名称和属性
      var list = [
        // 名称originName  上传时间 uploadDate
        // { label: "编号", prop: "" },
        { label: "文件名称", prop: "originName" },
        { label: "年度", prop: "" },
        { label: "类别", prop: "" },
        { label: "填报类别", prop: "uploadDate" }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
    },
    submit(model, done) {
      //   console.log(obj);
    },
    searchData(params) {
      norbulingka.queryRelicEvaluationByPage({ params }).then(res => {
        this.Tables.refreshTable();
        this.getTableData({ ...this.condition });
      });
    },
    // 搜索
    search(obj) {
      this.Form.getFormModel(res => {
        // 参数是string类型，不能是数组 要进行处理
        this.condition = res;
        this.searchData(res);
      });
    },
    // search(obj) {
    //   this.Form.getFormModel(res => {
    //     console.log("搜索", res);
    //   });
    //   console.log(this.Form.model);
    //   //   console.log(this.model);
    // },
    // 清除
    clearData(obj) {
      this.Form.resetForm();
    },
    // 表单上方的删除
    del({ selectedData }) {
      let arr = selectedData;
      let str = "";
      arr.forEach(item => {
        str = str + item.id + ",";
      });
      let ids = str;
      norbulingka.deleteRelicEvaluation({ ids }).then(res => {
        this.$message({
          type: "success",
          message: "删除成功！"
        });
        this.Tables.refreshTable();
        this.getTableData();
      });
    },
    downLoad(obj) {
      console.log("下载");
      let url = "/oaApi/stockDeal/exportRecord";
      let params = "";
      let arr = this.$refs[this.tableData.ref].getSelectData();
      // let arr = obj.row
      let stockRecordIds = arr.length ? arr.map(item => item.id) : "";
    },
    // 查看
    propertyDetail(obj) {
      console.log("查看");
    },
    // 表格中的数据
    getTableData(pageParams = { page: 1, rows: 10 }) {
      (this.loading = true),
        norbulingka
          .queryRelicEvaluationByPage(pageParams)
          .then(res => {
            // console.log(res);
            this.$refs[this.tableData.ref].setData(res.list);
            this.$refs[this.tableData.ref].setTotal(res.total);
          })
          .finally(res => {
            this.loading = false;
          });
    }
  },
  computed: {
    // 表格
    Form() {
      return this.$refs[this.formData.ref];
    },
    // 表单
    Tables() {
      return this.$refs[this.tableData.ref];
    }
  },
  created() {
    this.getTableData();
  },
  mounted() {
    this.tablePropList();
  }
};
</script>
<style lang="less" scoped>
.upload-excel {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  .select-excel-template {
    margin-bottom: 20px;
    div:last-child {
      line-height: 2;
    }
    .more-operator-box {
      .el-button {
        margin: 0;
        padding: 10px;
      }
    }
  }
  .el-upload,
  .el-upload-dragger {
    width: 100%;
  }
}
</style>
