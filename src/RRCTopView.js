/*
 * @Author: yinyongqian
 * @Description:
 * @Date: 2018-11-13 14:45:12
 * @LastEditors: yinyongqian
 * @LastEditTime: 2018-11-28 10:13:02
 */

// RRCTopView.js

'use strict';

import React, { Component } from "react";
import { StyleSheet, AppRegistry, DeviceEventEmitter, View, Animated, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

let keyValue = 0;
const rrcRNLoadingKey = 'rrc-rn-loading-key'

export default class RRCTopView extends Component {

    static addAlert(element) {
        let key = ++keyValue;
        DeviceEventEmitter.emit("addOverlay-Alert", { key, element });
        return key;
    }

    static addLoading(element) {
        let key = rrcRNLoadingKey;
        DeviceEventEmitter.emit("addOverlay-Loading", { key, element });
        return key;
    }

    static addToast(element) {
        let key = ++keyValue;
        DeviceEventEmitter.emit("addOverlay-Toast", { key, element });
        return key;
    }

    static removeLoading() {
        DeviceEventEmitter.emit("removeOverlay-Loading");
    }

    static removeAlert(key) {
        DeviceEventEmitter.emit("removeOverlay-Alert", { key });
    }

    static removeToast(key) {
        DeviceEventEmitter.emit("removeOverlay-Toast", { key });
    }

    static removeAll() {
        DeviceEventEmitter.emit("removeAllOverlay-Alert", {});
    }

    static transform(transform, animated, animatesOnly = null) {
        DeviceEventEmitter.emit("transformRoot-Alert", { transform, animated, animatesOnly });
    }

    static restore(animated, animatesOnly = null) {
        DeviceEventEmitter.emit("restoreRoot-Alert", { animated, animatesOnly });
    }

    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            translateX: new Animated.Value(0),
            translateY: new Animated.Value(0),
            scaleX: new Animated.Value(1),
            scaleY: new Animated.Value(1),
            toastElements: [],
        };
    }

    componentWillMount() {
        DeviceEventEmitter.addListener("addOverlay-Alert", e => this.addAlertToTopView(e));
        DeviceEventEmitter.addListener("removeOverlay-Alert", e => this.removeAlertFromTopView(e));
        DeviceEventEmitter.addListener("removeAllOverlay-Alert", e => this.removeAll(e));
        DeviceEventEmitter.addListener("transformRoot-Alert", e => this.transform(e));
        DeviceEventEmitter.addListener("restoreRoot-Alert", e => this.restore(e));

        DeviceEventEmitter.addListener("addOverlay-Loading", e => this.addLoadingToTopView(e));
        DeviceEventEmitter.addListener("removeOverlay-Loading", () => this.removeLoadingFromTopView());

        DeviceEventEmitter.addListener("addOverlay-Toast", e => this.addToastToTopView(e));
        DeviceEventEmitter.addListener("removeOverlay-Toast", (e) => this.removeLToastFromTopView(e));
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners("addOverlay-Alert");
        DeviceEventEmitter.removeAllListeners("removeOverlay-Alert");
        DeviceEventEmitter.removeAllListeners("removeAllOverlay-Alert");
        DeviceEventEmitter.removeAllListeners("transformRoot-Alert");
        DeviceEventEmitter.removeAllListeners("restoreRoot-Alert");

        DeviceEventEmitter.removeAllListeners("addOverlay-Loading");
        DeviceEventEmitter.removeAllListeners("removeOverlay-Loading");

        DeviceEventEmitter.removeAllListeners("addOverlay-Toast");
        DeviceEventEmitter.removeAllListeners("removeOverlay-Toast");
    }

    addAlertToTopView(e) {
        let { elements } = this.state;
        elements.push(e);
        this.setState({ elements });
    }

    removeAlertFromTopView(e) {
        let { elements } = this.state;
        for (let i = elements.length - 1; i >= 0; --i) {
            if (elements[i].key === e.key) {
                elements.splice(i, 1);
                break;
            }
        }
        this.setState({ elements });
    }

    removeLToastFromTopView(e) {
        let { toastElements } = this.state;
        for (let i = toastElements.length - 1; i >= 0; --i) {
            if (toastElements[i].key === e.key) {
                toastElements.splice(i, 1);
                break;
            }
        }
        this.setState({ toastElements });
    }

    addLoadingToTopView(e) {
        let { elements } = this.state;
        for (let i = elements.length - 1; i >= 0; --i) {
            if (elements[i].key === rrcRNLoadingKey) {
                elements.splice(i, 1);
            }
        }
        elements.push(e);
        this.setState({ elements });
    }

    removeLoadingFromTopView() {
        let { elements } = this.state;
        for (let i = elements.length - 1; i >= 0; --i) {
            if (elements[i].key === rrcRNLoadingKey) {
                elements.splice(i, 1);
                break;
            }
        }
        this.setState({ elements });
    }



    addToastToTopView(e) {
        let { toastElements } = this.state;
        toastElements.push(e);
        this.setState({ toastElements });
    }

    removeAll(e) {
        let { elements } = this.state;
        this.setState({ elements: [] });
    }

    transform(e) {
        let { translateX, translateY, scaleX, scaleY } = this.state;
        let { transform, animated, animatesOnly } = e;
        let tx = 0, ty = 0, sx = 1, sy = 1;
        transform.map(item => {
            if (item && typeof item === 'object') {
                for (let name in item) {
                    let value = item[name];
                    switch (name) {
                        case 'translateX': tx = value; break;
                        case 'translateY': ty = value; break;
                        case 'scaleX': sx = value; break;
                        case 'scaleY': sy = value; break;
                    }
                }
            }
        });
        if (animated) {
            let animates = [
                Animated.spring(translateX, { toValue: tx, friction: 9 }),
                Animated.spring(translateY, { toValue: ty, friction: 9 }),
                Animated.spring(scaleX, { toValue: sx, friction: 9 }),
                Animated.spring(scaleY, { toValue: sy, friction: 9 }),
            ];
            animatesOnly ? animatesOnly(animates) : Animated.parallel(animates).start();
        } else {
            if (animatesOnly) {
                let animates = [
                    Animated.timing(translateX, { toValue: tx, duration: 1 }),
                    Animated.timing(translateY, { toValue: ty, duration: 1 }),
                    Animated.timing(scaleX, { toValue: sx, duration: 1 }),
                    Animated.timing(scaleY, { toValue: sy, duration: 1 }),
                ];
                animatesOnly(animates);
            } else {
                translateX.setValue(tx);
                translateY.setValue(ty);
                scaleX.setValue(sx);
                scaleY.setValue(sy);
            }
        }

    }

    restore(e) {
        let { translateX, translateY, scaleX, scaleY } = this.state;
        let { animated, animatesOnly } = e;
        if (animated) {
            let animates = [
                Animated.spring(translateX, { toValue: 0, friction: 9 }),
                Animated.spring(translateY, { toValue: 0, friction: 9 }),
                Animated.spring(scaleX, { toValue: 1, friction: 9 }),
                Animated.spring(scaleY, { toValue: 1, friction: 9 }),
            ];
            animatesOnly ? animatesOnly(animates) : Animated.parallel(animates).start();
        } else {
            if (animatesOnly) {
                let animates = [
                    Animated.timing(translateX, { toValue: 0, duration: 1 }),
                    Animated.timing(translateY, { toValue: 0, duration: 1 }),
                    Animated.timing(scaleX, { toValue: 1, duration: 1 }),
                    Animated.timing(scaleY, { toValue: 1, duration: 1 }),
                ];
                animatesOnly(animates);
            } else {
                translateX.setValue(0);
                translateY.setValue(0);
                scaleX.setValue(1);
                scaleY.setValue(1);
            }
        }
    }

    render() {
        let { elements, toastElements, translateX, translateY, scaleX, scaleY } = this.state;
        let transform = [{ translateX }, { translateY }, { scaleX }, { scaleY }];
        // 如果存在loading  只加载loading，loading结束后加载其他element
        let laodingItem = null;
        for (let i = elements.length - 1; i >= 0; --i) {
            if (elements[i].key === rrcRNLoadingKey) {
                laodingItem = elements[i].element;
                break;
            }
        }
        if (laodingItem) {
            return (
                <View style={{ flex: 1 }}>
                    <Animated.View style={{ flex: 1, transform: transform }}>
                        {this.props.children}
                    </Animated.View>
                    <View style={styles.overlayContainer}>
                        {laodingItem}
                    </View>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <Animated.View style={{ flex: 1, transform: transform }}>
                    {this.props.children}
                </Animated.View>
                {
                    elements.length > 0 || toastElements.length > 0 ?
                        <View style={styles.overlayContainer}>
                            {
                                elements.map((item, index) => {
                                    // 同一时刻只加载elements中最后一个element
                                    if (index == elements.length - 1) {
                                        return (
                                            <View key={'RRCTopView' + item.key} style={styles.overlay} >
                                                {item.element}
                                            </View>
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                            }
                            {
                                toastElements.map((item, index) => {
                                    // 同一时刻只加载elements中最后一个element
                                    if (index == toastElements.length - 1) {
                                        return (
                                            <View key={'RRCTopView_Toast' + item.key} style={styles.overlay} >
                                                {item.element}
                                            </View>
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </View>
                        : null
                }
            </View>
        );
    }
}

var styles = StyleSheet.create({
    overlayContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
    }
});

if (!AppRegistry.registerComponentOld) {
    AppRegistry.registerComponentOld = AppRegistry.registerComponent;
}

AppRegistry.registerComponent = function (appKey, componentProvider) {

    class RootElement extends Component {
        render() {
            let Component = componentProvider();
            return (
                <RRCTopView>
                    <Component {...this.props} />
                </RRCTopView>
            );
        }
    }

    return AppRegistry.registerComponentOld(appKey, () => RootElement);
}
