// pages/scenario_list/index.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    itemList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  onLoad: function (options) {
    this.QueryParams.cid=options.cid||"";
    this.QueryParams.query=options.query||"";
    this.getItemList();

  },
  async getItemList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    const total = res.data.message.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    this.setData({itemList:[...this.data.itemList,...res.data.message.goods]});
    wx.stopPullDownRefresh();
  },
  handleTabsChange(e){
    const {index}=e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs})
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: 'To The End',
      })
    }else{
      this.QueryParams.pagenum++;
      this.getItemList();
    }
  },
   onPullDownRefresh: function () {
     this.setData({
       itemList:[]
     })
     this.QueryParams.pagenum=1;
     this.getItemList();
  }
})