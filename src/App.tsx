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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const xumm = new Xumm(import.meta.env.VITE_XAPP_API_KEY);

  useEffect(() => {
    xumm.environment.ott?.then(profile => {
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
    <div className="font-sans h-screen w-screen max-w-[100vw] flex flex-col py-4 pl-[20px] pr-[22px] relative ">
      {isLoading ?
        <div className="w-screen h-screen inset-0 absolute bg-white flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-[3px] border-black border-t-white animate-spin"></div>
        </div>
        :
        <>
          <div className="flex gap-4 bg-xAppBlue-100 pt-8 pl-[20px] pr-[22px] pb-8 rounded-[15px]">
            <img src={xAppIcon} className="w-16 h-16 rounded-[15px]" />
            <h1 className="font-bold text-lg">You want to revoke access for <br /> {xAppName}</h1>

          </div>
          <Form xAppToken={xAppToken} xAppName={xAppName} xAppId={xAppId} />
        </>
      }


    </div>
  )
}

export default App
