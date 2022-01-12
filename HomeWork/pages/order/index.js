// pages/order/index.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //orders:[],
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待发货",
        isActive:false
      },
      {
        id:3,
        value:"退款/退货",
        isActive:false
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // const token =wx.getStorageSync("token");
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/auth/index',
    //   });
    //   return;
    // }
    let pages = getCurrentPages();
    let currentpage=pages[pages.length-1];
    const {type}=currentpage.options;
   // this.getOrders(type);
   this.changeTitleByIndex(type-1);
  },
  // async getOrders(type){
  //    const res=await request({url:"/my/orders/all",data:{type}});
  //    this.setData({orders:res.orders.map(v=>({...v,create_time_cn:(new Date(v.creat_time*1000).
  //toLocalString())}))})
  // },
  handleTabsChange(e){
    const {index}=e.detail;
    this.changeTitleByIndex(index);
   // this.getOrders(index+1);
  },
  changeTitleByIndex(index){
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs})
  }
})