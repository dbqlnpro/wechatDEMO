//pages\pay\index.js
import { getSetting,chooseAddress,showModal,showToast} from "../../utils/asyncwx.js"
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],  
    totalprice:0,
    totalNum:0 
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function (options) {
    const address=wx.getStorageSync("address");
    let cart =wx.getStorageSync("cart")||[];
    cart=cart.filter(v=>v.checked);
    let totalprice=0;
    let totalNum=0;
    cart.forEach(v=>{
        totalprice+=v.num*v.goods_price;
        totalNum+=v.num;
    })
    this.setData({cart,totalprice,totalNum,address});
  },

async handlePay(e){
  //try{const token =wx.getStorageSync("token");
  // if(!token)
  // {
  //   wx.navigateTo({
  //     url: '/pages/auth/index',
  //   })
  //   return;
  // }
  // const order_price=this.data.totalprice;
  // const consignee_addr=this.data.address.all;
  // const cart = this.data.cart;
  // let goods=[];
  // cart.forEach(v=>goods.push({goods_id:v.goods_id,goods_number=v.num,goods_price=v.goods_price}));
  // const orderParams={rder_price,consignee_addr,goods};
  // const {order_number} =await request({url:"/my/orders/create",method:"POST",data:orderParams});
  // const {pay} = await request({url:"/my/orders/req_unifiedorder",method:"POST",data:{order_number}});
  //await requestPayment(pay);
  //const res = await request({url:"/my/orders/chkOrder".method:"POST",data:{order_number}});}
  let newCart =wx.getStorageSync("cart");
  newCart=newCart.filter(v=>!v.checked);
  wx.setStorageSync("cart", newCart);

  const res = await showModal({content:"老子没做这玩意儿你滚吧"});
  if (res.confirm) {
    wx.navigateTo({
      url: '/pages/order/index',
    })
  }
  
  // catch(error){}

}

})