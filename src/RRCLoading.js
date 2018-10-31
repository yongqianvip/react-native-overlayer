import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Image
} from 'react-native';
import RRCTopView from './RRCTopView';

let LoadingOptions = {}

export default class OverlayLoading {
    static setLoadingOptions(options = {}) {
        if (options.text != undefined) {
            LoadingOptions.text = options.text;
        }
        if (options.loadingBackgroundColor != undefined) {
            LoadingOptions.loadingBackgroundColor = options.loadingBackgroundColor;
        }
        if (options.loadingViewBackgroundColor != undefined) {
            LoadingOptions.loadingViewBackgroundColor = options.loadingViewBackgroundColor;
        }
        if (options.loadingImage != undefined) {
            LoadingOptions.loadingImage = options.loadingImage;
        }

    }
    static show(textContent = (LoadingOptions && LoadingOptions.text ? LoadingOptions.text : '加载中...')) {
        const loadingBackgroundColor = LoadingOptions.loadingBackgroundColor ? LoadingOptions.loadingBackgroundColor : 'rgba(0,0,0,0.3)';
        const loadingViewBackgroundColor = LoadingOptions.loadingViewBackgroundColor ? LoadingOptions.loadingViewBackgroundColor : 'rgba(0,0,0,0)'
        const loadingView = (
            <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: loadingBackgroundColor, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: loadingViewBackgroundColor, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 5 }}>
                    {
                        LoadingOptions && LoadingOptions.loadingImage ?
                            <Image source={LoadingOptions.loadingImage} style={{ margin: 10 }} />
                            :
                            <ActivityIndicator
                                color={'#fff'}
                                animating={true}
                                style={{ margin: 10 }}
                                size="large"
                            />
                    }
                    <Text style={{ color: '#fff' }}>{textContent}</Text>
                </View>
            </View>
        )
        RRCTopView.addLoading(loadingView);
    }

    static hide() {
        RRCTopView.removeLoading();
    }

    static transformRoot(transform, animated, animatesOnly = null) {
        RRCTopView.transform(transform, animated, animatesOnly);
    }

    static restoreRoot(animated, animatesOnly = null) {
        RRCTopView.restore(animated, animatesOnly);
    }
}