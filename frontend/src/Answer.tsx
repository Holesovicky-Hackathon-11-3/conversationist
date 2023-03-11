import Typewriter from 'typewriter-effect';


export function Answer() {
    return (
        <div className='mx-40 mt-4 mb-8 text-left'>
            <h1 className='text-2xl'>Corrector:</h1>
            <Typewriter
                onInit={(typewriter) => {
                typewriter.changeDelay(1).typeString('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque eos vitae aspernatur reiciendis est architecto maiores mollitia sequi fuga dolorum libero inventore temporibus dignissimos quaerat maxime, culpa ipsa dicta officiis.')
                    
                    .pauseFor(25)
                    .start();
                }}
            />
        </div>
    );
}