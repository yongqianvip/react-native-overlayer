import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Image
} from 'react-native';
import RRCTopView from './RRCTopView';

let LoadingOptions

export default class OverlayLoading {
    static setLoadingOptions(options = {}) {
        LoadingOptions = options;
    }
    static show(textContent = (LoadingOptions && LoadingOptions.text ? LoadingOptions.text : '加载中...')) {
        const loadingView = (
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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