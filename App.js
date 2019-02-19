/*
 * @Author: yinyongqian
 * @Description:
 * @Date: 2018-11-13 14:45:11
 * @LastEditors: yinyongqian
 * @LastEditTime: 2019-02-19 10:18:39
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { RRCAlert, RRCLoading, RRCToast } from './src';
import LoadingImage from './src/img/car_list_loading.gif';
import AlertImage from './src/img/alert.png';
import SuccessImage from './src/img/success.png';

export default class App extends Component {
  constructor(props) {
    super(props);
    RRCLoading.setLoadingOptions({
      text: 'gogogo',
      loadingBackgroundColor: 'rgba(0,0,0,0.0)',
      loadingImage: LoadingImage,
      loadingViewStyle: { backgroundColor: 'rgba(0,0,0,0.8)' },
      loadingTextStyle: {}
    })
    // RRCAlert.setAlertOptions({
    //   alertBackgroundColor: 'rgba(0,0,0,0.3)',
    //   titleViewStyle: {},
    //   titleTextStyle: {},
    //   contentTextStyle: {}
    // })
    RRCToast.setToastOptions({
      toastIcons: [AlertImage, SuccessImage],
      toastBackgroundColor: 'rgba(0,0,0,0)',
      toastViewStyle: {},
      toastTextStyle: {},
      durationTime: 3000
    })
  }
  render() {
    return (
      <ScrollView style={{flex: 1, marginBottom: 44, marginTop: 34}}>
        <TouchableOpacity onPress={() => {
          RRCLoading.show('加载中...')
          RRCLoading.setLoadingOptions({
            text: 'gogogo',
            loadingBackgroundColor: 'rgba(0,0,0,0)',
            loadingViewStyle: { backgroundColor: 'rgba(0,0,0,0.9)' }
          })
          setTimeout(() => {
            RRCLoading.hide()
          }, 2000);
        }}>
          <Text style={styles.welcome}>
            Show loading >> hide loading after 2s
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          RRCAlert.alert('normal');
        }}>
          <Text style={styles.welcome}>
            Alert normal
        </Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {
          RRCAlert.alert('loading and alert')
          setTimeout(() => {
            RRCLoading.setLoadingOptions({
              text: 'loading',
              loadingImage: ''
            })
            RRCLoading.show('加载中')
          }, 1000);
          setTimeout(() => {
            RRCLoading.hide()
          }, 3000);
        }}>
          <Text style={styles.welcome}>
            Alert normal >> show loading after 1s >> hide loading after 3s
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          RRCLoading.show('Loading...')
          setTimeout(() => {
            RRCLoading.hide()
          }, 3000);
        }}>
          <Text style={styles.welcome}>
            Alert nothing and show loading
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          RRCAlert.alert('title title')
        }}>
          <Text style={styles.welcome}>
            Alert title only
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          RRCAlert.alert('only title && very looooooooooooooooooooooooooooooong')
        }}>
          <Text style={styles.welcome}>
            Alert long title only
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          RRCAlert.alert(
            null,
            '这是Alert的内容，如果内容很多会自动折行，行高20 ',
            [{ text: '确定' }]
          )
          // 可以中途修改样式
          // RRCAlert.setAlertOptions({
          //   contentTextStyle: {backgroundColor: 'red'}
          // })

        }}>
          <Text style={styles.welcome}>
            Alert content only
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          RRCAlert.alert(
            'RRC提醒',
            `1、这是第一行\n2、这是第二行通过使用${"\/n"}可以折行\n3、第三行`,
            [{
              text: '取消',
            }, {
              text: '删除',
              style: { color: 'red' }
            }],
            (index) => {
              console.log(`index = ${index} clicked`);
            }
          )
        }}>
          <Text style={styles.welcome}>
            Alert mutltiple lines
        </Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {
          RRCAlert.alert('多选', '三选一', [{
            text: '给个好评',
          }, {
            text: '去吐槽',
          }, {
            text: '下次再说',
          }], (index) => {
            console.log(`index = ${index} clicked`);
          })
          setTimeout(() => {
            RRCAlert.alert(
              null,
              '内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
              [{ text: '确定' }]
            )
          }, 2000);
        }}>
          <Text style={styles.welcome}>
            Alert with three buttons >> Alert normal after 2s
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          RRCAlert.alert('normal');
          RRCToast.show('操作成功，可以继续', 1, 1000);
        }}>
          <Text style={styles.welcome}>
            show toast and alert
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          RRCToast.show('操作成功');
        }}>
          <Text style={styles.welcome}>
            show toast text only (one line)
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          RRCToast.show('操作成功，可以继续，操作成功，可以继续，操作成功，可以继续，操作成功，可以继续，5s后消失', null, 5000);
        }}>
          <Text style={styles.welcome}>
            show toast text only (multiple lines)
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          RRCLoading.show('正在上传图片...');
          setTimeout(() => {
            RRCLoading.hide()
            RRCToast.show('操作成功', 1);
          }, 2000);
        }}>
          <Text style={styles.welcome}>
            loading 2s later hide loading and show toast
        </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    backgroundColor: '#c2c2c2',
    width: Dimensions.get('window').width,
    padding: 5
  },
});
