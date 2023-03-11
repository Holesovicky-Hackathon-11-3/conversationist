import { Conversation, Role } from "./api-model";
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import demo_data from './DEMO_data/demo_data.json';
import { GptClient } from './GptClient.service';
import { Scenario } from './Scenario';
import { Recorder } from "./Recorder";


function assert(expr:any): asserts expr {
  if (!expr) throw new Error("Assertion failed");
}


export function Story() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const gpt = new GptClient();

  let [currentScenario, setCurrentScenario] = React.useState(0);
  console.log(currentScenario)

  // use state array of booleans to keep track of which scenarios have been completed
  let [completedScenarios, setCompletedScenarios] = React.useState(
    new Array(demo_data.stories.find(
      (story) => story.id === parseInt(id || '0'))?.situations.length).fill(false));

  let data = demo_data.stories.find(story => story.id === parseInt(id || '0'));
  assert(data);

  let [conversations, setConversations] = React.useState<Conversation[]>(
    data.situations.map((scenario) => ({
      messages: [{
        role: Role.System,
        content: scenario.text
      }]
    }))
  );

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

  async function submitAnswer(answer: string) {
    let newMessages = conversations[currentScenario].messages.concat([{
      role: Role.User,
      content: answer,
    }]);
    setConversations({
      ...conversations, [currentScenario]: {
        messages: newMessages
      }
    });

    const reply = await gpt.getAssistantReply({
      messages: newMessages
    });
    newMessages.push(reply);
    console.log(reply);
    setConversations({
      ...conversations, [currentScenario]: {
        messages: newMessages
      }
    });
  }

  return (
    <div className="MainMenu">
      <a href='/' className='absolute bg-slate-100 m-10 p-2'>Back to Main Menu</a>
      <div className="relative pt-40 md:left-1/4 md:w-1/2 text-center">
        <h1 className='text-xl'> Story {data?.id} </h1>
        <h1 className='text-2xl'> {data?.title} </h1>
        <div className='border rounded-2xl m-2 p-2'>
          <Scenario
            text={scenario()?.text || ""}
            image={scenario()?.image || ""}
            conversation={conversations[currentScenario]}
            submitAnswer={submitAnswer} />
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