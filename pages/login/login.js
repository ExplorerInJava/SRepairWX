// pages/login/login.js
import WxValidate from '../../utils/WxValidate.js'
const app = getApp()

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    couldLogin:false,
    name : '',
    password : '',
    form: {
      name: '',
      password: ''
    }
  },


  //监听input输事件
  keyInput1(e) {
    var that = this;
    that.setData({
      name : e.detail.value
    })
    console.log(that.data.name)
    if (that.data.name != '' && that.data.name != null && that.data.password != '' && that.data.password != null) {
      that.setData({
        couldLogin:true
      })
    }
  },

  keyInput2(e) {
    var that = this;
    that.setData({
      password: e.detail.value
    })
    if (that.data.name != '' && that.data.name != null && that.data.password != '' && that.data.password != null) {
      that.setData({
        couldLogin: true
      })
    }
  },


  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
        digits: true,
        minlength: 8
      },
      password: {
        required: true,
        minlength: 6
      }
    }

    const messages = {
      name: {
        required: '请输入账号',
        minlength: '输入账号过短'
      },
      password: {
        required: '请填写密码',
        minlength: '密码过短'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //调用验证函数
  formSubmit: function (e) {
    var that = this
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    wx.request({
      url: `${app.globalData.domain}/user/login`,
      data: {
        account : e.detail.value.name,
        password : e.detail.value.password
      },
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.data == 'true') {
          console.log("This is admin!!!!!!!!!!!")
          wx.setStorageSync("isLogin", true)
          wx.setStorageSync("isAdmin", true)
          wx.switchTab({
            url: '../index/index',
          })
        } else if (res.data.status == '0') {
          wx.setStorageSync("isAdmin", false)
          wx.setStorageSync("isLogin", true)
          wx.setStorageSync("account", params.name)
          console.log("账户是：：：：：" + wx.getStorageSync("account"))
          wx.switchTab({
            url: '../index/index',
          })

        } else {
          that.showModal({
            msg: res.data.msg
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */


  jump(){
    wx.switchTab({
      url: '../index/index',
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showModal({
      title: 'Tips',
      content: '体验用户端须先注册，管理员的默认账号密码为：12341234',
    })
    this.initValidate()//验证规则函数
    if (wx.getStorageSync("isLogin")) {
      this.jump();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { 

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})