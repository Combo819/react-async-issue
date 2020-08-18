import React, { useState } from 'react';
import './App.css';
import queue from 'async/queue';
const concurrency = 1;

const timeout = (task,resolve,reject)=>{
  window.setTimeout(()=>{
    console.log(task);
    if(task%2===0){
      resolve();
    }else{
      reject();
    }
  },1500)
}

const q = queue(async function (task, callback) {
  await new Promise((resolve,reject)=>{
    timeout(task,resolve,reject)
  });
  console.log(`task ${task} ends`)
  callback()
}, concurrency);

function App() {
  const [num,setNum] = useState(0);
  const clickHandler = () => {
    q.push([num]);
    setNum(num+1);
  }
  return (
    <div className="App">
      <button onClick={clickHandler}>add one</button>
    </div>
  );
}

export default App;
