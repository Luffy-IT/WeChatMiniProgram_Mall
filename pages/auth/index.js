// pages/auth/index.js

import {request} from "../../request/index.js";
import {login} from "../../utils/asyncWx.js";
Page({
  // 获取用户信息
  async handleGetUserInfo(e){
    try {
      // 1 获取用户信息
      const {encryptedData,rawData,iv,signature}=e.detail;
      // 2 获取小程序登录成功后的code
      const {code}=await login();
      // 编辑传输参数
      const loginParams={encryptedData,rawData,iv,signature,code};
      // 3 发送请求 获取用户的token,注意！！这一步不是企业账号无法获取token值，现在临时创建一个token值来进行测试
      const {res}=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
      // 4 把token存入缓存中 同时跳转回上一个界面
      wx.setStorageSync("token", 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo');
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})