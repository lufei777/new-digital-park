<template>
  <div class="panel-container">
    <div class="panel">
      <div v-if="stepsActive === 0">
        <z-form v-model="model" :options="options" :uploadAfter="uploadAfter">
          <template slot="houseStatus" slot-scope="obj">
            <el-row>
              <el-row class="select-excel-template" type="flex" text-align="center">
                <el-col :span="16">
                  <el-input placeholder="请选择模板" readonly size="small"></el-input>
                </el-col>
                <el-col :span="10">
                  <el-link type="primary" :href="templateUrl">下载模板</el-link>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <p>1、请选择模板，下载模板。</p>
                  <p>2、模板填写完毕后，请从右边上传。</p>
                </el-col>
              </el-row>

              <el-button round @click="back">返回</el-button>
            </el-row>
          </template>
        </z-form>
      </div>

      <div v-show="stepsActive === 1 ||stepsActive ===  2" v-loading.lock="tableloading">
        <z-table style="margin-bottom:20px;" :ref="tableConfig.ref" :tableConfig="tableConfig"></z-table>
        <el-row type="flex" justify="center">
          <el-col class="is-justify-space-around el-row--flex" :span="8">
            <el-button type="primary" round @click="importProperty">导入</el-button>
            <el-button round @click="reUpload">重传</el-button>
            <el-button round @click="back">返回</el-button>
          </el-col>
        </el-row>
      </div>

      <div v-show="stepsActive === 3">
        <el-row type="flex" justify="center" style="height:200px;">
          <el-col class="is-justify-center el-row--flex" :span="8">
            <div
              class="is-justify-center el-row--flex"
              style="flex-direction:column;text-align:center;"
            >
              <i class="el-icon-success" style="font-size:100px;margin-top:20px;color:#3db103;"></i>
              <p style="font-size:20px;font-weight:bold;">导入成功！</p>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col class="is-justify-space-around el-row--flex" :span="8">
            <el-button round @click="reUpload">重传</el-button>
            <el-button round @click="back">返回</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="panel">
      <el-steps :active="stepsActive" align-center finish-status="success">
        <el-step title="填写模板" description="请先下载模板，填写完成后上传"></el-step>
        <el-step title="确认信息" description="请确认导入的信息是否正确"></el-step>
        <el-step :title="stepsActive === allSteps ? '导入成功' : '导入中...'" description></el-step>
      </el-steps>
    </div>
  </div>
</template>
<script>
import { LeaseManageDic } from "@/utils/dictionary";

export default {
  data() {
    return {
      templateUrl: "123",
      allSteps: 3,
      stepsActive: 0,
      tableloading: false,
      model: {},
      options: {
        menuBtn: false,
        forms: [
          {
            type: "select",
            label: "选择模板",
            prop: "houseStatus",
            placeholder: "请输入",
            formslot: true,
            clearable: true,
            span: 12,
            push: 2,
            dicData: []
          },
          {
            type: "upload",
            label: "",
            prop: "excelUpload",
            loadText: "附件上传中，请稍等",
            showFileList: false,
            span: 12,
            pull: 2,
            drag: true,
            tip: "只能上传xls,xlsx文件。",
            action: "https://jsonplaceholder.typicode.com/posts/",
            accept: ["xls", "xlsx"],
            props: {
              label: "housePictureName",
              value: "housePictureUrl"
            },
            propsHttp: {
              name: "fileName",
              url: "fileUrl",
              res: "data"
            }
          }
        ]
      },
      tableConfig: {
        ref: "table",
        data: [],
        columnConfig: [
          {
            prop: "houseNumber1",
            label: "房产编号",
            width: 200
          },
          {
            prop: "houseName1",
            label: "房产名称"
          },
          {
            prop: "spaceName1",
            label: "空间位置"
          },
          {
            prop: "houseStatus1",
            label: "房产状态",
            formatter: function(row, column) {
              let HouseStatus = LeaseManageDic.HouseStatus;
              let rowValue = row[column.property];
              let res = _.find(HouseStatus, (cur, key, obj) => {
                return cur.value === rowValue;
              });
              return res ? res.label : "";
              /* if (value === HouseStatus.Rented.value) {
                return HouseStatus.Rented.label;
              }
              if (value === HouseStatus.BeRent.value) {
                return HouseStatus.BeRent.label;
              } */
            }
          },
          {
            prop: "houseArea1",
            label: "面积"
          },
          {
            prop: "housePrice1",
            label: "总价"
          },
          {
            prop: "qysj1",
            label: "签约时间"
          },
          {
            prop: "zhxm1",
            label: "租户姓名"
          }
        ],
        uiConfig: {
          height: "auto",
          customTopPosition: "right"
        }
      }
    };
  },
  methods: {
    stepLast() {
      this.stepsActive > 0 ? this.stepsActive-- : "";
    },
    stepNext() {
      this.stepsActive < this.allSteps ? this.stepsActive++ : "";
    },
    reUpload() {
      this.stepsActive = 0;
    },
    uploadAfter(res, done, hide, column) {
      if (_.isError(res)) {
        console.error(res);
      } else {
        console.log(res);
        done();
        this.stepNext();
      }
      hide();
    },
    importProperty() {
      this.stepNext();
      this.tableloading = true;
      setTimeout(() => {
        this.stepNext();
        this.tableloading = false;
      }, 2000);
    },
    back() {
      this.$router.back();
    }
  }
};
</script>
<style lang='less' scoped>
</style>
