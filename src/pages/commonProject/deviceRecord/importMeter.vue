<template>
  <div class="import-meter radius-shadow">
    <div class="import-box">
      <span>批量导入设备</span>
      <!--<Upload></Upload>-->
      <!-- <z-upload v-model=""></z-upload>
      <div class="operator-box">
        <el-button type="primary"  @click="onClickSureBtn">确定</el-button>
        <el-button type="default"  @click="goBack">返回</el-button>
      </div>-->
      <z-form :options="formOptions" v-model="model">
        <template slot="menuBtn" slot-scope="{size}">
          <el-button :size="size" @click="goBack()">返回</el-button>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
import CommonApi from "../../../service/api/common";
export default {
  name: "ImportMeter",
  data() {
    return {
      headers: {},
      fileList: [],
      model: {},
      uploadAction: "/vibe-web/energy/imEnergyMete",
      formOptions: {
        emptyBtn: false,
        submitBtn: false,
        forms: [
          {
            type: "upload",
            label: "附件上传",
            prop: "deviceFile",
            loadText: "附件上传中，请稍等",
            tip: "只能上传excel文件",
            action: "/vibe-web/energy/imEnergyMete",
            accept: ["xls", "xlsx", "csv"],
            span: 16
          }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    goBack() {
      history.go(-1);
    },
    async onClickSureBtn() {
      // await CommonApi.importDevice()
    },
    onFileChange(val) {},
    uploadSuccess(res) {
      console.log("res", res);
      if (res.code == "SUCCESS") {
        this.$message.success("导入成功!");
        this.$router.push("/main/channelApply");
      } else {
        this.$message.error("导入失败!");
      }
    },
    uploadFalse(response, file, fileList) {
      this.$message.error("文件上传失败！");
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.import-meter {
  padding: 20px;
  background: @white;
  .el-form {
    // width: 50%;
    margin: 30px auto;
  }
  .el-input {
    width: 220px;
  }
  .go-back {
    background: #ecf5ff;
    color: #3a8ee6;
    border-color: #c6e2ff;
  }
  .import-box {
    width: 50%;
    margin: 30px auto;
  }
  .operator-box {
    padding: 20px;
    margin-left: 80px;
  }
}
</style>
