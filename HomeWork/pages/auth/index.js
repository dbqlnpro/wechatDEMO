// pages/auth/index.js
import { request } from "../../request/index.js"
import { login } from "../../utils/asyncwx"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
async handleGetUserInfo(e){
  try{
    // const {rawData,signature,encryptedData,iv}=e.detail;
    // const {code} =await login();
    // const loginParams ={encryptedData,rawData,iv,signature,code};
    // const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"POST"});
    // wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1,
    });
  }catch(error){
    console.log(error);
  }
    
  }
})