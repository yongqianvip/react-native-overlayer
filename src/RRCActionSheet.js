/*
 * @Author: yinyongqian
 * @Description:
 * @Date: 2019-09-02 10:35:11
 * @LastEditors: yinyongqian
 * @LastEditTime: 2019-09-03 16:58:11
 */

import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';
import RRCTopView from './RRCTopView';
import ActionSheet from './ActionSheet';
const { width, height } = Dimensions.get('window')
const defaultBackgroundColor = 'rgba(0,0,0,0.3)';

const ActionSheetOptions = {
  // 以下属性优先级低于内联样式
  backgroundColor: defaultBackgroundColor, // 遮罩颜色
  fontSize: 19, // 文字字号
  itemHeight: 57, // 单个item的高度
  buttonTitleColor: 'rgba(0, 0, 14, 0.8)', // 备选按钮字体颜色
  cancelButtonTitleColor: 'rgba(0, 0, 14, 0.8)', // 取消按钮字体颜色
  buttonItemBackgroundColor: '#eee', // 备选按钮背景颜色
  cancelButtonBackgroundColor: '#feffff', // 取消按钮背景颜色
}

export default class OverlayActionSheet {
  static setActionSheetOptions(options = {}) {
    if (typeof options.backgroundColor == 'string') {
      ActionSheetOptions.backgroundColor = options.backgroundColor;
    }
    if (typeof options.fontSize == 'number') {
      ActionSheetOptions.fontSize = options.fontSize;
    }
    if (typeof options.itemHeight == 'number') {
      ActionSheetOptions.itemHeight = options.itemHeight;
    }
    if (typeof options.buttonTitleColor == 'string') {
      ActionSheetOptions.buttonTitleColor = options.buttonTitleColor;
    }
    if (typeof options.cancelButtonTitleColor == 'string') {
      ActionSheetOptions.cancelButtonTitleColor = options.cancelButtonTitleColor;
    }
    if (typeof options.buttonItemBackgroundColor == 'string') {
      ActionSheetOptions.buttonItemBackgroundColor = options.buttonItemBackgroundColor;
    }
    if (typeof options.cancelButtonBackgroundColor == 'string') {
      ActionSheetOptions.cancelButtonBackgroundColor = options.cancelButtonBackgroundColor;
    }
  }

  static action(buttons, Callback, cancelButton) {
    if (!Array.isArray(buttons) || buttons.length < 1) {
      return null;
    }
    let key;
    const backgroundColor = ActionSheetOptions.backgroundColor && typeof ActionSheetOptions.backgroundColor == 'string' ? ActionSheetOptions.backgroundColor : defaultBackgroundColor
    const overlayView = (
      <TouchableOpacity activeOpacity={1} type={'actionSheet'} style={{ width, height, backgroundColor: backgroundColor, alignItems: 'center', justifyContent: 'flex-end',}} onPress={()=>{
        DeviceEventEmitter.emit("hide-actionSheet", ()=>{
          RRCTopView.removeAlert(key);
        });
      }}>
        <ActionSheet buttons={buttons} cancelButton={cancelButton} options={ActionSheetOptions} itemOnPress={(index)=>{
          RRCTopView.removeAlert(key);
          Callback(index);
        }}/>
      </TouchableOpacity>
    )
    let onDisappearCompletedSave = overlayView.props.onDisappearCompleted;
    let element = React.cloneElement(overlayView, {
      onDisappearCompleted: () => {
        RRCTopView.removeAlert(key);
        onDisappearCompletedSave && onDisappearCompletedSave();
      }
    });
    key = RRCTopView.addAlert(element);
    return key;
  }

  static hide(key) {
    RRCTopView.removeAlert(key);
  }

  static transformRoot(transform, animated, animatesOnly = null) {
    RRCTopView.transform(transform, animated, animatesOnly);
  }

  static restoreRoot(animated, animatesOnly = null) {
    RRCTopView.restore(animated, animatesOnly);
  }
}