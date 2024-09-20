import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation, Link, Navigate } from "react-router-dom";
import { Loader } from '@react-three/drei';

import Navigation from './components/Actions/Navigation';
import MessagingBox from './components/Actions/MessagingBox';
import AnimationButtons from './components/Actions/AnimationButtons';
import ExplorerScene from './components/Scenes/ExplorerScene';
import NancyScene from './components/Scenes/NancyScene';
import MariaWorrierScene from './components/Scenes/MariaScene';
import Login from './components/LandingPage/Home';
import { saveToLocalStorage, loadFromLocalStorage } from './components/Store';

import { auth } from "./config";
import { onAuthStateChanged, signOut } from 'firebase/auth';

const App = () => {
  const [authState, setAuthState] = useState(null);
  let location = useLocation();

  const [dance, setDance] = useState(false);
  const [jump, setJump] = useState(false);
  const [punch, setPunch] = useState(false);
  const [kick, setKick] = useState(false);
  const [special, setSpecial] = useState(false);


  const [backgroundNo, setBackgroundNo] = useState(3);

  const handleClick = () => {
    // console.log(dance);
  }



  let state = loadFromLocalStorage();
  const [messages, setMessages] = useState(state);

  if (messages === undefined) {
    setMessages({ default: [{ user: "Hiii!", machine: "Hello! Welcome here." }], nancy: [{ user: "Hiii!", machine: "Hello! Welcome here." }], maria: [{ user: "Hiii!", machine: "Hello! Welcome here." }] })
  }

  useEffect(() => {
    saveToLocalStorage(messages);
  }, [messages])


  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState(user);
      } else {
        setAuthState(null);
      }
    });

    return () => {
      listen();
    }
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => { console.log("Signout successfull") })
      .catch(err => console.log(err))
  }


  return (
    <>
      {location.pathname != "/login" && (
        <>
          <Navigation setBackgroundNo={setBackgroundNo} signOut={userSignOut} />
          <MessagingBox messages={messages} />
          <AnimationButtons dance={dance} jump={jump} punch={punch} kick={kick} special={special} setDance={setDance} setJump={setJump} setPunch={setPunch} setKick={setKick} setSpecial={setSpecial} />
        </>
      )}

      <Routes>
        <Route exact path="/explorer" element={authState ? <ExplorerScene setMessages={setMessages} messages={messages} backgroundNo={backgroundNo} /> : <Navigate to="/login" />} />
        <Route exact path="/nancy" element={authState ? <NancyScene setMessages={setMessages} messages={messages} backgroundNo={backgroundNo} dance={dance} jump={jump} punch={punch} kick={kick} special={special} /> : <Navigate to="/login" />} />
        <Route exact path="/maria" element={authState ? <MariaWorrierScene setMessages={setMessages} messages={messages} backgroundNo={backgroundNo} dance={dance} jump={jump} punch={punch} kick={kick} special={special} /> : <Navigate to="/login" />} />
        <Route exact path="/login" element={authState ? <Navigate to="/maria" /> : <Login setAuthState={setAuthState} />} />
      </Routes>

      <Loader />
    </>
  )
}

export default App;