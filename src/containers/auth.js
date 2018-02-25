import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect  } from 'redux-auth-wrapper/history4/redirect';

import Authenticating from './Authenticating';

const locationHelper = locationHelperBuilder({})

export const userIsStudent = connectedRouterRedirect ({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => Boolean(state.user.user_type) && state.user.user_type === "student",
  wrapperDisplayName: 'UserIsStudent',
})

export const userIsRecruiter = connectedRouterRedirect ({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => Boolean(state.user.user_type) && state.user.user_type === "recruiter",
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