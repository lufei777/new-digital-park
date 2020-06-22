<template>
  <div class="history-video">
    <div class="mask-background"></div>
    <div class="dialog-wrapper">
      <div class="dialog">
        <div class="dialog-header">
          <span class="iconfont iconguanbi1"></span>
        </div>
        <div class="video-box">
          <div class="tabs-group">
            <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
              <el-radio-button label="1">实时监控</el-radio-button>
              <el-radio-button label="2">历史数据</el-radio-button>
            </el-radio-group>
          </div>
          <div v-show="tabPosition==2">
            <div id="divPlugin" class="plugin"></div>
            <!-- <el-input v-model="hkvInfo.ip" placeholder="ip"></el-input>
            <el-input v-model="hkvInfo.port" placeholder="port"></el-input>
            <el-input v-model="hkvInfo.username" placeholder="username"></el-input>
            <el-input v-model="hkvInfo.password" placeholder="password"></el-input>-->
            <el-button type="primary" :loading="loginLoading" @click="onLogin">登录</el-button>
            <el-button type="primary" :loading="startPlayLoading" @click="clickStartRealPlay">开始预览</el-button>
            <el-button type="primary" @click="clickStopRealPlay">停止预览</el-button>
            <el-button type="primary" @click="onLogout">退出</el-button>
            <label>数字通道列表:</label>
            <el-tag
              type="success"
              class="my-tag"
              v-for="(item,index) in hkvInfo.channels"
              :key="index"
            >{{item}}</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { WebVideoCtrl } from "../../../../static/fe-lib/webVideoCtrl";

export default {
  data() {
    return {
      dialogVisible: true,
      tabPosition: "2",
      hkvInfo: {
        ip: "192.168.1.43", //海康威视摄像头/硬盘录像机的ip地址
        port: "80", //海康威视摄像头/硬盘录像机的端口
        username: "admin", //海康威视摄像头/硬盘录像机的用户名
        password: "admin12345678", //海康威视摄像头/硬盘录像机的密码
        channels: [] //海康威视摄像头/硬盘录像机的通道
      },
      mySelectWnd: 0, //当前选中的窗口
      g_bPTZAuto: false,
      iProtocol: 1,
      loginLoading: false,
      startPlayLoading: false,
      iStreamType: 1,
      bZeroChannel: false,
      iRtspPort: 0
    };
  },
  created: function() {},
  computed: {
    videoData() {
      return this.$route.query;
    }
  },
  mounted: function() {
    // if(dialogVisible)
    if (this.tabPosition == 2) {
      // alert(222222)
      // this.videoInitPlugin();
    }
    console.log("videoData", this.videoData);
    this.videoInitPlugin();
    this.onLogin();
    // 初始化video界面
  },
  watch: {
    tabPosition(val) {
      console.log(val);
      if (val == 2) {
        // alert(1111)
        // this.videoInitPlugin();
      }
    }
  },
  destroyed: function() {
    this.clickStopRealPlay();
    this.onLogout();
  },
  methods: {
    onLogin() {
      var that = this;
      that.loginLoading = true;

      // 登录设备
      WebVideoCtrl.I_Login(
        that.hkvInfo.ip,
        that.iProtocol,
        that.hkvInfo.port,
        that.hkvInfo.username,
        that.hkvInfo.password,
        {
          async: false,
          success: function(xmlDoc) {
            // console.log('xmlDoc2', xmlDoc);//不能删除
            //TODO 获取通道信息
            that.getChannelInfo();
            that.getDevicePort(that.hkvInfo.ip + "_" + that.hkvInfo.port);

            var szDeviceIdentify = that.hkvInfo.ip + "_" + that.hkvInfo.port;

            var j =
              that.hkvInfo.channels.length > 4
                ? 4
                : that.hkvInfo.channels.length;
            for (var i = 0; i < j; i++) {
              setTimeout(
                that.startRealPlay(
                  szDeviceIdentify,
                  i,
                  that.hkvInfo.channels[i]
                ),
                500
              );
            }
            that.loginLoading = false;

            that.$message({
              showClose: true,
              message: "登录成功",
              type: "success"
            });
          },
          error: function() {
            that.loginLoading = false;
            that.$message({
              showClose: true,
              message: "登录失败",
              type: "error"
            });
          }
        }
      );
    },
    onLogout() {
      this.hkvInfo.channels = [];
      var szDeviceIdentify = this.hkvInfo.ip + "_" + this.hkvInfo.port;
      var iRet = WebVideoCtrl.I_Logout(szDeviceIdentify);
      if (0 == iRet) {
        this.$message({
          showClose: true,
          message: "退出成功",
          type: "success"
        });
      } else {
        this.$message({
          showClose: true,
          message: "退出失败",
          type: "error"
        });
      }
    },
    clickStartRealPlay() {
      // 开始预览
      var that = this;
      that.startPlayLoading = true;
      var szDeviceIdentify = that.hkvInfo.ip + "_" + that.hkvInfo.port;

      var j =
        that.hkvInfo.channels.length > 4 ? 4 : that.hkvInfo.channels.length;
      for (var i = 0; i < j; i++) {
        setTimeout(
          that.startRealPlay(szDeviceIdentify, i, that.hkvInfo.channels[i]),
          500
        );
      }
      that.startPlayLoading = false;
    },
    videoInitPlugin: function() {
      var iRet = WebVideoCtrl.I_CheckPluginInstall();
      if (iRet === -1) {
        alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装");
        return;
      }
      this.initPlugin();
    },
    initPlugin: function() {
      var that = this;

      WebVideoCtrl.I_InitPlugin(500, 300, {
        bWndFull: true, //是否支持单窗口双击全屏，默I_CheckPluginInstall
        iWndowType: 1,
        myCbSelWnd: function(xmlStr) {
          //自己新增的方法
          var jsonObj = that.$x2js.xml2js(xmlStr);
          that.mySelectWnd = jsonObj.RealPlayInfo.SelectWnd;
          var szInfo = "当前选择的窗口编号：" + that.mySelectWnd;
          console.log(szInfo);
        },
        cbInitPluginComplete: function() {
          WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
          // 检查插件是否最新
          if (WebVideoCtrl.I_CheckPluginVersion() === -1) {
            alert(
              "检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！"
            );
            return;
          }
        }
      });
    },
    getDevicePort: function(szDeviceIdentify) {
      var oPort = WebVideoCtrl.I_GetDevicePort(szDeviceIdentify);
      this.iRtspPort = oPort.iRtspPort;
    },
    startRealPlay: function(szDeviceIdentify, iWndIndex, iChannelID) {
      console.log(szDeviceIdentify);
      var that = this;

      // I_StartRealPlay
      WebVideoCtrl.I_StartPlayback(szDeviceIdentify, {
        // iRtspPort: that.iRtspPort,
        // iWndIndex: iWndIndex,
        // iStreamType: 1,
        // iChannelID: iChannelID,
        // bZeroChannel: that.bZeroChannel,
        iChannelID: 2,
        szStartTime: "2020-05-18 17:30:00",
        szEndTime: "2020-05-18 18:30:00",
        success: function() {
          that.$notify({
            title: "成功",
            message: "开始预览通道" + iChannelID + "成功",
            type: "success"
          });
        },
        error: function(status, xmlDoc2) {
          console.log(xmlDoc2); //不能删除
          that.$notify({
            title: "失败",
            message: "开始预览通道" + iChannelID + "失败",
            type: "error"
          });
          if (status === 403) {
            console.log("szInfo 设备不支持Websocket取流！");
          } else {
            console.log("开始预览失败 ", status, xmlDoc2);
          }
        }
      });
    },
    clickStopRealPlay: function() {
      var j =
        this.hkvInfo.channels.length > 4 ? 4 : this.hkvInfo.channels.length;
      for (var i = 0; i < j; i++) {
        setTimeout(this.stopRealPlay(i), 1000);
      }
    },
    stopRealPlay: function(iWndIndex) {
      var that = this;
      WebVideoCtrl.I_Stop({
        iWndIndex: iWndIndex,
        success: function() {
          that.$notify({
            title: "成功",
            message: "停止预览窗口" + iWndIndex + "成功",
            type: "success"
          });
        },
        error: function() {
          that.$notify({
            title: "失败",
            message: "停止预览窗口" + iWndIndex + "失败",
            type: "error"
          });
        }
      });
    },
    // 获取通道，实际上可以根据自己的项目，获取数字通道，模拟通道，零通道中的一个或多个，不用全部获取（提高效率）
    getChannelInfo: function() {
      var that = this;
      var szDeviceIdentify = this.hkvInfo.ip + "_" + this.hkvInfo.port;
      // debugger
      // 数字通道
      that.hkvInfo.channels = [];
      WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
        async: false,
        mysuccess: function(xmlStr) {
          console.log("mysuccess I_GetDigitalChannelInfo: ", xmlStr);

          var jsonObj = that.$x2js.xml2js(xmlStr);
          var list =
            jsonObj.InputProxyChannelStatusList.InputProxyChannelStatus;
          console.log(9999, list, 2222222, jsonObj);
          for (var x = 0; x < list.length; x++) {
            that.hkvInfo.channels.push(list[x].id);
            console.log(888888, list[x].id);
          }
        },
        success: function(xmlDoc) {},
        error: function(status, xmlDoc) {
          console.log("获取数字通道失败");
        }
      });
      // TODO 模拟通道
      // 模拟通道
      WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
        async: false,
        mysuccess: function(xmlStr) {
          var jsonObj = that.$x2js.xml2js(xmlStr);
          console.log("模拟通道mysuccess", xmlStr);
          // var list = jsonObj.VideoInputChannelList;
          // for (var x = 0; x < list.length; x++) {
          //   that.hkvInfo.channels.push(list[x].VideoInputChannel.id);
          // }
          var id = jsonObj.VideoInputChannelList.VideoInputChannel.id;
          that.hkvInfo.channels.push(id);
        },
        success: function(xmlStr) {
          console.log("模拟通道success", xmlStr);
        },
        error: function(status, xmlDoc) {
          console.log("模拟通道error", xmlDoc);
        }
      });
      // TODO 零通道
    },
    mouseDownPTZControl: function(iPTZIndex) {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd);

      if (oWndInfo !== null) {
        if (iPTZIndex === 9 && this.g_bPTZAuto) {
          iPTZSpeed = 0;
        } else {
          this.g_bPTZAuto = false;
        }

        WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
          iPTZSpeed: 4,
          mysuccess: function(xmlStr) {
            console.log("I_PTZControl", xmlStr);
            if (iPTZIndex === 9 && this.g_bPTZAuto) {
              console.log(
                oWndInfo.szDeviceIdentify + " 停止云台成功！mouseDown"
              );
            } else {
              console.log(
                oWndInfo.szDeviceIdentify + " 开启云台成功！mouseDown"
              );
            }
            if (iPTZIndex === 9) {
              this.g_bPTZAuto = !this.g_bPTZAuto;
            }
          },
          error: function(status, xmlDoc) {
            console.log(
              oWndInfo.szDeviceIdentify + " 开启云台失败！mouseDown",
              status,
              xmlDoc
            );
          }
        });
      }
    },
    mouseUpPTZControl: function() {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd);
      if (oWndInfo !== null) {
        WebVideoCtrl.I_PTZControl(1, true, {
          mysuccess: function(xmlStr) {
            console.log(
              oWndInfo.szDeviceIdentify + " 停止云台成功！mouseUp",
              xmlStr
            );
          },
          error: function(status, xmlDoc) {
            console.log(
              oWndInfo.szDeviceIdentify + " 停止云台失败！mouseUp",
              status,
              xmlDoc
            );
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
.history-video {
  .mask-background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
    z-index: 2001;
  }
  .dialog-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2006;
  }
  .dialog {
    position: relative;
    margin: 0 auto 50px;
    background: #373737;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 40%;
    margin-top: 15vh;
  }
  .dialog-header {
    padding: 15px;
    padding-bottom: 10px;
    // position: relative;
    height: 24px;
    .iconfont {
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 0;
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 16px;
      color: #fff;
    }
  }
  .video-box {
    padding: 30px 20px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
  }
  .tabs-group {
    margin: 0 auto;
    width: 200px;
  }
  .plugin {
    width: 500px;
    height: 300px;
  }

  .my-tag {
    margin-left: 3px;
  }

  .my-group-btn {
    margin-top: 5px;
  }
}
#canvas0,
.play-window {
  width: 600px;
  height: 300px;
  border: 1px solid red !important;
}
</style>