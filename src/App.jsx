import React, { useState } from 'react'; // Pastikan Anda mengimpor React dari 'react'
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </div>
    </>
  );
}

export default App;
