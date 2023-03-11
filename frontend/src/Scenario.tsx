import { Answer } from './Answer';
import React from 'react';



export interface Scenario {
    text: string;
    image: string;
    answers: string[];
    addAnswer: (answer: string) => void;
}

const filterEnter = (f: (e: React.KeyboardEvent<HTMLInputElement>) => void) => {
    return (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            f(e);
        }
    }
}


export function Scenario(scenario: Scenario) {
    
    let [currentAnswer, setCurrentAnswer] = React.useState("");

    function submitAnswer() {
        scenario.addAnswer(currentAnswer);
        setCurrentAnswer("");
    }

    return (
        <div className="Scenario">
            <div className='flex justify-center'>
                <img src={"./DEMO_data/" + scenario?.image} alt={scenario?.image} className="h-96" />
            </div>
            <p className='mt-4 mb-4 mx-4'>{scenario.text}</p>
            {
                scenario.answers.map(answer => {
                    return (
                        <>
                            <p>{answer}</p>
                            <Answer />
                        </>
                    )
                })
            }
            <input
                onKeyDown={filterEnter(e => submitAnswer())}
                onChange={e => setCurrentAnswer(e.target.value)}
                value={currentAnswer}
                type="text"
                placeholder="Enter your answer here" className="border rounded-2xl m-2 p-2 hover:bg-sky-100 w-64" />
            <button className='border p-2 rounded-2xl hover:bg-sky-100' onClick={e => submitAnswer()}>Send</button>
        </div>
    )

}