import React from 'react';
import { ReactNode } from 'react';

import { createContext, useReducer, useContext, useEffect } from 'react';
import { ActionType } from './actions';
import reducer from './reducer';
import { customFetch } from '../util/customFetch';
import { Fruit } from '../util/types';

import axios, { AxiosError } from 'axios';

const authFetch = customFetch(3000);
const itemFetch = customFetch(3001);
const inventoryFetch = customFetch(3002);
const orderFetch = customFetch(3003);

export interface ItemInterface {
  id: string;
  itemName: string;
  units: number;
}

export interface OrderInterface {
  id: string;
  item: string;
  amount: number;
}

export interface StateInterface {
  isLoading: boolean;
  user: string;
  items: ItemInterface[];
  orders: OrderInterface[];
}

const initialState: StateInterface = {
  isLoading: true,
  user: '',
  items: [],
  orders: [],
};

interface AppContextInterface extends StateInterface {
  startLoading: () => void;
  stopLoading: () => void;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
  createItem: (fruit: Fruit) => void;
  getAllItems: () => void;
  adjustInventory: (itemId: string, newUnits: number) => void;
  createOrder: (item: string, amount: number) => void;
  getAllOrders: () => void;
  throw404: () => void;
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
  createOrder: () => null,
  getAllOrders: () => null,
  throw404: () => null,
});

type Props = {
  children: ReactNode;
};

const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getAllItems();
    getAllOrders();
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
      setTimeout(() => {
        dispatch({ type: ActionType.LOGIN_USER, payload: { user: response.data.username } });
        stopLoading();
      }, 1000);
    } catch (err) {
      console.log(err);
      stopLoading();
    }
  };

  const logoutUser = async () => {
    try {
      await authFetch.post('/auth/logout');
      dispatch({ type: ActionType.LOGOUT_USER });
    } catch (err) {
      console.log(err);
    }
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
      await getAllItems();
    } catch (err) {
      if (err instanceof AxiosError) {
        window.alert(err.message);
      }
      console.log(err);
      stopLoading();
    }
  };

  const getAllItems = async () => {
    startLoading();
    try {
      const allItemsResponse = await inventoryFetch('/inventory/getAllItems');
      setTimeout(() => {
        dispatch({ type: ActionType.RETRIEVED_ITEMS, payload: { items: allItemsResponse.data } });
      }, 1500);
    } catch (err) {
      console.log(err);
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

  const createOrder = async (item: string, amount: number) => {
    if (item !== 'hat' && item !== 'shirt' && item !== 'pants') return;
    if (amount < 0 || amount > 9) return;
    try {
      startLoading();
      await orderFetch.post('/orders/createOrder', {
        item,
        amount,
      });
      await getAllOrders();
    } catch (err) {
      if (err instanceof AxiosError) {
        window.alert(err.message);
      }
      console.log(err);
      stopLoading();
    }
  };

  const getAllOrders = async () => {
    startLoading();
    try {
      const allOrdersResponse = await orderFetch('/orders/getAllOrders');
      setTimeout(() => {
        dispatch({
          type: ActionType.RETRIEVED_ORDERS,
          payload: { orders: allOrdersResponse.data },
        });
      }, 1000);
    } catch (err) {
      console.log(err);
    }
    stopLoading();
  };

  const throw404 = async () => {
    startLoading();
    try {
      await itemFetch('/items/nonExistentRoute');
    } catch (err) {
      setTimeout(() => {}, 1000);
      window.alert(err);
      stopLoading();
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
        createOrder,
        getAllOrders,
        adjustInventory,
        throw404,
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
