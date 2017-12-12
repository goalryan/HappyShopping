var network = require("../../../../utils/network.js")
var app = getApp();
Page({
  data: {
    model: {},
    goodsList: [],
    isNewCustomer: true,
    focusCustomer: true,
    searchObj: {
      url: 'api/customer/search',
      position: { top: 92, left: 200 * app.globalData.rpx2px },
      onFocus: false
    },
    scrollHeight: app.globalData.systemInfo.windowHeight - 139 - 45 - 98 * app.globalData.rpx2px,
  },
  onLoad: function (e) {
    this.setData({
      model: {
        id: '',
        billId: e.billId,
        docNo: e.docNo,
        customerId: '',
        customerNickName: '',
        isPaid: false
      }
    })
  },
  onShow: function () {
    //this.queryGoodsList();
  },
  bindCustomerFocus: function (e) {
    var setOnFocus = "searchObj.onFocus";
    this.setData({
      [setOnFocus]: true
    });
  },
  bindCustomerInput: function (e) {
    console.log(e.detail.value);
    var setCustomerNickName = "model.customerNickName";
    this.setData({
      [setCustomerNickName]: e.detail.value
    });
  },
  bindCustomerConfirm: function (e) {
    this.setData({
      focusCustomer: false,
      focusGoods: true
    });
  },
  bindCustomerBlur: function (e) {
    var setOnFocus = "searchObj.onFocus";
    this.setData({
      [setOnFocus]: false
    });
  },
  changePaid: function (e) {
    this.setData({
      ["model.isPaid"]: e.detail.value
    })
    if (this.data.model.id === '') return;
    var url = 'api/billCustomer/updateIsPaid';
    var that = this;
    network.POST({
      url: url,
      data: that.data.model,
      success: function (res) {
        if (!res.data.success) {
          wx.showToast({
            title: '保存失败',
            icon: 'warn',
            duration: 2000
          })
          that.setData({
            ["model.isPaid"]: !that.data.model.isPaid
          })
        }
      },
      fail: function (e) {
        var toastText = '获取数据失败' + JSON.stringify(e);
        wx.showToast({
          title: toastText,
          icon: 'warn',
          duration: 2000
        })
        that.setData({
          ["model.isPaid"]: !that.data.model.isPaid
        })
      },
      complete: function () { }
    })
  },
  /**
   * 保存客户
   */
  saveCustomer: function (e) {
    if (this.data.model.billId === '' || this.data.model.customerNickName === '') {
      wx.showToast({
        title: '客户名称必填',
        image: app.toastIcon.warning,
        duration: app.toastIcon.duration
      });
      return;
    }
    var url = 'api/billCustomer/add';
    var that = this;
    network.POST({
      url: url,
      data: that.data.model,
      success: function (res) {
        if (res.data.success) {
          that.setData({
            ["model.id"]: res.data.data
          });
          wx.showToast({
            title: '保存成功',
            image: app.toastIcon.success,
            duration: app.toastIcon.duration
          })
          // 弹出菜单选择是否添加客户
          that.saveSuccessCallback(that);
        } else {
          wx.showToast({
            title: '保存失败',
            icon: app.toastIcon.error,
            duration: app.toastIcon.duration
          })
        }
      },
      fail: function (e) {
        var toastText = '获取数据失败' + JSON.stringify(e);
        wx.showToast({
          title: toastText,
          icon: app.toastIcon.success,
          duration: app.toastIcon.duration
        })
      }
    })
  },
  /**
   * 保存客户成功后
   */
  saveSuccessCallback(that) {
    //弹出下一步操作
    wx.showActionSheet({
      itemList: ['添加商品'],
      success: function (res) {
        that.goAddGoodsPage(that);
      },
      fail: function (res) {
        //更新上个页面的客户数据
        wx.navigateBack({});
      }
    })
  },
  /**
   * 添加商品
   */
  addGoods: function (e) {
    var that = this;
    that.goAddGoodsPage(that);
  },
  goAddGoodsPage: function (that) {
    wx.navigateTo({
      url: '../../goods/goods?billCustomerId=' + that.data.model.id + '&billId=' + that.data.model.billId,
    })
  },
  /**
   * 选择客户回调事件
   */
  onConfirmItemEvent: function (e) {
    console.log(e);
    this.setData({
      ["model.customerId"]: e.detail.id,
      ["model.customerNickName"]: e.detail.value
    });
    this.queryGoodsList();
  },
  /**
   * 输入客户回调事件
   */
  onFindItemEvent: function (e) {
    console.log(e);
    this.setData({
      ["model.customerId"]: e.detail.id
    });
    this.queryGoodsList();
  },
  /**
   * 输入框失去焦点
   */
  onLoseFocusEvent: function () {
    this.setData({
      focusCustomer: false
    });
  }
  ,
  /**
   * 查询商品列表
   */
  queryGoodsList: function () {
    this.setData({ goodsList: [], ["model.id"]: '', ["model.isPaid"]: false });
    //账单号和客户ID都存在才查询数据
    if (this.data.model.billId !== '' && this.data.model.customerId !== '') {
      console.log(this.data.model.billId, this.data.model.customerId);
      var url = 'api/billCustomer/getByDocNoAndCustomerId';
      var that = this;
      network.POST({
        url: url,
        data: that.data.model,
        success: function (res) {
          if (res.data.success) {
            that.setData({
              goodsList: res.data.data.goodsList,
              ["model.id"]: res.data.data.id,
              ["model.isPaid"]: res.data.data.isPaid
            });
          } else {
            that.queryFail();
          }
        },
        fail: function (e) {
          var toastText = '获取数据失败' + JSON.stringify(e);
          that.queryFail();
        },
        complete: function () { }
      })
    }
  },
  queryFail: function () {
    that.setData({
      goodsList: [],
      ["model.id"]: '',
      ["model.isPaid"]: false
    });
  }
})
