import React, { useEffect, useState } from "react"
import editIcon from './../assets/icon-edit.png';
import Question from "./form/Question";

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const postBody = {
        "application": {
            "name": "Xumm Pro Beta",
            "uuid": "8525e32b-1bd0-4839-af2f-f794874a80b0"
        },
        "OTT": "da946ee4-d3a2-4cb5-9789-ad42f5bfb1d4",
        "userInput": {
            "reason": "use || trust || push",
            "explanation": "Lorem ipsum dolor sit amet || ''",
            "isAbuse": true || false,
            "extraInfo": "Lorem ipsum dolor sit amet || ''"
        }
    }
    console.log(formData.get('reason'), 'test');

}

export default function Form(props: any) {

    const [stepCount, setStepCount] = useState<number>(0);
    const [reason, setReason] = useState<string>('');
    const [reasonFull, setReasonFull] = useState<string>('');
    const [explanation, setExplanation] = useState<string>('');
    const [isAbuse, setIsAbuse] = useState<string>('');
    const [extraInfo, setExtraInfo] = useState<string>('');

    function focusFunction(element: any) {
        document.getElementById('scrollBox')?.classList.remove('hidden');
        (element.target as HTMLElement).parentElement?.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
        return null;
    }

    function blurFunction() {
        document.getElementById('scrollBox')?.classList.add('hidden');
    }

    return (
        <div className="w-full relative flex flex-col pb-16 h-full mt-2 overflow-y-scroll scrollbar-hide">
            <form id="xReport" onSubmit={(e) => handleSubmit(e)} className="flex items-center flex-col">
                <input type="hidden" name="reason" value={reason} />
                <input type="hidden" name="explanation" value={explanation} />
                <input type="hidden" name="isAbuse" value={isAbuse} />
                <input type="hidden" name="extraInfo" value={extraInfo} />
            </form>
            <div className="w-full">
                <div className="relative">
                    <Question question="What's the primary reason you want to revoke the access for this xApp?" stepCount={stepCount} stepCountCheck={0} />
                    <div className={`flex flex-col ${stepCount === 0 ? '' : 'hidden'}`}>
                        <button onClick={() => { setReason('use'); setReasonFull(`I don't use the xApp anymore`); setStepCount(1) }} className="text-left my-2 first:mt-0 last:mb-0 active:font-bold focus:font-bold focus:outline-none border rounded-[15px] px-4 py-2 border-xAppBlue-100">&rarr; I don't use the xApp anymore</button>
                        <button onClick={() => { setReason('trust'); setReasonFull(`I don't trust this xApp / Project / Developer anymore`); setStepCount(1) }} className="text-left my-2 first:mt-0 last:mb-0 active:font-bold focus:font-bold focus:outline-none border rounded-[15px] px-4 py-2 border-xAppBlue-100">&rarr; I don't trust this xApp / Project / Developer anymore</button>
                        <button onClick={() => { setReason('push'); setReasonFull(`I get too many push notifications`); setStepCount(1) }} className="text-left my-2 first:mt-0 last:mb-0 active:font-bold focus:font-bold focus:outline-none border rounded-[15px] px-4 py-2 border-xAppBlue-100">&rarr; I get too many push notifications</button>
                    </div>
                    <div className={`relative ${stepCount > 0 ? '' : 'hidden'}`}>
                        <p className={`text-left  text-xs text-muted -mt-4 pr-10 font-mono font-bold`}>{reasonFull}</p>
                        <img src={editIcon} onClick={() => { setStepCount(0) }} className="absolute right-0 bottom-2 w-4 h-4" />
                    </div>
                </div>
                {stepCount > 0 &&
                    <div>
                        <div className="w-full border-b mt-4"></div>
                        {reason === 'use' ?
                            <Question question="Would you like to explain your answer a little more?" stepCount={stepCount} stepCountCheck={1} small="optional" />
                            :
                            <Question question="Please tell us why and provide one or more examples." stepCount={stepCount} stepCountCheck={1} small="min. 10 chars" />
                        }
                        <div className={`relative ${stepCount > 1 ? '' : 'hidden'}`}>
                            <p className={`text-left text-xs text-muted -mt-4 pr-10 font-mono font-bold`}>{explanation}</p>
                            <img src={editIcon} onClick={() => { setStepCount(1) }} className="absolute right-0 bottom-2 w-4 h-4" />
                        </div>
                        {stepCount === 1 &&
                            <>
                                <textarea onBlur={(element) => { blurFunction() }} onFocus={(element) => { focusFunction(element) }} className="w-full border p-2 rounded-[15px]" rows={4} onChange={(e: any) => { setExplanation(e.target.value) }} defaultValue={explanation}></textarea>
                                <div className="flex justify-end mt-2">
                                    {reason === 'use' ?
                                        <button onClick={() => { setStepCount(3) }} className="px-4 py-2 rounded-[15px] bg-xAppBlue-900 text-white font-bold">Next</button>
                                        :
                                        <button onClick={() => {
                                            if (explanation.length > 10) setStepCount(2)
                                        }} className={`px-4 py-2 rounded-[15px] font-bold ${explanation.length > 10 ? 'bg-xAppBlue-900 text-white' : 'text-black font-normal bg-xAppBlue-100 text-opacity-50 cursor-not-allowed focus:outline-none'}`}>Next</button>
                                    }
                                </div>
                            </>
                        }
                    </div>
                }
                {stepCount > 1 && reason !== 'use' &&
                    <>
                        <div className="w-full border-b mt-4"></div>
                        <Question question="Does this 3rd party xApp bother or endanger it's users in your opinion?" stepCount={stepCount} stepCountCheck={2} />
                        <div className={`flex flex-col ${stepCount === 2 ? '' : 'hidden'}`}>
                            <button onClick={() => { setIsAbuse('Yes'); setStepCount(3) }} className="text-left my-2 first:mt-0 last:mb-0 active:font-bold focus:font-bold focus:outline-none border rounded-[15px] px-4 py-2 border-xAppBlue-100">&rarr; Yes</button>
                            <button onClick={() => { setIsAbuse('No'); setStepCount(3) }} className="text-left my-2 first:mt-0 last:mb-0 active:font-bold focus:font-bold focus:outline-none border rounded-[15px] px-4 py-2 border-xAppBlue-100">&rarr; No</button>
                        </div>
                        <div className={`relative ${stepCount > 2 ? '' : 'hidden'}`}>
                            <p className={`text-left text-xs text-muted -mt-4 pr-10 font-mono font-bold`}>{isAbuse}</p>
                            <img src={editIcon} onClick={() => { setStepCount(1) }} className="absolute right-0 bottom-2 w-4 h-4" />
                        </div>
                    </>
                }
                {stepCount > 2 &&
                    <div>
                        <div className="w-full border-b mt-4"></div>
                        <Question question="How did you get to this 3rd party xApp?" stepCount={stepCount} stepCountCheck={3} small="min. 10 chars" />
                        <textarea onBlur={(element) => { blurFunction() }} onFocus={(element) => { focusFunction(element) }} className="w-full border p-2 rounded-[15px]" rows={4} onChange={(e: any) => { setExtraInfo(e.target.value) }} defaultValue={extraInfo}></textarea>
                        <div className="flex justify-end mt-2">
                            <button disabled={extraInfo.length > 10 ? false : true} form="xReport" type="submit" className={`px-4 py-2 rounded-[15px] font-bold ${extraInfo.length > 10 ? 'bg-xAppBlue-900 text-white' : 'text-black font-normal bg-xAppBlue-100 text-opacity-50 cursor-not-allowed focus:outline-none'}`}>Submit</button>
                        </div>
                    </div>
                }
            </div>
            <div id="scrollBox" className="min-h-screen hidden"></div>
        </div >
    )
}