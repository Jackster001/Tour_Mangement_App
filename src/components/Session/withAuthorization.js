import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { connect } from 'react-redux';
import {auth} from '../Firebase'
const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
    this.listener = auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.LOGIN);
          }
        },
      );
    }
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return condition(this.props.authUser==true) ? (
        <Component {...this.props} />
      ) : null;
    }
  }
  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });
  return compose(
    withRouter,
    connect(mapStateToProps),
  )(WithAuthorization);
};
export default withAuthorization;