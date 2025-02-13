// // import React, { ReactNode, createContext, useReducer, useContext, useEffect } from 'react';
// import { ActionType } from './actions.js';
// import reducer from './reducer.js';
// import { customFetch } from '../util/customFetch.js';
// import { Fruit } from '../util/types.js';
// import axios, { AxiosError } from 'axios';

// const authFetch = customFetch(3000);
// const itemFetch = customFetch(3001);
// const inventoryFetch = customFetch(3002);
// const orderFetch = customFetch(3003);

// export interface ItemInterface {
//   id: string;
//   itemName: string;
//   units: number;
// }

// export interface OrderInterface {
//   id: string;
//   item: string;
//   amount: number;
// }

// export interface StateInterface {
//   isLoading: boolean;
//   user: string;
//   items: ItemInterface[];
//   orders: OrderInterface[];
// }

// const initialState: StateInterface = {
//   isLoading: true,
//   user: '',
//   items: [],
//   orders: [],
// };

// interface AppContextInterface extends StateInterface {
//   startLoading: () => void;
//   stopLoading: () => void;
//   loginUser: (username: string, password: string) => void;
//   logoutUser: () => void;
//   createItem: (fruit: Fruit) => void;
//   getAllItems: () => void;
//   adjustInventory: (itemId: string, newUnits: number) => void;
//   createOrder: (item: string, amount: number) => void;
//   getAllOrders: () => void;
//   throw404: () => void;
// }

// const AppContext = createContext<AppContextInterface>({
//   ...initialState,
//   startLoading: () => null,
//   stopLoading: () => null,
//   loginUser: () => null,
//   logoutUser: () => null,
//   createItem: () => null,
//   getAllItems: () => null,
//   adjustInventory: () => null,
//   createOrder: () => null,
//   getAllOrders: () => null,
//   throw404: () => null,
// });

// type Props = {
//   children: ReactNode;
// };

// const AppContextProvider = ({ children }: Props) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     getCurrentUser();
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     getAllItems();
//     getAllOrders();
//     // eslint-disable-next-line
//   }, []);

//   const startLoading = () => {
//     dispatch({ type: ActionType.START_LOADING });
//   };

//   const stopLoading = () => {
//     dispatch({ type: ActionType.STOP_LOADING });
//   };

//   const loginUser = async (username: string, password: string) => {
//     startLoading();
//     try {
//       const response = await authFetch.post('/auth/login', {
//         username,
//         password,
//       });
//       // Cast response.data to expected type:
//       const data = response.data as { username: string };
//       setTimeout(() => {
//         dispatch({ type: ActionType.LOGIN_USER, payload: { user: data.username } });
//         stopLoading();
//       }, 1000);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.log(err.message);
//       } else {
//         console.log(err);
//       }
//       stopLoading();
//     }
//   };

//   const logoutUser = async () => {
//     try {
//       await authFetch.post('/auth/logout');
//       dispatch({ type: ActionType.LOGOUT_USER });
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.log(err.message);
//       } else {
//         console.log(err);
//       }
//     }
//   };

//   const getCurrentUser = async () => {
//     startLoading();
//     try {
//       // Use .get() instead of calling authFetch as a function:
//       const response = await authFetch.get('/auth/current-user');
//       // Cast response.data to expected type:
//       const data = response.data as { currentUser?: string };
//       if (data.currentUser) {
//         dispatch({ type: ActionType.LOGIN_USER, payload: { user: data.currentUser } });
//       }
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.log(err.message);
//       } else {
//         console.log(err);
//       }
//     }
//     stopLoading();
//   };

//   const createItem = async (fruit: Fruit) => {
//     if (fruit !== 'bananas' && fruit !== 'strawberries' && fruit !== 'grapes') return;
//     try {
//       startLoading();
//       await itemFetch.post('/items/createItem', {
//         itemName: fruit,
//       });
//       await getAllItems();
//     } catch (err: unknown) {
//       if (err instanceof AxiosError) {
//         window.alert(err.message);
//       } else if (err instanceof Error) {
//         window.alert(err.message);
//       }
//       console.log(err);
//       stopLoading();
//     }
//   };

//   const getAllItems = async () => {
//     startLoading();
//     try {
//       // Use .get() here:
//       const allItemsResponse = await inventoryFetch.get('/inventory/getAllItems');
//       // Cast response.data to expected type:
//       const items = allItemsResponse.data as ItemInterface[];
//       setTimeout(() => {
//         dispatch({ type: ActionType.RETRIEVED_ITEMS, payload: { items } });
//       }, 1500);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.log(err.message);
//       } else {
//         console.log(err);
//       }
//     }
//     stopLoading();
//   };

//   const adjustInventory = async (itemId: string, newUnits: number) => {
//     console.log('💥 Adjust Inventory');
//     try {
//       const response = await inventoryFetch.patch('/inventory/updateItemInventory', {
//         id: itemId,
//         units: newUnits,
//       });
//       // Cast response.data to expected type:
//       const items = response.data as ItemInterface[];
//       dispatch({
//         type: ActionType.RETRIEVED_ITEMS,
//         payload: { items },
//       });
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.log(err.message);
//       } else {
//         console.log(err);
//       }
//     }
//   };

//   const createOrder = async (item: string, amount: number) => {
//     if (item !== 'hat' && item !== 'shirt' && item !== 'pants') return;
//     if (amount < 0 || amount > 9) return;
//     try {
//       startLoading();
//       await orderFetch.post('/orders/createOrder', {
//         item,
//         amount,
//       });
//       await getAllOrders();
//     } catch (err: unknown) {
//       if (err instanceof AxiosError) {
//         window.alert(err.message);
//       } else if (err instanceof Error) {
//         window.alert(err.message);
//       }
//       console.log(err);
//       stopLoading();
//     }
//   };

//   const getAllOrders = async () => {
//     startLoading();
//     try {
//       // Use .get() here:
//       const allOrdersResponse = await orderFetch.get('/orders/getAllOrders');
//       // Cast response.data to expected type:
//       const orders = allOrdersResponse.data as OrderInterface[];
//       setTimeout(() => {
//         dispatch({
//           type: ActionType.RETRIEVED_ORDERS,
//           payload: { orders },
//         });
//       }, 1000);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.log(err.message);
//       } else {
//         console.log(err);
//       }
//     }
//     stopLoading();
//   };

//   const throw404 = async () => {
//     startLoading();
//     try {
//       await itemFetch.get('/items/nonExistentRoute');
//     } catch (err: unknown) {
//       setTimeout(() => {}, 1000);
//       if (err instanceof Error) {
//         window.alert(err.message);
//       } else {
//         window.alert('An unknown error occurred');
//       }
//       stopLoading();
//     }
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         ...state,
//         startLoading,
//         stopLoading,
//         loginUser,
//         logoutUser,
//         createItem,
//         getAllItems,
//         createOrder,
//         getAllOrders,
//         adjustInventory,
//         throw404,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// const useAppContext = () => {
//   return useContext(AppContext) as AppContextInterface;
// };

// export { useAppContext, AppContextProvider };
import React, { ReactNode, createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios'; // Only default import; no AxiosError is exported
import { ActionType } from './actions.js';
import reducer from './reducer.js';
import { customFetch } from '../util/customFetch.js';
import { Fruit } from '../util/types.js';

// Create fetch instances on specified ports
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
      // Cast response.data to expected type
      const data = response.data as { username: string };
      setTimeout(() => {
        dispatch({ type: ActionType.LOGIN_USER, payload: { user: data.username } });
        stopLoading();
      }, 1000);
    } catch (err: unknown) {
      let errorMessage = 'unknown error';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.log(errorMessage);
      stopLoading();
    }
  };

  const logoutUser = async () => {
    try {
      await authFetch.post('/auth/logout');
      dispatch({ type: ActionType.LOGOUT_USER });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
    }
  };

  const getCurrentUser = async () => {
    startLoading();
    try {
      const response = await authFetch.get('/auth/current-user');
      // Cast response.data to expected type:
      const data = response.data as { currentUser?: string };
      if (data.currentUser) {
        dispatch({ type: ActionType.LOGIN_USER, payload: { user: data.currentUser } });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message);
      }
      console.log(err);
      stopLoading();
    }
  };

  const getAllItems = async () => {
    startLoading();
    try {
      const allItemsResponse = await inventoryFetch.get('/inventory/getAllItems');
      // Cast response.data to expected type:
      const items = allItemsResponse.data as ItemInterface[];
      setTimeout(() => {
        dispatch({ type: ActionType.RETRIEVED_ITEMS, payload: { items } });
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
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
      // Cast response.data to expected type:
      const items = response.data as ItemInterface[];
      dispatch({
        type: ActionType.RETRIEVED_ITEMS,
        payload: { items },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message);
      }
      console.log(err);
      stopLoading();
    }
  };

  const getAllOrders = async () => {
    startLoading();
    try {
      const allOrdersResponse = await orderFetch.get('/orders/getAllOrders');
      // Cast response.data to expected type:
      const orders = allOrdersResponse.data as OrderInterface[];
      setTimeout(() => {
        dispatch({
          type: ActionType.RETRIEVED_ORDERS,
          payload: { orders },
        });
      }, 1000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
    }
    stopLoading();
  };

  const throw404 = async () => {
    startLoading();
    try {
      await itemFetch.get('/items/nonExistentRoute');
    } catch (err: unknown) {
      setTimeout(() => {}, 1000);
      if (err instanceof Error) {
        window.alert(err.message);
      } else {
        window.alert('An unknown error occurred');
      }
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
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext) as AppContextInterface;
};

export { useAppContext, AppContextProvider };
