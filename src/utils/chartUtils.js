class chartUtils {
  //柱状图处理
  handleBarChart(dom,data){
      let yAxis
      if(!data.showSecondY){  //是否隐藏第二个y轴，默认不传及隐藏
        yAxis=[{
          type: 'value',
          name: data.yAxis,
        }]
      }else{
        yAxis=[{
          type: 'value',
          name: data.yAxis,
        },{
          type:'value',
          name:'zzz',
          min:-100,
          max:100,
        }]
      }
    let option = {
      title: {
        text: data.titleText
      },
      legend: {
        data: data.legendData
      },
      tooltip:{
        trigger: 'axis'
      },
      calculable: true,
      color:['#4094ff','#013b4e','#FAAD14','#F5222D'],
      xAxis: [{
        type: 'category',
        data: data.xAxis
      }],
      yAxis: yAxis,
      series: data.series
    };
    // window.onresize = dom.resize;
    window.addEventListener("resize", () => {
      dom.resize();
    })
    dom.setOption(option, true)
  }

  //空心饼图
  hollowPieChart(dom, data) {
    let option = {
      title: {
        text: data.titleText,
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
        name:data.seriesName?data.seriesName:'',
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
              fontSize: '20',
              fontWeight: 'bold'
            }
          }
        },
        data: data.seriesData
      }]
    };
    // window.onresize = dom.resize;
    window.addEventListener("resize", () => {
      dom.resize();
    })
    dom.setOption(option, true)
  }

  //实心饼图
  handlePieChart(dom,data){
    let option = {
      title : {
        text: data.titleText,
        x:'left'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: data.legend,
        top:50,
        data: data.legendData,
        textStyle:{
          color:data.textStyleColor?data.textStyleColor:''
        }
      },
      color: data.color?data.color:['#4DA1FF', '#83D587', '#FFCE33', '#FF7B8C'],
      series : [
        {
          name: data.seriesName?data.seriesName:'',
          type: 'pie',
          radius : '50%',
          center: ['50%', '60%'],
          data:data.series,
        }
      ]
    };
    // window.onresize = dom.resize;
    window.addEventListener("resize", () => {
      dom.resize();
    })
    dom.setOption(option, true)

  }
}
export default new chartUtils()
