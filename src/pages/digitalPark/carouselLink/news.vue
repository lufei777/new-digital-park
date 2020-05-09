<template>
  <div class="banner-news">
    <div class="nav-style">
      <NavOperator :showGoBack="true" class="nav-operator" />
    </div>
    <div class="news-content">
      <div class="content-title">
        <div>中钢集团召开安全生产工作视频会议</div>
        <span>发布时间：2020年04月21日</span>
      </div>
      <div class="content">
        <p>4月17日，中钢集团召开了安全生产工作视频会议。集团董事长、党委书记徐思伟讲话，集团总经理、党委副书记、安委会主任刘安栋主持会议，集团公司领导,集团安委会成员、子集团分管领导及相关人员在主会场或视频参会。所属企业领导、安委会成员和相关管理人员，在分会场以视频或电话方式参会。来自集团30家企业的400余人参加会议。</p>
        <p>刘安栋在传达学习习近平总书记近期对安全生产作出的一系列重要指示和李克强总理的重要批示后，对各单位贯彻落实全国安全生产电视电话会议和中央企业安全生产工作视频会议精神提出要求。刘安栋强调，各单位要认真落实好本次会议精神，进一步加强安全生产风险防范，加强隐患排查治理，全面推动开展好安全生产专项整治三年行动计划，着力推动集团安全生产形势稳中向好，扎实推进生产经营各项工作，坚决打赢疫情防控阻击战，为集团高质量发展营造良好的安全生产环境。</p>
        <p>徐思伟在讲话中指出，各单位要坚决贯彻党中央、国务院和国资委关于安全生产的战略部署和要求，全面推动开展安全生产专项整治三年行动的部署和落实。徐思伟强调，为切实抓好当前的安全风险防控工作，一是要深入学习贯彻习近平总书记重要指示精神，切实扛起防范化解安全风险的政治责任；二是要加强组织领导，突出整治重点，健全长效机制，全面开展安全生产专项整治三年行动；三是要高度重视复工复产期间的疫情防控和安全生产，严格做到两手抓两手硬。当前还要立足防大汛、抗大洪，认真做好汛前防洪度汛设施检查和防汛物资、人员准备工作，完善汛情监测预警机制，力求夺取防洪防汛工作的全面胜利。</p>
        <p>会议强调，当前，我国疫情防控阶段性成效进一步巩固，但国际疫情持续蔓延，防范疫情输入压力不断加大。各单位要坚持底线思维，坚持外防输入、内防反弹总体防控策略，毫不放松抓好疫情防控工作，坚决守住不发生聚集性感染事件的底线。</p>
         <img class="news-img" src="../../../../static/image/digitalPark/news2.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script>
import NavOperator from "@/pages/digitalPark/coms/navOperator";
export default {
  name: "News",
  components: {
    NavOperator
  },
  data() {
    return {};
  }
};
</script>

<style lang="less">
.banner-news {
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
  .news-content {
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
        font-size: 16px;
        line-height: 46px;
      }
    }
  }
  .content {
    line-height: 30px;
    // text-indent: 2%;
    .news-img {
        // width: 50%;
        // height: 50%;
        // margin: 0 auto;
        margin-left: 23%;
    }
  }
}
</style>
