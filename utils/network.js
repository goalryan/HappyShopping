const domain = 'http://happyshopping.com/'

let requestHandler = {
  url: '',
  params: {},
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
function POST(requestHandler) {
  request('DELETE', requestHandler)
}

function request(method, requestHandler) {
  //注意：可以对params加密等处理
  var params = requestHandler.params;
  wx.request({
    url: domain + requestHandler.url,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: { // 设置请求的 header
      'Authorization': wx.getStorageInfoSync('token'),
      'EnterpriseId': wx.getStorageInfoSync('enterpriseId'),
      'UserName': wx.getStorageInfoSync('userName') // 微信名称
    },
    success: function (res) {
      //注意：可以对参数解密等处理
      requestHandler.success(res);
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