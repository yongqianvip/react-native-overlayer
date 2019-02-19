/*
 * @Author: yinyongqian
 * @Description:
 * @Date: 2018-11-13 14:45:11
 * @LastEditors: yinyongqian
 * @LastEditTime: 2018-11-28 10:50:01
 */

import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import RRCTopView from './RRCTopView';
const { width, height } = Dimensions.get('window')
const borderRadius = 10;
const backgroundColor = 'rgba(0,0,0,0.1)';
const titleTextFontSize = 16;
const buttonTextFontSize = 16;
const contentTextFontSize = 14;

const AlertOptions = {}

export default class OverlayAlert {
    static setAlertOptions(options = {}) {
        if (typeof options.alertBackgroundColor == 'string') {
            AlertOptions.alertBackgroundColor = options.alertBackgroundColor;
        }
        if (typeof options.titleViewStyle == 'object' && !Array.isArray(options.titleViewStyle)) {
            AlertOptions.titleViewStyle = options.titleViewStyle;
        }
        if (typeof options.titleTextStyle == 'object' && !Array.isArray(options.titleTextStyle)) {
            AlertOptions.titleTextStyle = options.titleTextStyle;
        }
        if (typeof options.contentTextStyle == 'object' && !Array.isArray(options.contentTextStyle)) {
            AlertOptions.contentTextStyle = options.contentTextStyle;
        }
    }

    static alert(title, content, buttons, Callback) {
        title = title || '';
        content = content || '';
        buttons = buttons || [];
        if (title.length < 1 && content.length < 1) {
            console.log('title和content不能同时为空', title, content);
            return;
        }
        if (!Array.isArray(buttons) || buttons.length < 1) {
            buttons = [{ text: '确定', style: { color: '#fd521d', fontWeight: 'bold' } }]
        }
        let key;
        const alertBackgroundColor = AlertOptions.alertBackgroundColor && typeof AlertOptions.alertBackgroundColor == 'string' ? AlertOptions.alertBackgroundColor : 'rgba(0,0,0,0.3)'
        const overlayView = (
            <View style={{ width, height, backgroundColor: alertBackgroundColor, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ width: width * 0.7, borderRadius, backgroundColor: '#fff', overflow: 'hidden' }}>
                    {
                        title.length > 0 ?
                            <View style={[{
                                padding: content.length < 1 ? 20 : 10,
                                paddingTop: content.length < 1 ? 20 : 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: borderRadius,
                                borderTopRightRadius: borderRadius,
                            },{ ...AlertOptions.titleViewStyle }]}>
                                <Text style={[{ fontSize: titleTextFontSize, fontWeight: 'bold', textAlign: 'center' }, {...AlertOptions.titleTextStyle }]}>{title}</Text>
                            </View>
                            :
                            <View style={{
                                height: borderRadius + 5,
                                borderTopLeftRadius: borderRadius,
                                borderTopRightRadius: borderRadius,
                                backgroundColor: AlertOptions.contentTextStyle && AlertOptions.contentTextStyle.backgroundColor ? AlertOptions.contentTextStyle.backgroundColor : '#FFF'
                            }} />
                    }
                    {
                        content.length > 0 ?
                            <Text style={[{
                                fontSize: contentTextFontSize,
                                padding: 20,
                                paddingTop: 5,
                                textAlign: 'center',
                                lineHeight: 20,
                                backgroundColor: '#FFF',
                            }, { ...AlertOptions.contentTextStyle }]}>
                                {content}
                            </Text>
                            : null
                    }
                    <View style={{
                        height: 1,
                        backgroundColor,
                        width: width * 0.7
                    }} />
                    {
                        buttons.length < 3 ?
                            <View style={{
                                height: 44,
                                // flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor,
                                borderBottomLeftRadius: borderRadius,
                                borderBottomRightRadius: borderRadius
                            }}>
                                {
                                    buttons.map((item, index) => {
                                        return (
                                            <TouchableOpacity activeOpacity={0.5} key={'alert-button-' + index} style={{
                                                flex: 1,
                                                height: 44,
                                                marginLeft: index == 0 ? 0 : 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: '#fff',
                                                borderBottomLeftRadius: index == 0 ? borderRadius : 0,
                                                borderBottomRightRadius: index == buttons.length - 1 ? borderRadius : 0
                                            }} onPress={() => {
                                                RRCTopView.removeAlert(key);
                                                Callback && Callback(index);
                                            }} >
                                                <Text style={[{ fontSize: buttonTextFontSize }, { ...item.style }]}>{item.text}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            :
                            <View style={{
                                height: 45 * buttons.length - 1,
                                alignItems: 'center',
                                backgroundColor,
                                borderBottomLeftRadius: borderRadius,
                                borderBottomRightRadius: borderRadius
                            }}>
                                {
                                    buttons.map((item, index) => {
                                        return (
                                            <TouchableOpacity activeOpacity={0.5} key={'alert-button-' + index} style={{
                                                height: 44,
                                                width: width * 0.7,
                                                marginTop: index == 0 ? 0 : 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: '#fff',
                                                borderBottomLeftRadius: index == buttons.length - 1 ? borderRadius : 0,
                                                borderBottomRightRadius: index == buttons.length - 1 ? borderRadius : 0
                                            }} onPress={() => {
                                                RRCTopView.removeAlert(key);
                                                Callback && Callback(index);
                                            }} >
                                                <Text style={[{ fontSize: buttonTextFontSize }, { ...item.style }]}>{item.text}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                    }
                </View>
            </View>
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