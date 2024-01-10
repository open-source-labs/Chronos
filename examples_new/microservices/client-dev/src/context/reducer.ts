import { ActionType } from './actions';
import { StateInterface, ItemInterface, OrderInterface } from './appContext';

type Action =
  | {
      type: ActionType.START_LOADING;
    }
  | {
      type: ActionType.STOP_LOADING;
    }
  | {
      type: ActionType.LOGIN_USER;
      payload: { user: string };
    }
  | {
      type: ActionType.LOGOUT_USER;
    }
  | {
      type: ActionType.RETRIEVED_ITEMS;
      payload: {
        items: ItemInterface[];
      };
    }
  | {
      type: ActionType.RETRIEVED_ORDERS;
      payload: {
        orders: OrderInterface[];
      };
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
        user: action.payload.user,
        isLoading: false,
      };
    case ActionType.LOGOUT_USER:
      return {
        ...state,
        user: '',
        isLoading: false,
      };
    case ActionType.RETRIEVED_ITEMS:
      return {
        ...state,
        items: action.payload.items,
        isLoading: false,
      };
    case ActionType.RETRIEVED_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
