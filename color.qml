<view class='colorBox'>
  <view class='box' wx:for="{{colorData}}" wx:key="{{index}}">
    <view class='colorItem' style='background-color: {{colorData[index]}}' bindtap='changeColor' data-value="{{colorData[index]}}"></view>
  </view>
</view>