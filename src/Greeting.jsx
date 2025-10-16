import React from "react";
import { useState } from "react";

function Greeting({details}){
    const [greet, setGreet] = useState();

    return(
        <div>
            <h1>Welcome! {details.name}</h1>
            <p>You are {details.age} years old, You school at {details.school} and you are in {details.department} department.</p>
        </div>
    )
};

export default Greeting;