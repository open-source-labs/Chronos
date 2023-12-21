import { createContext, useReducer, useContext, useEffect } from 'react';
import { ActionType } from './actions';
import reducer from './reducer';
import { customFetch } from '../util/customFetch';

const authFetch = customFetch(3000);
// const itemFetch = customFetch(3001);
// const inventoryFetch = customFetch(3002);
// const orderFetch = customFetch(3003);

interface Item {
  id: string;
  seller: string;
  name: string;
  unitPrice: number;
  unitsAvailable: number;
}

export interface StateInterface {
  isLoading: boolean;
  user: string;
  myItems: Item[];
  itemsForPurchase: Item[];
}

const initialState: StateInterface = {
  isLoading: false,
  user: '',
  myItems: [],
  itemsForPurchase: [],
};

interface AppContextInterface extends StateInterface {
  startLoading: () => void;
  stopLoading: () => void;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
  getItemsForSale: () => void;
  getMyStoreItems: () => void;
}

const AppContext = createContext<AppContextInterface>({
  ...initialState,
  startLoading: () => null,
  stopLoading: () => null,
  loginUser: () => null,
  logoutUser: () => null,
  getItemsForSale: () => null,
  getMyStoreItems: () => null,
});

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  const startLoading = () => {
    dispatch({ type: ActionType.START_LOADING });
  };

  const stopLoading = () => {
    dispatch({ type: ActionType.STOP_LOADING });
  };

  const loginUser = async (username: string, password: string) => {
    startLoading();
    try {
      const response = await authFetch.post('/auth/login', {
        username,
        password,
      });
      dispatch({ type: ActionType.LOGIN_USER, payload: { user: response.data.username } });
    } catch (err) {
      console.log(err);
    }
    stopLoading();
  };

  const logoutUser = async () => {
    startLoading();
    try {
      const response = await authFetch.post('/auth/logout');
      console.log(response);
      dispatch({ type: ActionType.LOGOUT_USER });
    } catch (err) {
      console.log(err);
    }
    stopLoading();
  };

  const getCurrentUser = async () => {
    startLoading();
    try {
      const response = await authFetch('/auth/current-user');
      const { currentUser } = response.data;
      if (currentUser) {
        dispatch({ type: ActionType.LOGIN_USER, payload: { user: currentUser } });
      }
    } catch (err) {
      console.log(err);
    }
    stopLoading();
  };

  // TODO
  const getItemsForSale = () => {
    console.log('getItemsForSale');
  };

  // TODO
  const getMyStoreItems = () => {
    console.log('getMyStoreItems');
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        startLoading,
        stopLoading,
        loginUser,
        logoutUser,
        getItemsForSale,
        getMyStoreItems,
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
