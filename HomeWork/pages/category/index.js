// pages/category/index.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    leftMenuList:[],
    rightContentList:[],
    currentIndex:0,
    scrollTop:0
  },
  CatesList:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }else{
      if(Date.now()-Cates.time>1000*10){
        this.getCates();
      }else{
        this.CatesList = Cates.data;
        let leftMenuList=this.CatesList.map(v=>v.cat_name);
         let rightContentList=this.CatesList[0].children;
         this.setData({leftMenuList,rightContentList});
      }
    }
    
  },

  async getCates(){
    const res=await request({url:"/categories"});
    this.CatesList=res.data.message;
    wx.setStorageSync("cates", {time:Date.now(),data:this.CatesList});
    let leftMenuList=this.CatesList.map(v=>v.cat_name);
    let rightContentList=this.CatesList[0].children;
    this.setData({leftMenuList,rightContentList});
  },
  handleLeftTap(e){
    const {index} =e.currentTarget.dataset;
      let rightContentList=this.CatesList[index].children;
      this.setData({currentIndex:index,rightContentList,scrollTop:0});

  }
})
