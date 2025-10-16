import React, { useState } from "react";
import HomeIntro from "./components/HomeIntro.jsx";
import WildlifeLanding from "./components/WildlifeLanding.jsx";

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {!entered ? (
        <HomeIntro onEnter={() => setEntered(true)} />
      ) : (
        <WildlifeLanding />
      )}
    </>
  );
}
