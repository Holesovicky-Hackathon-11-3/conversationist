import React from 'react';
import { useSearchParams } from 'react-router-dom';
import demo_data from './DEMO_data/demo_data.json';
import { Scenario } from './Scenario';

interface Dictionary<K,V> {
  [key: string]: V;
}

export function Story() {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    
    let [answers, setAnswers] = React.useState<Dictionary<number, string[]>>({
      0: [],
      1: [],
      2: [],
    });
    let [currentScenario, setCurrentScenario] = React.useState(0);
    console.log(currentScenario)

    // use state array of booleans to keep track of which scenarios have been completed
    let [completedScenarios, setCompletedScenarios] = React.useState(
      new Array(demo_data.stories.find(
        (story) => story.id === parseInt(id || '0'))?.situations.length).fill(false));

    let data = demo_data.stories.find(story => story.id === parseInt(id || '0'));

    function scenario() {
      return data?.situations[currentScenario];
    }

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

    function addAnswer(answer: string) {
      answers[currentScenario].push(answer);
      setAnswers(answers);
    }

    return (
      <div className="MainMenu">
        <a href='/' className='absolute bg-slate-100 m-10 p-2'>Back to Main Menu</a>
        <div className="relative pt-40 md:left-1/4 md:w-1/2 text-center">
          <h1 className='text-xl'> Story {data?.id} </h1>
          <h1 className='text-2xl'> {data?.title} </h1>
          <div className='border rounded-2xl m-2 p-2'>
            <Scenario text={scenario()?.text || ""} image={scenario()?.image || ""} answers={answers[currentScenario]} addAnswer={addAnswer} />
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