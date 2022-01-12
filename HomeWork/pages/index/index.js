//index.js
//获取应用实例
import { request } from "../../request/index.js"
const app = getApp()

Page({
  data: {
   swiperList:[],
   cateList:[],
   floorList:[]
  },
 
  onLoad: function () {
  //  wx.request({
  //    url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
     
  //    success: (result) => {
  //      this.setData({swiperList:result.data.message})
       
  //    },
     

  //  })
    this.getSwiperList();  
    this.getCateList();
    this.getFloorList();
   
  },
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({swiperList:result.data.message})
    })
  },
  getCateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({cateList:result.data.message})
    })
  },
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({floorList:result.data.message})
    })
  },
  onReady:function(){

  },
  onShow:function(){

  },
  onHide:function(){

  },
  onUnload:function(){

  },
  onPullDownRefresh:function(){

  },
  onPageScroll:function(){

  },
  onReachBottom:function(){

  },
  onShareAppMessage:function(){

  },
  onTabItemTap:function(){
    
  }
  
})
