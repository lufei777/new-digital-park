<template>
  <div class="announcement">
    <div class="nav-style">
      <NavOperator :showGoback="true" class="nav-operator" />
    </div>
    <div class="announcement-content">
      <div class="content-title">
        <div>中钢集团信访工作人员联系方式</div>
        <span>发布时间：2019年12月10日</span>
      </div>
      <div class="content">
        <p>为做好清理拖欠民营企业账款问题线索的收集、反馈及督办等工作，现将中国中钢集团有限公司（以下简称中钢集团）信访工作联系人办公信息予以公布。</p>
        <p>1. 联系方式：</p>
        <p>联 系 人：韩莹</p>
        <p>办公电话：010-62689896</p>
        <p>办公时间：上午9:00—下午5:00</p>
        <p>电子邮箱：hany@sinosteel.com</p>
        <p>通讯地址：北京市海淀区海淀大街8号</p>
        <p>邮政编码：100080</p>
        <p>2. 针对拖欠民营企业账款有关问题线索，可向中钢集团办公室反映。以单位名义反映的应加盖公章，以个人名义反映的要署本人真实姓名及联系电话。</p>
        <p>3. 反映情况要坚持实事求是的原则。</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavOperator from "@/pages/digitalPark/coms/navOperator";
export default {
  name: "Announcement",
  components: {
    NavOperator
  },
  data() {
    return {};
  }
};
</script>

<style lang="less">
.announcement {
  width: 100%;
  height: 100%;
  background: #fff;
  .nav-style {
    padding: 0 20px;
    height: 70px;
    background-color: #fff;
    position: fixed;
    box-sizing: border-box;
    z-index: 99;
    overflow: hidden;
    left: 0px;
    right: 0;
    top: 0;
    .nav-operator {
      float: right;
      line-height: 70px;
    }
  }
  .announcement-content {
    width: 67%;
    margin: 70px auto 0 auto;
    // margin-top: 70px;
    .content-title {
      height: 75px;
      text-align: center;
      border-bottom: 1px solid #666666;
      color: #333333;
      font-size: 12px;
      div {
        font-weight: 600;
        font-size: 16px;
        line-height: 46px;
      }
    }
  }
  .content {
    line-height: 30px;
  }
}
</style>
