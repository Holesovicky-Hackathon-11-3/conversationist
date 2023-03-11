import Typewriter from 'typewriter-effect';

interface AnswerInput {
    text: string;
}

export function Answer(input: AnswerInput) {
    let { text } = input;
    return (
        <div className='mx-40 mt-4 mb-8 text-left'>
            <h1 className='text-2xl'>Corrector:</h1>
            <Typewriter
                onInit={(typewriter) => {
                    typewriter.changeDelay(1).typeString(text)
                        .pauseFor(25)
                        .start();
                }}
            />
        </div>
    );
}