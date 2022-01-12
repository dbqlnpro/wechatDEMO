// pages/search/index.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    inputValue:""
  },
TimeId:-1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  hanldeInput(e){
    const {value} =e.detail;
    this.setData({isFocus:true});
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{  
      this.qsearch(value);  
    },250);
    if(!value.trim()){
      this.setData({goods:[],isFocus:false});     
      return;
    };
    
    
  },
  async qsearch(query){
    const res=await request({url:"/goods/qsearch",data:{query}});
    console.log(res);
    this.setData({goods:res.data.message})
  },
  handlecancel(e){
    this.setData({inputValue:"",isFocus:false,goods:[]});
  }
})