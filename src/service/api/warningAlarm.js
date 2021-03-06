import {get,post,url,} from '../axios/ApiDecorator'
// 预警报警的接口
export default new class {
    // 查询报警事件列表
    // 查询报警信息

    /**参数：
     * page int 页码  
     * rows int 条数
     * http://192.168.1.50:9001/#/digitalPark/homePage
     * 
     * 
    */
    @url('/vibe-web/alarm/queryAlarmMessages')
    @post
    queryAlarmMessages(){  }


    // 报警规则列表 
    @url('/vibe-web/alarm/queryAlarmRules')
    @post
    queryAlarmRules(){ }

    // 设备类型筛选的接口 参数{catalogId/init}
    @url('/vibe-web/getItemsTree')
    @get
    getItemsTree() { }

    // 报警级别查询接口   参数：rankId int 级别id （可传可不传
    @url('/vibe-web/alarm/eventRanks')
    @get
    geteventRanks(){  }

    //监控报警 删除和批量删除  /alarm/updataAssetEventRank
    @url('/vibe-web/alarm/deleteEventRank')
    @post
    deleteEventRank() { }

    // 监控报警规则 ==》 批量编辑
    @url('/vibe-web/alarm/updateAssetEventRank')
    @get
    updateAssetEventRank() { }


}