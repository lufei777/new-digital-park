import { get, post, url } from '../axios/ApiDecorator'

export default new class {
  /**
   * 停车管理
   * 对接其他系统，只有查看
   */

  /**
   * 停车场场区信息
   * send     { pageNum:Number,pageSize:Number,parkName:String }
   * back     {pageNum,pageSize,total,pages,list:Array}
   */
  @url('/oaApi/car/getParkingLot')
  @get
  getParkingLot() { }

  /**
   * 停车场收费信息
   * send     { pageNum:Number,pageSize:Number,carNum:Number,carInTime:String,carOutTime:String}
   * back     {pageNum,pageSize,total,pages,list:Array}
   */
  @url('/oaApi/car/getCarCharge')
  @get
  getCarCharge() { }

  /**
   * 过车记录
   * send     { pageNum:Number,pageSize:Number,carNum:Number,parkName:String}
   * back     {pageNum,pageSize,total,pages,list:Array}
   */
  @url('/oaApi/car/getCarPass')
  @get
  getCarPass() { }

  /**
   * 出入记录
   * send     { pageNum:Number,pageSize:Number,carNum:Number}
   * back     {pageNum,pageSize,total,pages,list:Array}
   */
  @url('/oaApi/car/getCarEntryExit')
  @get
  getCarEntryExit() { }

  /**
   * 车位停车记录
   * send     { pageNum:Number,pageSize:Number,carNum:Number}
   * back     {pageNum,pageSize,total,pages,list:Array}
   */
  @url('/vibe-web/timeloit/carList')
  @get
  getCarPlaceList() { }
}