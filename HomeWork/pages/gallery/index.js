// pages/gallery/index.js
import { getSetting,chooseAddress,showModal,showToast} from "../../utils/asyncwx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allchecked:false,    
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
    const cart =wx.getStorageSync("cart")||[];
    this.setData({address});
    this.setPage(cart);
  },

 
 async handleGetAddress(e){
      try{
      const res1=await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if(scopeAddress===false){
        wx.showToast({
          title: '请手动授权位置信息',
          mask: true,
          icon:'none'
        });
        this.setData({if_address:false});
      }else{
        let address=await chooseAddress();
        address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
        wx.setStorageSync("address", address);
      }
    }
    catch(error){

    };
    
  },

handleItemChange(e){
  const goods_id=e.currentTarget.dataset.id;
  let {cart} =this.data;
  let index = cart.findIndex(v=>v.goods_id===goods_id);
  cart[index].checked=!cart[index].checked;
  this.setPage(cart);
},
setPage(cart){
  let allchecked=true;
  let totalprice=0;
  let totalNum=0;
  cart.forEach(v=>{
    if(v.checked){
      totalprice+=v.num*v.goods_price;
      totalNum+=v.num;
    }else{
      allchecked=false;
    }
  })
  allchecked=cart.length?allchecked:false;
  this.setData({cart,totalprice,totalNum,allchecked});
  wx.setStorageSync("cart",cart);
},
ifAllChecked(e){
  let {cart,allchecked}=this.data;
  allchecked=!allchecked;
  cart.forEach(v=>v.checked=allchecked);
  this.setPage(cart);
},
async handleNumEditor(e){
  const {editor,id} =e.currentTarget.dataset;
  let {cart}=this.data;
  const index =cart.findIndex(v=>v.goods_id===id);
  if(cart[index].num===1&&editor===-1){
    const res=await showModal({content:"删除物品?"})
    if (res.confirm) {
      cart.splice(index,1);
      this.setPage(cart);
    }
  }else{
    cart[index].num+=editor;
  this.setPage(cart);
  }
  
},
async handlePay(e){
  const {address,totalNum}=this.data;
  if(!address.userName){
   await showToast({title:"设置收货地址"});
    return;
  }
  if(totalNum===0){
    await showToast({title:"选购商品"});
     return;
   }
   wx.navigateTo({
     url: '/pages/pay/index',
   })
}

})