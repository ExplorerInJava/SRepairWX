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
      },
      password: {
        required: true,
      }
    }

    const messages = {
      name: {
        required: '请输入密码问题',
      },
      password: {
        required: '请填写答案',
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
    // if (!this.WxValidate.checkForm(params)) {
    //   const error = this.WxValidate.errorList[0]
    //   this.showModal(error)
    //   return false
    // }
    wx.request({
      url: `${app.globalData.domain}/user/setQuestion`,
      data: {
        account: wx.getStorageSync("account"),
        question: e.detail.value.name,
        answer: e.detail.value.password
      },
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.data == '0') {
          console.log(res.data.msg)
          setTimeout(function () {
            wx.showToast({
              title: '设置成功',
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
  onShow: function () {

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