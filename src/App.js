import React from 'react';
import { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyD1iWi6HMVYRUSlw7DcxfHNdsJodVCR9-w",
  authDomain: "chatroom-8654c.firebaseapp.com",
  projectId: "chatroom-8654c",
  storageBucket: "chatroom-8654c.appspot.com",
  messagingSenderId: "235211429078",
  appId: "1:235211429078:web:2916305ad6646a07dda577",
  measurementId: "G-DZKQLSP73G"
})
const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth)
function App() {
  return (
    <div className="App">
      <header>


      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }
  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>

  )
}
function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, { idField: 'id' })
  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  )

}
function ChatMessage(props) {
  const {text,uid}=props.message;
  return <p>{text}</p>

}
export default App;
