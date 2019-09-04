/*
 * @Author: yinyongqian
 * @Description:
 * @Date: 2019-09-02 10:50:59
 * @LastEditors: yinyongqian
 * @LastEditTime: 2019-09-03 16:55:11
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Animated, DeviceEventEmitter } from 'react-native';
import DeviceConst from './const/Device';
const borderRadius = 12;

class ActionSheet extends React.Component {
  constructor(props){
    super(props);
    const {options, buttons} = props
    this.state = {
      actionSheetTop: new Animated.Value(options.itemHeight * buttons.length + 8 + options.itemHeight)
    }
    this.renderButtonItem = this.renderButtonItem.bind(this);
    this.hideActionSheet = this.hideActionSheet.bind(this);
    DeviceEventEmitter.addListener("hide-actionSheet", this.hideActionSheet);
  }
  componentDidMount(){
    Animated.timing(this.state.actionSheetTop, {
			toValue: -(DeviceConst.dangerBottomHeight + 10),
			duration: 300,
		}).start();
  }
  componentWillUnmount(){
    DeviceEventEmitter.removeAllListeners("hide-actionSheet");
  }
  hideActionSheet(callback){
    const {options, buttons} = this.props
    Animated.timing(this.state.actionSheetTop, {
			toValue: options.itemHeight * buttons.length + 8 + options.itemHeight,
			duration: 300,
		}).start(callback ? callback : null);
  }
  
  renderButtonItem(){
    const { buttons, options } = this.props;
    return buttons.map((item, index)=>{
      const title = (typeof item == 'string' || typeof item == 'number') ? item : (item.text ? item.text : '');
      const titleStyle = (typeof item == 'object' && !Array.isArray(item)) ? (item.style ? item.style : null) : null;
      return (
        <View key={'actionSheet_item' + index}>
          <TouchableOpacity activeOpacity={0.9} style={{height: options.itemHeight, alignItems: 'center', backgroundColor: options.buttonItemBackgroundColor}} onPress={()=>{
            this.hideActionSheet(()=>this.props.itemOnPress(index))
          }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={[{fontSize: options.fontSize, color: options.buttonTitleColor}, titleStyle]}>{title}</Text>
            </View>
          </TouchableOpacity>
          {index == buttons.length ? null : <View style={{height: DeviceConst.minLineHeight, width: DeviceConst.width * 0.9, backgroundColor: '#c5c5c5'}}/>}
        </View>
      )
    })
  }
  render(){
    const { buttons, cancelButton, options } = this.props;
    const cancelButtonTitle =  typeof cancelButton == 'string' ? (cancelButton.length > 0 ? cancelButton : '取消') : (typeof cancelButton == 'object' && !Array.isArray(cancelButton) ? (cancelButton.text ? cancelButton.text : '取消') : '取消' )
    const cancelButtonStyle = (typeof cancelButton == 'object' && !Array.isArray(cancelButton) ? cancelButton.style : null)
    return (
      <Animated.View style={[styles.container,{ top: this.state.actionSheetTop}]} activeOpacity={0.8} onPress={()=>{}}>
        <View style={{ width: DeviceConst.width * 0.9, height: buttons.length * options.itemHeight, borderRadius, overflow: 'hidden', marginBottom: 8 }}>
          {this.renderButtonItem()}
        </View>
        <TouchableOpacity activeOpacity={0.9} onPress={()=>{
          this.hideActionSheet(()=>this.props.itemOnPress(-1))
        }} style={{ width: DeviceConst.width * 0.9, height: options.itemHeight, borderRadius, backgroundColor: options.cancelButtonBackgroundColor, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[{fontSize: options.fontSize, color: options.cancelButtonTitleColor}, cancelButtonStyle]}>{cancelButtonTitle}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

export default ActionSheet

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'orange'
  }
})