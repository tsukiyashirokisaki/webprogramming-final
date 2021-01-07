import './App.css';

import { clickToGet } from './axios' 
import React ,{ useState } from 'react';

function App() {
  const [ischecked,setcheck] = useState(false);
  const [msg,setmsg] = useState("");
  
  return (
    <div className="App">
      <button
        onClick={async () => {
          setmsg(await clickToGet())
        }}
      >
      Click me!
      </button>
      <text>{msg}</text>
    </div>
  );
}

export default App;
