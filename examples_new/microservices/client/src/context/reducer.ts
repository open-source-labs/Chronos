import { ActionType } from "./actions";
import { StateInterface } from "./appContext";

type Action = 
  {
  type: ActionType.START_LOADING
  } | {
  type: ActionType.STOP_LOADING
  }

const reducer = (state: StateInterface, action: Action) => {
  switch (action.type) {
    case ActionType.START_LOADING:
      return {
        ...state,
        isLoading: true
      }
      case ActionType.STOP_LOADING:
      return {
        ...state,
        isLoading: false
      }
    default: return state
  }
}
  
export default reducer