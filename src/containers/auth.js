import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect  } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux'

import Authenticating from './Authenticating';

const locationHelper = locationHelperBuilder({})

export const userIsStudent = connectedRouterRedirect ({
  redirectPath: '/login',
  allowRedirectBack: true,
  authenticatedSelector: state => Boolean(state.user.user_type) && state.user.user_type === "student",
  authenticatingSelector: state => state.user.isLoading,
  AuthenticatingComponent: Authenticating,
  wrapperDisplayName: 'UserIsStudent',
})

export const userIsRecruiter = connectedRouterRedirect ({
  redirectPath: '/login',
  allowRedirectBack: true,
  authenticatedSelector: state => Boolean(state.user.user_type),
  authenticatingSelector: state => state.user.isLoading,
  AuthenticatingComponent: Authenticating,
  wrapperDisplayName: 'UserIsRecruiter',
})

export const userIsAuth = connectedRouterRedirect ({
  redirectPath: '/login',
  allowRedirectBack: true,
  authenticatedSelector: state => Boolean(state.user.user_type),
  authenticatingSelector: state => state.user.isLoading,
  AuthenticatingComponent: Authenticating,
  wrapperDisplayName: 'UserIsAuth',
})

export const userIsNotAuth = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
  authenticatedSelector: state => !Boolean(state.user.user_type),
  wrapperDisplayName: 'UserIsNotAuth',
})