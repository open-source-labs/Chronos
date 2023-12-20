import { ActionType } from './actions';
import { StateInterface } from './appContext';

type Action =
  | {
      type: ActionType.START_LOADING;
    }
  | {
      type: ActionType.STOP_LOADING;
    }
  | {
      type: ActionType.LOGIN_USER;
      payload: { username: string };
    }
  | {
      type: ActionType.LOGOUT_USER;
    };

const reducer = (state: StateInterface, action: Action) => {
  switch (action.type) {
    case ActionType.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.LOGIN_USER:
      return {
        ...state,
        username: action.payload.username,
        isLoading: false,
      };
    case ActionType.LOGOUT_USER:
      return {
        ...state,
        username: '',
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
