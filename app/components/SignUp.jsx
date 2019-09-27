import React, { useState } from 'react';

const { ipcRenderer } = window.require('electron');
const uuidv1 = require('uuid/v1');

const SignUp = () => {
  // Constructor function for form objects.
  const BlankEntry = () => {
    const entry = {
      label: '',
      url: '',
      id: '',
    };
    return entry;
  };

  // Initial state
  const startState = [new BlankEntry(), new BlankEntry(), new BlankEntry()];

  // Local form state for microservice list
  const [formState, setFormState] = useState(startState);

  // Local from state for database
  const [dbState, setdbState] = useState('');

  // Adds additional input field to rendered sign up component
  const addEntry = () => {
    event.preventDefault();
    setFormState([...formState, new BlankEntry()]);
  };

  // Removes input field to rendered sign up component
  const deleteEntry = (id) => {
    event.preventDefault();
    const adjustedState = formState.filter((entry) => entry.id !== id);
    setFormState([...adjustedState]);
  };

  // IPC communication used to update settings JSON with user input.
  const onSubmit = () => {
    const state = {
      setupRequired: false,
      services: formState,
      database: dbState,
    };
    const updatedState = ipcRenderer.sendSync('submit', JSON.stringify(state));
  };

  return (
    <div>
      <h1>Setup Your Microservices</h1>
      <form>
        {/* Renders form state to the screen */}
        {formState.map((val, idx) => {
          // uuidv1: Creates a unique key ID for each element in form state.
          // onChange: Allows state to be updated as the user types in the input fields.
          // placeholder: Allows inputs to remain on the screen even as state updates.
          const keyID = uuidv1();
          val.id = keyID;
          return (
            <div key={`${keyID}`}>
              <button listid={`${keyID}`} onClick={() => deleteEntry(keyID)}>
                X
              </button>
              <input
                onChange={(e) => {
                  val.label = e.target.value;
                }}
                type="text"
                placeholder={val.label}
              />
              <input
                onChange={(e) => {
                  val.url = e.target.value;
                }}
                type="text"
                placeholder={val.url}
              />
            </div>
          );
        })}
        <input
          onChange={(e) => {
            setdbState(e.target.value);
          }}
          placeholder={dbState}
        />
        <br />
        <button onClick={addEntry}>Add Service</button>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
