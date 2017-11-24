const domain = 'http://happyshopping.com/'

let requestHandler = {
  url: '',
  params: {},
  header: {},
  success: function (res) {
    // success
  },
  fail: function () {
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
  var params = requestHandler.params;
  var header = requestHandler.header;
  if (header === undefined) header = {};
  header.Authorization = wx.getStorageInfoSync('token');
  header.EnterpriseId = wx.getStorageInfoSync('enterpriseId');
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
        wx.redirectTo({
          url: '../../../pages/login/login',
        })
      } else {
        requestHandler.success(res);
      }
    },
    fail: function () {
      requestHandler.fail();
    },
    complete: function () {
      requestHandler.complete();
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST,
  DELETE: DELETE
}