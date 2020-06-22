import energyProportionAnalysis from '../energy/energyProportionAnalysis'
import energyElectricityProportion from '../energy/energyElectricityProportion'
import operateIncome from '../income/operateIncome'
import buildingStatusProportion from '../statis/buildingStatusProportion'
import assetTypeProportion from '../asset/assetTypeProportion'
import energyConsumptionRanking from '../energy/energyConsumptionRanking'
import buildingEarlyWarningAlarm from '../alarm/buildingEarlyWarningAlarm'
import taskRanking from '../task/taskRanking'
import attendanceDetail from '../duty/attendanceDetail'
import taskPersonTask from '../task/taskPersonTask'
import escapeRoutes from '../alarm/escapeRoutes'
import saleStatistics from '../statis/saleStatistics'
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
import productList from '../largeScreen/productList'
import largeScreen from '../largeScreen/largeScreen'
import videoMonitoringStatus from '../buildMonitor/videoMonitoringStatus'
import doorMagnetic from '../fire/doorMagnetic'
import realTimeStatus from '../buildMonitor/realTimeStatus'
import elecSum from '../energy/elecSum'
import waterSum from '../energy/waterSum'
import environmentLine from '../buildMonitor/environmentLine'
import alarmListTable from '../alarm/alarmListTable'
import deviceStatusMonitor from '../statis/deviceStatusMonitor'
import videoMonitor from '../video/videoMonitor'
import roomEnvironmentLine from '../buildMonitor/roomEnvironmentLine'
import deviceTypeMonitor from '../security/deviceTypeMonitor'
import coldAndHeatSource from '../buildMonitor/coldAndHeatSource'
import alarmNewsStatus from '../alarm/alarmNewsStatus'
import norbulingkaCenter from '../norbulingka/norbulingkaCenter'
import passengerFlowVolume from '../norbulingka/passengerFlowVolume'
import realTimeOfMeteorologicalStation from '../norbulingka/realTimeOfMeteorologicalStation'
import CO2Monitoring from '../norbulingka/CO2Monitoring'
import dailyInspectionRecord from '../norbulingka/dailyInspectionRecord'
class exportComs {
  exportComsList = {
    energyProportionAnalysis,
    energyElectricityProportion,
    operateIncome,
    buildingStatusProportion,
    assetTypeProportion,
    energyConsumptionRanking,
    buildingEarlyWarningAlarm,
    taskRanking,
    attendanceDetail,
    taskPersonTask,
    escapeRoutes,
    saleStatistics,
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
    productList,
    largeScreen,
    videoMonitoringStatus,
    doorMagnetic,
    realTimeStatus,
    elecSum,
    waterSum,
    environmentLine,
    alarmListTable,
    deviceStatusMonitor,
    videoMonitor,
    roomEnvironmentLine,
    deviceTypeMonitor,
    coldAndHeatSource,
    alarmNewsStatus,
    norbulingkaCenter,
    passengerFlowVolume,
    realTimeOfMeteorologicalStation,
    CO2Monitoring,
    dailyInspectionRecord
  }
}
export default new exportComs()
