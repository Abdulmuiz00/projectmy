import React from "react";
import Button from "./Components/Button";
import { Link } from "react-router-dom";
import mage from "../src/assets/36213417.jpg"

function About() {
  return (
    <section >
      <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-lg">
        <h1 className="text-2xl font-bold">MyPortfolio</h1>
        <ul className="flex gap-6">
          <Link to={"/"} className="hover:text-blue-400 cursor-pointer">
            Home
          </Link>
          <Link to={"/about"} className="hover:text-blue-400 cursor-pointer">
            About
          </Link>
          <Link className="hover:text-blue-400 cursor-pointer">Projects</Link>
          <Link className="hover:text-blue-400 cursor-pointer">Contact</Link>
        </ul>
        <Button className="text-white" label="Hire Me" />
      </nav>
      <div className="flex flex-col md:flex-row h-[90vh] items-center justify-between p-10 bg-gray-100 dark:bg-gray-800  transition-colors">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Hello, I’m <span className="text-blue-500">Oyinlola Abdulmuiz Olanrewaju</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            I’m a passionate <strong>Frontend Web Developer</strong> focused on
            creating visually stunning, responsive, and user-friendly web
            experiences. My goal is to contribute to meaningful projects that
            make a lasting impact through innovation, collaboration, and
            dedication to quality.
          </p>
          <Button label="View My Work" />
        </div>

        <img
          src={mage}
          alt="Developer Illustration"
          className="w-[25%] h-[400px] border rounded-4xl mt-10 md:mt-0"
        />
      </div>
    </section>
  );
}
export default About;
