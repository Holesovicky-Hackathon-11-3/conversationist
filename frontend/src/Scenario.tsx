import { Answer } from './Answer';
import React from 'react';
import { Conversation } from "./api-model";
import { Recorder } from './Recorder';


export interface Scenario {
    text: string;
    image: string;
    conversation: Conversation;
    submitAnswer: (answer: string) => void;
}

const filterEnter = (f: (e: React.KeyboardEvent<HTMLInputElement>) => void) => {
    return (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            f(e);
        }
    }
}


export function Scenario(scenario: Scenario) {

    let { conversation } = scenario;
    
    let [currentAnswer, setCurrentAnswer] = React.useState("");

    function submitAnswer(answer: string) {
        scenario.submitAnswer(currentAnswer);
        setCurrentAnswer("");
    }

    return (
        <div className="Scenario">
            <div className='flex justify-center'>
                <img src={"./DEMO_data/" + scenario?.image} alt={scenario?.image} className="h-96" />
            </div>
            <p className='mt-4 mb-4 mx-4'>{scenario.text}</p>
            {
                conversation.messages.map(msg => {
                    if (msg.role === 'user') {
                        return (
                            <>
                                <p>{msg.content}</p>
                            </>
                        )
                    } else if (msg.role === 'assistant') {
                        return (
                            <>
                                <Answer text={msg.content} />
                            </>
                        )   
                    }
                })
            }
            <input
                onKeyDown={filterEnter(e => submitAnswer(currentAnswer))}
                onChange={e => setCurrentAnswer(e.target.value)}
                value={currentAnswer}
                type="text"
                placeholder="Enter your answer here" className="border rounded-2xl m-2 p-2 hover:bg-sky-100 w-64" />
            <button className='border p-2 rounded-2xl hover:bg-sky-100' onClick={e => submitAnswer(currentAnswer)}>Send</button>
            <Recorder setTranscriptionCallback={(text) => setCurrentAnswer(text)} />
        </div>
    )

}