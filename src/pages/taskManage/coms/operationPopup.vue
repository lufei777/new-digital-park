<template>
  <div class="operation-popup">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import SystemManageApi from "@/service/api/systemManage";

export default {
  name: "operationPopup",
  props:['dialogFormFlag'],
  data() {
    return {
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    async submit(model, hide) {
      await SystemManageApi[this.api](this.formModel)
        .then(res => {
          this.$message({
            type: "success",
            message: res
          });
          this.$router.push("./roleManage");
        })
        .finally(msg => {
          hide();
        });
    },
    goBack() {
      history.go(-1);
    },
    async getRoleDetail() {
      let res = await SystemManageApi.getRoleDetail({
        roleId: this.roleId
      });
      this.formModel = res;
    }
  },
  mounted() {
    if (this.roleId) {
      this.getRoleDetail();
    }
  }
};
</script>

<style lang="less">
.add-role {
  padding: 10px;
  background: @white;

  .el-form {
    width: 50%;
    margin: 30px auto;
  }
}
</style>
