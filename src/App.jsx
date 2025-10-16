import React from "react";
import Dashboard from "./StatusCards";
import Greeting from "./Greeting";

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
      <Greeting details={details}/>
    </div>
  );
}

export default App;

