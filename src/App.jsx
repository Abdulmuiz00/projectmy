import React from "react";
import Dashboard from "./StatusCards";
import Greeting from "./Greeting";
import Counter from "./Counter";
import ProfileCard from "./ProfileCard";
import ThemeToggle from "./ThemeToggle";
import MirrorLocal from "./TypeMirror";
import ToDoLite from "./Todo";
import RandomQuote from "./Quote";
import PasswordToggle from "./PasswordToggler";
import PasswordToggler from "./PasswordToggler";

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
      {/* <ThemeToggle/> */}
      {/* <MirrorLocal/> */}
      {/* <ToDoLite/> */}
      {/* <RandomQuote /> */}
      <PasswordToggler />
    </div>
  );
};

export default App;

