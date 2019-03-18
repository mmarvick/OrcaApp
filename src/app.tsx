import React from 'react';
import {
  View
} from 'react-native';

import RootNavigator from './navigation/navigators/root';
import WebViewComponent from './webview/components/webview';

export default class AppComponent extends React.Component {
  public render() {
    return (
      <View style={{flex: 1}}>
        <RootNavigator />
        <WebViewComponent />
      </View>
    );
  }
}
