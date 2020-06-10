<template>
  <!-- 游客情况 -->
  <div class='panel-container'>
    <!-- 游客情况记录 -->
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
            <!-- 添加、删除 -->
            <el-button @click="add" type='primary'>添加</el-button>
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
import { Norbulingka } from "utils/dictionary";
import { type } from 'os';
// 工程分类
const projectType = Norbulingka.projectType;
export default {
  data() {
    return {
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "150",
        menuPosition: "right",
        menuBtn: false,
         group:[
          {
            label:'游客情况记录',
            prop:'group',
            forms: [
          // 日游客量 dailyCount
          {
            type: "number",
            prop: "dailyCount",
            label: "日游客量",
            span: 8,
            // rules:[
            //  {
            //   required: true,
            //   message: "请输入数字",
            //   trigger: "blur",
            //  }
            // ]
          },
          //   瞬时游客量 tempCount
          {
            type: "number",
            prop: "tempCount",
            label: "瞬时游客量",
            span: 8,
            offset: 1,
            // rules:[
            //  {
            //   required: true,
            //   message: "请输入数字",
            //   trigger: "blur",
            //  }
            // ]
          },

          // 搜素按钮
          {
            prop: "btn",
            formslot: true,
            offset: 2,
            span: 5
          }
        ]
          }
        ],
        
      },
      tableData: {
        ref: "tabel",
        customTop: true,
        customTopPosition: "right",
        data: [
          /**
             *      
             { label: "日游客量", prop: "dailyCount" },
            { label: "瞬时游客量", prop: "tempCount" },
            { label: "日期", prop: "data" }
             *   
            */
          // 模拟的假数据
          {
            dailyCount: "111111",
            tempCount: "222",
            data: "2021-5-29 16:04:48.0"
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
          showIndex: {
            width:120
          }
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
        // 日游客量 dailyCount   瞬时游客量 tempCount      日期 date
        { label: "日游客量", prop: "dailyCount" },
        { label: "瞬时游客量", prop: "tempCount" },
        { label: "日期", prop: "data" }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
    },
    submit(obj) {
      //   console.log(obj);
    },
    // 搜索
    search(obj) {
      this.Form.getFormModel(res => {
        console.log("搜索", res);
      });
      console.log(this.Form.model);
      //   console.log(this.model);
      var that = this;
      // 5秒后自动清空搜索内容
      setTimeout(function() {
        that.clearData();
      }, 5000);
    },
    // 清除
    clearData(obj) {
      this.Form.resetForm();
    },
    // 表单上方的删除
    del(selectedData) {},
    // 删除
    propertyDel(obj) {},
    // 编辑
     propertyEdit(obj) {
        console.log(obj.row)
        this.$router.push({path:'/temtourists',query:{flag:false,mark:'edit',...obj.row}})
    },
    // 详情
    propertyDetail(obj) {
      console.log(obj.row);
      this.$router.push({path:'/temtourists',query:{flag:true,mark:'detail',...obj.row}})
    },
    // 添加
    add(){
       this.$router.push({path:'/temtourists',query:{mark:'add',}})
    }
  },
  mounted() {
    this.tablePropList();
  }
};
</script>

<style  scoped lang="less">
</style>
