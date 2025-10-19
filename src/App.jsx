import React from "react";
import Dashboard from "./StatusCards";
import Greeting from "./Greeting";
import Counter from "./Counter";
import ProfileCard from "./ProfileCard";
import ThemeToggle from "./ThemeToggle";

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
      {/* <Counter/> */}
      {/* <ProfileCard/> */}
      <ThemeToggle/>
    </div>
  );
};

export default App;

