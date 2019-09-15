/**
 * ************************************
 *
 * @module  reducers
 * @description Reducer is responsible for grabbing the request and response objects sent by the server and adding them to the collection.
 *
 * ************************************
 */

//Getting actions from Actions folder;
import * as types from "../actions/actionTypes";

//Setting initial state that we're going to use;
const initialState = {
  messageArray: [],
};

//Reducer function, (where the magic happens);
const reducers = (state = initialState, action) => {
  //initalize a variable called messageArray; (Scope of state will not effect this initialization.);
  let messageArray;
  
  //switch case statements;

  //IF ACTION.TYPE === ADD_MESSAGE;
  switch (action.type) {
    case types.ADD_MESSAGE:
      //Setting Payload as a variable for easier use;
      const messageData = action.payload;
      //Create shallow copy of the array inside state copy & set it to initialize variable we made earlier;
      messageArray = state.messageArray.slice();
      //push payload which is an OBJECT into shallow copied array;
      messageArray.push(messageData);

      //return new state copy with our new array inside;
      return {
        ...state,
        messageArray
      };
    
    //return default state;
    default:
      return state;
  }
};

export default reducers;
