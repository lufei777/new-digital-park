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
          <el-option label="国家标准" value="2"></el-option>
        </el-select>
      </div>
      <div class="item-group block demonstrationFloor">
        <label>楼层检索：</label>
        <el-input v-model="curEnergy" @focus="onShowModal"></el-input>
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
      <Table :ref="tableConfig.ref" :tableConfig="tableConfig" ></Table>
      <TreeModal :tree-modal-config="treeModalConfig"/>
    </div>
  </div>
</template>

<script>
import CommonApi from "../../../service/api/commonApi";
import EnergyApi from "../../../service/api/energyApi";
import Table from "../../../components/Table/index";
import TreeModal from '../../../components/treeModal/index'
import moment from "moment";
let activeNav;
export default {
  name: "EnergySavingSelect",
  components: {
    Table,
    TreeModal
  },
  props: ["energySaveFlag"],
  data() {
    let _this = this;
    return {
      curEnergy: "", //楼层检索
      curEnergyId:"0",
      energyA3Text:'',
      energyA3: "1", //建筑群
      energySubentry: "", //能源分项
      indexEnergy: "1", //指标选择
      energySubentryData: [],
      floorSelectData: "",
      startTime: moment(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000*10)).format("YYYY-MM"),
      page: 1,
      tableData: {
        total: 0
      },
      currentPage: 1,
      tableConfig: {
        ref: "tableRef",
        data: [],
        columnConfig: [],
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
          sortChange: _this.sortTable
        }
      },
      treeModalConfig:{
          treeList:[],
          treeConfig:{
             treeProps:{
              label:"floor",
              children:'nodes'
            },
            defaultExpandedkeys:[],
          },
          showModal:false,
          onClickSureBtnCallback:this.onClickModalSureBtn,
          onClickCancelBtnCallback:this.onClickModalCancelBtn
        }
    };
  },
  computed: {
    tabTitle() {
      activeNav =
        Cookies.get("activeNav") && JSON.parse(Cookies.get("activeNav"));
      let tmp = this.energySubentryData.find(item => {
        return item.id == this.energySubentry;
      });
      if (this.energySaveFlag == 1) {
        return `${this.startTime}逐日全天${tmp && tmp.name}统计`;
      } else {
        return `${this.startTime}逐日夜间${tmp && tmp.name}统计`;
      }
    },
    commonParams() {
      return {
        moment: this.startTime,
        lou: this.energyA3,
        standard: this.indexEnergy,
        type: this.energySubentry,
        parent: this.curEnergyId,
        page: this.page,
        size: 10
      };
    }
  },
  methods: {
    onTimeChange() {},
    async getEnergyList() {
      let res = await CommonApi.getEnergyListByGroup();
      if (this.energySaveFlag == 3 || this.energySaveFlag == 4) {
        this.energySubentryData = res[1].energyType;
        this.energySubentry = res[1].energyType[0].id;
      } else if (this.energySaveFlag == 1 || this.energySaveFlag == 2) {
        this.energySubentryData = res[0].energyType;
        this.energySubentry = res[0].energyType[0].id;
      }
    },
    async getAllFloorOfA3() {
      this.treeModalConfig.treeList = await CommonApi.getAllFloorOfA3()
      this.curEnergyId = this.treeModalConfig.treeList[0].floorId
      this.energyA3Text = this.treeModalConfig.treeList[0].floor
      this.curEnergy = this.treeModalConfig.treeList[0].floor
      this.treeModalConfig.treeConfig.defaultExpandedkeys=[this.treeModalConfig.treeList[0].floorId]
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
        let columnConfig=[]
          for(let key in tmp[0]){
               columnConfig.push({
                 label:key,
                 prop:key,
                 width:120,
                 formatter:function(row,column){
                   if (row[column.property] > parseFloat(row.参考指标)) {
                     return `<span class="styleRed">${row[column.property]}</span>`;
                   } else {
                     return `<span>${ row[column.property] ? row[column.property] : "--"}</span>`;
                   }
                  },
               })
          }
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
      if (this.energySaveFlag == 1 || this.energySaveFlag == 3) {
        url = `/vibe-web/energyCount/energy/elec/export?`;
      } else if (this.energySaveFlag == 2 || this.energySaveFlag == 4) {
        url = `/vibe-web/energyCount/energy/night/export?`;
      }
      let params = "";
      for (let key in this.commonParams) {
        params += key + "=" + this.commonParams[key] + "&";
      }
      location.href = url + params;
    },
    onShowModal(){
        this.treeModalConfig.showModal=true
      },
       onClickModalSureBtn(val){
        this.curEnergyId = val.floorId
        this.curEnergy = val.floor
        this.treeModalConfig.showModal=false
      },
      onClickModalCancelBtn(){
        this.treeModalConfig.showModal=false
      },
    handleCurrentChange(value) {
      this.page = value;
      this.getList();
    }
  },
  async mounted() {
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
}
</style>
