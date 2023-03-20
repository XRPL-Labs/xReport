import React, { useEffect, useState } from "react"
import editIcon from './../assets/icon-edit.png';
import Question from "./form/Question";
import iconChevronDown from '../assets/chevron_down.png'
import iconChevronLeft from '../assets/chevron_left.png'

export default function Form(props: any) {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement)
        const postBody = {
            "application": {
                "name": formData.get('application_name'),
                "uuid": formData.get('application_uuid')
            },
            "OTT": formData.get('xAppToken'),
            "rAddress": formData.get('rAddress'),
            "userInput": {
                "reason": formData.get('reason'),
                "explanation": formData.get('explanation'),
                "isAbuse": formData.get('isAbuse'),
                "extraInfo": formData.get('extraInfo')
            }
        }
        fetch(import.meta.env.VITE_XAPP_POST_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(postBody)
        })
        props.setIsFinished(true);
    }

    const [stepCount, setStepCount] = useState<number>(0);
    const [reason, setReason] = useState<string>('');
    const [reasonFull, setReasonFull] = useState<string>('Select an option');
    const [explanation, setExplanation] = useState<string>('');
    const [isAbuse, setIsAbuse] = useState<string>('');
    const [extraInfo, setExtraInfo] = useState<string>('');
    const [showOptionQuestionOne, setShowOptionQuestionOne] = useState<boolean>(false)
    const [canContinue, setCanContinue] = useState<boolean>(false)
    const [canFinish, setCanFinish] = useState<boolean>(false)
    const [showExtraInfo, setShowExtraInfo] = useState<boolean>(false)

    function focusFunction(element: any) {
        document.getElementById('scrollBox')?.classList.remove('hidden');
        // (element.target).parentElement?.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
        // (element.target).parentElement?.scrollIntoView(false);
        const yOffset = -350;
        if (props.platform === 'ios') {
            const y = (element.target).getBoundingClientRect().top + window.pageYOffset + yOffset;
            document.getElementById('xReport')?.scrollTo({ top: y, behavior: 'smooth' });
        } else {
            (element.target).parentElement?.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
        }
        return null;
    }

    function blurFunction() {
        document.getElementById('scrollBox')?.classList.add('hidden');
    }

    useEffect(() => {
        if (reason === 'use') {
            setCanContinue(true);
        } else {
            if (explanation.length > 9) {
                setCanContinue(true);
            } else {
                setCanContinue(false);
            }
        }

    }, [reason, explanation])

    useEffect(() => {
        if (isAbuse !== '') {
            setShowExtraInfo(true);
        }
    }, [isAbuse])

    useEffect(() => {
        if (extraInfo.length > 9) {
            setCanFinish(true);
        } else {
            setCanFinish(false);
        }
    }, [extraInfo])

    return (
        <div className="w-full relative flex flex-col pb-16 h-full mt-2 overflow-y-scroll scrollbar-hide">
            {props.isFinished ?
                <></>
                :
                <>
                    <form id="xReport" onSubmit={(e) => handleSubmit(e)} className="flex items-center flex-col">
                        <input type="hidden" name="reason" value={reason} />
                        <input type="hidden" name="explanation" value={explanation} />
                        <input type="hidden" name="isAbuse" value={isAbuse} />
                        <input type="hidden" name="extraInfo" value={extraInfo} />
                        <input type="hidden" name="rAddress" value={props.rAddress} />
                        <input type="hidden" name="application_uuid" value={props.application_uuid} />
                        <input type="hidden" name="application_name" value={props.application_name} />
                        <input type="hidden" name="xAppToken" value={props.xAppToken} />
                    </form>
                    <div className="w-full">
                        {stepCount === 0 &&
                            <div className="relative">
                                <p className="text-grey">What's the primary reason you want to revoke the access for this xApp?</p>
                                <div onClick={() => setShowOptionQuestionOne(!showOptionQuestionOne)} className={`w-full border-silver border pl-[23px] py-[16px] pr-[23px] rounded-[15px] flex justify-between items-center bg-white mt-3 ${reasonFull === 'Select an option' ? 'h-[55px]' : ''}`}>
                                    <p className={`${reasonFull === 'Select an option' ? 'text-grey' : 'text-black font-semibold'} `}>{reasonFull}</p>
                                    <img src={iconChevronDown} className="w-[13px]" />
                                </div>
                                {showOptionQuestionOne &&
                                    <div className="mx-auto w-full bg-white -mt-3 rounded-b-[15px] border-silver border border-t-0 pl-[23px] py-[16px] pr-[23px]">
                                        <button onClick={() => { setReason('use'); setReasonFull(`I don't use the xApp anymore`); setShowOptionQuestionOne(!showOptionQuestionOne) }} className="text-left my-2 first:mt-0 last:mb-0 active:font-bold focus:font-bold focus:outline-none rounded-[15px]">I don't use the xApp anymore</button >
                                        <button onClick={() => { setReason('trust'); setReasonFull(`I don't trust this xApp / Project / Developer anymore`); setShowOptionQuestionOne(!showOptionQuestionOne) }} className="text-left my-2 first:mt-0 last:mb-0 active:font-bold focus:font-bold focus:outline-none rounded-[15px]">I don't trust this xApp / Project / Developer anymore</button>
                                        <button onClick={() => { setReason('push'); setReasonFull(`I get too many push notifications`); setShowOptionQuestionOne(!showOptionQuestionOne) }} className="text-left my-2 first:mt-0 last:mb-0 active:font-bold focus:font-bold focus:outline-none rounded-[15px]">I get too many push notifications</button>
                                    </div >
                                }
                                {
                                    reasonFull !== 'Select an option' &&
                                    <div className="mt-[46px] w-full flex flex-col">
                                        {reason === 'use' ?
                                            <p className="text-grey">Would you like to explain your answer a little more?</p>
                                            :
                                            <p className="text-grey">Please tell us why and provide one or more examples.</p>
                                        }
                                        <textarea onBlur={(element) => { blurFunction() }} onFocus={(element) => { focusFunction(element) }} className="w-full border border-grey p-2 rounded-[15px] mt-2 outline-none" rows={4} onChange={(e: any) => { setExplanation(e.target.value) }} defaultValue={explanation}></textarea>
                                        {reason !== 'use' && <p className="ml-auto mt-1 text-sm text-silver mb-10">(min. 10 chars)</p>}
                                    </div>
                                }
                            </div >
                        }


                        {
                            stepCount > 0 &&
                            <div className="w-full">
                                <p className="text-grey">Does this 3rd party xApp bother or endanger it's users in your opinion?</p>
                                <div className="flex gap-8 mt-3">
                                    <div onClick={() => { setIsAbuse('Yes') }} className="flex gap-2">
                                        <span className={`w-[20px] h-[20px] flex items-center justify-center rounded-full bg-white border ${isAbuse === 'Yes' ? '!border-black' : 'border-silver'}`}>
                                            {isAbuse === 'Yes' &&
                                                <span className="w-[14px] h-[14px] bg-black rounded-full"></span>
                                            }
                                        </span>
                                        <p className={`${isAbuse === 'Yes' ? 'text-black font-semibold' : 'text-grey'}`}>Yes</p>
                                    </div>
                                    <div onClick={() => { setIsAbuse('No') }} className="flex gap-2">
                                        <span className={`w-[20px] h-[20px] flex items-center justify-center rounded-full bg-white border ${isAbuse === 'No' ? '!border-black' : 'border-silver'}`}>
                                            {isAbuse === 'No' &&
                                                <span className="w-[14px] h-[14px] bg-black rounded-full"></span>
                                            }
                                        </span>
                                        <p className={`${isAbuse === 'No' ? 'text-black font-semibold' : 'text-grey'}`}>No</p>
                                    </div>
                                </div>
                                {showExtraInfo &&
                                    <div className="flex flex-col mt-[40px]">
                                        <p className="text-grey mb-1">How did you get to this 3rd party xApp?</p>
                                        <textarea onBlur={(element) => { blurFunction() }} onFocus={(element) => { focusFunction(element) }} className="w-full border p-2 rounded-[15px] outline-none border-grey" rows={4} onChange={(e: any) => { setExtraInfo(e.target.value) }} defaultValue={extraInfo}></textarea>
                                        <p className="ml-auto mt-1 text-sm text-silver mb-10">(min. 10 chars)</p>
                                    </div>
                                }
                            </div>
                        }
                    </div >
                    <div id="scrollBox" className="min-h-[300px] hidden"></div>
                </>
            }
            <div className="fixed bottom-0 w-screen h-[109px] border-t border-lightGrey left-0 flex items-start pl-[20px] pr-[22px] pt-[17px] z-20 bg-xAppBlue-100">
                {props.isFinished ?
                    <span onClick={() => { props.xumm.xapp.close() }} className={`font-bold text-white bg-xAppBlue-900 w-full rounded-[15px] py-[12px] leading-9 text-center block`}>Quit xApp</span>
                    :
                    <>
                        {stepCount === 0 ?
                            <span onClick={() => { if (canContinue) { setStepCount(1) } }} className={`font-bold text-white bg-xAppBlue-900 w-full rounded-[15px] py-[12px] leading-9 text-center block ${!canContinue ? 'opacity-20' : ''}`}>Next</span>
                            :
                            <div className="flex gap-4 w-full">
                                <span onClick={() => { setStepCount(0); }} className="w-20 h-[60px] bg-lightGrey rounded-[15px] flex items-center justify-center"><img src={iconChevronLeft} /></span>
                                <button type="submit" disabled={!canFinish} form="xReport" className={`font-bold text-white bg-xAppBlue-900 w-full rounded-[15px] py-[12px] leading-9 text-center block ${!canFinish ? 'opacity-20' : ''}`}>Finish</button>
                            </div>
                        }
                    </>
                }
            </div>
        </div >
    )
}