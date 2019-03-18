import {
  createAppContainer,
  createSwitchNavigator,
  NavigationRouteConfigMap,
  SwitchNavigatorConfig
} from 'react-navigation';

import { SwitchRoutes } from '../routes';
import LoginScreen from '../../auth/screen/login';

const RouteConfig: NavigationRouteConfigMap = {
  [SwitchRoutes.SWITCH_AUTH]: {
    screen: LoginScreen
  }
}

const NavigatorConfig: SwitchNavigatorConfig = {
  initialRouteName: SwitchRoutes.SWITCH_AUTH,
  backBehavior: 'none'
}

export default createAppContainer(
  createSwitchNavigator(RouteConfig, NavigatorConfig)
);
