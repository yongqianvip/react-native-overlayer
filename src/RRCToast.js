/*
 * @Author: yinyongqian
 * @Description:
 * @Date: 2018-11-13 14:45:11
 * @LastEditors: yinyongqian
 * @LastEditTime: 2018-11-28 11:21:14
 */

import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
} from 'react-native';
import RRCTopView from './RRCTopView';
const { width, height } = Dimensions.get('window')

const ToastOptions = {}

export default class OverlayToast {
    static setToastOptions(options = {}) {
        if (Array.isArray(options.toastIcons)) {
            ToastOptions.toastIcons = options.toastIcons;
        }
        if (typeof options.toastBackgroundColor == 'string') {
            ToastOptions.toastBackgroundColor = options.toastBackgroundColor;
        }
        if (typeof options.toastViewStyle == 'object' && !Array.isArray(options.toastViewStyle)) {
            ToastOptions.toastViewStyle = options.toastViewStyle;
        }
        if (typeof options.toastTextStyle == 'object' && !Array.isArray(options.toastTextStyle)) {
            ToastOptions.toastTextStyle = options.toastTextStyle;
        }
        if (typeof options.durationTime == 'number' && options.durationTime > 0) {
            ToastOptions.durationTime = options.durationTime;
        }
    }
    static show(textContent = '未知信息', type = -1, durationTime) {
        // toast蒙层默认透明
        const toastBackgroundColor = ToastOptions.toastBackgroundColor ? ToastOptions.toastBackgroundColor : 'rgba(0,0,0,0)';
        // toast背景色默认值
        const toastViewBackgroundColor =  ToastOptions.toastViewStyle && ToastOptions.toastViewStyle.backgroundColor ? ToastOptions.toastViewStyle.backgroundColor : 'rgba(0,0,0,0.8)';
        const withIcon = ToastOptions.toastIcons && ToastOptions.toastIcons.length > 0 && type != null && type >= 0 && type < ToastOptions.toastIcons.length;
        const toastView = (
            <View style={{ width, height, left: 0, right: 0, top: 0, bottom: 0, backgroundColor: toastBackgroundColor, justifyContent: 'center', alignItems: 'center' }}>
                <View style={[{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: toastViewBackgroundColor,
                        padding: 10,
                        borderRadius: 5,
                        margin: width * 0.1 },
                    { ...ToastOptions.toastViewStyle }
                ]}>
                    {
                        withIcon ?
                            <Image source={ToastOptions.toastIcons[type]} style={{ marginTop: 5 }} />
                            :
                            null
                    }
                    <Text style={[{
                        color: '#fff',
                        margin: 10,
                        marginBottom: withIcon ? 0 : 10,
                        fontSize: 16,
                        lineHeight: 20,
                        textAlignVertical: 'center',
                        }, { ...ToastOptions.toastTextStyle }]}>{textContent}</Text>
                </View>
            </View>
        )
        const key = RRCTopView.addToast(toastView);
        const showTime = typeof durationTime == 'number' && durationTime > 0 ? durationTime : (ToastOptions.durationTime > 0 ? ToastOptions.durationTime : 2000);
        setTimeout(() => {
            RRCTopView.removeToast(key)
        }, showTime);
    }

    static transformRoot(transform, animated, animatesOnly = null) {
        RRCTopView.transform(transform, animated, animatesOnly);
    }

    static restoreRoot(animated, animatesOnly = null) {
        RRCTopView.restore(animated, animatesOnly);
    }
}