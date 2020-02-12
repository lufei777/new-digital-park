<template>
  <div class="panel-container">
    <div class="panel">
      <z-form
        :ref="personalManageForm.ref"
        :options="personalManageForm"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template slot="btn" slot-scope="obj">
          <div>
            <el-button :size="obj.size" type="primary" @click="search(obj)">搜索</el-button>
            <el-button :size="obj.size" @click="clearForm(obj)">清除</el-button>
          </div>
        </template>
      </z-form>
    </div>

    <div class="table panel">
      <z-table
        :ref="personalManageTable.ref"
        :tableConfig="personalManageTable"
      >
        <template slot="custom-top" slot-scope="obj">
          <el-button :size="obj.size" type="primary" @click="addedProperty(obj)">新增</el-button>
          <el-button :size="obj.size" type="primary" @click="bulkImport(obj)">批量导入</el-button>
          <el-button :size="obj.size" type="primary" @click="bulkEdit(obj)">批量编辑</el-button>
        </template>
        <template slot="operation" slot-scope="obj">
          <el-button type="text" @click="propertyDetail(obj)">详情</el-button>
          <el-button type="text" @click="propertyEdit(obj)">编辑</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>
<script>
import { LeaseManageDic } from "@/utils/dictionary";
import personalManageApi from "@/service/api/personalManage";
import commonFun from "@/utils/commonFun.js";
const temMmodel = {
  fullName: "刘二狗",
  sex: 2,
  orgName: [
    "dept-cb0560e3cab348f5ae5be948fa3aa995",
    "dept-20a0cc719722490bbf2c3e4974d2d5c4",
    "dept-ac96b78bfe3e411ebe7419722e9fb1c5"
  ],
  position: "1",
  level: "2",
  superior: "3",
  status: 1,
  type: 2,
  entryDate: "2020-02-26T16:00:00.000Z",
  correctionDate: "2020-02-21T16:00:00.000Z",
  workDate: "2010-02-02T16:00:00.000Z",
  officePhone: "11111111111",
  telePhone: "11111111111",
  officeEmail: "111@qq.com",
  email: "222@qq.com",
  officeAddress: "信智联科技有限公司",
  expertise: "没有专长\n1\n2\n3",
  hobby: "没有爱好\n1\n3\n4",
  birthday: "2020-02-05T16:00:00.000Z",
  nation: "汉",
  natives: "北京市",
  residence_type: 2,
  cardNo: "111111111111111111",
  maritalStatus: 2,
  childNum: 0,
  political: 3,
  groupDate: "2020-02-06T16:00:00.000Z",
  partyDate: "2020-02-06T16:00:00.000Z",
  guild: 2,
  education: 7,
  degree: 0,
  health: 2,
  height: "170",
  weight: "72",
  bloodType: "A",
  address: "北京市",
  familyContact: "11111111111",
  temporaryNo: "GAB35-G",
  educationExperience: "没有\n1\n2\n3",
  familyDetails: "没有\n1\n2\n3"
};

const data = [
  {
    id: "9558866",
    jobNumber: "9527",
    fullName: "刘二狗",
    sex: "男",
    orgName: "软件部",
    position: "Java开发工程师",
    level: "一级",
    superior: "老王",
    type: "正式",
    status: "全职",
    officeAddress: "信智联",
    birthday: "1995/01/05",
    nation: "汉",
    natives: "北京市",
    residence_type: "城市",
    cardNo: "123456789000000000",
    health: "良好",
    address: "北京市海淀区",
    familyContact: "12345678900"
  },
  {
    id: "9558867",
    jobNumber: "9527",
    fullName: "刘三狗",
    sex: "男",
    orgName: "软件部",
    position: "Java开发工程师",
    level: "一级",
    superior: "老王",
    type: "正式",
    status: "全职",
    officeAddress: "信智联",
    birthday: "1995/01/05",
    nation: "汉",
    natives: "北京市",
    residence_type: "城市",
    cardNo: "123456789000000000",
    health: "良好",
    address: "北京市海淀区",
    familyContact: "12345678900"
  },
  {
    id: "9558868",
    jobNumber: "9527",
    fullName: "刘四狗",
    sex: "男",
    orgName: "软件部",
    position: "Java开发工程师",
    level: "一级",
    superior: "老王",
    type: "正式",
    status: "全职",
    officeAddress: "信智联",
    birthday: "1995/01/05",
    nation: "汉",
    natives: "北京市",
    residence_type: "城市",
    cardNo: "123456789000000000",
    health: "良好",
    address: "北京市海淀区",
    familyContact: "12345678900"
  }
];

export default {
  data() {
    return {
      model: {},
      personalManageForm: {
        ref: "personalManageForm",
        size: "small",
        menuPosition: "right",
        menuBtn: false,
        forms: [
          {
            label: "工号",
            type: "input",
            prop: "jobNumber",
            clearable: true,
            span: 5
          },
          {
            label: "姓名",
            type: "input",
            prop: "fullName",
            clearable: true,
            span: 4
          },
          {
            label: "个人邮箱",
            type: "input",
            prop: "email",
            clearable: true,
            span: 5
          },
          {
            label: "办公电话",
            type: "input",
            prop: "officePhone",
            clearable: true,
            span: 5
          },
          {
            prop: "btn",
            span: 5,
            formslot: true,
            width: 55
          }
        ]
      },
      personalManageTable: {
        ref: "personalManageTable",
        customTop: true,
        customTopPosition: "right",
        serverMode: {
          url: personalManageApi.getUserMessageList,
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
          width: 100
        },
        columnConfig: [
          {
            prop: "jobNumber",
            label: "工号",
            fixed: "left"
          },
          {
            prop: "fullName",
            label: "姓名",
            fixed: "left",
            sortable: true
          },
          {
            prop: "sex",
            label: "性别",
            fixed: "left"
          },
          {
            prop: "orgName",
            label: "所在部门",
            fixed: "left",
            width: "120"
          },
          {
            prop: "position",
            label: "所在岗位",
            fixed: "left",
            width: "120"
          },
          {
            prop: "level",
            label: "岗位级别"
          },
          {
            prop: "superior",
            label: "直接上级"
          },
          {
            prop: "type",
            label: "员工状态"
          },
          {
            prop: "status",
            label: "员工类型"
          },
          {
            prop: "officeAddress",
            label: "办公地点",
            fixed: "right"
          },
          {
            prop: "birthday",
            label: "出生日期",
            width: "100"
          },
          {
            prop: "nation",
            label: "民族"
          },
          {
            prop: "natives",
            label: "籍贯"
          },
          {
            prop: "residence_type",
            label: "户口类型"
          },
          {
            prop: "cardNo",
            label: "身份证号码",
            width: "180"
          },
          {
            prop: "health",
            label: "健康状况"
          },
          {
            prop: "address",
            label: "现居住地",
            width: "120"
          },
          {
            prop: "familyContact",
            label: "家庭联系方式",
            width: "120"
          }
        ],
        uiConfig: {
          height: "auto",
          selection: true
        }
      }
    };
  },
  methods: {
    submit() {},
    resetChange() {},
    deleteRow(ids) {
      leaseManageApi.removeHouse({ houseIds: ids }).then(res => {
        this.refreshTable();
      });
    },
    addedProperty(obj) {
      this.$router.push({
        name: "addpersonal"
      });
    },
    bulkImport(obj) {
      this.$router.push({ name: "bulkimporthouseproperty" });
    },
    bulkEdit(obj) {
      console.log(obj);
    },
    getPropertyDetail(row) {
      return leaseManageApi.houseDetails(row);
    },
    propertyDetail({ scopeRow: { $index, row: model, _self } }) {
      // 为了区分messageId和userId，做的处理
      model["messageId"] = model.id;
      this.$router.push({
        name: "addpersonal",
        params: {
          extraOptions: {
            disabled: true
          },
          model
        }
      });
    },
    propertyEdit({ scopeRow: { $index, row: model, _self } }) {
      // 为了区分messageId和userId，做的处理
      model["messageId"] = model.id;

      this.$router.push({
        name: "addpersonal",
        params: {
          model: model
        }
      });
    },
    search(...args) {
      this.$refs[this.personalManageForm.ref].getFormModel(res => {
        console.log("model", res);
      });
      console.log("搜索", ...args);
    },
    clearForm(...args) {
      console.log("清空", ...args);
      this.$refs[this.personalManageForm.ref].resetForm();
    },
    refreshTable() {
      this.$refs[this.personalManageTable.ref].refreshTable();
    }
  }
};
</script>
