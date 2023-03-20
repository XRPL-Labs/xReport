import { useEffect, useState } from 'react'
import { Xumm } from 'xumm';
import './App.css'
import Form from './components/Form';

const searchParams = new URL(window.location.href).searchParams;
const xAppToken = searchParams.get('xAppToken') || '';

function App() {
  const [xAppName, setxAppName] = useState<string>('xReport');
  const [xAppId, setxAppId] = useState<string>('');
  const [xAppIcon, setxAppIcon] = useState<string>('');
  const [rAddress, setRAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const xumm = new Xumm(import.meta.env.VITE_XAPP_API_KEY);
  fetch(`/__log?${encodeURI(xAppToken)}`)
  useEffect(() => {
    xumm.environment.ott?.then(profile => {
      setxAppId(profile?.appId);
      setRAddress(profile?.account || '');
      const url = `${import.meta.env.VITE_XAPP_DATA_ENDPOINT}ott:${xAppToken}/uuid:${profile?.appId}`;
      fetch(url, {
        headers: {
          "Content-Type": 'application/json'
        }
      }).then(response => response.json()).then((json: any) => {
        setIsLoading(false);
        setxAppName(json.name);
        setxAppIcon(json.icon_url);
      })
    })
  }, [])

  return (
    <div className="font-sans h-screen w-screen max-w-[100vw] flex flex-col pb-4 pl-[20px] pr-[22px] relative bg-xAppBlue-100">
      {isLoading ?
        <div className="w-screen h-screen inset-0 absolute bg-white flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-[3px] border-black border-t-white animate-spin"></div>
        </div>
        :
        <>
          {!isFinished ?
            <div className="flex gap-5 pt-8 pb-8 rounded-[15px]">
              <img src={xAppIcon} className="w-[60px] h-[60px] rounded-[15px]" />
              <h1 className="font-bold text-xl">You want to revoke access for {xAppName}</h1>
            </div>
            :
            <div className="h-full w-screen bg-white flex-1 absolute z-10 inset-0 flex items-center justify-center flex-col">
              <p className="text-4xl font-extrabold">You're awesome!</p>
              <p className="w-1/2 text-2xl text-center mt-8">Thanks for your feedback!</p>
            </div>
          }
          <Form xumm={xumm} isFinished={isFinished} setIsFinished={setIsFinished} xAppToken={xAppToken} application_name={xAppName} application_uuid={xAppId} rAddress={rAddress} />
        </>
      }


    </div >
  )
}

export default App
