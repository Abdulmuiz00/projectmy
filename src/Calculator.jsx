import React, { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleEqual = () => {
    try {
      // safely evaluate
      const result = eval(input);
      setInput(String(result));
    } catch (err) {
      setInput("Error");
      setTimeout(() => setInput(""), 1000);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        
        {/* Display */}
        <div className="bg-gray-900 text-white p-4 rounded-xl text-right text-2xl font-mono mb-4 overflow-x-auto">
          {input || "0"}
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          
          {/* Row 1 */}
          <button onClick={handleClear} className="btn bg-red-500 text-white">C</button>
          <button onClick={handleDelete} className="btn bg-orange-500 text-white">DEL</button>
          <button onClick={() => handleClick("%")} className="btn bg-gray-300">%</button>
          <button onClick={() => handleClick("/")} className="btn bg-blue-500 text-white">/</button>

          {/* Row 2 */}
          <button onClick={() => handleClick("7")} className="btn">7</button>
          <button onClick={() => handleClick("8")} className="btn">8</button>
          <button onClick={() => handleClick("9")} className="btn">9</button>
          <button onClick={() => handleClick("*")} className="btn bg-blue-500 text-white">*</button>

          {/* Row 3 */}
          <button onClick={() => handleClick("4")} className="btn">4</button>
          <button onClick={() => handleClick("5")} className="btn">5</button>
          <button onClick={() => handleClick("6")} className="btn">6</button>
          <button onClick={() => handleClick("-")} className="btn bg-blue-500 text-white">-</button>

          {/* Row 4 */}
          <button onClick={() => handleClick("1")} className="btn">1</button>
          <button onClick={() => handleClick("2")} className="btn">2</button>
          <button onClick={() => handleClick("3")} className="btn">3</button>
          <button onClick={() => handleClick("+")} className="btn bg-blue-500 text-white">+</button>

          {/* Row 5 */}
          <button onClick={() => handleClick("0")} className="btn col-span-2">0</button>
          <button onClick={() => handleClick(".")} className="btn">.</button>
          <button onClick={handleEqual} className="btn bg-green-500 text-white">=</button>
        </div> 
      </div>
    </div>
  );
}

export default Calculator;
