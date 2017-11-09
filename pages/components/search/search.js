Component({
  behaviors: [],
  properties: {
    position: {
      type: Object,
      value: { top: 0, left: 0 }
    },
    searchKey: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) {
        console.log('fsfadaf');
        if (newVal != oldVal) { this.fetchData() }
      }
    },
    url: {
      type: String,
      value: ''
    }
  },
  data: {
    list: [],
    isHidden: true
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    this.fetchData();
  },
  moved: function () { },
  detached: function () { },

  methods: {
    fetchData: function () {
      console.log('sssssss');
      var resData = [{ id: '1', name: 'a' }, { id: '2', name: 'aa' }, { id: '3', name: 'aaa' }, { id: '4', name: 'aaaa' }];
      this.setData({
        list: resData,
        ishidden: list.length > 0
      })
    },
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    _myPrivateMethod: function () {
      // 内部方法建议以下划线开头
      this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
      this.applyDataUpdates()
    }
  }

})