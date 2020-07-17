<template>
  <div class="monitor-choose">
    <div class="flex-align choose-box">
      <span class="choose-tip">时间</span>
      <div class="block" v-if="showDateType">
        <span class="demonstration">条件选择</span>
        <el-select v-model="filterType" placeholder="请选择" @change="handleDateTypeChange">
          <el-option v-for="item in dateTypeList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="demonstration">开始时间:</span>
        <el-date-picker
          v-model="startTime"
          :type="showDateType?pickerType:dateTime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">结束时间:</span>
        <el-date-picker
          v-model="endTime"
          :type="showDateType?pickerType:dateTime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :clearable="false"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="flex-align choose-box">
      <span class="choose-tip">监测器选择</span>
      <div class="block flex-align">
        <span>{{monitorText1}}</span>
        <el-button @click="onClickShowBtn(1)" type="primary">请选择</el-button>
      </div>
      <div class="block flex-align" v-if="showTwoMonitor">
        <span>{{monitorText2}}</span>
        <el-button @click="onClickShowBtn(2)" type="primary">请选择</el-button>
      </div>
    </div>
    <el-button type="primary" class='handle-btn' @click="onClickHandleBtn">处理</el-button>
    <TreeModal :tree-modal-config="treeModalConfig"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import moment from 'moment'
  import CommonApi from '@/service/api/common'
  import TreeModal from '@/components/treeModal/index'

  export default {
    name: 'DeviceAnalysis',
    components: {
      TreeModal
    },
    props: ['showDateType', 'showTwoMonitor', 'onClickHandleBtnCallback'],
    data() {
      return {
        startTime: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
        endTime: new Date(),
        dateTypeList: [{
          name: '年',
          id: 4
        }, {
          name: '月',
          id: 3
        }, {
          name: '日',
          id: 2
        }],
        filterType: 2,
        pickerType: 'date', //变化的 年、年月、年月日
        dateTime: 'datetime', //年月日时分秒
        treeModalConfig: {
          treeList: [],
          treeConfig: {
            treeProps: {
              label: "text",
              children: "children"
            },
            defaultExpandedkeys: []
          },
          showModal: false,
          modalTip: "监测器选择",
          onClickSureBtnCallback: this.onClickTreeModalSureBtn,
          onClickCancelBtnCallback: this.hideTreeModal
        },
        monitor1: {},
        monitor2: {},
        selectFlag: 1,
        valueFormat:'yyyy-MM-dd HH:mm:ss'
      }
    },
    computed: {
      ...mapState({}),
      monitorText1() {
        return this.monitor1.text
      },
      monitorText2() {
        return this.monitor2.text
      },
    },
    watch: {},
    methods: {
      async getMonitorTree() {
        let res = await CommonApi.getMonitorTree({
          flag: "total",
          moduleId:JSON.parse(localStorage.moduleInfo).id
        });
        this.treeModalConfig.treeList = res;
        this.treeModalConfig.treeConfig.defaultExpandedkeys = [res[0].id]
      },
      onClickShowBtn(flag) {
        this.selectFlag = flag
        this.treeModalConfig.showModal = true
      },
      handleDateTypeChange(value) {
        this.pickerType = value == 4 ? 'year' : value == 3 ? "month" : 'date'
      },
      onClickTreeModalSureBtn(val) {
        if(val.children!=null){
          this.$message({
            type:'warning',
            message:'请选择下级监测器'
          })
          return ;
        }
        if (this.selectFlag == 1) {
          this.monitor1 = val
        } else {
          this.monitor2 = val
        }
        this.treeModalConfig.showModal = false
      },
      hideTreeModal() {
        this.treeModalConfig.showModal = false
      },
      onClickHandleBtn() {
        let format
        format = this.filterType== 4 ? 'YYYY' :  this.filterType == 3 ? 'YYYY-MM' : 'YYYY-MM-DD'
        if(!this.showDateType){
          format = 'YYYY-MM-DD HH:mm:ss'
        }
        let params = {
          startTime: moment(this.startTime).format(format),
          lastTime: moment(this.endTime).format(format),
          monitorId1: this.monitor1.id,
          monitorId2: this.monitor2.id,
          filterType: this.filterType,
          monitor1: this.monitor1,
          monitor2: this.monitor2,
          monitorId: this.monitor1.id,

        }
        this.onClickHandleBtnCallback && this.onClickHandleBtnCallback(params)
      },
      async setDefaultNode() {
        let res = await CommonApi.getDefaultNode({
           moduleId:JSON.parse(localStorage.moduleInfo).id
        })
        this.monitor1 = {id: res.monitorIds[0], text: res.captions[0]}
        this.monitor2 = {id: res.monitorIds[1], text: res.captions[1]}
      },
    },
    async mounted() {
      await this.setDefaultNode()
      this.onClickHandleBtn()
      this.getMonitorTree();
    }
  }
</script>

<style lang="less">
  .monitor-choose {
    .choose-box {
      padding: 20px 0;
      border-bottom: 1px solid #eaeaea;
    }

    .block {
      margin: 0 40px;
    }

    .choose-tip {
      margin-left: 100px;
      width: 80px;
      text-align: right;
    }

    .el-button {
      margin: 0 10px;
    }
    .handle-btn{
      margin:10px 0 10px 0;
      float: right;
    }
  }
</style>
