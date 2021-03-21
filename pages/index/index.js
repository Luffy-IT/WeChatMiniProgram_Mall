// 引入用来发送请求的方法
import {request} from "../../request/index.js";

wx-Page({
/**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    //分类导航数据
    catesList:[],
    // 楼层商品数据
    floorList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api.it120.cc/kotoba/banner/list',
    //   success: (result)=>{
    //     // console.log(result);
    //     this.setData({
    //       swiperList:result.data.data
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  
  // 获取轮播图
  getSwiperList(){
    // request({url:"https://api.it120.cc/kotoba/banner/list"})
    // .then(result=>{
    //     this.setData({
    //       swiperList:result.data.data
    //     })
    // })
    wx.request({
      url: 'https://api.it120.cc/kotoba/banner/list',
      success: (result)=>{
        this.setData({
          swiperList:result.data.data
        })
      },
    });
  },
  // 获取分类导航数据
  getCatesList(){
    // request({url:"https://api.it120.cc/kotoba/shop/goods/category/all"})
    // .then(result=>{
    //     this.setData({
    //       catesList:result.data.data
    //     })
    // })
    wx.request({
      url: 'https://api.it120.cc/kotoba/shop/goods/category/all',
      success: (result)=>{
        this.setData({
          catesList:result.data.data
        })
      },
    });
  },
  // 获取楼层商品数据
  getFloorList(){
    // request({url:"https://api.it120.cc/kotoba/shop/goods/list"})
    // .then(result=>{
    //     this.setData({
    //       floorList:result.data.data
    //     })
    // })
    wx.request({
      url: 'https://api.it120.cc/kotoba/shop/goods/list',
      success: (result)=>{
        this.setData({
          floorList:result.data.data
        })
      },
    });
  },
  
})