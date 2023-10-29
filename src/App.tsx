import { useEffect, useState } from "react";
import hole from "./assets/hole.png";
import mole from "./assets/mole.png";

import "./App.css";

const App = () => {
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMoleVisibility(randomIndex, true);
      setTimeout(() => {
        setMoleVisibility(randomIndex, false);
      }, 800);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  const setMoleVisibility = (index: number, isVisible: boolean) => {
    setMoles((currMoles) => {
      const newMoles = [...currMoles];
      newMoles[index] = isVisible;
      return newMoles;
    });
  };

  const wackMole = (index: number) => {
    if (moles[index] === true) {
      setScore((prev) => prev + 1);
      setMoleVisibility(index, false);
    }
  };

  return (
    <>
      <h1 className="score">Score: {score}</h1>
      <div className="grid">
        {moles.map((isMole, index) => {
          return (
            <img
              onClick={() => wackMole(index)}
              key={index}
              src={isMole ? mole : hole}
              alt="image"
            />
          );
        })}
      </div>
    </>
  );
};

export default App;
