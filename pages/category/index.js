import {request} from "../../request/index.js";
// import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
/**
   * 页面的初始数据
   */
  data: {
    //左边菜单 
    leftMenuList:[],
    // 右边菜单
    rightContent:[],
    //被点击左侧菜单
    currentIndex:0,
    // 右侧内容滚动条距离顶部的距离
    scrollTop:0
  },
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 1 先判断一下本地存储中有没有旧的数据
     * {time:Date.now(),data:[...]}
     * 2 没有旧的数据 直接发送新请求
     * 3 有旧的数据 同时旧的数据没有过期 就是用本地存储中的旧数据即可
     */

    //1获取本地存储中的数据
    const Cates=wx.getStorageSync("cates");
    //判断
    if(!Cates){
      this.getCates();
    }else{
      // 有旧的数据 定义过期时间
      if(Date.now()-Cates.time>1000*10){
        this.getCates();
      }else{
        // 可以使用旧数据
        this.Cates=Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

    // this.getCates();
  },

  // 获取分类
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(res => {
    //   this.Cates=res.data.message;

    //   //把接口数据存入到本地存储中
    //   wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
      
    //   // 构造左边数据
    //   let leftMenuList=this.Cates.map(v=>v.cat_name);
    //   // 构造右边数据
    //   let rightContent=this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })



    // 1 使用es7的async await来发送请求
    const res=await request({ url: "/categories" });
    this.Cates=res.data.message;
    //把接口数据存入到本地存储中
    wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
    // 构造左边数据
    let leftMenuList=this.Cates.map(v=>v.cat_name);
    // 构造右边数据
    let rightContent=this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  //左侧菜单的点击事件
  handleItemTap(e){
    //获取索引
    const {index}=e.currentTarget.dataset;
    
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      // 重新设置 右边内容的scroll-view标签距离顶部的距离
      scrollTop:0
    })

  }
})