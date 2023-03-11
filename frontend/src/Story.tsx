import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Answer } from './Answer';
import demo_data from './DEMO_data/demo_data.json';

export function Story() {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');


    let [currentScenario, setCurrentScenario] = React.useState(0);

    let [answer, setAnswer] = React.useState(false);

    let data = demo_data.stories.find((story) => story.id === parseInt(id || '0'));
    let scenario = data?.situations[currentScenario];

    function decrementScenario() {
      if (currentScenario > 0) {
        setCurrentScenario(currentScenario - 1);
      }
    }

    function incrementScenario() {
      if (currentScenario < (data?.situations.length || 1) - 1) {
        setCurrentScenario(currentScenario + 1);
      }
    }

    function typeAnswer() {
      let answer = document.querySelector('input')?.value;
      
      if (true) {
        alert('Correct!');
      } else {
        alert('Incorrect!');
      }
    }



    return (
      <div className="MainMenu">
        <a href='/' className='absolute bg-slate-100 m-10 p-2'>Back to Main Menu</a>
        <div className="relative pt-40 left-1/4 w-1/2 text-center">
          <h1 className='text-xl'> Story {data?.id} </h1>
          <h1 className='text-2xl'> {data?.title} </h1>
          <div className='border rounded-2xl m-2 p-2'>
            <div className='flex justify-center'>
            <img src={"./DEMO_data/" + scenario?.image} alt={scenario?.image} className="h-96"/>
            </div>
            <p className='mt-4 mb-4 mx-40'>{scenario?.text}</p>
            <input type="text" placeholder="Enter your answer here" className="border rounded-2xl m-2 p-2 hover:bg-sky-100 w-64"/>
            <button className='border p-2 rounded-2xl hover:bg-sky-100' onClick={e => setAnswer(true)}>Send</button>
            { answer && <Answer/>}
          </div>
          <div className='flex justify-center'>
            <button className='border rounded-2xl m-2 p-2 hover:bg-sky-100' onClick={decrementScenario}>Previous</button>
            <div className='border rounded-2xl m-2 p-2'> {currentScenario + 1} / {data?.situations.length} </div>
            <button className='border rounded-2xl m-2 p-2 hover:bg-sky-100' onClick={incrementScenario}>Next</button>
          </div>

        </div>
      </div>
    );
  }