<template>
  <div class="export-data">
    <el-dialog :visible.sync="dialogTableVisible" :show-close="false" :close-on-click-modal="false" :top="dialogTop">
      <NavOperator v-show="false" />
      <z-form
        :ref="exportDataForm.ref"
        :options="exportDataForm"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template slot="btn" slot-scope="obj">
          <div>
            <el-button :disabled="obj.disabled" type="primary" @click="inquire">查询</el-button>
            <el-button :disabled="obj.disabled" type="primary" @click="exportClick">导出</el-button>
          </div>
        </template>
      </z-form>
      <div class="tenant-manage-table">
        <z-table :ref="exportDataTable.ref" :options="exportDataTable"></z-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ExportDataDic } from "@/utils/dictionary";
import CommonApi from "../../../service/api/common";
import CommonFun from "../../../utils/commonFun";
import NavOperator from "@/pages/digitalPark/coms/navOperator";

export default {
  components: {
    NavOperator
  },
  name: "ExportData",
  data() {
    let _this = this;
    return {
      dialogTableVisible: true,
      dialogFormVisible: false,
      dateType: "month",
      model: {
        curDateType: 2,
        startTime: moment(
          new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000 * 1)
        ).format("YYYY-MM"),
        lastTime: moment(new Date()).format("YYYY-MM")
      },
      exportDataForm: {
        ref: "exportDataForm",
        labelWidth: "100",
        size: "medium",
        menuPosition: "right",
        submitBtn: false,
        emptyBtn: false,
        forms: [
          {
            type: "tree",
            label: "空间选择",
            prop: "spaceId",
            clearable: true,
            span: 4,
            props: {
              label: "text",
              value: "id",
              children: "nodes"
            }
          },
          {
            type: "tree",
            label: "设备选择",
            prop: "deviceId",
            clearable: true,
            span: 4,
            props: {
              label: "text",
              value: "id",
              children: "nodes"
            }
          },
          {
            type: "select",
            label: "时间类型",
            prop: "curDateType",
            placeholder: "请输入",
            clearable: true,
            span: 4,
            dicData: ExportDataDic.timeType,
            change: value => {
              this.dateType =
                value.value == 1 ? "year" : value.value == 2 ? "month" : "date";
              this.dateTypeChange("startTime", this.dateType);
              this.dateTypeChange("lastTime", this.dateType);
            }
          },
          {
            type: "month",
            label: "开始时间",
            prop: "startTime",
            placeholder: "选择日期时间",
            span: 4,
            valueFormat: "yyyy-MM-dd"
          },
          {
            type: "month",
            label: "结束时间",
            prop: "lastTime",
            placeholder: "选择日期时间",
            span: 4,
            valueFormat: "yyyy-MM-dd"
          },
          {
            prop: "btn",
            span: 4,
            pull: 4,
            formslot: true,
            width: 20
          }
        ]
      },
      exportDataTable: {
        ref: "exportDataRef",
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto",
          pagination: {
            layout: "total,->, prev, pager, next, jumper",
            pageSizes: [10, 20, 50],
            handler(pageSize, currentPage, table) {
              _this.handleCurrentChange(currentPage);
            }
          }
        }
      },
      page: 1,
      selectTypeValue: 2,
      dialogTop:"15vh"
    };
  },
  computed: {
    commonParams() {
      return {
        deviceId: this.model.deviceId,
        startTime: this.model.startTime,
        lastTime: this.model.lastTime,
        page: this.page,
        selectType: this.model.curDateType
      };
    },
    paramId() {
      return this.$route.query;
    }
  },
  watch: {
    paramId() {
      this.model.spaceId = this.paramId.spaceId;
      this.model.deviceId = this.paramId.deviceId;
      this.inquire();
    }
  },
  methods: {
    dateTypeChange(name, typeValue) {
      this.$refs[this.exportDataForm.ref].setColumnByProp(name, {
        type: typeValue
      });
    },
    async getAssetAllTree() {
      let res = await CommonApi.getQueryDeviceBySpaceId({
        spaceId: 1
      });

      this.$refs[this.exportDataForm.ref].setColumnByProp("deviceId", {
        dicData: res
      });
    },
    async probeHistoryValue() {
      let selectType;
      if (this.model.startTime == "" && this.model.lastTime == "") {
        selectType = "0";
      } else {
        selectType = this.model.curDateType;
      }
      let res = await CommonApi.getProbeHistoryValue(this.commonParams);
      if (res && res.value) {
        console.log("res",res)
        if(res.total>=10){
          this.dialogTop = '60px'
        }
        let tmp = [];
        var title = res.title;
        res.value.map(item => {
          let obj = {};
          title.map((tit, index) => {
            if (tit.indexOf(".") != -1) {
              tit = tit.split(".").join("");
            }
            obj[tit] = item[index];
          });
          tmp.push(obj);
        });
        let columnConfig = [];
        // for (let i = 0; i < title.length; i++) {
        //   console.log("0", title[i]);
        //   columnConfig.push({
        //     label: title[i],
        //     prop: title[i]
        //   });
        // }
        for (let key in title) {
          let widthSet;
          if (Object.keys(title).length > 14) {
            widthSet = 110;
          }
          let tmpProp = title[key];
          if (title[key].indexOf(".") != -1) {
            tmpProp = title[key].split(".").join("");
          }
          columnConfig.push({
            label: title[key],
            prop: tmpProp,
            width: widthSet
          });
        }
        this.exportDataTable.columnConfig = columnConfig;
        this.exportDataTable.data = tmp;
        this.exportDataTable.uiConfig.pagination.total = res.total;
        this.exportDataTable.total = res.total;
      }
    },
    inquire() {
      this.probeHistoryValue();
    },
    handleCurrentChange(value) {
      this.page = value;
      this.probeHistoryValue();
    },
    async exportClick() {
      let params = "";
      for (let key in this.commonParams) {
        params += key + "=" + this.commonParams[key] + "&";
      }
      let url = `/vibe-web/device_data/probesHistoryExportExcel`;
      CommonFun.exportMethod({
        url,
        params
      });
    },
    submit() {},
    resetChange() {}
  },
  mounted() {
    this.model.spaceId = this.paramId.spaceId;
    this.model.deviceId = this.paramId.deviceId;
    this.getAssetAllTree();
    if(JSON.stringify(this.paramId) != "{}"){
      this.inquire();
    }
  },
  created() {
    CommonApi.getAssetAllTree({
      flag: "space",
      locationRoot: 1
    }).then(res => {
      this.$refs[this.exportDataForm.ref].setColumnByProp("spaceId", {
        dicData: res
      });
    });
  }
};
</script>

<style lang="less">
.export-data {
  // width: 100%;
  // height: 100%;
  .el-dialog {
    width: 95%;
  }
}
</style>
