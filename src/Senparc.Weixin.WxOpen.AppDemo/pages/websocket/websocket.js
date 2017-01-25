var app = getApp()
var socketOpen = false;
Page({
  data: {
    messageTip: '',
    messageTextArr:[],
    userinfo:{}
  },
  //sendMessage
  formSubmit: function(e) {
    var that = this;
    var msg =  e.detail.value.messageContent;
    console.log('send message:' +msg );
     if (socketOpen) {
      wx.sendSocketMessage({
      data:msg
      })
    } else {
      that.setData({
        messageTip:'WebSocket 链接失败，请重新连接！'
      })
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

   //连接 Websocket
    wx.connectSocket({
      url: 'wss://sdk.weixin.senparc.com/api/WxWebSocket/App',
      header:{ 
        'content-type': 'application/json'
      },
      method:"GET"
    });

    wx.onSocketOpen(function(res) {
      console.log('WebSocket 连接成功！')
      socketOpen = true;
      that.setData({
        messageTip:'WebSocket 连接成功！'
      })
    })

    wx.onSocketClose(function(res) {
      console.log('WebSocket 已关闭！')
      socketOpen = false;
    })

    wx.onSocketError(function(res){
      console.log('WebSocket连接打开失败，请检查！')
        // console.log(res);
    })

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
