class chartUtils {
  //柱状图处理
  handleBarChart(dom, data) {
    let option = {
      title: {
        text: data.titleText
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: data.legendData
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        data: data.xAxis
      }],
      yAxis: [{
        type: 'value',
        name: data.yAxis,
      }],
      series: data.series
    };
    window.onresize = dom.resize;
    dom.setOption(option, true)
  }

  PieChart(dom, data) {
    let option = {
      title: {
        text: data.series.name,
        left: '4%',
        padding: [24, 0],
        textStyle: {
          color: '#666666FF',
          fontWeight:'500',
          align: 'top'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        data: data.legendData
      },
      color: ['#4DA1FF', '#83D587', '#FFCE33', '#FF7B8C'],
      series: [{
        name: data.series.name,
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        data: data.series.data
      }]
    };
    window.onresize = dom.resize;
    dom.setOption(option, true)
  }
}
export default new chartUtils()
