// const domain = 'http://happyshopping.com/';
const domain = 'https://service.easydaigou.com/';
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
      } else {
        if (requestHandler.success !== undefined)
          requestHandler.success(res);
      }
    },
    fail: function (e) {
      if (requestHandler.fail !== undefined)
        requestHandler.fail(e);
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