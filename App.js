import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
const domain = 'http://www.naver.com/';

const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log(fcmToken);
    return fcmToken;
  }
};
checkToken();
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexPage: {uri: domain + '?ver=1', headers: {fcmTocken: checkToken}},
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webview}
          source={this.state.indexPage}
          originWhitelist={['*']}
          ref={webview => (this.appWebview = webview)}
          javaScriptEnabled={true}
          useWebKit={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  webview: {
    flex: 1,
  },
});
