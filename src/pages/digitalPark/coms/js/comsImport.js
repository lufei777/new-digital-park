import energyProportionAnalysis from '../energy/energyProportionAnalysis'
import energyElectricityProportion from '../energy/energyElectricityProportion'
import operateIncome from '../income/operateIncome'
import buildingStatusProportion from '../statis/buildingStatusProportion'
import assetTypeProportion from '../asset/assetTypeProportion'
import energyConsumptionRanking from '../energy/energyConsumptionRanking'
import buildingEarlyWarningAlarm from '../alarm/buildingEarlyWarningAlarm'
import operateExpenditure from '../income/operateExpenditure'
import assetGrowthStatistics from '../asset/assetGrowthStatistics'
import taskRanking from '../task/taskRanking'
import attendanceDetail from '../duty/attendanceDetail'
import taskPersonTask from '../task/taskPersonTask'
import TestModuleOne from '../energy/TestModuleOne'
import TestModuleTwo from '../parking/TestModuleTwo'
import TestModuleThree from '../energy/TestModuleThree'
import emergencies from '../alarm/emergencies'
import escapeRoutes from '../alarm/escapeRoutes'
import saleStatistics from '../statis/saleStatistics'
import inventoryAnalysis from '../stock/inventoryAnalysis'
import messageRelease from '../message/messageRelease'
import environmentalMonitoring from '../buildMonitor/environmentalMonitoring'
import waterSupplyAndDrainage from '../buildMonitor/waterSupplyAndDrainage'
import hvac from '../buildMonitor/hvac'
import elevatorMonitoring from '../buildMonitor/elevatorMonitoring'
import accessControl from '../security/accessControl'
import intrusionAlarm from '../security/intrusionAlarm'
import videoMonitoring from '../security/videoMonitoring'
import inspection from '../security/inspection'
import healthDegree from '../fire/healthDegree'
import gangedLog from '../fire/gangedLog'
import deviceTypeAlarmProportion from '../fire/deviceTypeAlarmProportion'
import alarmNews from '../alarm/alarmNews'
import UPSMonitoring from '../computerRoomRing/UPSMonitoring'
import airConditioner from '../computerRoomRing/airConditioner'
import electricTransformerAndDistribution from '../computerRoomRing/electricTransformerAndDistribution'
import productList from '../common/productList'
class exportComs {
  exportComsList = {
    energyProportionAnalysis,
    energyElectricityProportion,
    operateIncome,
    buildingStatusProportion,
    assetTypeProportion,
    energyConsumptionRanking,
    buildingEarlyWarningAlarm,
    operateExpenditure,
    assetGrowthStatistics,
    taskRanking,
    attendanceDetail,
    taskPersonTask,
    TestModuleOne,
    TestModuleTwo,
    TestModuleThree,
    emergencies,
    escapeRoutes,
    saleStatistics,
    inventoryAnalysis,
    messageRelease,
    environmentalMonitoring,
    waterSupplyAndDrainage,
    hvac,
    elevatorMonitoring,
    videoMonitoring,
    accessControl,
    intrusionAlarm,
    inspection,
    healthDegree,
    gangedLog,
    deviceTypeAlarmProportion,
    alarmNews,
    UPSMonitoring,
    airConditioner,
    electricTransformerAndDistribution,
    productList
  }
}
export default new exportComs()