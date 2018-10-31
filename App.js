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
  Dimensions
} from 'react-native';
import { RRCAlert, RRCLoading } from './src';
import LoadingImage from './src/img/loading.gif';
export default class App extends Component {
  constructor(props) {
    super(props);
    RRCLoading.setLoadingOptions({
      loadingImage: LoadingImage,
      text: 'gogogo',
      loadingBackgroundColor: 'rgba(0,0,0,0.5)',
      loadingViewBackgroundColor: 'rgba(0,0,0,0)'
    })
    RRCAlert.setAlertOptions({
      alertBackgroundColor: 'rgba(0,0,0,0.3)'
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          RRCLoading.show('努力加载中...')
          RRCLoading.setLoadingOptions({
            loadingImage: '',
            text: 'gogogo',
            loadingBackgroundColor: 'rgba(0,0,0,0)',
            loadingViewBackgroundColor: 'rgba(0,0,0,0.9)'
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
            RRCLoading.show('Loading...')
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
            'content content content content content content content content content content ',
            [{ text: '确定' }]
          )

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
            },
            {
              contentTextStyle: {
                fontSize: 14,
                textAlign: 'left'
              }
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

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fd521d'

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
