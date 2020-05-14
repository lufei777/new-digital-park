import DigitalParkApi from "../../service/api/digitalPark";
import { ProjectName } from "../dictionary";
const { ZG } = ProjectName;
// async function getMenu(){
//   let menu =await DigitalParkApi.getMenu()
//   return menu
// }
let obj = {
  homeHeader: {
    news: "消息",
    skin: "换肤",
    searchText: "搜索",
    title: "数字园区",
    waterfall: "瀑布流",
    dashboard: "仪表盘",
    setup: "设置",
    moduleConfig: "模块设置",
    personalCenter: "个人信息",
    changePassword: "修改密码",
    signOut: "退出"
  },
  proEntry: "功能模块入口",
  more: "更多",
  fold: "收起",
  [ZG]: {
    el: {
      datepicker: {
        now: "此刻",
        today: "今天",
        cancel: "取消",
        clear: "清空",
        confirm: "确定",
        selectDate: "选择日期",
        selectTime: "选择时间",
        startDate: "开始日期",
        startTime: "开始时间",
        endDate: "结束日期",
        endTime: "结束时间",
        prevYear: "前一年",
        nextYear: "后一年",
        prevMonth: "上个月",
        nextMonth: "下个月",
        year: "年",
        month1: "1 月",
        month2: "2 月",
        month3: "3 月",
        month4: "4 月",
        month5: "5 月",
        month6: "6 月",
        month7: "7 月",
        month8: "8 月",
        month9: "9 月",
        month10: "10 月",
        month11: "11 月",
        month12: "12 月",
        // week: '周次',
        weeks: {
          sun: "日",
          mon: "一",
          tue: "二",
          wed: "三",
          thu: "四",
          fri: "五",
          sat: "六"
        },
        months: {
          jan: "1月",
          feb: "2月",
          mar: "3月",
          apr: "4月",
          may: "5月",
          jun: "6月",
          jul: "7月",
          aug: "8月",
          sep: "9月",
          oct: "10月",
          nov: "11月",
          dec: "12月"
        }
      }
    }
  }
};

export default obj;
