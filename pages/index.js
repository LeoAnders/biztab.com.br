import React, { useState } from "react";

function Home() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>
        "O sucesso é a soma de pequenos esforços repetidos dia após dia." -
        Robert Collier
      </h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Like</button>
    </div>
  );
}

export default Home;
