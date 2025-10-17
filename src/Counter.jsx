// import React from "react";
import { useState, useEffect } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (running){
            timer = setInterval(() => {
                setCount((prev) => prev + 1);
            }, 300);
        }

        return() => clearInterval(timer);
    }, [running]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px", margin:"30px" }}>
            <h1 style={{fontFamily:"cursive"}}>Counter App</h1>
            <h1 style={{fontFamily:"cursive"}}>{count}</h1>
            <button style={{margin:"30px", width:"100px", backgroundColor:"green", padding:"10px", fontSize:"20px", fontFamily:"cursive", border:"none", borderRadius:"10px"}} onClick={ () => setRunning(true)}>Start</button>
            <button style={{margin:"30px", width:"100px", backgroundColor:"red", padding:"10px", fontSize:"20px", fontFamily:"cursive", border:"none", borderRadius:"10px"}} onClick={ () => setRunning(false)}>Stop</button>
        </div>
    )
}

export default Counter;