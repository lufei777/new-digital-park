<template>
  <div class="v-charts">
    <component
      ref="myCharts"
      width="100%"
      height="100%"
      :is="componentId"
      :data="chartData"
      :settings="chartConfig['settings']"
      :extend="chartConfig['extend']"
      :events="chartConfig['events']"
      :grid="chartConfig['grid']"
      :title="chartConfig['title']"
      :legend-visible="chartConfig['legendVisible']"
      :tooltip-visible="chartConfig['tooltipVisible']"
      :init-options="chartConfig['initOptions']"
      :legend="chartConfig['legend']"
      :yAxis="chartConfig['yAxis']"
      :xAxis="chartConfig['xAxis']"
      :theme-name="chartConfig['themeName']"
      :theme="chartConfig['theme']"
      :set-option-opts="chartConfig['setOptionOpts']"
      :log="chartConfig['log']"
      :style="{'display':'inline-block'}"
      :loading="loading"
      :data-empty="dataEmpty"
    ></component>
  </div>
</template>
<script>
const EMPTY_DATA = {
  columns: [],
  rows: []
};

export default {
  props: {
    chartConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartData: {},
      chartWidth: "",
      loading: false,
      dataEmpty: false
    };
  },
  mounted() {
    this._chartInit();
  },
  methods: {
    _chartInit() {
      // 服务器模式
      if (this._isServerMode()) {
        this._getServerData();
      } else {
        this.chartData = this.chartConfig.chartData;
      }
    },
    _isServerMode() {
      let chartData = this.chartConfig.chartData;
      return (
        chartData.serverMode &&
        (typeof CharacterData.rows === "undefined" ||
          chartData.rows.length === 0)
      );
    },
    _getServerData() {
      this.loading = true;

      let serverMode = this.chartConfig.chartData.serverMode;
      let url = serverMode.url;
      let dataSrc = serverMode.dataSrc;

      if (url instanceof Function) {
        //如果使用方法来进行分页请求
        url(serverMode.data)
          .then(res => {
            var data = res[dataSrc];
            if (data.length) {
              this._setchartData({
                rows: data
              });
            } else {
              this._setchartData(EMPTY_DATA);
            }
            //加载中结束
            this.loading = false;
          })
          .catch(err => {
            //加载中结束
            this.loading = false;
            this.dataEmpty = true;
            throw err;
          });
      } else {
        //ajax请求type和url
        let type = serverMode.type.toLowerCase();

        this.$axios[type](url, serverMode.data)
          .then(res => {
            var data = res.data[dataSrc];
            if (data.length) {
              this._setchartData({
                rows: data
              });
            } else {
              this._setchartData(EMPTY_DATA);
            }
            //加载中结束
            this.loading = false;
          })
          .catch(err => {
            //加载中结束
            this.loading = false;
            this.dataEmpty = true;
            throw err;
          });
      }
    },
    _afterConfig(options) {
      console.log(options);
      return options;
    },
    _setchartData({ columns, rows }) {
      this.chartData = {
        columns: columns || this.chartConfig.chartData.columns,
        rows
      };
    },
    refreshByData(data) {
      if (data instanceof Array) {
        this._setchartData({ rows: data });
      }
    }
  },
  computed: {
    componentId() {
      return "ve-" + this.chartConfig.type;
    }
  },
  watch: {
    chartData(newvalue, oldvalue) {
      if (!(newvalue.rows instanceof Array) || newvalue.rows.length === 0) {
        this.dataEmpty = true;
      } else {
        this.dataEmpty = false;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.v-charts {
  width: 100%;
  height: 100%;
}
</style>
