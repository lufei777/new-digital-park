<template>
  <div class="home-page">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>能耗总览</span>
    </div>
    <div class="overview-list flex-align-between">
      <div class="overview-item">
         <span>A3当年总用电量</span>
         <p class="num"><span>{{energyOverview.elecSum}}</span><i>kwh</i></p>
      </div>
      <div class="overview-item">
        <span>A3当年总用电量</span>
        <p class="num"><span>{{energyOverview.elecSum}}</span><i>kwh</i></p>
      </div>
      <div class="overview-item">
        <span>A3当年总用电量</span>
        <p class="num"><span>{{energyOverview.elecSum}}</span><i>kwh</i></p>
      </div>
      <div class="overview-item">
        <span>A3当年总用电量</span>
        <p class="num"><span>{{energyOverview.elecSum}}</span><i>kwh</i></p>
      </div>
      <div class="overview-item">
        <span>A3当年总用电量</span>
        <p class="num"><span>{{energyOverview.elecSum}}</span><i>kwh</i></p>
      </div>
      <div class="overview-item">
        <span>A3当年总用电量</span>
        <p class="num"><span>{{energyOverview.elecSum}}</span><i>kwh</i></p>
      </div>
      <div class="overview-item">
        <span>A3当年总用电量</span>
        <p class="num"><span>{{energyOverview.elecSum}}</span><i>kwh</i></p>
      </div>
      <div class="overview-item">
        <span>A3当年总用电量</span>
        <p class="num"><span>{{energyOverview.elecSum}}</span><i>kwh</i></p>
      </div>
    </div>
    <!--<div class="tagCard"></div>-->
    <!--<div class="tip">能耗同比环比图</div>-->
    <!--<div class="box">-->
      <!--<p class="barLineChartTitle">-->
        <!--2019与2018年度同比及2019环比柱状折线图分析-->
        <!--<label class="Energy_type">能源</label>-->
        <!--<select name="energytype" class="refresh2" id="energytype">-->
          <!--<option value="34" selected>电</option>-->
          <!--<option value="37">水</option>-->
          <!--<option value="38">热</option>-->
        <!--</select>-->
      <!--</p>-->

      <!--<div class="barLineChart"></div>-->

    <!--</div>-->
    <!--&lt;!&ndash; 留白 &ndash;&gt;-->
    <!--<div class="paddingBox">-->
      <!--<div class="paddingBoxLeft"></div>能耗分类分项占比图-->
    <!--</div>-->
    <!--&lt;!&ndash; 第三模块 &ndash;&gt;-->
    <!--<div class="pieCharts">-->
      <!--<div class="pieChart box"></div>-->
      <!--<div class="pieChart box"></div>-->
      <!--&lt;!&ndash; <div class="pieChart box"></div> &ndash;&gt;-->
    <!--</div>-->
    <!--&lt;!&ndash; 留白 &ndash;&gt;-->
    <!--<div class="paddingBox">-->
      <!--<div class="paddingBoxLeft"></div>能耗排名列表-->
    <!--</div>-->

    <!--&lt;!&ndash; 排名 &ndash;&gt;-->
    <!--<div class="tabulation box">-->
      <!--<div class="box_title">-->
        <!--2019年A3能耗排名展示(按综合能耗排名)-->
      <!--</div>-->
      <!--<el-table :data="tableData"  border @sort-change='sortTable'>-->
        <!--<el-table-column prop="xulie" label="排名" align="right"></el-table-column>-->
        <!--<el-table-column prop="floor" label="建筑楼层" align="right"></el-table-column>-->
        <!--<el-table-column prop="elecAndWaterSum" label="综合耗能" align="right" sortable="custom"></el-table-column>-->
        <!--<el-table-column prop="elecSum" label="总用电量" align="right" sortable="custom"></el-table-column>-->
        <!--<el-table-column prop="zmElec" label="照明用电" align="right" sortable="custom"></el-table-column>-->
        <!--<el-table-column prop="ktElec" label="空调用电" align="right" sortable="custom"></el-table-column>-->
        <!--<el-table-column prop="tsElec" label="特殊用电" align="right" sortable="custom"></el-table-column>-->
        <!--<el-table-column prop="zhElec" label="综合用电" align="right" sortable="custom"></el-table-column>-->
        <!--<el-table-column prop="dlElec" label="动力用电" align="right" sortable="custom"></el-table-column>-->
        <!--<el-table-column prop="waterSum" label="总用水量" align="right" sortable="custom"></el-table-column>-->
        <!--<el-table-column prop="shWater" label="生活用水" align="right" sortable="custom"></el-table-column>-->
        <!--<el-table-column prop="wsWater" label="生活污水" align="right" sortable="custom"></el-table-column>-->
        <!--<el-table-column prop="ktWater" label="空调用水" align="right" sortable="custom"></el-table-column>-->
        <!--<el-table-column prop="xfWater" label="消防用水" align="right" sortable="custom"></el-table-column>-->
        <!--<el-table-column prop="qtWater" label="其他用水" align="right" sortable="custom"></el-table-column>-->
      <!--</el-table>-->
      <!--&lt;!&ndash; :page-sizes="[100, 200, 300, 400]" &ndash;&gt;-->
      <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
                     <!--:current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">-->
      <!--</el-pagination>-->
    </div>
</template>

<script>
  import EnergyApi from '../../service/api/energyApi'
  export default {
    name: 'HomePage',
    components: {
    },
    data () {
      return {
        energyOverview:{}
      }
    },
    methods: {
      async getEnergyOverView(){
        this.energyOverview =  await EnergyApi.getEnergyOverView({
          redioType: 0,
          startTime: 2019,
          selectType: 1,
        })
      }
    },
    mounted(){
      this.getEnergyOverView()
    }
  }
</script>

<style lang="less">
  .home-page{
    margin-top: 85px;
    padding:0 20px;
    .tip{
      .icon {
        width: 4px;
        height: 16px;
        background: #4D7CFEFF;
        border-radius: 2px;
        margin-right: 10px;
      }
      span{
        font-size: 16px;
        color:#4D7CFEFF;
      }
    }
    .overview-list{
      flex-wrap: wrap;
    }
    .overview-item{
      width:24%;
      height: 100px;
      border-radius: 6px;
      color:@white;
      margin-bottom: 20px;
    }
    .overview-item:nth-child(1),.overview-item:nth-child(6){
      background:linear-gradient(120deg,rgba(234,111,233,1),rgba(141,100,248,1));
      box-shadow:0px 4px 12px 0px rgba(141,100,248,0.5) !important;
    }
    .overview-item:nth-child(2),.overview-item:nth-child(5){
      background:linear-gradient(120deg,rgba(95,176,255,1),rgba(106,136,254,1));
      box-shadow:0px 4px 12px 0px rgba(106,138,254,0.5) !important;
    }
    .overview-item:nth-child(3),.overview-item:nth-child(8){
      background:linear-gradient(120deg,rgba(255,133,96,1),rgba(255,113,152,1));
      box-shadow:0px 4px 12px 0px rgba(255,113,152,0.5) !important;
    }
    .overview-item:nth-child(4),.overview-item:nth-child(7){
      background:linear-gradient(120deg,rgba(57,206,192,1),rgba(19,159,209,1));
      box-shadow:0px 4px 12px 0px rgba(19,159,209,0.5) !important;
    }
  }
</style>
