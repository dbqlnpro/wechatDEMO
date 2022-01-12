// pages/scenario_detail/index.js
import { request } from "../../request/index.js"
Page({
  data: {
    goodsDetails:{},
    isCollect:false
  },
  goodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages=getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    const {goods_id}=options;
    this.getItemDetails(goods_id);

  },
  async getItemDetails(goods_id){
    const res=await request({url:"/goods/detail",data:{goods_id}});
   // this.data.goodsDetails=res;
   this.goodsInfo=res.data.message;
   let collect = wx.getStorageSync("collect")||[];
   let isCollect = collect.some(v=>v.goods_id===this.goodsInfo.goods_id);
    this.setData({goodsDetails:{
      goods_name:res.data.message.goods_name,
      goods_price:res.data.message.goods_price,
      goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
      pics:res.data.message.pics
    },isCollect});

  },
  handlePreview(e){
    const urls=this.goodsInfo.pics.map(v=>v.pics_big);
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current:current,
      urls: urls,
    })
  },
  handleAdd(e){
    let cart=wx.getStorageSync("cart")||[];
    let index=cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    if(index===-1){
      this.goodsInfo.num=1
      this.goodsInfo.checked=true;
      cart.push(this.goodsInfo);
    }else{
      cart[index].num++;
    }
    wx.setStorage({
      data: cart,
      key: "cart",
    });
    wx.showToast({
      title: "添加成功",
      icon:'success',
      mask:true
    })
  },
  handleCollect(e){
    let collect = wx.getStorageSync("collect")||[];
    let index = collect.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    if(index!==-1){
      collect.splice(index,1);
    }else{
      collect.push(this.goodsInfo);
    }
    wx.setStorageSync("collect", collect);
    this.setData({isCollect:!this.data.isCollect})
  }

})