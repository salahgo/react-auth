import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';
import { useState } from 'react';

import './App.css';

function App() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
    } catch(error){
      console.log(error.message);
    }

  }

  return (
    <div className="App">
      <div>
        <h3>Enregistrement</h3>
        <input placeholder='E-mail' onChange={(event)=>{
          setRegisterEmail(event.target.value);
        }}/>
        <input placeholder='Mot de passe' onChange={(event)=>{
          setRegisterPassword(event.target.value);
        }}/>
        <button onClick={register}>Créer utilisateur</button>
        </div>      
    </div>
  );
}

export default App;
