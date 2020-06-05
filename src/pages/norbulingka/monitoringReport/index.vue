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
        :ref="tableData.ref"
        :options="tableData"
      >
        <template
          slot='custom-top'
          slot-scope="obj"
        >
          <div>
            <!-- 上传、删除 -->
            <el-button type='primary'>上传</el-button>
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

  </div>
</template>

<script>
export default {
  data() {
    return {
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
                span: 8
              }
            ]
          }
        ]
      },
      tableData: {
        ref: "tabel",
        customTop: true,
        customTopPosition: "right",
        data: [
          /**
             *      
            {label:'藏品编号',prop:'serial'},
            {label:'名称',  prop:'collectionName'},
            {label:'原名',prop:'primaryName'},
            {label:'具体年代',prop:'practicalYear'},
            {label:'文物级别',prop:'culturalRank'},
             *   
            */
          // 模拟的假数据
          {
            originName: "摄像头文件整理.docx",
            uploadDate: "2020-05-27 10:34:16"
          },
          {
            originName: "摄像头文件整理.docx",
            uploadDate: "2020-05-27 10:34:16"
          },
          {
            originName: "摄像头文件整理.docx",
            uploadDate: "2020-05-27 10:34:16"
          }
        ],
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
          showIndex: true
        }
      }
    };
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
  methods: {
    // 表格配置项
    tablePropList() {
      // 配置表格的列名称和属性
      var list = [
        // 名称originName  上传时间 uploadDate

        { label: "名称", prop: "originName" },
        { label: "上传时间", prop: "uploadDate" }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
    },
    submit(obj) {
      //   console.log(obj);
    },
    search(obj) {
      this.Form.getFormModel(res => {
        console.log("搜索", res);
      });
      console.log(this.Form.model);
      //   console.log(this.model);
    },
    // 清除
    clearData(obj) {
      this.Form.resetForm();
    },
    // 表单上方的删除
    del(selectedData) {},
    downLoad() {
      console.log("下载");
    },
    // 查看
    propertyDetail(obj) {
      console.log("查看");
    }
  },
  mounted() {
    this.tablePropList();
  }
};
</script>

<style  scoped lang="less">
</style>
