import { createReducer, on } from '@ngrx/store';

import { User } from '../../core/models/user.model';
import { LocalDataService } from '../../core/services/localStorage/local-data.service';
import { parseJWT } from '../../core/utils/utils';
import * as AuthActions from '../actions/auth.actions';
import * as AuthApiActions from '../actions/auth-api.actions';
import * as UserActions from '../actions/user.actions';
import * as UserApiActions from '../actions/user-api.actions';

export interface TokenData {
  token: string;
  issuedAt: number;
}

export interface PageInfo {
  isLoading: boolean;
  error: string | null;
}

export interface CurrentUserState {
  user: User;
  token: TokenData;
  page: PageInfo;
}

const initState: CurrentUserState = {
  user: {
    id: '',
    name: '',
    login: '',
  },
  token: {
    token: '',
    issuedAt: 0,
  },
  page: {
    isLoading: false,
    error: null,
  },
};

const onDataRequest = (state: CurrentUserState): CurrentUserState => ({
  ...state,
  page: {
    error: null,
    isLoading: true,
  },
});

const localData = new LocalDataService();

export const authReducer = createReducer(
  initState,

  on(AuthActions.loginUser, onDataRequest),

  on(
    AuthApiActions.loginUserFailure,
    (state, action): CurrentUserState => ({
      ...state,
      page: {
        error: action.error.message,
        isLoading: false,
      },
    }),
  ),

  on(AuthApiActions.loginUserSuccess, (state, action): CurrentUserState => {
    const tokenData = parseJWT(action.token);
    if (tokenData) {
      localData.userToken = action.token;

      return {
        ...state,
        user: {
          id: tokenData.userId,
          login: tokenData.login,
          name: '',
        },
        token: {
          token: action.token,
          issuedAt: tokenData.iat,
        },
        page: {
          error: null,
          isLoading: false,
        },
      };
    }
    return state;
  }),

  on(AuthActions.logoutUser, (state): CurrentUserState => {
    localData.userToken = '';
    return {
      ...state,
      ...initState,
    };
  }),

  on(AuthActions.registerUser, onDataRequest),

  on(
    AuthApiActions.registerUserFailure,
    (state, action): CurrentUserState => ({
      ...state,
      page: {
        error: action.error.message,
        isLoading: false,
      },
    }),
  ),

  on(AuthApiActions.registerUserSuccess, (state, action): CurrentUserState => {
    const { id, name, login } = action.user;
    return {
      ...state,
      user: { id, name, login },
      page: {
        error: null,
        isLoading: false,
      },
    };
  }),

  on(AuthActions.checkToken, (state) => {
    const token = localData.userToken;
    if (token) {
      const tokenData = parseJWT(token);
      if (tokenData) {
        return {
          ...state,
          user: {
            id: tokenData.userId,
            login: tokenData.login,
            name: '',
          },
          token: {
            token,
            issuedAt: tokenData.iat,
          },
          page: {
            error: null,
            isLoading: false,
          },
        };
      }
    }
    return state;
  }),

  on(UserActions.getUser, onDataRequest),

  on(
    UserApiActions.getUserFailure,
    (state, action): CurrentUserState => ({
      ...state,
      page: {
        error: action.error.message,
        isLoading: false,
      },
    }),
  ),

  on(
    UserApiActions.getUserSuccess,
    (state, action): CurrentUserState => ({
      ...state,
      user: action.user,
      page: {
        error: null,
        isLoading: false,
      },
    }),
  ),

  on(UserActions.updateUser, onDataRequest),

  on(
    UserApiActions.updateUserFailure,
    (state, action): CurrentUserState => ({
      ...state,
      page: {
        error: action.error.message,
        isLoading: false,
      },
    }),
  ),

  on(
    UserApiActions.updateUserSuccess,
    (state, action): CurrentUserState => ({
      ...state,
      user: action.user,
      page: {
        error: null,
        isLoading: false,
      },
    }),
  ),

  on(UserActions.deleteUser, onDataRequest),

  on(
    UserApiActions.deleteUserFailure,
    (state, action): CurrentUserState => ({
      ...state,
      page: {
        error: action.error.message,
        isLoading: false,
      },
    }),
  ),

  on(
    UserApiActions.updateUserSuccess,
    (state): CurrentUserState => ({
      ...state,
      ...initState,
    }),
  ),
);