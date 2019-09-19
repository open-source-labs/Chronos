import React, { useState } from 'react';

const { ipcRenderer } = window.require('electron');

const uuidv1 = require('uuid/v1');

const SignUp = () => {
  const BlankEntry = () => {
    const entry = {
      label: '',
      url: '',
      id: '',
    };
    return entry;
  };

  const startState = [new BlankEntry(), new BlankEntry(), new BlankEntry()];
  const [formState, setFormState] = useState(startState);
  const [dbState, setdbState] = useState('');

  const addEntry = () => {
    event.preventDefault();
    setFormState([...formState, new BlankEntry()]);
  };

  const deleteEntry = (id) => {
    event.preventDefault();
    const adjustedState = formState.filter((entry) => entry.id !== id);
    setFormState([...adjustedState]);
  };

  const onSubmit = () => {
    const state = {
      setupRequired: false,
      services: formState,
      database: dbState,
    };
    const updatedState = ipcRenderer.sendSync('submit', JSON.stringify(state));
    console.log("its me", updatedState);
  };

  return (
    <div>
      <h1>Setup Your Microservices</h1>
      <form>
        {formState.map((val, idx) => {
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
