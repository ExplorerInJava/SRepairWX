var QQMapWX = require('../../utils/qqmap-wx-jssdk.js'); //并没有引用此文件来自定义腾讯小地图
import WxValidate from '../../utils/WxValidate.js' //引用此js文件对表单进行校验
var qqmapsdk;
const app = getApp();
Page({
  data: {
    images: [],
    mobileLocation: { //移动选择位置数据
      longitude: 0,
      latitude: 0,
      address: '',
    },
    form: {
      address: '',
      detailAddress: '',
      detail: ''
    },
    isClose: false,
    uuid : '',
    modalName2:''
  },

  onLoad() {
    //测试wx.js文件里的数组处理模式
    // let arr = ['A', 'B', "C", "D", "E"]
    // let arr0 = arr.concat()
    // console.log("arr.splice:" + arr.splice(4, 5) + "  arr:" + arr)
    // console.log("arr0" + ":" + arr0.length)
    // console.log(arr.slice(0, 2))
    //测试js数据类型
    // let a = 1;
    // let b = "3";
    // let c = a + parseInt(b);
    // console.log(a + parseInt(b))
    // console.log(c)
    this.initValidate()//验证规则函数


  },

  //移动选点
  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        let mobileLocation = {
          longitude: res.longitude,
          latitude: res.latitude,
          address: res.address,

        };
        let num = "form.address"
        that.setData({
          mobileLocation: mobileLocation,
          [num]: res.address
        });
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },

  /**
   * 选择本地图片并展示
   */
  chooseImage(e) {

    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {

        //将图片存入本地数组中
        const images = this.data.images.concat(res.tempFilePaths)
        //只保留三张图片存入全局变量
        this.setData({
          images: images.length > 3 ? images.slice(0, 3) : images
        })
      }
    })
  },

  /**
   * 删除图片
   * @param {number} `index` 图片在数组中的位置
   * @param {array} `filePaths` 展示图片的临时存储地址数组
   */
  removeImage(e) {
    console.log("Remove----")
    const idx = e.target.dataset.idx
    const images = this.listRemove(this.data.images, idx)
    this.setData({
      images: images,
      isClose: true
    })
  },

  listRemove(array, index) {
    index = parseInt(index)
    let arrayTmp1 = array.concat();
    let arrayTmp2 = array.concat();
    let head = arrayTmp1.splice(0, index);
    let tail = arrayTmp2.splice(++index, array.length);
    let result = head.concat(tail);
    return result;
  },


  /**
   * 选择的图片预览
   * @param {string} `current` 预览的图片的本地临时地址
   */
  handleImagePreview(e) {
    console.log("Preview----")
    const isClose = this.data.isClose
    console.log("isClose:  " + isClose)
    if (isClose) {
      this.setData({
        isClose: false
      })
      return;
    }
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },

  //验证表单函数
  initValidate() {
    const rules = {
      address: {
        required: true,
      },
      detailAddress: {
        required: true,
      },
      detail: {
        required: true,
      }
    }

    const messages = {
      address: {
        required: '请选择您的位置',
      },
      detailAddress: {
        required: '请输入您的详细地址',
      },
      detail: {
        required: '请填写问题描述',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  /**
   * 上传数据
   * @param {object} `info` 用户信息的json格式
   * @param {object} `filePaths` 图片的本地路径数组
   */

  uploadData(e) {
    var event = e
    var that = this
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    var info = e.detail.value
    
    //校验表单
    if (!this.WxValidate.checkForm(info)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false;
    }
    if (!this.verifyData()) {
      return false;
    }
    wx.showLoading({
      title: '数据上传中',
      
    })
    info = app.jsonPush(info, "account", wx.getStorageSync("account"));
    info = app.jsonPush(info, "imgNum", this.data.images.length);
    console.log(info)
    var index = 0;
    that.upload(index, info);
    
  },

  showModal2() {
    setTimeout(function () {
      wx.showToast({
        title: '上传成功',
        icon: 'success',
        duration: 1500
      })
    },0)
    setTimeout(function () {
      wx.switchTab({
        url: '../index/index',
      })
    }, 1500)
  },


  upload(index,info){
    console.log(`${app.globalData.domain}/orders/create?id=0`)
    var that = this;
    let filePaths = this.data.images;
    wx.uploadFile({
      url: `${app.globalData.domain}/orders/create?id=${index}`, // +index 把index 转换成number格式
      filePath: filePaths[index],
      name: 'orderImage',
      header: {
        'content-type': 'multipart/form-data'
      }, // 设置请求的 header
      formData: info, // HTTP 请求中其他额外的 form data
      success: function (res) {
        console.log("---------------------------这是第" + index + "次上传------------------------------")
        console.log(res)
        let data = JSON.parse(res.data) 　　

        if (data.status == "0" && data.data == "last") {
          console.log("成功上传第1个")
          info = app.jsonPush(info, "uuid", data.msg);
        } else {
          console.log("成功上传第" + index + "+1个！")
        }
        index = parseInt(index) + 1;
        if (index != filePaths.length) {
          that.upload(index, info);
        } else {
          wx.hideLoading();
          that.showModal2();
        }

      },
      fail() {
        wx.hideLoading();
        console.log("The request of uploading the " + index + " image is Failed!")
      }
    })
  },
  /**
   * 验证上传数据的完整性
   * @return {boolean} 当为true表示信息填写完整
   */
  verifyData() {
    if (this.data.images.length < 1) {
      wx.showModal({
        content: '请上传至少一张照片',
        showCancel: false,
      })
      return false;
    }
    return true;
  },

})