import * as uuid from 'uuid'

import { addWebViewRequest } from './actions';
import WebViewRequest from './models/webViewRequest';
import WebViewRequestType from './models/webViewRequestType';

export const createLoginRequest = (username: string, password: string) => {
  let request: WebViewRequest = {
    id: uuid.v4(),
    data: {
      username,
      password
    },
    type: WebViewRequestType.AUTH,
    startAt: new Date()
  };

  return addWebViewRequest(request);
}

export const createCardsRequest = () => {
  let request: WebViewRequest = {
    id: uuid.v4(),
    type: WebViewRequestType.CARDS,
    startAt: new Date()
  };

  return addWebViewRequest(request);
}
