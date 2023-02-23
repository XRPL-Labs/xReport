import { useEffect, useState } from 'react'
import { XummSdkJwt } from 'xumm-sdk';
import { xAppOttData } from 'xumm-sdk/dist/src/types';
import './App.css'
import Form from './components/Form';


const Sdk = new XummSdkJwt('5d9e618b-2fc6-44a8-97bf-b0f279d0a4c1')
const searchParams = new URL(window.location.href).searchParams;
const xAppToken = searchParams.get('xAppToken') || '';

function App() {
  const [xAppName, setxAppName] = useState<string>('xReport');
  const [xAppId, setxAppId] = useState<string>('8525e32b-1bd0-4839-af2f-f794874a80b0');
  const [xAppIcon, setxAppIcon] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  fetch(`/__log?${encodeURI(JSON.stringify({ 'ottData': false }))}`)

  useEffect(() => {
    Sdk.getOttData().then((ottData: xAppOttData) => {
      fetch(`/__log?${encodeURI(JSON.stringify(ottData))}`)
      // if (ottData.origin && ottData.origin.data) {
      // xAppId = ottData.origin.data.appId;
      // const url = `${import.meta.env.VITE_XAPP_DATA_ENDPOINT}ott:${xAppToken}/uuid:${xAppId}`;
      const url = `https://xapps.xumm.app/report-app/app-details/ott:35876b3b-6273-4f80-b7bd-6718c1fccdda/uuid:fcd04601-f4e1-4760-9b68-4cb53a1c8a9a`;
      fetch(url, {
        headers: {
          "Content-Type": 'application/json'
        }
      }).then(response => response.json()).then(json => {
        fetch(`/__log?${encodeURI(json)}`)
        setIsLoading(false);
        setxAppName(json.name);
        setxAppIcon(json.icon_url);
      })
      // }
    }).catch(e => {
      fetch(`/__log?${encodeURI(JSON.stringify({ 'test': true }))}`)
      console.log('error', e);
    })

    // const url = `https://xapps.xumm.app/report-app/app-details/ott:35876b3b-6273-4f80-b7bd-6718c1fccdda/uuid:fcd04601-f4e1-4760-9b68-4cb53a1c8a9a`;
    // console.log(url);

    // fetch(url, {
    //   mode: 'no-cors'
    // }).then((response) => response.json()).then(json => {
    //   console.log(json);
    // })
  }, [])

  return (
    <div className="font-sans h-screen w-screen max-w-[100vw] flex flex-col py-4 pl-[20px] pr-[22px] relative ">
      {isLoading ?
        <div className="w-screen h-screen inset-0 absolute bg-white flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-[3px] border-black border-t-white animate-spin"></div>
        </div>
        :
        <>
          <div className="flex gap-4 bg-xAppBlue-100 pt-8 pl-[20px] pr-[22px] pb-8 w-screen -ml-[20px] -mt-6 ">
            <img src={xAppIcon} className="w-16 h-16 rounded-[15px]" />
            <h1 className="font-bold text-xl">You want to revoke access for <br /> {xAppName}</h1>

          </div>
          <Form xAppToken={xAppToken} xAppName={xAppName} xAppId={xAppId} />
        </>
      }


    </div>
  )
}

export default App
