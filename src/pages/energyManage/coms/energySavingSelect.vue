<template>
  <div class="energy-saving-select panel-container">
    <div class="flex-align-between condition-box panel">
      <div class="item-group block">
        <label>建筑群：</label>
        <el-select v-model="energyA3" placeholder="请选择">
          <el-option :label="energyA3Text" value="1"></el-option>
        </el-select>
      </div>
      <div class="item-group block">
        <label>能源分项：</label>
        <el-select v-model="energySubentry" placeholder="请选择">
          <el-option
            v-for="item in energySubentryData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="item-group block">
        <label>指标选择：</label>
        <el-select v-model="indexEnergy" placeholder="请选择">
          <el-option label="参考标准" value="1"></el-option>
          <el-option label="自定义标准" value="2"></el-option>
        </el-select>
      </div>
      <div class="item-group block demonstrationFloor">
        <label>楼层检索：</label>
        <el-input v-model="spaceName" @focus="onShowModal"></el-input>
      </div>
      <div class="item-group block">
        <label>月份：</label>
        <el-date-picker
          v-model="startTime"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月"
          @change="onTimeChange(1)"
        ></el-date-picker>
      </div>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button type="primary" @click="exportList" v-if="tableData.total && tableData.total!=0">导出</el-button>
    </div>
    <div class="tabulation panel">
      <div class="tab-title flex-align-between">
        <span>注:红色字体为超标</span>
        <em>{{tabTitle}}</em>
      </div>
      <z-table :ref="tableConfig.ref" :options="tableConfig"></z-table>
      <TreeModal :tree-modal-config="treeModalConfig"/>
      <DiagnoseTrend :show-modal="showTrendModal" :search-params="searchParams"/>
    </div>
  </div>
</template>

<script>
  import CommonApi from "../../../service/api/common";
  import EnergyApi from "../../../service/api/energy";
  import TreeModal from '../../../components/treeModal/index'
  import moment from "moment";
  import CommonFun from '../../../utils/commonFun'
  import {isZG} from '@/utils/project';
  import DiagnoseTrend from './diagnoseTrend'

  export default {
    name: "EnergySavingSelect",
    components: {
      TreeModal,
      DiagnoseTrend
    },
    props: ["energySaveFlag"],
    data() {
      let _this = this;
      return {
        spaceName: "", //楼层检索
        spaceId: "0",
        energyA3Text: '',
        energyA3: "1", //建筑群
        energySubentry: "", //能源分项
        indexEnergy: "1", //指标选择
        energySubentryData: [],
        floorSelectData: "",
        // startTime: moment(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000*10)).format("YYYY-MM"),
        startTime: isZG() ? moment().format('YYYY-MM') : "2019-02",
        page: 1,
        tableData: {
          total: 0
        },
        currentPage: 1,
        tableConfig: {
          ref: "tableRef",
          data: [],
          columnConfig: [
            {
              label: '建筑楼层',
              prop: 'tempProp1'
            },
            {
              label: '参考指标',
              prop: 'tempProp2'
            },
            {
              label: '各时间指标',
              prop: 'tempProp3'
            }
          ],
          uiConfig: {
            height: "auto", //"", //高度
            pagination: {
              //是否分页，分页是否自定义
              layout: "total,->, prev, pager, next, jumper",
              pageSizes: [10, 20, 50],
              handler(pageSize, currentPage, table) {
                _this.handleCurrentChange(currentPage)
              }
            }
          },
          tableMethods: {
            sortChange: _this.sortTable,
            rowClick: _this.rowClick,
          }
        },
        treeModalConfig: {
          treeList: [],
          treeConfig: {
            treeProps: {
              label: "floor",
              children: 'nodes'
            },
            nodeKey:'floorId',
            defaultExpandedkeys: [],
          },
          showModal: false,
          onClickSureBtnCallback: this.onClickModalSureBtn,
          onClickCancelBtnCallback: this.onClickModalCancelBtn
        },
        showTrendModal:false,
        trendDate:'',
        searchParams:{}
      };
    },
    computed: {
      tabTitle() {
        let tmp = this.energySubentryData.find(item => {
          return item.id == this.energySubentry;
        });
        if (this.energySaveFlag == 1) {
          return `${this.startTime || moment(new Date(), 'YYYY-MM')}逐日全天${tmp ? tmp.name : '设备用量'}统计`;
        } else {
          return `${this.startTime || moment(new Date(), 'YYYY-MM')}逐日夜间${tmp ? tmp.name : '设备用量'}统计`;
        }
      },
      commonParams() {
        return {
          moment: this.startTime,
          lou: this.energyA3,
          standard: this.indexEnergy,
          type: this.energySubentry,
          parent: this.spaceId,
          page: this.page,
          size: 10
        };
      },
    },
    methods: {
      onTimeChange() {
      },
      async getEnergyList() {
        let res = await CommonApi.getEnergyListByGroup();
        if (isZG()) {
          if (this.energySaveFlag == 3 || this.energySaveFlag == 4) {
            this.energySubentryData = [res[1]]
            this.energySubentry = res[1].id;
          } else if (this.energySaveFlag == 1 || this.energySaveFlag == 2) {
            this.energySubentryData = [res[0]]
            this.energySubentry = res[0].id;
          }
        } else {
          if (this.energySaveFlag == 3 || this.energySaveFlag == 4) {
            this.energySubentryData = res[1].energyType;
            this.energySubentryData.unshift({
              energyType: null,
              id: 37,
              name: "水",
              parent: 37
            })
            // console.log("this.energySubentryData", this.energySubentryData)
            this.energySubentry = res[1].energyType[0].id;
          } else if (this.energySaveFlag == 1 || this.energySaveFlag == 2) {
            this.energySubentryData = res[0].energyType;
            this.energySubentry = res[0].energyType[0].id;
          }
        }
      },
      async getAllFloorOfA3() {
        this.treeModalConfig.treeList = await CommonApi.getAllFloorOfA3()
        this.spaceId = this.treeModalConfig.treeList[0].floorId
        this.energyA3Text = this.treeModalConfig.treeList[0].floor
        this.spaceName = this.treeModalConfig.treeList[0].floor
        this.treeModalConfig.treeConfig.defaultExpandedkeys = [this.treeModalConfig.treeList[0].floorId]
      },
      async getList() {
        let res;
        if (this.energySaveFlag == 1 || this.energySaveFlag == 3) {
          res = await EnergyApi.getEnergySavingElec(this.commonParams);
        } else if (this.energySaveFlag == 2 || this.energySaveFlag == 4) {
          res = await EnergyApi.getEnergySavingNight(this.commonParams);
        }
        if (res && res.value) {
          var title = res.white
          let tmp = [];
          res.value.map(item => {
            let obj = {};
            title.map((tit, index) => {
              obj[tit] = item[index];
            });
            tmp.push(obj);
          });
          // console.log(tmp)
          let columnConfig = []
          for (let key in tmp[0]) {
            let widthSet
            if (Object.keys(tmp[0]).length > 14) {
              widthSet = 110
            }
            columnConfig.push({
              label: key,
              prop: key,
              width: widthSet,
              formatter: function (row, value) {
                if (value > parseFloat(row.参考指标)) {
                  return `<span class="styleRed">${value}</span>`;
                } else {
                  return `<span>${value ? value : "--"}</span>`;
                }
              },
            })
          }
          columnConfig[0].hide=true
          this.tableConfig.columnConfig = columnConfig;
          this.tableConfig.data = tmp;
          this.tableConfig.uiConfig.pagination.total = res.total;
          this.tableData.total = res.total
        } else {
          this.tableConfig.columnConfig = [];
          this.tableConfig.data = [];
          this.tableConfig.uiConfig.pagination.total = 0;
          this.tableData.total = 0
        }
      },
      async exportList() {
        let url;
        let params = "";
        for (let key in this.commonParams) {
          params += key + "=" + this.commonParams[key] + "&";
        }
        if (this.energySaveFlag == 1 || this.energySaveFlag == 3) {
          url = `/vibe-web/energyCount/energy/elec/export`;
        } else if (this.energySaveFlag == 2 || this.energySaveFlag == 4) {
          url = `/vibe-web/energyCount/energy/night/export`;
        }
        CommonFun.exportMethod({
          url,
          params
        }, this)
      },
      onShowModal() {
        this.treeModalConfig.showModal = true
      },
      onClickModalSureBtn(val) {
        this.spaceId = val.floorId
        this.spaceName = val.floor
        this.treeModalConfig.showModal = false
      },
      onClickModalCancelBtn() {
        this.treeModalConfig.showModal = false
      },
      handleCurrentChange(value) {
        this.page = value;
        this.getList();
      },
      rowClick(val1,val2){
        console.log(val1,val2)
        let date = val2.property
        if(date.indexOf("-")==-1) return;
        if(date.indexOf('(')!=-1){
          date = date.split("(")[0]
        }
        this.showTrendModal = true
        this.trendDate = date
        let tmp = this.energySubentryData.find(item => {
          return item.id == this.energySubentry;
        });
        this.searchParams = {
          date,
          energyName:tmp.name,
          spaceId:val1.id,
          energyType:this.energySubentry,
          dateType:(this.energySaveFlag==1 || this.energySaveFlag==3)?1:2,
          spaceName:val1['建筑楼层']
        }
      }
    },
    async created() {
      await this.getEnergyList();
      await this.getAllFloorOfA3();
      this.getList();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .energy-saving-select {
    .styleRed {
      color: red;
    }

    .condition-box {
      margin-bottom: 20px;
      background: @white;
      padding: 20px;
    }

    .tabulation {
      background: @white;
      padding: 20px;
    }

    .block {
      .el-select {
        width: 120px !important;
      }
    }

    .demonstrationFloor {
      .el-input {
        width: 70%;
      }
    }

    .tab-title {
      width: 57%;
      height: 50px;
      line-height: 50px;

      span {
        color: red;
        font-size: 14px;
      }

      em {
        font-style: normal;
        font-size: 20px;
      }
    }
    .el-table__body .cell:hover{
      cursor: pointer;
    }
  }
</style>
