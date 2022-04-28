import { createUserWithEmailAndPassword,
        onAuthStateChanged,
        signInWithEmailAndPassword,
        signOut
 } from 'firebase/auth';
import { auth } from './firebase-config';
import { useState } from 'react';

import './App.css';

function App() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState("");

  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser);
  })


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

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
    } catch(error){
      console.log(error.message);
    }

  }
  const logout = async() => {
    try {
    await signOut(auth);
    } catch(error) {
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
        <div>
          <h3>Authentification</h3>
          <input placeholder='E-mail' onChange={(event)=>{
            setLoginEmail(event.target.value)
          }}/>
          <input placeholder='Mot de passe' onChange={(event)=>{
          setLoginPassword(event.target.value);
        }}/>
          <button onClick={login}>Connexion</button>
          </div>  
          <h4>Utilisateur Connecté</h4>  
          {user?.email}

          <button onClick={logout}>Se déconnecter</button>
    </div>
  );
}

export default App;
