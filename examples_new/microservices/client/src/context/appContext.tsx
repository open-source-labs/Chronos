import { createContext, useReducer, useContext } from 'react';
import { ActionType } from './actions';
import reducer from './reducer';
import axios from 'axios';

interface Item {
  id: string;
  seller: string;
  name: string;
  unitPrice: number;
  unitsAvailable: number;
}

export interface StateInterface {
  isLoading: boolean;
  username: string;
  myItems: Item[];
  itemsForPurchase: Item[];
}

const initialState: StateInterface = {
  isLoading: false,
  username: '',
  myItems: [],
  itemsForPurchase: [],
};

interface AppContextInterface extends StateInterface {
  startLoading: () => void;
  stopLoading: () => void;
  loginUser: (username: string, password: string, isLogin: boolean) => void;
  logoutUser: () => void;
}

const AppContext = createContext<AppContextInterface>({
  ...initialState,
  startLoading: () => null,
  stopLoading: () => null,
  loginUser: () => null,
  logoutUser: () => null,
});

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startLoading = () => {
    dispatch({ type: ActionType.START_LOADING });
  };

  const stopLoading = () => {
    dispatch({ type: ActionType.STOP_LOADING });
  };

  const loginUser = async (username: string, password: string, isLogin: boolean) => {
    startLoading();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/${isLogin ? 'login' : 'signup'}`,
        {
          username,
          password,
        }
      );
      console.log(response);
      dispatch({ type: ActionType.LOGIN_USER, payload: { username: response.data.username } });
    } catch (err) {
      console.log(err);
    }
    stopLoading();
  };

  const logoutUser = async () => {
    startLoading();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/logout');
      console.log(response);
      dispatch({ type: ActionType.LOGOUT_USER });
    } catch (err) {
      console.log(err);
    }
    stopLoading();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        startLoading,
        stopLoading,
        loginUser,
        logoutUser,
      }}
    >
      {children} {/* <App /> */}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext) as AppContextInterface;
};

export { useAppContext, AppContextProvider };
