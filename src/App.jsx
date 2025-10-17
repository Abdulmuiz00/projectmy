import React from "react";
import Dashboard from "./StatusCards";
import Greeting from "./Greeting";
import Counter from "./Counter";

function App() {
  const details = {
    name:"Abdulmuiz",
    age: 20,
    school: "LAUTECH",
    department: "Computer Science",
};
  return (
    <div>
      {/* <Dashboard /> */}
      {/* <Greeting details={details}/> */}
      <Counter/>
    </div>
  );
}

export default App;

