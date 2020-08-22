<view>
  <view class='imgBox'>
    <image class="userinfo-avatar" src="{{userInfo.avatarUrl}}" background-size="cover"></image>
    <view class='userinfo-name'>{{userInfo.nickName}}</view>
  </view>
  <view class='canvasBox'>
    <canvas class='myCanvas' canvas-id="myCanvas" style="height:{{height}}px;width:{{width}}px;"/>
    <view>
      <view class='toolList' bindtap='choiceColor' data-value='bgColor'>
        背景：<view class='bgDIV' style='background-color: {{bgColor}}'></view>
      </view>
      <view class='toolList' bindtap='choiceColor' data-value='tColor'>
        文字：<view class='bgDIV' style='background-color: {{tColor}}'></view>
      </view>
      <view class='toolList'>
        <picker bindchange='bindFontSizeChange' value="{{sizeIndex}}" range="{{fontSizes}}">字体：{{fontSize}}</picker>
      </view>
      <view class='toolList' bindtap='choiceImg'>
        选择图片
      </view>
      <view class='toolList' bindtap='clearText'>
        清除
      </view>
    </view>
  </view>
  <view class='btn'>
    <view class='previewBtn' bindtap='drawPicture' data-btn-name="preview">预览</view>
    <view class='saveBtn' bindtap='drawPicture'  data-btn-name="save">保存</view>
  </view>
  <view>
    <textarea cursor-spacing="0" class='inputBox' value="{{dText}}" bindinput="bindReplaceInput" placeholder="请输入" />
  </view>
</view>
