// pages/user/index.js
Page({
  data: {
    userinfo:{},
    // 被收藏的商品数量
    collectNum:0
  },
  onShow(){
    const userinfo=wx.getStorageSync("userinfo");
    const collect=wx.getStorageSync("collect")||[];

    this.setData({userinfo,collectNum:collect.length});
  }
})