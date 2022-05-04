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
    if (currentUser) {
      setUser(currentUser);
    }
  })
  


  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
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
      );
      console.log(user);
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
          <div><h5>Utilisateur Connecté</h5>  
          {user?.email}<br/>
          <br/>
          <button onClick={logout}>Se déconnecter</button>
          </div>
    </div>
  );
}

export default App;
