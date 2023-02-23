import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form';

function handleSubmit() {
}

function App() {
  useEffect(() => {
    // Debug only, show xAppToken in terminal for development purposes
    const currentUrl = window.location.href;
    const searchParams = new URL(currentUrl).searchParams;
    const xAppToken = searchParams.get('xAppToken') || '';
    fetch(`/__log?${encodeURI(xAppToken)}`);
  }, [])

  return (
    <div className="font-sans h-screen w-screen max-w-[100vw] flex flex-col py-4 pl-[20px] pr-[22px] relative ">
      <h1 className="font-bold text-2xl">You want to revoke access for <br /> Xumm Pro Beta</h1>
      <Form />

    </div>
  )
}

export default App
