import React from 'react';
import { useSearchParams } from 'react-router-dom';
import demo_data from './DEMO_data/demo_data.json';

export function Story() {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');

    let data = demo_data.stories.find((story) => story.id === parseInt(id || '0'));

    return (
      <div className="MainMenu">
          {/* make a stylish back button in tailwind */}
          <a href='/' className='absolute bg-slate-100 m-10 p-2'>Back to Main Menu</a>
        <div className="relative pt-40 left-1/4 w-1/2 text-center">
          <h1 className='text-2xl'> {data?.title} </h1>
           {data?.situations.map((situation) => {
              return (
                <div className='border rounded-2xl m-2 p-2 hover:bg-sky-100'>
                  <img src={"./DEMO_data/" + situation.image} alt={situation.image} className="h-96"/>
                  <p>{situation.text}</p>
                </div>
              );
            })
          } 
        </div>
      </div>
    );
  }