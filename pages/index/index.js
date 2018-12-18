// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseDir: 'https://wechat.weiwait.cn/',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    access_token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: this.data.baseDir + 'pictures',
      success: data => {
        this.setData({imgUrls: data.data});
      }
    });

    wx.request({
      url: this.data.baseDir + 'list',
      success: data => {
        this.setData({lists: data.data});
      }
    })

      wx.login({
        success: loginResult => {
          if (loginResult.code) {
            wx.request({
              url: this.data.baseDir + 'api/login',
              method: 'POST',
              data: {
                code: loginResult.code
              },
              success: data => {
                this.data.access_token = data.data.access_token;
                wx.request({
                  url: this.data.baseDir + 'api/test',
                  header: {
                    Accept: 'application/json',
                    Authorization: this.data.access_token
                  },
                  success: data => {
                    console.log(data)
                  }
                })
              }
            })
          } else {
            console.log('f')
          }
        }
      })
  },

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