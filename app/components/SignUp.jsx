import React, {useState} from "react";
const uuidv1 = require('uuid/v1');

const SignUp = () => {
  const blankEntry = () => {
    const entry = {
      label: '',
      url: '',
      id: '',
    };
    return entry;
  }
  const startState = [new blankEntry(), new blankEntry(), new blankEntry()];
  const [formState, setFormState] = useState(startState);
  const [dbState, setdbState] = useState('');

  const addEntry = () => {
    event.preventDefault();
    setFormState([...formState, new blankEntry]);
  };

  const deleteEntry = (id) => {
    event.preventDefault();
    const adjustedState = formState.filter((entry) => {
      return entry.id !== id
    })
    setFormState([...adjustedState]);
  }

  return (
    <div>
      <h1>Setup Your Microservices</h1>
      <form>
        {
          formState.map((val, idx) => {
            const keyID = uuidv1()
            val.id = keyID;
            return(
              <div key={`${keyID}`}>
                <button listid={`${keyID}`} onClick={() => deleteEntry(keyID)}>X</button>
                <input
                  onChange = {(e) => {
                    val.label = e.target.value 
                  }}
                  type='text'
                  placeholder={val.label}
                />
                <input
                  onChange = {(e) => {
                    val.url = e.target.value
                  }}
                  type='text'
                  placeholder={val.url}
                />
              </div>
           )
          })
        }
        <input
          onChange={(e) => {
            setdbState(e.target.value) 
          }}
          placeholder={dbState}
        />
        <br></br>
        <button onClick={addEntry}>Add Service</button>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default SignUp;
