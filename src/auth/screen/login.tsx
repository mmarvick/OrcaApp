import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { connect } from 'react-redux';

import { AppState } from '../../rootReducer';
import {
  createLoginRequest,
  createCardsRequest
} from '../../webview/createRequestActions';
import AuthStatus from '../models/authStatus';

type PropsFromState = {
  authStatus: AuthStatus;
}

type PropsFromDispatch = {
  login: (username: string, password: string) => void;
  fetchCards: () => void;
}

type ComponentState = {
  username: string;
  password: string;
}

type ComponentProps = PropsFromState & PropsFromDispatch;

class LoginScreen extends Component<ComponentProps, ComponentState> {
  public componentDidUpdate(prevProps: ComponentProps) {
    if (prevProps.authStatus !== AuthStatus.AUTHED && this.props.authStatus === AuthStatus.AUTHED) {
      this.props.fetchCards();
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>
          Username:
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={this.setUsername}
        >
        </TextInput>
        <Text>
          Password:
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={this.setPassword}
        >
        </TextInput>
        <Button
          title='Sign in'
          onPress={this.login}
        />
        <Text>
          {this.props.authStatus}
        </Text>
      </View>
    );
  }

  private setUsername = (username: string) => this.setState({username});
  private setPassword = (password: string) => this.setState({password});

  private login = () =>
    this.props.login(
      this.state.username,
      this.state.password
    )
}

const styles = StyleSheet.create<{
  container: ViewStyle,
  textInput: TextStyle
}>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    alignSelf: 'stretch',
    marginHorizontal: 36
  }
})

const mapPropsFromState = (state: AppState): PropsFromState => ({
  authStatus: state.auth.status
})

const mapPropsFromDispatch = {
  login: createLoginRequest,
  fetchCards: createCardsRequest
}

export default connect(
  mapPropsFromState,
  mapPropsFromDispatch
)(LoginScreen);
