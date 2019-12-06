<template>
  <div>
    <div class="form radius-shadow">
      <miForm
        :ref="leaseManageForm.ref"
        :options="leaseManageForm"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template slot="btn" slot-scope="obj">
          <div>
            <el-button :disabled="obj.disabled" type="primary" @click="search(obj)">搜索</el-button>
            <el-button :disabled="obj.disabled" @click="clearForm(obj)">清除</el-button>
          </div>
        </template>
      </miForm>
    </div>

    <div class="table radius-shadow">
      <miTable :ref="leaseManageTable.ref" :tableConfig="leaseManageTable">
        <template slot="custom-top" slot-scope="obj">
          <el-button :size="obj.size" type="primary" @click="add(obj)">新增</el-button>
          <el-button :size="obj.size" type="primary" @click="importExcel(obj)">批量导入</el-button>
          <el-button :size="obj.size" type="primary" @click="dels(obj)">批量删除</el-button>
          <el-button :size="obj.size" type="primary" @click="edits(obj)">批量编辑</el-button>
        </template>
        <template slot="operation" slot-scope="obj">
          <el-button type="text" @click="xiangqing(obj)">详情</el-button>
          <el-button type="text" @click="edit(obj)">编辑</el-button>
          <el-button type="text" @click="del(obj)">删除</el-button>
          <el-button type="text" @click="dingwei(obj)">定位</el-button>
        </template>
      </miTable>
    </div>
  </div>
</template>
<script>
import miForm from "@/components/Form";
import miTable from "@/components/Table";
import leaseManageApi from "@/service/api/leaseManageApi";

export default {
  components: { miForm, miTable },
  data() {
    return {
      model: {
        fcbh: "",
        fcmc: "",
        zj: "",
        fczt: "",
        mj: ""
        // ptwf: [2, 4]
      },
      leaseManageForm: {
        ref: "leaseManageForm",
        labelWidth: "100",
        size: "small",
        menuPosition: "right",
        submitBtn: false,
        emptyBtn: false,
        forms: [
          {
            type: "input",
            label: "房产编号",
            prop: "fcbh",
            placeholder: "请输入",
            clearable: true,
            span: 8
          },
          {
            type: "input",
            label: "房产名称",
            prop: "fcmc",
            placeholder: "请输入",
            clearable: true,
            span: 8
          },
          {
            type: "number",
            label: "总价",
            prop: "zj",
            placeholder: "请输入",
            clearable: true,
            span: 8,
            minRows: 0
          },
          {
            type: "select",
            label: "房产状态",
            prop: "fczt",
            placeholder: "请输入",
            clearable: true,
            span: 8,
            dicData: [
              {
                label: "租",
                value: 0
              },
              {
                label: "已租",
                value: 1
              }
            ]
          },
          {
            type: "number",
            label: "面积",
            prop: "mj",
            placeholder: "请输入",
            clearable: true,
            span: 8,
            minRows: 0
          },
          {
            prop: "btn",
            span: 8,
            pull: 6,
            formslot: true
          }
        ]
      },
      leaseManageTable: {
        ref: "leaseManageTable",
        serverMode: {
          url: leaseManageApi.getHouseList,
          data: {
            pageNum: 1,
            pageSize: 10
          },
          props: {
            listKey: "list",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
          }
        },
        operation: {
          width: 200
        },
        /* data: [
          {
            houseNumber: "FC-183283123341",
            isRent: 1,
            houseName: "菜单变动有点大",
            houseStatus: "1",
            houseArea: "120m²",
            spaceName: "5号楼顶楼"
          },
          {
            houseNumber: "FC-18328388282",
            isRent: 1,
            houseName: "小何房产1号",
            houseStatus: "1",
            houseArea: "120m²",
            housePrice: 1231,
            spaceName: "2444燃气管井"
          }
        ], */
        columnConfig: [
          {
            prop: "houseNumber",
            label: "房产编号"
          },
          {
            prop: "houseName",
            label: "房产名称"
          },
          {
            prop: "spaceName",
            label: "空间位置"
          },
          {
            prop: "houseStatus",
            label: "房产状态",
            formatter: function(row, column) {
              return row[column.property] === "1" ? "已租" : "未租";
            }
          },
          {
            prop: "houseArea",
            label: "面积"
          },
          {
            prop: "zj",
            label: "总价"
          },
          {
            prop: "qysj",
            label: "签约时间"
          },
          {
            prop: "zhxm",
            label: "租户姓名"
          }
        ],
        uiConfig: {
          height: "auto",
          customTopPosition: "right",
          selection: true
        }
      }
    };
  },
  methods: {
    submit() {},
    resetChange() {},
    add(obj) {
      console.log(obj);
    },
    importExcel(obj) {
      console.log(obj);
    },
    dels(obj) {
      console.log(obj);
    },
    edits(obj) {
      console.log(obj);
    },
    xiangqing(obj) {
      console.log(obj);
    },
    edit(obj) {
      console.log(obj);
    },
    del(obj) {
      console.log(obj);
    },
    dingwei(obj) {
      console.log(obj);
    },
    search(...args) {
      this.$refs[this.leaseManageForm.ref].getFormModel(res => {
        console.log("model", res);
      });
      console.log("搜索", ...args);
    },
    clearForm(...args) {
      console.log("清空", ...args);
      this.$refs[this.leaseManageForm.ref].resetForm();
    }
  }
};
</script>
<style lang='less' scoped>
.form,
.table {
  background-color: @white;
  box-sizing: border-box;
  padding: 20px;
}
.form {
  margin-bottom: 20px;
  padding-bottom: 0;
}
</style>