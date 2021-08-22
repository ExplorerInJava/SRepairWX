// pages/login/login.js
import WxValidate from '../../utils/WxValidate.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    couldLogin: false,
    name: '',
    password: '',
    form: {
      name: '',
      password: ''
    }
  },


  //监听input输事件
  keyInput1(e) {
    var that = this;
    that.setData({
      name: e.detail.value
    })
    console.log(that.data.name)
    if (that.data.name != '' && that.data.name != null && that.data.password != '' && that.data.password != null) {
      that.setData({
        couldLogin: true
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

  onLoad: function () {
    this.initValidate() //验证规则函数
    if (wx.getStorageSync("userInfo") == null || wx.getStorageSync("userInfo") == "") {
      wx.navigateTo({
        url: '../auth/auth',
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
        minlength: 6,
        maxlength: 8
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 8
      }
    }

    const messages = {
      name: {
        required: '请填写密码',
        minlength: '密码长度过短',
        maxlength: '密码长度超过最大长度限制'
      },
      password: {
        required: '请填写确认密码',
        minlength: '确认密码长度过短',
        maxlength: '确认密码长度超过最大长度限制'
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
    if (e.detail.value.name != e.detail.value.password) {
      wx.showToast({
        title: '两次密码不一致!',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    wx.request({
      url: `${app.globalData.domain}/user/changePassword`,
      data: {
        account: wx.getStorageSync("account"),
        password: e.detail.value.password
      },
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.data == '0') {
          console.log("密码修改成功")
          setTimeout(function () {
            wx.showToast({
              title: '修改密码成功',
              icon: 'success',
              duration: 1500
            })
          }, 0)
          setTimeout(function () {
            wx.switchTab({
              url: '../my/my',
            })
          }, 1500)
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  
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