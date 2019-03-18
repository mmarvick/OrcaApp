import WebViewRequestStatus from './webViewRequestStatus';
import WebViewRequestType from './webViewRequestType';

export type WebViewRequest = {
  id: string;
  type: WebViewRequestType;
  data?: any;
  status?: WebViewRequestStatus;
  startAt: Date;
  completedAt?: Date;
}

export default WebViewRequest;
