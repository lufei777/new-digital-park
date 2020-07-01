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
        @row-update="rowUpdate"
        @row-edit="rowEdit"
        @row-edit-cancel="rowEditCancel"
      >
        <template
          slot='custom-top'
          slot-scope="obj"
        >
          <div id="slot">
            <!-- 上传、删除 -->
            <z-upload
              onlyButton
              v-model="fileList"
              buttonText="上传"
              :showFileList="false"
              :action="uploadAction"
              :accept="['doc','docx']"
              :uploadAfter="uploadAfter"
            ></z-upload>
            <el-button
              @click="del(obj)"
              type='primary'
              :disabled='!obj.selectedData.length'
            >删除</el-button>
          </div>
        </template>
        <template
          slot="operation"
          slot-scope="obj"
        >
          <el-button
            type="text"
            @click="()=>{  }"
          ></el-button>
          <el-button
            type="text"
            @click="downLoad(obj)"
          >下载</el-button>
          <el-button
            type="text"
            @click="propertyDetail(obj)"
          >查看</el-button>
          <!-- <div>
            
          </div> -->
        </template>
      </z-table>
      <el-dialog
        title="预览"
        :visible.sync="filePreview"
      >
      <!-- 预览 -->
        <div v-html="fileHtml"></div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
// 导入接口
import norbulingka from "@/service/api/norbulingka";
// ../../../utils/commonFun
// import CommonFun from "../../../utils/commonFun";
import CommonFun from "@/utils/commonFun";
export default {
  data() {
    return {
      fileHtml: "",
      filePreview: false,
      centerDialogVisible: false,
      loading: false,
      condition: null,
      fileList: [],
      // uploadAction: '/vibe-web/im/deviceData',
      uploadAction: "/oaApi/image/upload",
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,
        group: [
          {
            // label: "遗产评估",
            // prop: "group",
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
        editBtn: true,
        customTopPosition: "right",
        data: [],
        columnConfig: [],
        operation: {
          // prop: "operation",
          // label: "操作",
          // fixed: "right",
          width: 400
        },
        uiConfig: {
          height: "auto",
          selection: true,
          showIndex: {
            label: "编号",
            width: 250,
            align: "left"
          },
          pagination: {
            handler: (pageSize, currentPage, table) => {
              // 翻页的时候也需要携带查询的条件
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

  methods: {
    // 表格中的保存

    rowUpdate(model, index, done) {
      (this.loading = true),
        // console.log("表格中的保存", 111);
        norbulingka
          .updateRelicEvaluation(model)
          .then(res => {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.getTableData();
          })
          .finally(res => {
            this.loading = false;
            done();
          });
      // console.log("model", model);
      // console.log("index", index);
      // console.log("done", done);
    },
    // 表格中的编辑
    rowEdit(model, index) {
      console.log("编辑", model, index);
    },
    // 表格中的取消编辑
    rowEditCancel(model, index) {
      console.log("取消编辑", model, index);
    },
    // 导入成功
    uploadAfter(data, hide, done) {
      console.log(data);
      var originName = data.fileName;
      var path = data.fileUrl;
      norbulingka
        .uploadRelicEvaluation({ originName, path })
        .then(res => {
          this.$message({
            type: "success",
            message: "上传成功！"
          });
          this.getTableData();
        })
        .finally(res => {
          done();
        });
      //  console.log()
    },
    // 表格配置项
    tablePropList() {
      // 配置表格的列名称和属性
      var list = [
        // 名称originName  上传时间 uploadDate
        // { label: "编号", prop: "" },
        { label: "文件名称", prop: "originName" },
        { label: "年度", prop: "year" },
        // { label: "填报类别", prop: "uploadDate" },
        { label: "类别", prop: "type", cell: true },
        { label: "填报人员", prop: "responsiblePerson", cell: true }
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

    // 清除
    clearData(obj) {
      this.Form.resetForm();
    },

    // 公共删除方法
    delRowData(ids) {
      this.$confirm("确认删除吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        norbulingka.deleteRelicEvaluation({ ids }).then(res => {
          this.$message({
            type: "success",
            message: "删除成功！"
          });
          // this.Tables.refreshTable();
          this.getTableData();
        });
      });
    },
    // 表单上方的删除
    del({ selectedData }) {
      let arr = selectedData;
      let str = "";
      arr.forEach(item => {
        str = str + item.id + ",";
      });
      let ids = str;
      this.delRowData(ids)
      // norbulingka.deleteRelicEvaluation({ ids }).then(res => {
      //   this.$message({
      //     type: "success",
      //     message: "删除成功！"
      //   });
      //   this.Tables.refreshTable();
      //   this.getTableData();
      // });
    },
    // 下载
    downLoad(obj) {
      // /oaApi/file/read/rename?name=1.doc&newName=222.doc

      console.log(obj);
      var name = obj.row.path;
      var newName = obj.row.originName;
      // let url = `http://localhost:8080/oaApi/file/${a}/${b}`;
      let url = `/oaApi/file/read/rename?name=${name}&newName=${newName}`;
      // this.$axios({name,newName}).then(res => {
      //   console.log(res)
      // })

      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      // link.setAttribute("download", fileName); // 文件名
      link.setAttribute("download", newName); // 文件名

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    // 查看
    propertyDetail(obj) {
      // 文件预览的实现
      console.log("查看",obj);
      var a = obj.row.path;
      var b = obj.row.originName;
      // http://localhost:8080/oaApi/file/preview/1.docx
      // let url = `http://localhost:8080/oaApi/file/${a}/${b}`;
      // var url = norbulingka.preview()

      let url = `oaApi/file/preview/${a}`;
      this.$axios({
        url
      }).then(res => {
        this.filePreview = true;
        this.fileHtml = res;
      });

      // window.open(url)

      // let link = document.createElement("a");
      // link.style.display = "none";
      // link.href = url;
      // // link.setAttribute("download", fileName); // 文件名
      // // link.setAttribute("download", b); // 文件名

      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
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
            this.$refs[this.tableData.ref].setCurrentPage(pageParams.page);
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
</style>
