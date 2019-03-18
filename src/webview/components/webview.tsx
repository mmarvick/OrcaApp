import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as uuid from 'uuid';
// @ts-ignore
import { DOMParser } from 'xmldom';

import { AppState } from '../../rootReducer';
import { lastWebViewRequest } from '../selectors';
import AuthStatus from '../../auth/models/authStatus';
import WebViewRequest from '../models/webViewRequest';
import WebViewRequestType from '../models/webViewRequestType';
import {
  setAuthorized,
  setUnauthorized,
  setAuthLoading,
  setAuthPasswordError
} from '../../auth/actions';

type PropsFromState = {
  authStatus: AuthStatus;
  webViewRequest: WebViewRequest
};

type PropsFromDispatch = {
  setAuthorized: () => void;
  setUnauthorized: () => void;
  setAuthLoading: () => void;
  setAuthPasswordError: () => void;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

type ComponentState = {
  key: string;
  targetUri: string;
}

class WebViewComponent extends Component<ComponentProps, ComponentState> {
  private webView: any;

  public state: ComponentState = {
    key: 'webview',
    targetUri: 'https://orcacard.com'
  };

  public render() {
    return (
      <WebView
        ref={ref => this.webView = ref}
        source={{uri: this.state.targetUri}}
        style={{position: 'absolute', width: 300, height: 200, bottom: 0, right: 0, zIndex: 1}}
        onLoadStart={this.onLoadStart}
        onLoad={this.onLoad}
        onLoadEnd={this.onLoadEnd}
        onMessage={this.onMessage}
      >
      </WebView>
    );
  }

  public componentDidUpdate(prevProps: ComponentProps) {
    let currentRequest = this.props.webViewRequest;
    let previousRequest = prevProps.webViewRequest;

    // If there's a new request that hasn't started yet, start it
    if (
      currentRequest &&
      !currentRequest.status &&
      (!previousRequest || previousRequest.id !== currentRequest.id)
    ) {
      this.handleRequest(currentRequest);
    }
  }

  private handleRequest = (request: WebViewRequest) => {
    if (request.type === WebViewRequestType.AUTH) {
      let username = request.data.username;
      let password = request.data.password;
      let setUsername = `document.getElementById('main-username').value = '${username}';`;
      let setPassword = `document.getElementById('head-password').value = '${password}';`;
      let submitForm  = `document.getElementsByName('loginform')[0].submit();`;
      let javascript = _.join([setUsername, setPassword, submitForm], ' ');
      this.webView.injectJavaScript(javascript);
    }
    else if (request.type === WebViewRequestType.CARDS) {
      this.loadUrl('https://orcacard.com/ERG-Seattle/p7_002ad.do');
    }
  }

  private onLoadStart = (event: any) => {
    let url = event && event.nativeEvent ? event.nativeEvent.url : undefined;

    // Login succeeded
    if (url === 'https://orcacard.com/ERG-Seattle/welcomePage.do') {
      this.props.setAuthorized();
    }
  }

  private onLoad = (event: any) => {
    console.log('Load!');
    console.log(event.nativeEvent);
  }

  private onMessage = (event: any) => {
    console.log('Message!');
    console.log(event.nativeEvent);
    let data = event.nativeEvent.data ? JSON.parse(event.nativeEvent.data) : undefined;

    if (data.cards) {
      let cards: Array<any> = [];
      for (let cardsRaw of data.cards) {
        let parsed = new DOMParser().parseFromString(cardsRaw, 'text/html');
        let elements = parsed.getElementsByTagName('tr');
        for (let i = 1; i < elements.length; i++) {
          let cardElement = elements[i];
          let columnElements = cardElement.getElementsByTagName('td');
          cards.push({
            cardNumber: columnElements[0].textContent,
            nickname: columnElements[1].textContent,
            type: columnElements[2].textContent,
            balance: columnElements[3].textContent,
            status: columnElements[4].textContent
          });
        }
      }
      console.log(cards);
    }
  }

  private onLoadEnd = (event: any) => {
    let url = event && event.nativeEvent ? event.nativeEvent.url : undefined;

    // Login failed
    if (url === 'https://orcacard.com/ERG-Seattle/j_security_check') {
      this.props.setAuthPasswordError();
      this.loadUrl('https://orcacard.com');
    }
    // Cards loaded
    else if (url.startsWith('https://orcacard.com/ERG-Seattle/p7_002ad.do')) {
      let variableName = `cards${uuid.v4().substring(0,4)}`;
      let htmlVariableName = `${variableName}html`;

      let getElements = `var ${variableName} = document.getElementsByClassName('data');`;
      let createHtmlVariable = `var ${htmlVariableName} = [];`;
      let getElementsAsHTML = `for (var i = 0; i < ${variableName}.length; i++) { ${htmlVariableName}.push(${variableName}[i].innerHTML); }`;
      let sendMessage = `window.ReactNativeWebView.postMessage(JSON.stringify({cards: ${htmlVariableName}})); true;`;
      let javascript = _.join([getElements, createHtmlVariable, getElementsAsHTML, sendMessage], ' ');
      console.log(javascript);
      this.webView.injectJavaScript(javascript);
    }
  }

  private loadUrl = (url: string) => {
    let randomKeyValue = `${uuid.v4().substring(0, 4)}=${uuid.v4().substring(0, 4)}`;
    let randomExtension = url.indexOf('?') === -1 ? `?${randomKeyValue}` : `&${randomKeyValue}`;
    this.setState({
      targetUri: `${url}${randomExtension}`
    });
  }
}

const mapPropsFromState = (state: AppState): PropsFromState => ({
  authStatus: state.auth.status,
  webViewRequest: lastWebViewRequest(state)
});

const mapPropsFromDispatch = {
  setAuthorized,
  setUnauthorized,
  setAuthLoading,
  setAuthPasswordError
};

export default connect(
  mapPropsFromState,
  mapPropsFromDispatch
)(WebViewComponent);
