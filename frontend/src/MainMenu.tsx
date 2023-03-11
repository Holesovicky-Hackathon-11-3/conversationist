import demo_data from './DEMO_data/demo_data.json';
import React from 'react';
import { Story } from './Story';

export function MainMenu() {

  

  return (
    <div className="MainMenu">
      <header className="MainMenu-header">
        {/* make a centered responsive div */}
        <div className="relative left-1/4 w-1/2 text-center">
          <h1 className="text-4xl mt-16 mb-16">Welcome to the Story App</h1>
          {demo_data.stories.map((story) => {
              return (
                <div className='border rounded-2xl m-2 p-2 hover:bg-sky-100'>
                  <a href={'/story?id=' + story.id}>{story.title}</a>
                </div>
              );
            })
          }
        </div>
      </header>
    </div>
  );
}