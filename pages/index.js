import React, { useState } from 'react';

function Home() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Hello world</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

export default Home;