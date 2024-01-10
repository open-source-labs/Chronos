import { createContext, useReducer, useContext, useEffect } from 'react';
import { ActionType } from './actions';
import reducer from './reducer';
import { customFetch } from '../util/customFetch';
import { Fruit } from '../util/types';
import { AxiosError } from 'axios';

const authFetch = customFetch(3000);
const itemFetch = customFetch(3001);
const inventoryFetch = customFetch(3002);
// const orderFetch = customFetch(3003);

export interface ItemInterface {
  id: string;
  itemName: string;
  units: number;
}

export interface StateInterface {
  isLoading: boolean;
  user: string;
  items: ItemInterface[];
}

const initialState: StateInterface = {
  isLoading: false,
  user: '',
  items: [],
};

interface AppContextInterface extends StateInterface {
  startLoading: () => void;
  stopLoading: () => void;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
  createItem: (fruit: Fruit) => void;
  getAllItems: () => void;
  adjustInventory: (itemId: string, newUnits: number) => void;
}

const AppContext = createContext<AppContextInterface>({
  ...initialState,
  startLoading: () => null,
  stopLoading: () => null,
  loginUser: () => null,
  logoutUser: () => null,
  createItem: () => null,
  getAllItems: () => null,
  adjustInventory: () => null,
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
      await authFetch.post('/auth/logout');
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

  const createItem = async (fruit: Fruit) => {
    if (fruit !== 'bananas' && fruit !== 'strawberries' && fruit !== 'grapes') return;
    try {
      startLoading();
      await itemFetch.post('/items/createItem', {
        itemName: fruit,
      });
      stopLoading();
    } catch (err) {
      if (err instanceof AxiosError) {
        window.alert(err.message);
      }
      console.log(err);
      stopLoading();
    }
  };

  const getAllItems = async () => {
    try {
      startLoading();
      const allItemsResponse = await inventoryFetch('/inventory/getAllItems');
      console.log('All Item Response', allItemsResponse.data);
      dispatch({ type: ActionType.RETRIEVED_ITEMS, payload: { items: allItemsResponse.data } });
      stopLoading();
    } catch (err) {
      console.log(err);
      stopLoading();
    }
    stopLoading();
  };

  const adjustInventory = async (itemId: string, newUnits: number) => {
    console.log('💥 Adjust Inventory');

    try {
      const response = await inventoryFetch.patch('/inventory/updateItemInventory', {
        id: itemId,
        units: newUnits,
      });
      dispatch({
        type: ActionType.RETRIEVED_ITEMS,
        payload: {
          items: response.data,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        startLoading,
        stopLoading,
        loginUser,
        logoutUser,
        createItem,
        getAllItems,
        adjustInventory,
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
