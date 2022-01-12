// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"APP体验反馈",
        isActive:true
      },
      {
        id:1,
        value:"商家/商品投诉",
        isActive:false
      }],
      imgSelectedPath:[],
      textVal:""
  },
  UpLoadImg:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  handleTabsChange(e){
    const {index}=e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs})
  },
  handleUpimg(e){
    wx.chooseImage({
      count: 5,
      sourceType:['album','camera'],
      sizeType:['original', 'compressed'],
      success:(res)=>{
        this.setData({imgSelectedPath:[...this.data.imgSelectedPath,...res.tempFilePaths]});
      }

    })
  },
  handleRemoveImg(e){
    const {index} =e.currentTarget.dataset;
    let {imgSelectedPath}=this.data;
    imgSelectedPath.splice(index,1);
    this.setData({imgSelectedPath});
  },
  handleText(e){
    this.setData({textVal:e.detail.value})
  },
  handleForm(e){
    const {textVal,imgSelectedPath}=this.data;
    if(!textVal.trim()){
      wx.showToast({
        title: '输入非法',
        icon: 'none',
        mask: true,
      });
      return;
    }
    if(imgSelectedPath.length!==0){
      imgSelectedPath.forEach((v,i)=>{
        wx.showLoading({
          title: '上传中',
        })
        // wx.uploadFile({
        //   filePath: v,
        //   name: 'name',
        //   url: 'url',
        //   formData:{},
        //   success:(res)=>{
        //    let url = JSON.parse(res.data).url;
        //    this.UpLoadImg.push(url);
        //   }
        // })
        if(i===imgSelectedPath.length-1){
          wx.hideLoading();
          wx.showToast({
            title: '新浪图床不给用了,但我真的做了',
          });  
          this.setData({UpLoadImg:[],imgSelectedPath:[],textVal:""})
          wx.navigateBack({
            delta: 1,
          })
        }
        
  
      })
    }else{
      wx.showToast({
        title: '提交成功',
      });
      wx.navigateBack({
        delta: 1,
      });
    }
  }
})