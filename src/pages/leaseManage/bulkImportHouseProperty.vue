<template>
  <div>
    <div class="panel">
      <div v-if="stepsActive === 0">
        <importFrom v-model="model" :options="options" :uploadAfter="uploadAfter">
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
            </el-row>
          </template>
        </importFrom>

        <el-steps :active="stepsActive" align-center finish-status="success">
          <el-step title="填写模板" description="请先下载模板，填写完成后上传"></el-step>
          <el-step title="确认信息" description="请确认导入的信息是否正确"></el-step>
          <el-step :title="stepsActive === allSteps ? '导入成功' : '导入中...'" description></el-step>
        </el-steps>
      </div>

      <div v-if="stepsActive === 1">
        <importTable style="margin-bottom:20px;" :ref="tableConfig.ref" :tableConfig="tableConfig"></importTable>
        <el-row type="flex" justify="space-around">
          <el-col :span="8">
            <el-button type="primary" round @click="importProperty">导入</el-button>
            <el-button round @click="stepLast">重传</el-button>
            <el-button round @click="back">返回</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import importFrom from "@/components/Form";
import importTable from "@/components/Table";
import { LeaseManageDic } from "@/utils/dic/leaseManage";

export default {
  components: {
    importFrom,
    importTable
  },
  data() {
    return {
      templateUrl: "123",
      allSteps: 3,
      stepsActive: 0,
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
            prop: "houseNumber",
            label: "房产编号",
            width: 200
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
            prop: "houseArea",
            label: "面积"
          },
          {
            prop: "housePrice",
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
    stepLast() {
      this.stepsActive > 0 ? this.stepsActive-- : "";
    },
    stepNext() {
      this.stepsActive < this.allSteps ? this.stepsActive++ : "";
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
    importProperty() {},
    back() {
      this.$router.back();
    }
  }
};
</script>
<style lang='less' scoped>
</style>