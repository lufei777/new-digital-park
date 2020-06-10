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
            <el-button
              @click="clearData(obj)"
            >清除</el-button>
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
            <el-button @click="addHeritage" type='primary'>添加</el-button>
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
import commonFun from "@/utils/commonFun";
// 字典配置
import { Norbulingka } from "utils/dictionary";
// 文物级别
const levelCultural = Norbulingka.levelCultural;
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
        group:[
          {
            label:'藏品档案',
            prop:'group',
            forms: [
          //藏品名称 collectionName

          {
            type: "input",
            prop: "collectionName",
            placeholder: "",
            label: "藏品名称",
            span: 6,
          },
          // 藏品编号serial
          {
            type: "input",
            prop: "serial",
            placeholder: "",
            label: "藏品编号",
            span: 6,
          },
          // 文物级别 culturalRank
          {
            type: "select",
            prop: "culturalRank",
            placeholder: "",
            label: "文物级别",
            span: 6,
            dicData: levelCultural
          },
          // 搜素按钮
          {
            prop: "btn",
            formslot: true,
            span: 6
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
            {label:'藏品编号',prop:'serial'},
            {label:'名称',  prop:'collectionName'},
            {label:'原名',prop:'primaryName'},
            {label:'具体年代',prop:'practicalYear'},
            {label:'文物级别',prop:'culturalRank'},
             *   
            */
            // 模拟的假数据
          {
            serial: "002",
            collectionName: "八骏图",
            primaryName: "关山难越",
            practicalYear: "2021",
            culturalRank: "二级",
          },
          {
            serial: "003",
            collectionName: "清明上河图",
            primaryName: "谁悲失路之人",
            practicalYear: "1989",
            culturalRank: "二级",
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
          showIndex: false
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
    // '添加' 按钮 
    addHeritage(){this.$router.push({path:'/addeditdetail',query:{mark:'add'}})},
    // 表格配置项
    tablePropList() {
      // 配置表格的列名称和属性
      var list = [
        // 藏品编号 serial  名称collectionName 原名primaryName 具体年代practicalYear 文物级别culturalRank
        { label: "藏品编号", prop: "serial" },
        { label: "名称", prop: "collectionName" },
        { label: "原名", prop: "primaryName" },
        { label: "具体年代", prop: "practicalYear" },
        { label: "文物级别", prop: "culturalRank" }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
    },
    submit(obj) {
    //   console.log(obj);
    },
    search(obj) {
        this.Form.getFormModel(res =>{
            console.log('搜索',res)
        })
      console.log(this.Form.model);
    //   console.log(this.model);
    },
    // 清除
    clearData(obj){this.Form.resetForm()},
    // 表单上方的删除
    del(selectedData){},
    // 删除
    propertyDel(obj){},
    // 编辑
    propertyEdit(obj){ 
        this.$router.push({path:'/addeditdetail',query:{mark:'edit',...obj.row}})
      
    },
    // 详情
    propertyDetail(obj){
        // console.log(obj.row)
        this.$router.push({path:'/addeditdetail',query:{flag:true,mark:'detail',...obj.row}})
    },
  },
  mounted() {
    this.tablePropList();
  }

};
</script>

<style  scoped lang="less">
</style>
