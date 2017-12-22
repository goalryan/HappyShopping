const domain = 'http://happyshopping.com/';
// const domain = 'https://service.easydaigou.com/';
let requestHandler = {
  url: '',
  data: {},
  header: {},
  success: function (res) {
    // success
  },
  fail: function (e) {
    // fail
  },
  complete: function () {
    //complete
  }
}

//GET请求
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求
function POST(requestHandler) {
  request('POST', requestHandler)
}
//DELETE请求
function DELETE(requestHandler) {
  request('DELETE', requestHandler)
}

function request(method, requestHandler) {
  doRequest(method, requestHandler);
}

function doRequest(method, requestHandler) {
  var duration = 1500;
  //注意：可以对params加密等处理
  var params = requestHandler.data;
  var header = requestHandler.header;
  if (header === undefined) header = {};
  header.Authorization = wx.getStorageSync('token');
  header.EnterpriseId = wx.getStorageSync('enterpriseId');
  header.OpenId = wx.getStorageSync('openId');
  header.UserName = wx.getStorageInfoSync('userName'); // 微信名称
  wx.request({
    url: domain + requestHandler.url,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: header,
    success: function (res) {
      //注意：可以对参数解密等处理     
      if (res.statusCode === 401) {
        //token过期跳到登录页面
        wx.reLaunch({
          url: '/pages/login/login'
        })
      } else if (res.statusCode === 408) {
        wx.showToast({
          title: '【408】请求超时，请重试',
          image: '/image/error.png',
          duration: duration
        });
      } else if (res.statusCode === 503) {
        wx.showToast({
          title: '【503】未找到服务，请联系管理员处理',
          image: '/image/error.png',
          duration: duration
        });
      } else if (res.statusCode === 500) {
        wx.showToast({
          title: '【500】服务发生错误，请联系管理员处理',
          image: '/image/error.png',
          duration: duration
        });
      } else {
        // 接口返回false,统一处理
        var { success, msg } = res.data;
        if (!success) {
          wx.showToast({
            title: msg,
            image: '/image/error.png',
            duration: duration
          });
        }
        if (requestHandler.success !== undefined)
          requestHandler.success(res);
      }
    },
    fail: function (e) {
      wx.getNetworkType({
        success: function (res) {
          if (res.networkType === 'none') {
            wx.showToast({
              title: '没有网络，请检查网络状态',
              image: '/image/error.png',
              duration: duration
            });
          } else {
            wx.showToast({
              title: '服务异常，请联系管理员处理',
              image: '/image/error.png',
              duration: duration
            });
          }
        },
        fail:function(e){
          wx.showToast({
            title: '网络连接有问题，请检查网络状态',
            image: '/image/error.png',
            duration: duration
          });
        },
        complete: function () {
          if (requestHandler.fail !== undefined)
            requestHandler.fail(e);
        }
      })
    },
    complete: function () {
      if (requestHandler.complete !== undefined)
        requestHandler.complete();
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST,
  DELETE: DELETE
}