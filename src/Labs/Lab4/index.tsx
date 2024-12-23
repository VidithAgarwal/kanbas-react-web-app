import React from 'react';
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import CounterWithState from "./CounterWithState"
import BooleanStateVariables from "./BooleanStateVariables"
import StringStateVariables from "./StringStateVariables"
import DateStateVariable from "./DateStateVariable"
import ObjectStateVariable from "./ObjectStateVariable"
import ArrayStateVariable from "./ArrayStateVariable"
import ReduxExamples from "./ReduxExamples";    
export default function Lab4(){
    function sayHello() {
        alert("Hello");
      }
    
    return (
        <div className='container'>
            <a id="wd-landing-page" className="list-group-item text-white bg-black text-center border-0" href="/">Back to landing page</a>
           <ClickEvent/>
           <PassingDataOnEvent/>
           <PassingFunctions theFunction={sayHello}/>
           <EventObject/>
           <Counter/>
           <CounterWithState/>
           <BooleanStateVariables/>
           <StringStateVariables/>
           <DateStateVariable/>
           <ObjectStateVariable/>
           <ArrayStateVariable/>
           <ReduxExamples/>
        </div>
    );
};