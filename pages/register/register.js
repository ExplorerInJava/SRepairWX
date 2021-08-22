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
    password2: '',
    phone: '',
    form: {
      name: '',
      password: '',
      password2: '',
      phone: ''
    },
    isExist:false
  },

  //监听input输事件
  keyInput1(e) {
    var that = this;
    that.setData({
      name: e.detail.value
    })
    if (that.data.name != '' && that.data.name != null && that.data.password != '' && that.data.password != null && that.data.password2 != '' && that.data.password2 != null && that.data.phone != '' && that.data.phone != null) {
      that.setData({
        couldLogin: true
      })
    }
  },

  onbluer(e){
    var that = this
    console.log(e.detail.value)
    let account = e.detail.value

    wx.request({
      url: `${app.globalData.domain}/user/checkAccount`,
      data:{
        account : account
      },
      method: "get",
      success(res) {
        if(res.data.msg == "exist") {
          that.setData({
            isExist : true
          })
        } else {
          that.setData({
            isExist: false
          })
        }
      }
    })
  },

  keyInput2(e) {
    var that = this;
    that.setData({
      password: e.detail.value
    })
    if (that.data.name != '' && that.data.name != null && that.data.password != '' && that.data.password != null && that.data.password2 != '' && that.data.password2 != null && that.data.phone != '' && that.data.phone != null) {
      that.setData({
        couldLogin: true
      })
    }
  },

  keyInput3(e) {
    var that = this;
    that.setData({
      password2: e.detail.value
    })
    if (that.data.name != '' && that.data.name != null && that.data.password != '' && that.data.password != null && that.data.password2 != '' && that.data.password2 != null && that.data.phone != '' && that.data.phone != null) {
      that.setData({
        couldLogin: true
      })
    }
  },

  keyInput4(e) {
    var that = this;
    that.setData({
      phone: e.detail.value
    })
    if (that.data.name != '' && that.data.name != null && that.data.password != '' && that.data.password != null && that.data.password2 != '' && that.data.password2 != null && that.data.phone != '' && that.data.phone != null) {
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
        minlength: 8,
        maxlength: 10,
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 8
      },
      password2: {
        required: true,
        minlength: 6,
        maxlength: 8
      },
      phone: {
        required: true,
        tel: true
      }
    }

    const messages = {
      name: {
        required: '请输入账号',
        minlength: '输入的账号过短',
      },
      password: {
        required: '请填写密码',
        minlength: '密码过短',
        maxlength: '密码超过长度限制'
      },
      password: {
        required: '请填写密码',
        minlength: '密码过短',
        maxlength: '密码超过长度限制'
      },
      phone: {
        required: '请填写您的手机号码',
        tel: '请输入正确的手机号码'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //调用验证函数
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    let params = e.detail.value
    var userInfo = wx.getStorageSync("userInfo");
    params = this.jsonConcat(userInfo, params);
    console.log(params)
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false

    }
    if (e.detail.value.password != e.detail.value.password2) {
      wx.showToast({
        title: '两次密码不一致!',
        icon: 'none',
        duration: 2000
      })
      return false
    }

    wx.request({
      url: `${app.globalData.domain}/user/register`,
      data: {
        nickName : params.nickName, 
        gender: params.gender == "1" ? "男" : "女",
        city : params.city,
        province : params.province,
        name : params.name,
        password : params.password,
        phone : params.phone,
        avatarUrl : params.avatarUrl
      },
      method: 'get',
      success(res) {
        console.log("success")
      },
      fail(res) {
        console.log("fial")
      }

    })
    this.showModal({
      msg: '注册成功！'
    })

    wx.navigateTo({
      url: '../login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.initValidate() //验证规则函数
    if (wx.getStorageSync("userInfo") == null || wx.getStorageSync("userInfo") == ""){
      wx.navigateTo({
        url: '../auth/auth',
      })
    }
  },

  jsonConcat(jsona, jsonb) {
    let stra = JSON.stringify(jsona);
    let strb = JSON.stringify(jsonb);
    stra = stra.concat(strb);
    let list = stra.split("{");
    stra = list[1].split("}")[0];
    strb = list[2].split("}")[0];
    let resultStr ='{' + stra + ',' + strb + "}"
    let result = JSON.parse(resultStr);
    return result;
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
      
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})