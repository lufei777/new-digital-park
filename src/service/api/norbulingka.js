// 罗布林卡二期项目接口
import {post, get ,url ,del} from '../axios/ApiDecorator'

export default new class{
    // 遗产要素=========================================================================================


    // 项目工程=========================================================================================

    // 日常巡查=========================================================================================

    // 实测录入=========================================================================================
    
    // 汇总信息的分页方法
    @url('/norb-service/measuredInput/queryUnionPollingByPage')
    @get
    queryUnionPollingByPage(){ }

    // 本体情况
    @url('/norb-service/measuredInput/queryBuildingByPage')
    @get
    queryBuildingByPage() { }

    // 病害分析
    @url('/norb-service/measuredInput/queryDamageByPage')
    @get
    queryDamageByPage() { }
    // 施工情况
    @url('/norb-service/measuredInput/queryImplimentationByPage')
    @get
    queryImplimentationByPage() { }

    // 考古发掘 
    @url('/norb-service/measuredInput/blurQueryArchaeology')
    @get
    blurQueryArchaeology(){  }

    //游客情况
    @url('/norb-service/measuredInput/queryTouristByPage')
    @get
    queryTouristByPage() { }

    // 其他 
    @url('/norb-service/measuredInput/queryOthersByPage')
    @get
    queryOthersByPage() { }
    
    // 检测报告=========================================================================================


}