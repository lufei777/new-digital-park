import DeviceAnalysis from '../../pages/commonProject/statisAnalysis/device'
import CorrelationAnalysis from '../../pages/commonProject/statisAnalysis/correlation'
import StatisCompare from '../../pages/commonProject/statisAnalysis/statisCompare'
import HistoryStatis from '../../pages/commonProject/statisAnalysis/historyStatis'
export default [{
  path:'/deviceAnalysis',
  name:'DeviceAnalysis',
  component:DeviceAnalysis
},{
  path:'/correlationAnalysis',
  name:'CorrelationAnalysis',
  component:CorrelationAnalysis
},{
  path:'/statisCompare',
  name:'StatisCompare',
  component:StatisCompare
},{
  path:'/historyStatis',
  name:'HistoryStatis',
  component:HistoryStatis
}]
