'use client'
import { useEffect, useRef } from "react";

<<<<<<< HEAD
<<<<<<< HEAD
function  Tab( {options, current, onclick}: {options: string[], current?:string, onclick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void} ) {
    const ref = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const tabFunc = (e?:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        
        if(!e && !current) return;
    
        const selected = e?.currentTarget;  
        let rect = selected?.getBoundingClientRect() ||  document.getElementById(current!)?.getBoundingClientRect() ;
        const containerRect = container.current ? container.current.getBoundingClientRect() : {left:0}

        if(ref.current && rect && container){
            ref.current.style.width = `${rect.width}px`;
            ref.current.style.height = `${rect.height}px`;
            ref.current.style.top = `${0}px`;
            ref.current.style.left = `${rect.left - containerRect?.left}px`;
        }
    }


    useEffect(()=>{      
        const onResize = ()=> tabFunc();                                                                 
<<<<<<< HEAD
        tabFunc();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [current]);

    
  return (
    <div ref={container} className='rounded-lg flex p-0.75 bg-gray-200 w-full relative'>
=======
function Tab( {options, current, onclick}: {options: string[], current?:string, onclick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void} ) {
=======
function  Tab( {options, current, onclick}: {options: string[], current?:string, onclick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void} ) {
>>>>>>> 235d4ac (Fixed review for auth)
    const ref = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const tabFunc = (e?:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        
        if(!e && !current) return;
    
        const selected = e?.currentTarget;  
        let rect = selected?.getBoundingClientRect() ||  document.getElementById(current!)?.getBoundingClientRect() ;
        const containerRect = container.current ? container.current.getBoundingClientRect() : {left:0}

        if(ref.current && rect && container){
            ref.current.style.width = `${rect.width}px`;
            ref.current.style.height = `${rect.height}px`;
            ref.current.style.top = `${0}px`;
            ref.current.style.left = `${rect.left - containerRect?.left}px`;
        }
    }


    useEffect(()=>{      
        const tabulate = ()=> tabFunc();                                                                 
=======
>>>>>>> a6a9cdf (Fixed error related to the review)
        tabFunc();
        window.addEventListener('resize', ()=> onResize);
        return () => window.removeEventListener('resize', ()=>onResize);
    }, [current]);

    
  return (
<<<<<<< HEAD
    <div className='rounded-lg flex p-0.75 bg-gray-200 w-full'>
>>>>>>> 5417da9 (Integrated the global components and the ui for the register page)
=======
    <div ref={container} className='rounded-lg flex p-0.75 bg-gray-200 w-full relative'>
>>>>>>> 235d4ac (Fixed review for auth)
        {options.map((option) => 
            <button id={option} onClick={(e)=>{
                e.preventDefault();
                tabFunc(e)
                onclick(e);
<<<<<<< HEAD
<<<<<<< HEAD
            }} key={option} className='relative cursor-pointer py-1.25 transition-all z-2 w-1/2 text-sm min-w-max font-semibold'>{option}</button>
        )}

        <div ref={ref} className="absolute bg-white shadow-md transition-all duration-500 rounded-lg z-1 my-0.75"></div>
=======
            }} key={option} className='cursor-pointer py-1.25 transition-all z-2 w-1/2 text-sm min-w-max font-semibold'>{option}</button>
        )}

        <div ref={ref} className="absolute bg-white shadow-md transition-all duration-500 rounded-lg z-1"></div>
>>>>>>> 5417da9 (Integrated the global components and the ui for the register page)
=======
            }} key={option} className='relative cursor-pointer py-1.25 transition-all z-2 w-1/2 text-sm min-w-max font-semibold'>{option}</button>
        )}

        <div ref={ref} className="absolute bg-white shadow-md transition-all duration-500 rounded-lg z-1 my-0.75"></div>
>>>>>>> 235d4ac (Fixed review for auth)
    </div>
  )
}

export default Tab