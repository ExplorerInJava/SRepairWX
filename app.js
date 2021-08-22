//app.js

App({
  onLaunch: function () {
    //判断有无网络
    let that = this;
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.noNetwork();
        }
      }
    });
    wx.onNetworkStatusChange(function (res) {

      if (res.isConnected) {
        that.globalData.isConnected = true
      } else {
        that.noNetwork();
      }
    });

    //判断登录是否过期
    var userInfo = wx.getStorageSync("userInfo")
    wx.checkSession({
      success() {
        if(userInfo == null) {
          wx.navigateTo({
            url: '/pages/auth/auth',
          })
        }
        console.log("尊敬的" + userInfo.nickName + ",欢迎登陆！")
      },
      fail() {
        wx.navigateTo({
          url: '/pages/auth/auth',
        })
      }
    })


    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    domain: "https://xiaohang456.top/SRepair/",//http://localhost:8080/SRepair //https://xiaohang456.top/SRepair
  },

  postData: function (url, data) {
    console.log(url)
    console.log(data)
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url:url,
        data: data,
        method: "GET",
        success: function (res) {
          resolve(res);
        },
        fail: function (res) {
          reject(res);
        },
      })
    });
  },

  jsonConcat(jsona, jsonb) {
    let stra = JSON.stringify(jsona);
    let strb = JSON.stringify(jsonb);
    stra = stra.concat(strb);
    let list = stra.split("{");
    stra = list[1].split("}")[0];
    strb = list[2].split("}")[0];
    let resultStr = '{' + stra + ',' + strb + "}"
    let result = JSON.parse(resultStr);
    return result;
  },

  jsonPush(json, key, value) {
    var jsonStr = "{\"" + String(key) + "\" : \"" + String(value) + "\"}";
    return this.jsonConcat(json, JSON.parse(jsonStr)); 
  },
})