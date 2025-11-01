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
import TipCalculator from "./TipCalculator";
import TemperatureConverter from "./TempConverter";
import DigitalClock from "./DigitalClock";
import CountdownTimer from "./TimeCountdown";
import About from "./About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./API";
import Joke from "./RandomApi";
import Weather from "./WeatherApp";

function App() {
  const details = {
    name: "Abdulmuiz",
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
      {/* <PasswordToggler /> */}
      {/* <TipCalculator /> */}
      {/* <TemperatureConverter/> */}
      {/* <DigitalClock /> */}
      {/* <CountdownTimer /> */}
      {/* <BrowserRouter>
        <Routes>

          <Route path="/" element={<About />} />
        </Routes>
      </BrowserRouter> */}
      {/* <h1 className="font-bold">Users</h1>
      <Users /> */}
      {/* <Joke/> */}
      <Weather />
    </div>
  );
}

export default App;
