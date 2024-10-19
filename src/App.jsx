import React, { useState, useEffect } from 'react';
import './App.css';

const Countdown = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return <div>Countdown: {count}</div>;
};

function App() {
  return (
    <>
      <Countdown initialCount={10} />
    </>
  );
}

export default App;
