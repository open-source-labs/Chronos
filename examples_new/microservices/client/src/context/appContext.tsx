import { createContext, useReducer, useContext } from 'react';
import { ActionType } from './actions';
import reducer from './reducer';

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
}

const AppContext = createContext<AppContextInterface>({
  ...initialState,
  startLoading: () => null,
  stopLoading: () => null,
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

  return (
    <AppContext.Provider
      value={{
        ...state,
        startLoading,
        stopLoading,
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
