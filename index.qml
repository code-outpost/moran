<view class="container">
  <view class="remind-box" wx:if="{{remind}}">
    <image class="remind-img" src="https://776a-wj-urea1-1301298083.tcb.qcloud.la/%E6%AC%A2%E8%BF%8E%E7%95%8C%E9%9D%A2%E5%9B%BE%E7%89%87/loading.gif?sign=8f5b67b7dc4985f10ee7007c325d02fa&t=1592815185"></image>
  </view>
  <block wx:else>
    <image class="title" src="https://776a-wj-urea1-1301298083.tcb.qcloud.la/%E6%AC%A2%E8%BF%8E%E7%95%8C%E9%9D%A2%E5%9B%BE%E7%89%87/title8.png?sign=f1edbf7e2bbc476aa7652b525636ef73&t=1592815200"></image>
    <view class="content">
      <view class="hd" style="transform:rotateZ({{angle}}deg);">
        <image class="logo" src="{{userInfo.avatarUrl}}"></image>
        <image class="wave" src="https://776a-wj-urea1-1301298083.tcb.qcloud.la/%E6%AC%A2%E8%BF%8E%E7%95%8C%E9%9D%A2%E5%9B%BE%E7%89%87/wave.png?sign=eb0d6c8b1268c5e1417bc9b1f24edf7b&t=1592815223" mode="aspectFill"></image>
        <image class="wave wave-bg" src="https://776a-wj-urea1-1301298083.tcb.qcloud.la/%E6%AC%A2%E8%BF%8E%E7%95%8C%E9%9D%A2%E5%9B%BE%E7%89%87/wave.png?sign=eb0d6c8b1268c5e1417bc9b1f24edf7b&t=1592815223" mode="aspectFill"></image>
      </view>
       <button class="confirm-btn1" type='primary'  style='margin-top:10px; width:65%; background-color: #69C3AA'  wx:if="{{!hasUserInfo && canIUse}}" open-type="getUserInfo" bindgetuserinfo="getUserInfo">QQ登录</button>
     <view class="bd">
         <image class="smalltitle" src="https://776a-wj-urea1-1301298083.tcb.qcloud.la/%E6%AC%A2%E8%BF%8E%E7%95%8C%E9%9D%A2%E5%9B%BE%E7%89%87/confirm-word1.png?sign=ca22d9caad299cb32c0cd5ccbf725e6a&t=1592818530"></image>
        <navigator url='/pages/index/index'>
        <view class="confirm-btn" bindtap='goToIndex'>
         <text >进入小程序</text>
        </view>  
        </navigator>
        <text class="copyright">Copyright @ 2020 All Rights Reserved</text>
       
      </view>
    </view>
  </block>
</view>